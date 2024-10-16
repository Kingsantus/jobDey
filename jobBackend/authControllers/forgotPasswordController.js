const { CustomError } = require('../middlewares/error');
const User = require('../models/Users');
const crypto = require('crypto');
const { sendPasswordResetEmail } = require('../mailutils/sendMailToResetPassword');

const forgotPasswordController = async (req, res, next) => {
    // get email of user from body
    const { email } = req.body;

    try {
        // validate if email is provided and is in valid format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!(email && emailPattern.test(email))) {
        throw new CustomError("Invalid email format", 400);
        }
        // check if the email exist and verified
        const user = await User.findOne({ email: email });
        // if the email don't exist 
        if (!(user && user.isVerified)){
            throw new CustomError("Email is not registerd", 404);
        }
        // generate reset token using crypto
        const resetToken = crypto.randomBytes(20).toString("hex")
        // reset token expires at 15 minutes
        const resetTokenExpiresAt = Date.now() + 20 * 60 * 1000; // 15 minute
        // add the information into the database
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        // save user
        await user.save();
        // url for change of password
        const url = `${process.env.APP_ORIGIN}/password/reset?code=${resetToken}&exp=${resetTokenExpiresAt}`
        console.log(url)
        // send email to user
        await sendPasswordResetEmail(user.email, url);

        res.status(200).json({ success: true, message: "Reset link has been sent to your email." });
    } catch (error) {
        next(error);
    }
};


module.exports = forgotPasswordController;