import React, { useContext, useEffect, useRef, useState } from 'react';
import { assets } from '../../assets/assets';
import { LogIn, LogOut, User } from 'lucide-react';
import './Menubar.css';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

function Menubar() {

  const navigate = useNavigate();

  const {
    userData,
    isLoggedIn,
    setIsLoggedIn,
    setUserData,
    logout
  } = useContext(AppContext);

  const [showDropdown, setShowDropdown] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
      const handleClickOutside = (event) => {
          if (
              menuRef.current &&
              !menuRef.current.contains(event.target)
          ) {
              setShowDropdown(false);
          }
      };

      document.addEventListener("click", handleClickOutside);

      return () =>
          document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="Navbar">

      {/* Left Section */}

      <div className="left-section">

        <img
          src={assets.authshield}
          alt="Authshield Logo"
        />

        <span className="logo-text">
          Auth
          <span className="lego-text-decent">
            Shield
          </span>
        </span>

      </div>

      {/* Right Section */}

      <div className="right-section">

        {
          isLoggedIn ? (

            <div
              className="profile-menu"
              ref={menuRef}
            >

              <div className="profile-avatar"
               onClick={() => setShowDropdown(prev => !prev)}
               >

                {
                  userData?.name
                    ?.charAt(0)
                    ?.toUpperCase()
                }

              </div>

              {
                showDropdown && (

                  <div className="profile-dropdown">

                    <button
                      onClick={logout}
                    >
                      <LogOut size={18} />
                      Logout
                    </button>

                  </div>

                )
              }

            </div>

          ) : (

            <button
              className="loginButton"
              onClick={() =>
                navigate('/login')
              }
            >
              Login
              <LogIn />
            </button>

          )
        }

      </div>

    </nav>
  );
}

export default Menubar;