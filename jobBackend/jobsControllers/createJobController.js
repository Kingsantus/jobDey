const Job = require('../models/Jobs');
const User = require('../models/Users');
const { CustomError } = require('../middlewares/error');
// const { clearCache } = require('../utils/redisConfig');

const createJobController = async (req, res, next) => {
    
    try {
        // get the required info from body
        const { title, companyName, url, employmentType, country, category, jobModel, postedDate, imageURL } = req.body;
        // throw error if any is missing
        if ( !title || !companyName || !url ||  !employmentType || !country || !category || !jobModel || !postedDate || !imageURL ) {
            throw new CustomError("Missing information", 400);
        }
        // check if url has already being provided
        const urlExist = await Job.findOne({url});
        // if url exist throw error
        if (urlExist) {
            throw new CustomError("The Url already exist", 400);
        }
        const userId = "670528f70d6993e12ddf1fd9"
        // get the id of user from the verifiedToken of user in cookie
        // const userId = req.userId;
        // throw error if no user Id
        // if (!userId) {
        //     throw new CustomError("You have to login first", 401);
        // }
        // get the object of user using userId
        // const user = await User.findById(userId);
        // throw error if not found
        // if (!user) {
        //     throw new CustomError("User not found", 400);
        // }
        // if user.role == admin throw error
        // if (!user.role === "admin") {
        //     throw new CustomError("Only Admin can create Job", 401);
        // }
        // Allow visibility for visibility validation
        // create post with caption
        const newJob = new Job({
            user:userId,
            title,
            companyName,
            url,
            employmentType,
            country,
            category,
            jobModel,
            postedDate,
            imageURL
        });

        // save the newPost in Post table
        await newJob.save();
        // add the posts in user Id as it is being referrence
        // user.posts.push(newPost._id);
        // save the user table
        // await user.save();
        // Define cache key
        // const cacheKey = `post_${userId}`;
        // const cacheKey1 = `userpost_${userId}`;
        // clear cache of the user
        // clearCache(cacheKey);
        // clearCache(cacheKey1);

        res.status(201).json({message:"Post created successfully!", post:newJob});
    } catch (error) {
        next(error);
    }
}


const updatePostController = async (req,res,next) => {
    try {
        // get the id of user from the verifiedToken of user in cookie
        let userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
        // extract postId from url
        const { postId } = req.params;
        const { caption } = req.body;
        // throw error if postId is not in url
        if (!postId){
            throw new CustomError("PostId is missing", 400);
        }
        // return if no caption
        if (!caption){
            res.status(200).json({message:"No change done"});
        }
        // check if postId in Post
        const postToUpdate = await Post.findById(postId);
        // throw error if not found
        if (!postToUpdate) {
            throw new CustomError("Post not found!", 400);
        }
        // check if the logged user is the creator of post
        if (postToUpdate.user.toString() !== userId.toString()){
            throw new CustomError("You can't change this post", 403);
        }
        // the new caption becomes the caption
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { caption },
            { new: true }
        );

        // update post
        await postToUpdate.save();
        // Define cache key
        const cacheKey = `post_${userId}`;
        const cacheKey1 = `userpost_${userId}`;
        // clear cache of the user
        clearCache(cacheKey);
        clearCache(cacheKey1);

        res.status(200).json({message:"Post Updated successfully", post:updatedPost});
    } catch (error) {
        next(error);
    }
}

const updatePostVisibilityController = async (req,res,next) => {
    try {
        // get the id of user from the verifiedToken of user in cookie
        let userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
        // extract postId from url
        const { postId } = req.params;
        let { visibility } = req.body;
        // throw error if postId is not in url
        if (!postId){
            throw new CustomError("PostId is missing", 400);
        }
        // return if no caption
        if (!visibility){
            res.status(200).json({message:"No change done"});
        }
        // Allow visibility for visibility validation
        const allowedVisibility = ['public', 'friends'];
        // throw error if a use posted different thing
        if (!allowedVisibility.includes(visibility)){
            res.status(200)
            .json({message:"it was not updated, you can only change to public or friends"});
        }
        // check if postId in Post
        const postToUpdate = await Post.findById(postId);
        // throw error if not found
        if (!postToUpdate) {
            throw new CustomError("Post not found!", 400);
        }
        // check if the logged user is the creator of post
        if (postToUpdate.user.toString() !== userId.toString()){
            throw new CustomError("You can't change this post", 403);
        }
        // the new caption becomes the caption
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { visibility },
            { new: true }
        );

        // update post
        await postToUpdate.save();
        // Define cache key
        const cacheKey = `post_${userId}`;
        const cacheKey1 = `userpost_${userId}`;
        // clear cache of the user
        clearCache(cacheKey);
        clearCache(cacheKey1);

        res.status(200).json({message:"Post Updated successfully", post:updatedPost});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createJobController,
    updatePostController,
    updatePostVisibilityController,
}