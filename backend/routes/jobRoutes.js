const express = require("express");
const router = express.Router();

const {
  addJob,
  getJobs,
  updateJob,
  deleteJob
} = require("../controllers/jobController");

// CREATE JOB
router.post("/add", addJob);

// GET ALL JOBS
router.get("/", getJobs);

// UPDATE JOB
router.put("/:id", updateJob);

// DELETE JOB
router.delete("/:id", deleteJob);

module.exports = router;
