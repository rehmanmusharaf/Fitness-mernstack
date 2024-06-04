const sendToken = async (user, statuscode, res) => {
  try {
    const token = await user.getJwtToken();

    const option = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set secure flag to true in production
      sameSite: "None", // Necessary for cross-site requests
    };

    delete user.password;

    res
      .status(statuscode)
      .cookie("token", token, option)
      .json({ success: true, user, token });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error During token generation",
      error: error.message,
    });
  }
};

module.exports = sendToken;
