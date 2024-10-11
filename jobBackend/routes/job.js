// initializing express
const express = require('express');
const { createJobController } = require('../jobsControllers/createJobController');
const { getJobsController, getAllJobssForAdminController } = require('../jobsControllers/fetchJobsController');
const deleteJobController = require('../jobsControllers/deleteJobController');
const router = express.Router();

// create a post for job
router.post("/create", createJobController);

// get post that are true
router.get("/all", getJobsController);

// get all post for admin
router.get("/all-jobs", getAllJobssForAdminController);

// delete a post
router.get("/delete", deleteJobController);


module.exports = router;