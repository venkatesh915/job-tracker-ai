const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: String,
    company: String,
    status: {
      type: String,
      default: "applied"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
