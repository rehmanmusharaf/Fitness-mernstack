const express = require("express");
const path = require("path");
const axios = require("axios");
const usermodel = require("../models/usermodel");
const router = express.Router();
const FitnessStat = require("../models/fitnessstatmodel.js");
const cloudinary = require("../utils/coudinary.js");
const bcrypt = require("bcryptjs");

// const cloudinary = require("../utils/cloudinary.js");

const fs = require("fs");
// const ErrorHandler = require("../utils/Errorhandler.js");
// const catchasyncerr = require("../middleware/catchAsyncError.js");
var jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail.js");
const multer = require("multer");
const sendToken = require("../utils/sendToken.js");
const {
  isAuthenticated,
  isAdminAuthenticated,
} = require("../middleware/auth.js");

function deletefile(filename) {
  // console.log("to delete file filename is: ", filename);
  fs.unlink(`uploads/${filename}`, (err) => {
    if (err) {
      return "Image Not Deleted!";
    }
    // console.log('File deleted successfully');
  });
  return "image Deleted Successfully;";
}

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     let destination = cb(null, "./uploads");
//     // console.log("destination is : ", destination);
//   },

//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage: storage });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

async function uploadImages(file) {
  let image = {};
  try {
    // for (const file of files) {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(file.path, (err, result) => {
        if (err) {
          // console.log("error is:", err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    console.log("result is:", result);
    image = {
      public_id: result.public_id,
      url: result.secure_url,
    };
    // images.push(image);

    // deletefile(result.originalname);
    // }
    // console.log("images is", images);
    // Now you can work with the 'images' array after all uploads are done
    return image;
  } catch (err) {
    console.error("error is:", err);
    return [];
  }
}
async function deletecloudinaryimage(publicId) {
  cloudinary.uploader.destroy(publicId, (error, result) => {
    if (error) {
      console.error("Error deleting file:", error);
    } else {
      console.log("File deleted:", result);
    }
  });
}

// User Registration
router.post(
  "/api/create-user",
  upload.single("file"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "File upload failed, please try again",
        });
      }

      console.log("req.file is: ", req.file);
      console.log("req.filename is: ", req.file.filename);

      console.log("-------------------");
      // console.log("API End Point Hit!");
      console.log("req.body is: ", req.body);
      let {
        full_name,
        email,
        phone,
        plantype,
        gainupto,
        looseupto,
        currentweight,
        height,
        dob,
        description,
        password,
      } = req.body;

      gainupto = Number(gainupto);
      looseupto = Number(looseupto);
      console.log(gainupto, looseupto);
      if (
        !full_name ||
        !email ||
        !phone ||
        !(gainupto || looseupto) ||
        !plantype ||
        !currentweight ||
        !height ||
        !dob ||
        !description ||
        !password
      ) {
        deletefile(req.file.filename);
        return res.status(400).json({
          success: false,
          message: "Please fill out the complete form",
        });
      }

      const existingUser = await usermodel.findOne({ email });
      if (existingUser) {
        deletefile(req.file.filename);
        return res
          .status(409)
          .json({ success: false, message: "User already exists" });
      }
      // let file1 = ;
      // console.log("File1 is:", req.file);
      let images = await uploadImages(req.file);
      // console.log("Images i: ", images);
      if (images.length == 0) {
        // images.forEach((element) => {
        deletecloudinaryimage(images.public_id);
        // });
        deletefile(req.file.filename);
      }
      const newUser = {
        full_name,
        email,
        phone,
        plantype,
        gainupto,
        looseupto,
        currentweight,
        height,
        dob,
        description,
        password,
        paymentproof: images,
      };

      // Save the user
      //   await newUser.save();

      // Create activation token
      const activation_token = await createActivationToken(newUser);
      if (!activation_token) {
        deletecloudinaryimage(images.public_id);
        return res
          .status(500)
          .json({ success: false, message: "Server is experiencing problems" });
      }
      const activationUrl = `${process.env.REACT_APP_URL}/activation/${activation_token}`;
      try {
        await sendMail({
          email: newUser.email,
          subject: "Activate Your Account",
          message: `Hello ${newUser.full_name}, please click the link below to activate your account: ${activationUrl}`,
        });
        deletefile(req.file.filename);
        res.status(201).json({
          success: true,
          message: "Please check your email to activate your account",
        });
      } catch (error) {
        console.log(error);
        deletecloudinaryimage(images.public_id);
        deletefile(req.file.filename);
        return res
          .status(500)
          .json({ success: false, message: error.message, error });
      }
    } catch (error) {
      deletefile(req.file.filename);
      deletecloudinaryimage(images.public_id);
      return res
        .status(500)
        .json({ success: false, message: error.message, error });
    }
  }
);

