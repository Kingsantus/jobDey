const { CustomError } = require('../middlewares/error');
const Session = require('../models/Session');


const deleteUserSessionsController = async (req, res, next) => {
    try {
        // get sessionId fro params
        const sessionId = req.params.id;
        // get the id of user from the verifiedToken of user in cookie
        const userId = req.userId;
        // throw error if no user Id
        if (!userId) {
            throw new CustomError("You have to login first", 401);
        }
        if (!sessionId) {
            throw new CustomError("Session Id is missing", 400);
        }
        // Find and delete the session in the database
        const deletedSession = await Session.findOneAndDelete({
            user: userId,
            _id: sessionId
        });

        // If no session was found and deleted, respond with an error
        if (!deletedSession) {
            throw new CustomError("Session not found or you don't have permission to delete it", 404);
        }

        // Send the response with the session list
        res.status(200).json({message:"Session Deleted Successfull"});
    } catch(error) {
        next(error);
    }
};

module.exports = deleteUserSessionsController;