const User = require('../models/User');
const { CustomError } = require('../middlewares/error');


const uploadProfilePictureController = async (req, res, next) => {
    try {
        // get the image url of the file uploaded in cloudinary
        const imageUrl = req.imageUrl
        // check if cloudinary was able to upload and get url
        if (!imageUrl) {
            throw new CustomError("Image was not uploaded", 404);
        }
        // get the id of user from the verifiedToken of user in cookie
        const logId = req.userId;
        // throw error if no user Id
        if (!logId) {
            throw new CustomError("You have to login first", 401);
        }
        // check if user exist
        const user = await User.findById(logId);
        // if the user not found throw error
        if (!user) {
            throw new CustomError("User not found", 401);
        }
        // throw error if user is not verified
        if (!user.isVerified){
            throw new CustomError("User does not exist", 403);
        }
        // get the update the user object using the userId
        // updating only the generated file url in the file
        // new:true ensures it can create as many
        await User.findByIdAndUpdate(logId, {profilePicture:imageUrl},{new:true});
        
        res.status(200).json({message:"Profile picture updated successfully"});

    } catch (error) {
        next(error);
    }
}