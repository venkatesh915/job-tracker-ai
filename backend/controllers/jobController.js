const Job = require("../models/Job");

// ✅ GET ALL JOBS (IMPORTANT: returns array)
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ ADD JOB
exports.addJob = async (req, res) => {
  try {
    const { title, company, status } = req.body;

    const job = new Job({
      title,
      company,
      status,
      userId: req.user.id,
    });

    await job.save();

    res.status(201).json(job);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ DELETE JOB
exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ msg: "Job deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};