const { CustomError } = require('../middlewares/error');
const User = require('../models/Users');
const Job = require('../models/Jobs')

const updateJobController = async (req, res, next) => {
    try {
        // Get update data from request body
        const updateData = req.body;
        
        // Get jobId from request params
        const { jobId } = req.params;
        
        // Get the userId from the verified token of the user in the request
        const userId = req.userId;
        
        // Throw error if no userId is found
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }

        // Find the user by userId
        const user = await User.findById(userId);

        // Check if the user exists
        if (!user) {
            throw new CustomError('User not found', 404);
        }

        // Ensure that only admin users can update the job
        if (user.role !== 'admin') {
            throw new CustomError('Permission denied. Only admins can update jobs.', 403);
        }

        // Find the job by jobId
        const job = await Job.findById(jobId);

        // If no job is found, throw an error
        if (!job) {
            throw new CustomError('Job not found', 404);
        }

        // Assign the updated data to the job object
        Object.assign(job, updateData);
        
        // Save the updated job to the database
        await job.save();

        // Send a success response with the updated job
        res.status(200).json({ success: true, message: "Job updated successfully!", job });

    } catch (error) {
        next(error);
    }
};

module.exports = updateJobController;