const Job = require('../models/Jobs');
const User = require('../models/Users');
const { CustomError } = require('../middlewares/error');
// const { clearCache } = require('../utils/redisConfig');

const deleteJobController = async (req, res, next) => {
    try {
        // get the postId from the params
        const { postId } = req.params;
        // return no post to delete
        if (!postId){
            return res.status(400).json({ message: "No post selected for deletion" });
        }
        // get the id of user from the verifiedToken of user in cookie
        const userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
        // get post object
        const postToDelete = await Job.findById(postId);
        // throw error if not found
        if (!postToDelete) {
            throw new CustomError("Post not found", 404);
        }
        // get user that posted
        const user = await User.findById(userId);
        // throw error if not found
        if (!user) {
            throw new CustomError("User not found", 404);
        }
        // check if the user is admin or the post owner
        if (user.role !== 'admin') {
            return res.status(403).json("You are not forbidden to delete this post");
        }
        // Delete the post by its ID
        await Job.findByIdAndDelete(postId);
        // clearCache(cacheKey);
        // clearCache(cacheKey1);

        res.status(200).json({message:"Post deleted successfully"});
    } catch (error) {
        next(error);
    }
}

module.exports = deleteJobController;