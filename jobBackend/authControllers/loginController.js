const { CustomError } = require('../middlewares/error');
const User = require('../models/Users');
const Session = require('../models/Session');
const bcrypt = require('bcrypt');
const { refreshToken, accessToken } = require('../middlewares/refreshToken');
const { setAuthCookies } = require('../middlewares/cookies');

const loginController = async (req, res, next) => {
  try{
    let user;
    const userAgent = req.headers['user-agent'];
    // from the json data send check if the user with
    // the email or username exist
    if (req.body.email){
      user=await User.findOne({email:req.body.email})
    } else {
      user=await User.findOne({username:req.body.username});
    }
    
    // return error if no user have same email
    if(!user) {
      throw new CustomError("Invalid email or Password!", 400);
    }

    // if user is not verified
    // if (!user.isVerified){
    //   throw new CustomError("Verify your account or register", 404);
    // };

    // verify the password of user found with sent password
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    // if the password don't match throw error
    if(!isPasswordValid) {
      throw new CustomError("Invalid email or Password!", 401)
    }

    // get userId of signup user
    const userId = user._id;

    // storing session data of logged in user
    const userSession = new Session({
      user:userId,
      userAgent
    });

    // save userSession
    await userSession.save();

    // sessionId
    const sessionId = userSession._id;

    // getting refresh token and access token
    const refreshTokenGenerated = refreshToken(sessionId);
    const accessTokenGenerated = accessToken(userId, sessionId);

    // update last login code of the user
    user.lastLogin = new Date();
    // storing the token in the cookie
    return setAuthCookies(res, accessTokenGenerated, refreshTokenGenerated).status(200).json({ message:"Login Successfully"});

  } catch(error) {
    next(error);
  }
}

module.exports = loginController;