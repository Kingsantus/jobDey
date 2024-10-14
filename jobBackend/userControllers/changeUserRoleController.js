const { CustomError } = require('../middlewares/error');
const User = require('../models/Users');

const updateUserController = async (req, res, next) => {
    try {
        // Get update data from the request body
        const updateData = req.body;
        const userId = req.params.id;

        // Get the user ID from the verified token in the request
        const loggedId = req.userId;

        // Throw an error if no user ID is found
        if (!loggedId) {
            throw new CustomError("You have to login first", 401);
        }

        // Only allow updates to certain fields
        const allowedFields = ['role'];
        const filteredUpdateData = {};

        // Filter the updateData to include only allowed fields
        Object.keys(updateData).forEach((key) => {
            if (allowedFields.includes(key)) {
                filteredUpdateData[key] = updateData[key];
            }
        });

        // Check if there's any valid data to update
        if (Object.keys(filteredUpdateData).length === 0) {
            throw new CustomError("You can't update that!", 400);
        }

        // Find the logged-in user to check their role
        // const loggedUser = await User.findById(loggedId);
        // if (!loggedUser) {
        //     throw new CustomError("User not found", 404);
        // }
        // if (loggedUser.role !== 'admin') {
        //     throw new CustomError("You are not authorized", 403);
        // }

        // Find the user to update
        const userToUpdate = await User.findById(userId);
        if (!userToUpdate) {
            throw new CustomError('User not found', 404);
        }

        // Assign the filtered update data to the user
        Object.assign(userToUpdate, filteredUpdateData);

        // Save the updated user to the database
        await userToUpdate.save();

        // Send a successful response
        res.status(200).json({
            success: true,
            message: "User updated successfully!",
            user: {
                ...userToUpdate._doc,
                password: undefined, // Exclude sensitive fields
                email: undefined
            }
        });
    } catch (error) {
        next(error); // Pass the error to the error handler
    }
};

module.exports = updateUserController;