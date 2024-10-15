const Job = require('../models/Jobs');
const User = require('../models/Users');
const { CustomError } = require('../middlewares/error');
// const { getValue, setValue } = require('../utils/redisConfig');


const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2); // Ensure month is 2 digits
    const day = (`0${date.getDate()}`).slice(-2); // Ensure day is 2 digits
    return `${year}-${month}-${day}`;
  };

/**
 * 
 * @param {userId} req 
 * @param {*[post]} res 
 * @param {*[error]} next 
 * @returns 
 */
const getJobsController = async (req, res, next) => {
    try {
        // get the id of user from the verifiedToken of user in cookie
        const userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            return res.status(401).json({ message: "You have to login first" });
        }
        // // Define cache key
        // const cacheKey = `post_${userId}`;

        // // Check Redis cache for verified users data
        // const cachedUser = await getValue(cacheKey);
        // if (cachedUser) {
        //     // Return the cached users if they exist
        //     return res.status(200).json({
        //         message: "posts (from cache)",
        //         user: cachedUser
        //      });
        //  }
        // // get user object
        // const user = await User.findById(userId);
        // // throw error if not found
        // if (!user) {
        //     throw new CustomError("User not found", 404);
        // }
        // parameter for post return
        const limit = parseInt(req.query.limit, 10) || 10;
        const page = parseInt(req.query.page, 10) || 1;
        // Query to get posts:
        // 1. Posts from users the current user is following.
        // 2. Public posts from any user, excluding posts from users who blocked the current user or whom the user has blocked.
        const jobs = await Job.find({ visibility:'true' })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({createdAt:-1})
        .toArray(); // Populate user details for each post

        // calculating the total post to be given to a user
        const totalJobs = await Job.countDocuments({ visibility: 'true' });
        // Cache the result in Redis for future requests, set expiration time 90 sec
        // await setValue(cacheKey, posts, 3600); // 2 minutes
        // getting the total page
        const totalPages = Math.ceil(totalJobs / limit);

        // return response with page number
        res.status(200).json({
            jobs,
            currentPage: page,
            totalPages,
            totalPosts
        });

    } catch (error) {
        next(error);
    }
};

const getAPostController = async (req, res, next) => {
    try {
        // Get the postId from the params
        const { postId } = req.params;

        // Return an error if postId is not provided
        if (!postId) {
            return res.status(400).json({ message: "No post selected" });
        }
        // Extract user ID from the token or session
        const userId = req.userId;
        
        // Throw an error if the user is not authenticated
        if (!userId) {
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
        const user = await User.findById(userId);
        
        // Throw an error if the user is not found
        if (!user) {
            throw new CustomError("User not found", 404);
        }
        // if user is not admin throw error
        if (user.role !== 'admin'){
            throw new CustomError("You are forbidden", 403);
        }

        // Fetch the post from the database
        const post = await Job.findById(postId)

        // Throw an error if the post is not found
        if (!post) {
            throw new CustomError("Post not found", 404);
        }
        // Cache the result in Redis for future requests, set expiration time 90 sec
        // await setValue(cacheKey, post, 7200); // 2 hours

        // Return the post in the response
        // Modify the postedDate field before returning the response
        const formattedPost = {
            ...post._doc,  // Spread the document data (to handle Mongoose document object properly)
            postedDate: formatDate(post.postedDate)  // Format the postedDate
        };

        // Return the formatted post
        res.status(200).json({ post: formattedPost });

    } catch (error) {
        next(error);
    }
};

const getAllJobssForAdminController = async (req, res, next) => {
    try {
        // Extract pagination parameters from query
        const { page = 1, limit = 10 } = req.query;

        // Convert page and limit to integers
        const pageNumber = parseInt(page, 10);
        const pageSize = parseInt(limit, 10);

        // Calculate the number of documents to skip
        const skip = (pageNumber - 1) * pageSize;
        // get all the post in database
        const jobs = await Job.find()
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
        res.status(200).json(jobs);
    } catch(error) {
        next(error);
    }
    
}

module.exports = {
    getJobsController,
    getAllJobssForAdminController,
    getAPostController
}