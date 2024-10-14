const { getAccessTokenCookieOptions, getRefreshTokenCookieOptions } = require("../middlewares/cookies");
const { CustomError } = require("../middlewares/error");
const { accessToken, refreshToken } = require("../middlewares/refreshToken");
const verifyRefreshToken = require("../middlewares/verifyRefreshToken");
const Session = require("../models/Session");

const refreshController = async (req, res, next) => {
    // get the refresh token from login
    const refreshTokenNew = req.cookies.refreshToken;
    try {
        if (!refreshTokenNew) {
            throw new CustomError("You have to login again", 403);
        }
        const payload = verifyRefreshToken(refreshTokenNew);
        // throw error if payload did not return
        if (!payload) {
            throw new CustomError("Invalid application", 401);
        }
        // get session properties from the code
        const session = await Session.findById(payload.sessionId);
        const now = Date.now();
        // throw error if session Id don't exist again
        if (!session || now > session.expiresAt.getTime()) {
            throw new CustomError("Session Expired", 401);
        }
        const oneHour = 60 * 60 * 1000;
        // refresh session if it expires in the next 1 hour
        const sessionNeedsRefresh = session.expiresAt.getTime() - now <= oneHour;
        if (sessionNeedsRefresh) {
            session.expiresAt = now + 24 * 60 * 60 * 1000;
            await session.save();
        }
        // after extending the time get a new refresh token
        const newRefreshToken = sessionNeedsRefresh ? refreshToken(session._id) : undefined;
        // set up a new refresh token
        const accessTokenGenerated = accessToken( session.user, session._id );
        // Set up the access token in the response cookies
        let response = res.cookie("accessToken", accessTokenGenerated, getAccessTokenCookieOptions());

        // If a new refresh token was generated, set it in the cookies as well
        if (newRefreshToken) {
            response = response.cookie("refreshToken", newRefreshToken, getRefreshTokenCookieOptions());
        }

        // Send the response with a success message
        response.status(200).json({ success: true, message: "Access token refreshed" });
    } catch(error) {
        next(error);
    }
}


module.exports = refreshController;