import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import './LandingPage.css'
import { useState } from "react";

const LandingPageComponent = () => {
  const navigate=useNavigate();
  const isNewUser=true;

  return (
    <div className="landing-page-container">

      {/* Left Section */}

      <div className="landing-left-section">

        <h3 className="landing-header">
          Welcome To
        </h3>

        <span className="landing-logo-text">
          Auth
          <span className="landing-logo-accent">
            Shield
          </span>
        </span>

        <h4 className="landing-greetings">
          Hey Developer 👋
        </h4>

        <h4 className="landing-description">
          Secure authentication made simple, modern, and reliable for today’s digital world.
        </h4>

        <button className="get-started-button" onClick={()=>navigate('/login',{state: {isNewUser:true}}) }> Get Started</button>

      </div>

      {/* Right Section */}

      <div className="landing-right-section">

        <img
          src={assets.landingpageIcon}
          alt="landing page image"
          className="landing-page-image"
        />

      </div>

    </div>
  )
}

export default LandingPageComponent;