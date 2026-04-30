import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);

  // dropdown states
  const [titleOption, setTitleOption] = useState("Software Engineer");
  const [companyOption, setCompanyOption] = useState("Google");

  const [customTitle, setCustomTitle] = useState("");
  const [customCompany, setCustomCompany] = useState("");

  const [status, setStatus] = useState("applied");

  const [search, setSearch] = useState("");

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ADD + UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalTitle =
      titleOption === "others" ? customTitle : titleOption;

    const finalCompany =
      companyOption === "others" ? customCompany : companyOption;

    try {
      if (editId) {
        await API.put(`/jobs/${editId}`, {
          title: finalTitle,
          company: finalCompany,
          status,
        });
      } else {
        await API.post("/jobs", {
          title: finalTitle,
          company: finalCompany,
          status,
        });
      }

      resetForm();
      fetchJobs();
    } catch (err) {
      console.log(err);
    }
  };

  const resetForm = () => {
    setEditId(null);
    setCustomTitle("");
    setCustomCompany("");
    setTitleOption("Software Engineer");
    setCompanyOption("Google");
    setStatus("applied");
  };

  const deleteJob = async (id) => {
    await API.delete(`/jobs/${id}`);
    fetchJobs();
  };

  const handleEdit = (job) => {
    setEditId(job._id);
    setTitleOption(job.title);
    setCompanyOption(job.company);
    setStatus(job.status);
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={page}>

      {/* SIDEBAR */}
      <div style={sidebar}>
        <h2>🚀 Job Tracker</h2>

        <p>📊 Dashboard</p>
        <p>📁 Jobs</p>

        <button style={logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div style={main}>

        {/* SEARCH */}
        <input
          style={searchBox}
          placeholder="🔍 Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* FORM */}
        <div style={card}>
          <h3>{editId ? "✏️ Edit Job" : "➕ Add Job"}</h3>

          <form onSubmit={handleSubmit}>

            {/* TITLE */}
            <label>Job Title</label>
            <select
              style={input}
              value={titleOption}
              onChange={(e) => setTitleOption(e.target.value)}
            >
              <option>Software Engineer</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>Full Stack Developer</option>
              <option>Data Analyst</option>
              <option value="others">Others</option>
            </select>

            {titleOption === "others" && (
              <input
                style={input}
                placeholder="Enter Job Title"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
              />
            )}

            {/* COMPANY */}
            <label>Company</label>
            <select
              style={input}
              value={companyOption}
              onChange={(e) => setCompanyOption(e.target.value)}
            >
              <option>Google</option>
              <option>Amazon</option>
              <option>Microsoft</option>
              <option>Meta</option>
              <option value="others">Others</option>
            </select>

            {companyOption === "others" && (
              <input
                style={input}
                placeholder="Enter Company Name"
                value={customCompany}
                onChange={(e) => setCustomCompany(e.target.value)}
              />
            )}

            {/* STATUS */}
            <select
              style={input}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>

            <button style={btn}>
              {editId ? "Update Job" : "Add Job"}
            </button>

          </form>
        </div>

        {/* JOB LIST */}
        <div style={grid}>
          {filteredJobs.map((job) => (
            <div key={job._id} style={jobCard}>

              <h4>{job.title}</h4>
              <p>{job.company}</p>
              <p>{job.status}</p>

              <div style={{ display: "flex", gap: 8 }}>
                <button style={editBtn} onClick={() => handleEdit(job)}>
                  Edit
                </button>

                <button style={deleteBtn} onClick={() => deleteJob(job._id)}>
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  display: "flex",
  fontFamily: "Arial",
  background: "#f4f6f8",
  minHeight: "100vh",
};

const sidebar = {
  width: 220,
  background: "#111827",
  color: "white",
  padding: 20,
};

const main = {
  flex: 1,
  padding: 20,
};

const searchBox = {
  width: "100%",
  padding: 10,
  marginBottom: 15,
  borderRadius: 6,
  border: "1px solid #ccc",
};

const card = {
  background: "white",
  padding: 20,
  borderRadius: 10,
  marginBottom: 20,
};

const input = {
  width: "100%",
  padding: 10,
  margin: "6px 0",
  borderRadius: 6,
  border: "1px solid #ccc",
};

const btn = {
  width: "100%",
  padding: 10,
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: 6,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: 15,
};

const jobCard = {
  background: "white",
  padding: 15,
  borderRadius: 10,
};

const editBtn = {
  background: "#f59e0b",
  color: "white",
  border: "none",
  padding: 6,
  borderRadius: 5,
};

const deleteBtn = {
  background: "red",
  color: "white",
  border: "none",
  padding: 6,
  borderRadius: 5,
};

const logoutBtn = {
  marginTop: 10,
  background: "red",
  color: "white",
  border: "none",
  padding: 8,
  borderRadius: 5,
};