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

const getAUserController = async (req, res, next) => {
    try {
        // Get the postId from the params
        const { userId } = req.params;

        // Return an error if postId is not provided
        if (!userId) {
            return res.status(400).json({ message: "No post selected" });
        }
        // Extract user ID from the token or session
        const loggedId = req.userId;
        
        // Throw an error if the user is not authenticated
        if (!loggedId) {
            return res.status(401).json({ message: "You have to login first" });
        }
        // Define cache key
        // const cacheKey = `post_${postId}`;

        // Check Redis cache for verified users data
        // const cachedUser = await getValue(cacheKey);
        // if (cachedUser) {
        //     // Return the cached users if they exist
        //     return res.status(200).json({
        //         message: "posts (from cache)",
        //         user: cachedUser
        //      });
        //  }

        // Find the current user by ID
        const user = await User.findById(loggedId);
        
        // Throw an error if the user is not found
        if (!user) {
            throw new CustomError("User not found", 404);
        }
        // if user is not admin throw error
        if (user.role !== 'admin'){
            throw new CustomError("You are forbidden", 403);
        }

        // Fetch the post from the database
        const userToBeUpdated = await Job.findById(userId)

        // Throw an error if the post is not found
        if (userToBeUpdated) {
            throw new CustomError("Post not found", 404);
        }
        // Cache the result in Redis for future requests, set expiration time 90 sec
        // await setValue(cacheKey, post, 7200); // 2 hours

        // Return the post in the response
        // Modify the postedDate field before returning the response

        // Return the formatted post
        res.status(200).json({ user:{
            ...userToBeUpdated._doc,
            password:undefined,
            email:undefined}});
    } catch (error) {
        next(error);
    }
};

const getAllUserController = async (req, res, next) => {
    try {
        // Extract pagination parameters from query
        const { page = 1, limit = 10 } = req.query;

        // Extract user ID from the token or session
        const loggedId = req.userId;
        
        // Throw an error if the user is not authenticated
        if (!loggedId) {
            return res.status(401).json({ message: "You have to login first" });
        }

        // Convert page and limit to integers
        const pageNumber = parseInt(page, 10);
        const pageSize = parseInt(limit, 10);

        // Calculate the number of documents to skip
        const skip = (pageNumber - 1) * pageSize;
        // get all the post in database
        const users = await User.find()
        .sort({ postedDate: -1 })
        .skip(skip)
        .limit(pageSize);
        // Count total number of posts for pagination metadata
        const totalPosts = await Job.countDocuments();
        // pagination: {
        //     totalPosts,
        //     totalPages: Math.ceil(totalPosts / pageSize),
        //     currentPage: pageNumber,
        //     pageSize
        // }

        // Send response with paginated posts and metadata
        // res.status(200).json({
        //     message: 'success',
        //     jobs
        // });
        res.status(200).json(users);
    } catch(error) {
        next(error);
    }
};

module.exports = {
    getUserController,
    getAUserController,
    getAllUserController
}