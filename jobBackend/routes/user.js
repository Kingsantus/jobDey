// initializing express
const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const getUserController = require('../userControllers/fetchUserController');
const getUserSessionsController = require('../userControllers/fetchUsersSessionController');
const deleteUserSessionsController = require('../userControllers/deleteUserSessionController');
const updateUserController = require('../userControllers/updateUserController');
const changeOldPasswordController = require('../userControllers/changeOldPasswordController');
const router = express.Router();

// Get the information of login user
router.get("/current", verifyToken, getUserController);

// GET THE SESSION OF THE LOGIN USER
router.get("/sessions", verifyToken, getUserSessionsController);

// UPDATE USER INFORMATION USER
router.put("/update", verifyToken, updateUserController);

// Change the PASSWORD OF THE USER
router.put("/change-password", verifyToken, changeOldPasswordController);

// Delete a user Sections
router.delete("/session/:id", verifyToken, deleteUserSessionsController);


module.exports = router;