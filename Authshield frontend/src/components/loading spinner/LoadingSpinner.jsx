import React from "react";
import "./LoadingSpinner.css";

function LoadingSpinner() {
  return (

    <div className="loading-container">

      <div className="spinner-wrapper">

        <div className="spinner"></div>

        <h2 className="loading-title">
          AuthShield
        </h2>

        <p className="loading-text">
          Verifying your secure session...
        </p>

      </div>

    </div>

  );
}

export default LoadingSpinner;