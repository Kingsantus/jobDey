// initializing express
const express = require('express');
const registerContoller = require('../authControllers/registerController');
const loginController = require('../authControllers/loginController');
const { verifyEmailController } = require('../authControllers/verifyAccountController');
const router = express.Router();


// Register
router.post("/register", registerContoller);

// VERIFY USER AFTER REGISTRATION
router.get("/verify-email", verifyEmailController);

// Login
router.post("/login", loginController);


module.exports = router;