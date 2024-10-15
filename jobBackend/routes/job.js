// initializing express
const express = require('express');
const { createJobController } = require('../jobsControllers/createJobController');
const { getJobsController, getAllJobssForAdminController, getAPostController } = require('../jobsControllers/fetchJobsController');
const deleteJobController = require('../jobsControllers/deleteJobController');
const verifyToken = require('../middlewares/verifyToken');
const updateJobController = require('../jobsControllers/updateJobController');
const router = express.Router();

// create a post for job
router.post("/create", createJobController);

// get post that are true
router.get("/all", getJobsController);

// get all post for admin
router.get("/all-jobs", getAllJobssForAdminController);

// get all post for admin
router.get("/all-jobs/:postId", verifyToken, getAPostController);

// delete a post
router.delete("/delete/:postId", verifyToken, deleteJobController);

// Update Job
router.put("/update/:jobId", verifyToken, updateJobController);


module.exports = router;