// initializing express
const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const { getUserController, getAUserController, getAllUserController, } = require('../userControllers/fetchUserController');
const getUserSessionsController = require('../userControllers/fetchUsersSessionController');
const deleteUserSessionsController = require('../userControllers/deleteUserSessionController');
const updateUserController = require('../userControllers/updateUserController');
const changeOldPasswordController = require('../userControllers/changeOldPasswordController');
const changeUserRoleController = require('../userControllers/changeUserRoleController');
const router = express.Router();

// Get the information of login user
router.get("/current", verifyToken, getUserController);

// GET THE SESSION OF THE LOGIN USER
router.get("/sessions", verifyToken, getUserSessionsController);

// UPDATE USER INFORMATION USER
router.put("/update", verifyToken, updateUserController);

// UPDATE USER TO ADMIN
router.put("/update-admin/:id", verifyToken, changeUserRoleController);

// Change the PASSWORD OF THE USER
router.put("/change-password", verifyToken, changeOldPasswordController);

// Delete a user Sections
router.delete("/session/:id", verifyToken, deleteUserSessionsController);

// Get a user
router.get("/user/:userId", verifyToken, getAUserController);

// Get all user
router.get("/users/", verifyToken, getAllUserController);


module.exports = router;