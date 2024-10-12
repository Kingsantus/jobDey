const jwt = require('jsonwebtoken');
const { CustomError } = require('./error');


const verifyRefreshToken = (token) => {
    try {
        // Verify token synchronously
        const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        return payload; // Return the decoded payload if verification is successful
    } catch (error) {
        // If token is invalid, throw a custom error
        throw new CustomError("Token is not valid!", 403);
    }
};


module.exports = verifyRefreshToken;
