import React, { useContext,useState} from "react";
import "./Login.css";
import axios from "axios";
import { assets } from "../../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

function Login() {

  const navigate = useNavigate();
  const location = useLocation();

  const {
    backendURL,
    setIsLoggedIn,
    setUserData
  } = useContext(AppContext);

  // Login / Signup Toggle
  const [isLogin, setIsLogin] = useState(
    !location.state?.isNewUser
  );

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Loading State
  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      // LOGIN
      if (isLogin) {

        const response = await axios.post(
          `${backendURL}/login`,
          {
            email: formData.email,
            password: formData.password,
          }
        );

        if (response.data.success) {

          setIsLoggedIn(true);

          setUserData(response.data.user);

          navigate("/");
        }

      }

      // SIGNUP
      else {

        // Password Validation
        if (
          formData.password !==
          formData.confirmPassword
        ) {

          alert("Passwords do not match");

          return;
        }

        const response = await axios.post(
          `${backendURL}/register`,
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }
        );

        if (response.data.success) {

          setIsLoggedIn(true);

          setUserData(response.data.user);

          navigate('/');
        }
      }

    } catch (error) {

      console.log(error);

      // Backend Validation Errors
      if (error.response?.data?.errors) {

        const errors = error.response.data.errors;

        const firstError = Object.values(errors)[0];

        alert(firstError);

      }

      // General Message
      else {

        alert(
          error.response?.data?.message ||
          "Something went wrong"
        );
      }
    }finally{
      setLoading(false);
    }
  };

  return (

    <div className="login-page">

      {/* Left Section */}
      <div className="login-left-section">

        <div className="login-container">

          <h1 className="login-title">
            {
              isLogin
                ? "Welcome Back"
                : "Create Account"
            }
          </h1>

          <p className="login-subtitle">
            {
              isLogin
                ? "Please login to your account"
                : "Create your account to continue"
            }
          </p>

          <form
            onSubmit={handleSubmit}
            className="login-form"
          >

            {/* Name */}
            {
              !isLogin && (
                <div className="input-group">

                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />

                </div>
              )
            }

            {/* Email */}
            <div className="input-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />

            </div>

            {/* Password */}
            <div className="input-group">

              <label>
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />

            </div>

            {/* Confirm Password */}
            {
              !isLogin && (
                <div className="input-group">

                  <label>
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                  />

                </div>
              )
            }

            {/* Forgot Password */}
            {
              isLogin && (
                <div className="forgot-password">

                  <button type="button">
                    Forgot Password?
                  </button>

                </div>
              )
            }

            {/* Submit Button */}
            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >

              {
                loading
                  ? "Please Wait..."
                  : (
                    isLogin
                      ? "Login"
                      : "Create Account"
                  )
              }

            </button>

          </form>

          {/* Toggle */}
          <p className="signup-text">

            {
              isLogin
                ? "Don't have an account?"
                : "Already have an account?"
            }

            {" "}

            <span
              onClick={() => setIsLogin(!isLogin)}
            >
              {
                isLogin
                  ? "Sign Up"
                  : "Login"
              }
            </span>

          </p>

        </div>
      </div>

      {/* Right Section */}
      <div className="login-right-section">

        <img
          src={assets.landingpageIcon}
          alt="login page"
          className="login-page-image"
        />

        <h2>
          {
            isLogin
              ? "Welcome to Our Platform"
              : "Join Our Platform"
          }
        </h2>

        <p>
          {
            isLogin
              ? "Securely manage your account and access all features in one place."
              : "Create your account and start exploring amazing features today."
          }
        </p>

      </div>
    </div>
  );
}

export default Login;