const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const { CustomError } = require("../middlewares/error");
const { sendWelcomeEmail } = require('../mailutils/sendMailToVerify');
// const { sendWelcomeEmail } = require('../mailutils/sendMailToVerify');

const verifyEmailController = async (req, res, next) => {
    // get the token sent to user from body
    const { code } = req.params;
    try {
        // check if the token is up to six and not empty or throw error
        if (!code) {
            throw new CustomError("The token is not complete", 400);
        }
        // decode code
        const decoded_data = jwt.verify(code, process.env.JWT_SECRET, algorithms=["HS256"])
        // getting the email from decoded_data
        const email = decoded_data.email;
        // check if any user has the email
        const user = await User.findOne({ email });
        // throw error if no user found or expires
        if (!user) {
            throw new CustomError("Invalid token or expired token, Register again in an 1 hour", 400);
        }
        // if it is still verified and valid change verification to true
        user.isVerified = true;
        // save user
        await user.save();

        // send a welcome email
        await sendWelcomeEmail(user.email, user.username);

        res.status(200).json({message:"Successfully verified"});


    } catch(error) {
        next(error);
    }
}

module.exports = { verifyEmailController };