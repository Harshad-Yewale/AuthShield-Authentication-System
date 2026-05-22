import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "./HomePage.css";
import { Navigate, useNavigate } from "react-router-dom";

function HomePage() {

  const { userData } = useContext(AppContext);
  const navigate = useNavigate();
  console.log(userData);

  return (
    <div className="home-container">

      {/* Welcome Banner */}

      <div className="welcome-card">

        <div>

          <h3 className="welcome-title">
            Welcome Back 👋
          </h3>

          <h1 className="welcome-name">
            {userData?.name || "Developer"}
          </h1>

          <p className="welcome-description">
            Your account is authenticated and protected by JWT based
            authentication. Manage your profile and security settings
            from your dashboard.
          </p>

        </div>

        <div className="account-status">

          <span className="status-badge active">
            Active Session
          </span>

          <span
            className={
              userData?.isAccountVerified

                ? "status-badge verified"
                : "status-badge pending"
            }
          >
            {
              userData?.isAccountVerified

                ? "Email Verified"
                : "Verification Pending"
            }
          </span>

        </div>

      </div>

      {/* Status Cards */}

      <div className="status-grid">

        <div className="status-card">

          <div className="status-icon success">
            ✓
          </div>

          <h4>JWT Active</h4>

          <p>
            Secure authentication token validated.
          </p>

        </div>

        <div className="status-card">

          <div className="status-icon info">
            ✓
          </div>

          <h4>Profile Loaded</h4>

          <p>
            User profile fetched successfully.
          </p>

        </div>

        <div className="status-card">

          <div
            className={
              userData?.isAccountVerified

                ? "status-icon success"
                : "status-icon warning"
            }
          >
            {
              userData?.isAccountVerified
                ? "✓"
                : "!"
            }
          </div>

          <h4>Email Verification</h4>

          <p>
            {
              userData?.isAccountVerified
                ? "Your account is verified."
                : "Verification required."
            }
          </p>

        </div>

      </div>

      {/* Profile Section */}

      <div className="dashboard-grid">

        {
          userData?.isAccountVerified ? (

            <div className="profile-card">

              <h2 className="card-title">
                Profile Details
              </h2>

              <div className="profile-row">
                <span>Full Name</span>
                <p>{userData?.name}</p>
              </div>

              <div className="profile-row">
                <span>Email Address</span>
                <p>{userData?.email}</p>
              </div>

              <div className="profile-row">
                <span>User ID</span>
                <p>{userData?.userId}</p>
              </div>

              <div className="profile-row">
                <span>Account Status</span>
                <p>Verified ✅</p>
              </div>

            </div>

          ) : (

            <div className="profile-card verification-required">

              <div className="verification-emoji">
                🔐
              </div>

              <h2>Email Verification Required</h2>

              <p>
                You're one step away from unlocking your complete
                AuthShield experience.
              </p>

              <div className="verification-features">

                <div>✨ Access Profile Dashboard</div>

                <div>🛡️ Enhanced Account Security</div>

                <div>🔑 Secure Password Recovery</div>

                <div>🚀 Full Platform Access</div>

              </div>

            </div>

          )
        }

        

        <div className="action-card">

          <h2 className="card-title">
            Quick Actions
          </h2>
            { !userData?.isAccountVerified &&
              <button className="action-btn verify-btn" onClick={()=>navigate('/verify-email')}>
                Verify Email
              </button>
            } 
            { userData?.isAccountVerified &&
              <button className="action-btn reset-btn" onClick={()=>navigate('/reset-password')}>
                reset password
              </button>  
            }         

        </div>
      </div>

      </div>
  );
}

export default HomePage;