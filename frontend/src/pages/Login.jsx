import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div style={page}>

      {/* LOGIN BOX */}
      <div style={card}>
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            style={input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            style={input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={btn}>Login</button>
        </form>

        <p style={{ marginTop: 10 }}>
          No account? <Link to="/register">Register</Link>
        </p>
      </div>

      {/* PROFILE BELOW (FIXED) */}
      <div style={profileBox}>
        <h3>👤 Boddu Venkateswara Rao</h3>
        <p>📧 eswareswar9143@gmail.com</p>

        <p>🔗 Links</p>

        <a href="https://www.linkedin.com/in/venkateswara-rao-boddu-747474302" target="_blank" style={link}>
          🔷 LinkedIn
        </a>

        <a href="https://github.com/venkatesh915" target="_blank" style={link}>
          💻 GitHub
        </a>

        <a href="https://mynewportfolio-rust.vercel.app/" target="_blank" style={link}>
          🌐 Portfolio
        </a>
      </div>

    </div>
  );
}

/* ===== STYLES ===== */

const page = {
  display: "flex",
  flexDirection: "column",   // ⭐ IMPORTANT FIX
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  background: "#f4f6f8",
  fontFamily: "Arial",
  gap: 20,
};

const card = {
  background: "white",
  padding: 30,
  borderRadius: 10,
  width: 300,
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
};

const profileBox = {
  background: "#111827",
  color: "white",
  padding: 20,
  borderRadius: 10,
  width: 300,
  textAlign: "center",
};

const input = {
  width: "100%",
  padding: 10,
  marginTop: 10,
  borderRadius: 6,
  border: "1px solid #ccc",
};

const btn = {
  width: "100%",
  padding: 10,
  marginTop: 15,
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: 6,
};

const link = {
  display: "block",
  color: "#60a5fa",
  marginTop: 6,
  textDecoration: "none",
};