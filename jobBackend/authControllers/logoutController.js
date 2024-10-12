const { CustomError } = require("../middlewares/error");
const verifyAccessToken = require("../middlewares/verifyAccessToken");
const Session = require("../models/Session");

const logoutController = async (req, res, next) => {
  // get the accessToken
  const accessToken = req.cookies.accessToken;
  try{
    // if no acccessToken throw error
    if (!accessToken) {
      throw new CustomError("You need to login first", 401);
    }
    // get the payload of the accessToken
    const payload = verifyAccessToken(accessToken)
    // if payload exist delete the session
    if (!payload) {
      throw new CustomError("Your not logged in prior", 401);
    }

    const deletedSession = await Session.findByIdAndDelete(payload.sessionId);

    // Clear cookies for accessToken and refreshToken
    res.clearCookie("accessToken")
      .clearCookie("refreshToken", { path: "/api/v1/auth/refresh" })
      .status(200)
      .json("User logged out successfully!");
  }
  catch(error){
    next(error);
  }
  }


module.exports = logoutController;