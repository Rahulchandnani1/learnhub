import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/login.css";

const VerifyResetOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email =
    location.state?.email || localStorage.getItem("resetEmail");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/auth/verify-reset-otp", {
        email,
        otp,
      });

      alert(response.data.message);

      navigate("/reset-password", {
        state: {
          email,
        },
      });
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="login-container">
        <div className="login-card">
          <h2>Session Expired</h2>
          <p>Please start the forgot password process again.</p>

          <button
            className="login-btn"
            onClick={() => navigate("/forgot-password")}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Verify OTP</h1>

        <p>OTP sent to</p>

        <strong>{email}</strong>

        <form onSubmit={handleVerifyOTP}>
          <input
            className="login-input"
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            required
          />

          <button
            className="login-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyResetOTP;