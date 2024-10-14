const { CustomError } = require('../middlewares/error');
const User = require('../models/Users');
// const { clearAllCaches } = require('../utils/redisConfig');

const deleteUserController = async (req, res, next) => {
    try {
        // get the id of user from the verifiedToken of user in cookie
        const userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
        // get the object of user
        const userToDelete = await User.findById(userId);
        // if userToDelete is not found throw error
        if (!userToDelete) {
            throw new CustomError("User not found", 404);
        }
        // delete user with the userId
        await userToDelete.deleteOne();
        // clear all caches
        // clearAllCaches();
        
        res.clearCookie("token")
        .status(200)
        .json("User Deleted successfully!");
    } catch(error) {
        next(error);
    }
}

module.exports = deleteUserController;