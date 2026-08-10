import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/login.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleRegister = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await api.post("/auth/register", formData);

    localStorage.setItem("pendingEmail", formData.email);

    alert(response.data.message);

    navigate("/verify-otp", {
      state: {
        email: formData.email,
      },
    });
  } catch (error) {
    alert(error.response?.data?.message || "Registration Failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>LearnHub</h1>

        <p>Create your account 🚀</p>

        <form onSubmit={handleRegister}>
          <input
            className="login-input"
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            className="login-input"
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            className="login-input"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            className="login-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="register-link">
          Already have an account?{" "}
          <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;