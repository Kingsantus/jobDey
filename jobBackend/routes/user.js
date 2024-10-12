// initializing express
const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const getUserController = require('../userControllers/fetchUserController');
const router = express.Router();

router.get("/user", verifyToken, getUserController)


module.exports = router;