async function createActivationToken(user) {
  try {
    const key = await jwt.sign(user, process.env.JWT_SECRET_KEY, {
      expiresIn: "5m",
    });
    return key;
  } catch (error) {
    return false;
  }
}

// Account Activation
router.post("/api/activation", async (req, res, next) => {
  try {
    // console.log("activation end point hit");
    const { activation_token } = req.body;
    // console.log(activation_token);
    const newUser = jwt.verify(activation_token, process.env.JWT_SECRET_KEY);
    console.log("new user is:", newUser);
    // console.log("aftre hhit activation new User", newUser);
    if (!newUser) {
      // deletecloudinaryimage(newUser.paymentproof.public_id);
      return res
        .status(400)
        .json({ success: false, message: "Invalid activation token" });
    }
    // console.log(newUser);
    const {
      full_name,
      email,
      phone,
      plantype,
      currentweight,
      height,
      gainupto,
      looseupto,
      dob,
      description,
      password,
      paymentproof,
    } = newUser;
    // console.log(
    //   full_name,
    //   email,
    //   phone,
    //   plantype,
    //   currentweight,
    //   height,
    //   dob,
    //   description,
    //   password
    // );
    const result = new usermodel({
      full_name,
      email,
      phone,
      plantype,
      gainupto,
      looseupto,
      currentweight,
      height,
      dob,
      description,
      password,
      paymentproof,
    });

    await result.save();
    const token = await result.getJwtToken();
    res.status(201).json({
      success: true,
      token,
      user: result,
    });
  } catch (error) {
    deletecloudinaryimage(newUser.paymentproof.public_id);
    res.status(500).json({ success: false, message: error.message, error });
  }
});

router.post("/api/login", async (req, res) => {
  try {
    // console.log("api end point hit");
    const { email, password } = req.body;
    // console.log("Api End pOOint hit ", email, password);
    // console.log(req.body);
    if (!email && !password) {
      return res.status(401).json({
        success: false,
        message: "Please Enter Your Credentials Before Login",
      });
    }
    let user = await usermodel.findOne({ email: email }).select("+password");
    // console.log("user is :", user);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credenetials" });
    }
    // console.log("user is ", user);
    const validate = await user.comparePassword(password);
    console.log("bcrypt comparison result : ", validate);

    if (!validate) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }
    sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong ",
      error: error.message,
    });
  }
});

router.get("/getuser", isAuthenticated, async (req, res) => {
  try {
    // console.log(req.user);
    const user = await usermodel.findById(req.user.id);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }
    if (user.active === false) {
      return res
        .status(400)
        .json({ success: false, message: "User Acount Not Activate" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message, error: error });
  }
});

router.get("/user/logout", (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(0),
      httpOnly: true,
    });
    res
      .status(200)
      .json({ success: true, messaage: "User Logout Successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Somethinng Went Wrong ", error });
  }
});

// isAdminAuthenticated,
// router.get("/getallusers", async (req, res, next) => {
//   try {
//     const allusers = await usermodel.find();
//     const { page } = req.query || 0;
//     let totalusers = 0;
//     // if (page == 0) {
//     totalusers = await usermodel.find({ role: "user" }).countDocuments();
//     // }
//     const userperpage = 5;
//     const users = await usermodel
//       .find({ role: "user" })
//       .skip(page * userperpage)
//       .limit(userperpage);
//     res.status(200).json({
//       success: true,
//       message: `user for page ${page}`,
//       totalusers,
//       users,
//     });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal Srever Error!" });
//   }
// });
// isAdminAuthenticated,
router.put(
  "/activateuseracount",
  isAdminAuthenticated,
  async (req, res, next) => {
    try {
      const { userid } = req.body;
      // Fetch the user's details from the database
      let user = await usermodel.findById(userid);

      // console.log(user);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      // Update the active status of the user
      user.active = true;
      await user.save();

      let existingUser = await FitnessStat.findOne({ userid: userid });
      if (existingUser) {
        return res.status(200).json({
          success: 200,
          message: "User Acount is Activated but stats already exists",
        });
      }

      // Create a new fitness stat entry for the user
      const newFitnessStat = new FitnessStat({
        userid: userid,
        username: user.full_name,
        stat: [
          {
            date: new Date(),
            progress: {
              stepcovered: 0,
              caloriesburned: 0,
              activeexercise: 0,
              achievement: 0,
            },
          },
        ],
      });

      // Save the new fitness stat entry to the database
      await newFitnessStat.save();

      return res.status(200).json({
        success: true,
        message: "User account activated successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error!",
        error: error.message,
      });
    }
  }
);

