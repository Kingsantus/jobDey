const { CustomError } = require('../middlewares/error');
const Session = require('../models/Session');


const getUserSessionsController = async (req, res, next) => {
    try {
        // get the session id from the verification of user in cookie
        const sessionId = req.sessionId;
        // get the id of user from the verifiedToken of user in cookie
        const userId = req.userId;
        // throw error if no user Id
        if (!userId || !sessionId) {
            throw new CustomError("You have to login first", 401);
        }
        // get sessions of user from database
        const sessions = await Session.find({
            user:userId,
            expiresAt: { $gt: new Date() }
        },
        {
            _id: 1, userAgent: 1, createdAt: 1
        },

        {
            sort: { createdAt: -1 }
        });
         // Map through the sessions to mark the current session
         const sessionList = sessions.map((session) => ({
            ...session.toObject(),
            isCurrent: session._id.toString() === sessionId,  // Mark current session
        }));

        // Send the response with the session list
        res.status(200).json({
            sessions: sessionList,
        });
    } catch(error) {
        next(error);
    }
};

module.exports = getUserSessionsController;