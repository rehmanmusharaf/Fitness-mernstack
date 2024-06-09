const express = require("express");
const router = express.Router();
const FitnessStat = require("../models/fitnessstatmodel.js");
const {
  isAuthenticated,
  isAdminAuthenticated,
} = require("../middleware/auth.js");
const usermodel = require("../models/usermodel.js");

router.post("/api/registerProgress", isAdminAuthenticated, async (req, res) => {
  try {
    console.log("end point hit /api/registerProgress");
    const { userid, username, stats } = req.body;
    console.log(userid, username, stats);
    // Check if the user already exists in the database
    let existingUser = await FitnessStat.findOne({ userid: userid });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Create a new fitness stat entry for the user
    const newFitnessStat = new FitnessStat({
      userid: userid,
      username: username,
      stat: [
        {
          date: new Date(),
          progress: stats.progress,
        },
      ],
    });

    // Save the new fitness stat entry to the database
    await newFitnessStat.save();

    return res.status(201).json({
      success: true,
      message: "First day progress registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});
router.post("/api/updateprogress", isAuthenticated, async (req, res) => {
  try {
    const userid = req.user._id;
    const { stats } = req.body;
    console.log(stats);
    // console.log(stats.date);
    let recieveddate = new Date(stats.date);
    recieveddate = recieveddate.getDate();
    let newdate = new Date();
    newdate = newdate.getDate();
    // console.log(recieveddate + "==" + newdate);
    if (recieveddate != newdate) {
      return res
        .status(400)
        .json({ success: false, message: "You can't modify Anyother day" });
    }
    let existingUser = await FitnessStat.findOne({ userid: userid });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Not Exist With fitnessStat PLan",
      });
    }
    const today = new Date().setHours(0, 0, 0, 0);
    const existingProgress = existingUser.stat.find(
      (entry) => new Date(entry.date).setHours(0, 0, 0, 0) === today
    );
    if (existingProgress) {
      // If an entry exists for today, update its progress
      let existing = existingProgress.progress;
      existingProgress.progress = { ...existing, ...stats.progress };
      console.log(existingProgress.progress);
    } else {
      // If no entry exists for today, create a new progress entry
      existingUser.stat.push({
        date: new Date(),
        progress: {
          stepcovered: stats.progress.stepcovered || 0,
          caloriesburned: stats.progress.caloriesburned || 0,
          activeexercise: stats.progress.activeexercise || 0,
          achievement: stats.progress.achievement || 0,
        },
      });
    }
    // Save the updated fitness stat entry to the database
    await existingUser.save();
    return res.status(201).json({
      success: true,
      message: "Progress updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});
router.get("/api/getprogress", isAuthenticated, async (req, res) => {
  try {
    const userid = req.user._id;
    console.log(userid);
    // Fetch the user's fitness stats from the database
    let existingUser = await FitnessStat.findOne({ userid: userid });
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // Normalize today's date to midnight for comparison
    const today = new Date().setHours(0, 0, 0, 0);

    // Check if there is already a progress entry for today
    let existingProgress = existingUser.stat.find(
      (entry) => new Date(entry.date).setHours(0, 0, 0, 0) === today
    );

    if (!existingProgress) {
      // If no entry exists for today, initialize progress with zero and save
      existingUser.stat.push({
        date: new Date(),
        progress: {
          stepcovered: 0,
          caloriesburned: 0,
          activeexercise: 0,
          achievement: 0,
        },
      });
      await existingUser.save();

      existingProgress = existingUser.stat.find(
        (entry) => new Date(entry.date).setHours(0, 0, 0, 0) === today
      );
    }

    return res.status(200).json({
      success: true,
      progress: existingProgress.progress,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

router.get("/api/user-performance", isAuthenticated, async (req, res) => {
  try {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    const fitnessdata = await FitnessStat.findOne({ userid: req.user._id });
    const recentPerformance = fitnessdata.stat.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= sevenDaysAgo && entryDate <= today;
    });
    res.status(200).json({ success: true, userperformance: recentPerformance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error });
  }
  // res.json(recentPerformance);
});
// router.get(
//   "/admin/user-performance",
//   isAdminAuthenticated,
//   async (req, res) => {
//     try {
//       console.log("Api End Point hit");
//       console.log("query from user", req.query);
//       const { id } = req.query;
//       const user = await usermodel.findById(id);
//       if (!user) {
//         return res
//           .status(400)
//           .json({ success: false, message: "User with this id is not found" });
//       }
//       const page = parseInt(req.query.page) || 1; // Get page from query string, default to 1 if not provided
//       const limit = parseInt(req.query.limit) || 7; // Get limit from query string, default to 10 if not provided
//       console.log("query limit is:", req.query.limit);
//       const today = new Date();
//       const sevenDaysAgo = new Date();
//       sevenDaysAgo.setDate(today.getDate() - 7);
//       const fitnessdata = await FitnessStat.findOne({ userid: id });
//       const recentPerformance = fitnessdata.stat.filter((entry) => {
//         const entryDate = new Date(entry.date);
//         return entryDate >= sevenDaysAgo && entryDate <= today;
//       });
//       // Pagination logic
//       const startIndex = (page - 1) * limit;
//       const endIndex = page * limit;
//       const paginatedPerformance = recentPerformance.slice(
//         startIndex,
//         endIndex
//       );
//       console.log(page,)
//       res.status(200).json({
//         success: true,
//         userperformance: paginatedPerformance,
//         page,
//         plantype: user.plantype,
//         gainupto: user.gainupto,
//         url: user.paymentproof.url,
//         totalPages: Math.ceil(recentPerformance.length / limit),
//         totalEntries: recentPerformance.length,
//       });
//     } catch (error) {
//       res.status(500).json({ success: false, message: error.message, error });
//     }
//   }
// );

router.get(
  "/admin/user-performance",
  isAdminAuthenticated,
  async (req, res) => {
    try {
      console.log("API End Point hit");
      console.log("Query from user:", req.query);
      const { id } = req.query;
      if (!id) {
        return res
          .status(400)
          .json({ success: false, message: "ID is required" });
      }

      const user = await usermodel.findById(id);
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "User with this ID is not found" });
      }

      const page = parseInt(req.query.page) || 1;
      // const page = 2;

      const limit = parseInt(req.query.limit) || 7;

      console.log("Page:", page);
      console.log("Limit:", limit);

      const today = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);
      const fitnessdata = await FitnessStat.findOne({ userid: id });
      if (!fitnessdata) {
        return res.status(400).json({
          success: false,
          message: "No fitness data found for this user",
        });
      }
      // console.log("fitnassstat", fitnessdata.stat);
      let fitnessarray = fitnessdata.stat;
      // // if(page==1)
      // // {

      // let arraylength = fitnessarray.length;
      // let startIndex = arraylength - 7 * page;
      // let endIndex = arraylength - 7 * (page - 1);

      // // Ensure startIndex is not negative
      // if (startIndex < 0) {
      //   startIndex = 0;
      // }

      // fitnessarray = fitnessarray.slice(startIndex, endIndex);

      // let arraylength=fitnessarray.length;
      //   fitnessarray = fitnessarray.slice((arraylength-(7*page)),arraylength-((7*(page-1))));
      // }
      // else{

      // }
      const recentPerformance = fitnessdata.stat.filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate >= sevenDaysAgo && entryDate <= today;
      });

      console.log("Recent Performance Length:", recentPerformance.length);
      let arraylength2 = fitnessarray.length;
      let startIndex2 = arraylength2 - 7 * page;
      let endIndex2 = arraylength2 - 7 * (page - 1);

      // Ensure startIndex is not negative
      if (startIndex2 < 0) {
        startIndex2 = 0;
      }
      // console.log("start index and end index", startIndex2, endIndex2);
      fitnessarray = fitnessarray.slice(startIndex2, endIndex2);
      // totalPages: Math.ceil(recentPerformance.length / limit),
      // paginatedPerformance
      // console.log("page and its array is:", page, " +  ", fitnessarray);
      res.status(200).json({
        success: true,
        userperformance: fitnessarray,
        page,
        name: user.full_name,
        description: user.description,
        plantype: user.plantype,
        gainupto: user.gainupto,
        url: user.paymentproof.url,
        totalPages: Math.ceil(fitnessdata.stat.length / limit),
        totalEntries: recentPerformance.length,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: error.message, error });
    }
  }
);

module.exports = router;
