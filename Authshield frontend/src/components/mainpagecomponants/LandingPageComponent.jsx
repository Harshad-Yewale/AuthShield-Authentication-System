import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./LandingPage.css";

const LandingPage = () => {

  const navigate = useNavigate();

  return (
    <div className="landing-page">

      {/* Hero Section */}

      <section className="hero-section">

        <div className="hero-left">

          <span className="hero-tag">
            🔐 Secure Authentication Platform
          </span>

          <h1 className="hero-title">
            Enterprise Authentication
            <br />
            <span>Made Simple</span>
          </h1>

          <p className="hero-description">
            Build secure applications with JWT authentication,
            email verification, password recovery, protected routes,
            and enterprise-grade security powered by Spring Boot.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() =>
                navigate("/login", {
                  state: { isNewUser: true }
                })
              }
            >
              Get Started
            </button>

            <button className="secondary-btn">
              Learn More
            </button>

          </div>

          <div className="hero-highlights">

            <div>✓ JWT Authentication</div>

            <div>✓ Email Verification</div>

            <div>✓ Secure Sessions</div>

          </div>

        </div>

        <div className="hero-right">

          <img
            src={assets.landingpageIcon}
            alt="AuthShield"
            className="hero-image"
          />

        </div>

      </section>

      {/* Features */}

      <section className="features-section">

        <h2 className="section-title">
          Everything You Need For Authentication
        </h2>

        <div className="features-grid">

          <div className="feature-card">

            <div className="feature-icon">
              🔐
            </div>

            <h3>JWT Authentication</h3>

            <p>
              Secure token-based authentication with
              HttpOnly cookies.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              ✉️
            </div>

            <h3>Email Verification</h3>

            <p>
              Verify user accounts securely using OTP
              verification.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              🔄
            </div>

            <h3>Password Recovery</h3>

            <p>
              Allow users to recover access safely using
              reset OTPs.
            </p>

          </div>

        </div>

      </section>

      {/* Security Section */}

      <section className="security-section">

        <div className="security-card">

          <h2>
            Why Choose AuthShield?
          </h2>

          <ul>

            <li>
              ✓ Spring Security Integration
            </li>

            <li>
              ✓ JWT + HttpOnly Cookie Security
            </li>

            <li>
              ✓ Protected Backend Routes
            </li>

            <li>
              ✓ Secure Password Encryption
            </li>

            <li>
              ✓ Email Verification & Recovery
            </li>

          </ul>

        </div>

      </section>

      {/* CTA */}

      <section className="cta-section">

        <h2>
          Ready To Secure Your Application?
        </h2>

        <p>
          Get started with modern authentication in minutes.
        </p>

        <button
          className="primary-btn"
          onClick={() =>
            navigate("/login", {
              state: { isNewUser: true }
            })
          }
        >
          Start Now
        </button>

      </section>

    </div>
  );
};

export default LandingPage;