const { CustomError } = require('../middlewares/error');
const User = require('../models/User');

const checkAuthController = async (req, res, next) => {
    try {
        // check if user in the token is existing
        const user = await User.findById(req.userId);
        // throw error if no user
        if (!user) {
            throw new CustomError("User not found", 401);
        }
        res.status(200).json({user:{
            ...user._doc,
            password: undefined,
            email: undefined,
            phoneNumber: undefined
        }})
    } catch(error) {
        throw error;
    }
}

const fetchUserController = async (req, res, next) => {
    // get token from the cookies
    const token = req.cookies.token;
     // Check if the token exists
    if (!token) {
      return res.status(401).json({ message: "Authentication token is missing" });
    }
    // verify the token with jwt verify and send error if not verified
    jwt.verify(token,process.env.JWT_SECRET, {}, async (err, data) => {
      // if error thow the error
      if(err){
        throw new CustomError(err, 403);
      }
      try{
        // get the user Id from the cookie
        const id = data.userId;
        // find the id of the user found in the token
        const user = await User.findOne({_id:id});
        // return the user info
        res.status(200).json({user:{
          ...user._doc,
          password: undefined,
          email: undefined,
          phoneNumber: undefined
        }});
      } catch(error) {
        next(error);
      }
    })
  };

module.exports = checkAuthController;