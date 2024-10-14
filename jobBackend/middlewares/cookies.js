const { CookieOptions, Response } = require('express');

const secure = process.env.NODE_ENV !== "development";

const defaults = {
    sameSite: "strict",
    httpOnly: true,
    secure
};

const getAccessTokenCookieOptions = () => {
    return {
        ...defaults,
        maxAge: 15 * 60 * 1000 // Expires in 15 minutes
    };
};

const getRefreshTokenCookieOptions = () => {
    return {
        ...defaults,
        maxAge: 24 * 60 * 60 * 1000, // Expires in 24 hours
        path: "/api/v1/auth/refresh"
    };
};

const setAuthCookies = (res, accessToken, refreshToken) => {
    res
      .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
      .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());
    
    return res;
};

module.exports = {
    setAuthCookies,
    getAccessTokenCookieOptions,
    getRefreshTokenCookieOptions
};