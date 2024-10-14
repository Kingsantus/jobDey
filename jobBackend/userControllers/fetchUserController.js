const { CustomError } = require('../middlewares/error');
const User = require('../models/Users');


const getUserController = async (req, res, next) => {
    try {
        // get the id of user from the verifiedToken of user in cookie
        const userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
        // get user from database
        const user = await User.findById(userId);
        // throw error if not found
        if (!user) {
            throw new CustomError("User don't exist", 500);
        }
        // send response successfully
        res.status(200).json({user:{
            ...user._doc,
            password:undefined,
            email:undefined
        }});
    } catch(error) {
        next(error);
    }
};

module.exports = getUserController;