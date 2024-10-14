const bcrypt = require('bcrypt');
const User = require('../models/Users');
const { CustomError } = require('../middlewares/error');

const changeOldPasswordController = async (req, res, next) => {
    const { oldPassword, password, confirmPassword } = req.body;
    try {
        const userId = req.userId;
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }

        if (!(oldPassword && password && confirmPassword)) {
            throw new CustomError("Password is empty", 400);
        }

        if (password !== confirmPassword) {
            throw new CustomError("Password not the same", 400);
        }

        if (oldPassword === password) {
            throw new CustomError("New password cannot be the same as the old password", 400);
        }

        if (password.length < 8) {
            throw new CustomError("Password must be at least 8 characters long", 400);
        }

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(password)) {
            throw new CustomError("Password should contain upper&lower case, num, special char", 400);
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new CustomError("Token expired or invalid, request again", 404);
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            throw new CustomError("Old password is incorrect", 400);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);

        user.password = hashedPassword;
        await user.save();

        res.clearCookie("accessToken")
           .clearCookie("refreshToken", { path: "/api/v1/auth/refresh" })
           .status(200)
           .json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        next(error);
    }
}

module.exports = changeOldPasswordController;