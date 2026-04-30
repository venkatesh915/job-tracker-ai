const express = require("express");
const router = express.Router();

const {
  createJob,
  getJobs,
  deleteJob,
  updateJob,
} = require("../controllers/jobController");

const authMiddleware = require("../middleware/authMiddleware");

// protected routes
router.post("/", authMiddleware, createJob);
router.get("/", authMiddleware, getJobs);
router.delete("/:id", authMiddleware, deleteJob);
router.put("/:id", authMiddleware, updateJob);

module.exports = router;