router.put(
  "/deactivateuseracount",
  isAdminAuthenticated,
  async (req, res, next) => {
    try {
      const { userid } = req.body;
      console.log("userid is: ", userid);
      // Fetch the user's details from the database
      let user = await usermodel.findById(userid);
      console.log(user);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      // Update the active status of the user
      user.active = false;

      // Save the updated user details to the database
      await user.save();

      return res.status(200).json({
        success: true,
        message: "User account deactivated successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error!",
        error: error.message,
      });
    }
  }
);
// Route to get all users with pagination and separate active and inactive users

router.get("/getallusers", isAdminAuthenticated, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page, default is 1
    const limit = 5; // Number of users per page
    // Get active users
    const activeUsers = await usermodel
      .find({ active: true })
      .skip((page - 1) * limit)
      .limit(limit);

    // Get inactive users
    const inactiveUsers = await usermodel
      .find({ active: false })
      .skip((page - 1) * limit)
      .limit(limit);

    // Count total active users
    const totalActiveUsers = await usermodel.countDocuments({ active: true });
    // Count total inactive users
    const totalInactiveUsers = await usermodel.countDocuments({
      active: false,
    });
    return res.status(200).json({
      success: true,
      activeUsers,
      inactiveUsers,
      totalActiveUsers,
      totalInactiveUsers,
    });
  } catch (error) {
    console.error("Error while fetching users:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

router.put("/updateprofile", isAuthenticated, async (req, res) => {
  const { email, ...updateFields } = req.body;
  console.log(email, updateFields);
  if (!email) {
    return res
      .status(400)
      .json({ error: "Email is required to update profile." });
  }

  try {
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found." });
    }

    // Update the user with the fields provided in req.body
    Object.keys(updateFields).forEach((key) => {
      user[key] = updateFields[key];
    });

    const userne = await user.save();
    console.log(userne);
    res
      .status(200)
      .json({ success: true, message: "Profile updated successfully.", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred while updating the profile.",
    });
  }
});

// / User Registration
router.put("/api/changepassword", async (req, res, next) => {
  try {
    console.log("API endpoint hit for change password");
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill out the complete form",
      });
    }

    const existingUser = await usermodel.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    const updateduser = {
      email,
      password,
    };

    const activation_token = await createActivationToken(updateduser);
    if (!activation_token) {
      return res.status(500).json({
        success: false,
        message: "Server is experiencing problems",
      });
    }

    const activationUrl = `${process.env.REACT_APP_URL}/updatepassword/${activation_token}`;
    try {
      await sendMail({
        email: updateduser.email,
        subject: "Activate Your Account",
        message: `Hello, please click the link below to activate your account: ${activationUrl}`,
      });

      res.status(201).json({
        success: true,
        message: "Please check your email to activate your account",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Failed to send activation email",
        error,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
});

async function createActivationToken(user) {
  try {
    const key = await jwt.sign(user, process.env.JWT_SECRET_KEY, {
      expiresIn: "5m",
    });
    return key;
  } catch (error) {
    console.error("Error creating activation token:", error);
    return false;
  }
}

// Account Activation
router.put("/api/passwordchange", async (req, res, next) => {
  try {
    console.log("Activation endpoint hit");
    const { activation_token } = req.body;

    const updatedUser = jwt.verify(
      activation_token,
      process.env.JWT_SECRET_KEY
    );

    if (!updatedUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid activation token",
      });
    }

    const { email, password } = updatedUser;
    let hashedpassword = await bcrypt.hash(password, 10);

    const updateduser = await usermodel
      .findOneAndUpdate({ email }, { password: hashedpassword }, { new: true })
      .select("+password");

    if (!updateduser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(201).json({
      success: true,
      user: updateduser,
    });
  } catch (error) {
    console.error("Error during password change:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
});

module.exports = router;
