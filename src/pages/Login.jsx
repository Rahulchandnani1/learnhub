import {Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import api from "../services/api";
import { useState } from "react";
const Login = () => {
    const navigate = useNavigate();
    const [email,setemail]=useState("");
        const [password,setpassword]=useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
const response = await api.post("/auth/login", {

    email,

    password

});
localStorage.setItem(
  "accessToken",
  response.data.accessToken
);

localStorage.setItem(
  "refreshToken",
  response.data.refreshToken
);

localStorage.setItem(
  "user",
  JSON.stringify(response.data.user)
);
if (response.data.user.role === "Admin") {

  navigate("/admin/dashboard");

} else {

  navigate("/dashboard");

}
    };

    return (
        <div className="login-container">
            <div className="login-card">

                <h1>LearnHub</h1>

                <p>Welcome Back 👋</p>

                <form onSubmit={handleLogin}>

                    <input
                        className="login-input"
                        type="email"
                        value={email}
                        onChange={(e)=>setemail(e.target.value)}
                        placeholder="Email Address"
                    />

                    <input
                        className="login-input"
                        type="password"
                        value={password}
                        onChange={(e)=>setpassword(e.target.value)}
                        placeholder="Password"
                    />

                    <button
                        className="login-btn"
                        type="submit"
                    >
                        Login
                    </button>

                </form>
                <div className="register-link">
  <Link to="/forgot-password">
    Forgot Password?
  </Link>
</div>

                <div className="register-link">

                    Don't have an account?

                    <Link to="/register">
                        Register
                    </Link>

                </div>

            </div>
        </div>
    );
};

export default Login;