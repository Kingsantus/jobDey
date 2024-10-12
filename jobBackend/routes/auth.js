// initializing express
const express = require('express');
const registerContoller = require('../authControllers/registerController');
const loginController = require('../authControllers/loginController');
const { verifyEmailController } = require('../authControllers/verifyAccountController');
const logoutController = require('../authControllers/logoutController');
const verifyToken = require('../middlewares/verifyToken');
const refreshController = require('../authControllers/refreshController');
const forgotPasswordController = require('../authControllers/forgotPasswordController');
const changePasswordController = require('../authControllers/changePasswordController');
const router = express.Router();


// Register
router.post("/register", registerContoller);

// VERIFY USER AFTER REGISTRATION
router.get("/verify-email/:code", verifyEmailController);

// Login
router.post("/login", loginController);

// Logout
router.get("/logout", logoutController);

// Refresh Token 
router.get("/refresh", refreshController);

// Forgot Password
router.post("/forgot-password", forgotPasswordController);

// Change Password
router.post("/reset-password/", changePasswordController);


module.exports = router;