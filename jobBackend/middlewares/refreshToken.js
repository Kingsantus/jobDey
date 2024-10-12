const jwt = require('jsonwebtoken');
const { CustomError } = require('./error');

// sign access token & refresh token
const refreshToken = (sessionId) => {
    try {
        return jwt.sign( { sessionId } ,
            process.env.JWT_REFRESH_SECRET,
            {
                audience:["user"],
                expiresIn: "1d"
        })
    } catch (error) {
        throw new CustomError("Session not accessed");
    }    
}

// sign access token & refresh token
const accessToken = (userId, sessionId) => {
    try {
        return jwt.sign( { userId, sessionId },
            process.env.JWT_SECRET,
            {
                audience:["user"],
                expiresIn: "15m"
        })
    } catch (error) {
        throw new CustomError("Session not accessed");
    }    
}

module.exports = {
    refreshToken,
    accessToken
}