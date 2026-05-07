import React from 'react'
import { assets } from '../../assets/assets'
import { LogIn } from 'lucide-react';
import './Menubar.css'
import { useNavigate } from 'react-router-dom';

function Menubar() {
  const navigate=useNavigate();
  const isNewUser=false;
  return (
    <div>
      <nav className='Navbar'>
        <div className="left-section">
        <img src={assets.authshield} alt="Authshield Logo" />
        <span className='logo-text'>
          Auth<span className='lego-text-decent'>Shield</span>
        </span>
        </div>
        <div className="right-section">
          <button className="loginButton" onClick={()=>navigate('/login',{state:false})}>
            Login <LogIn />
          </button>
        </div>

      </nav>
    </div>
  )
}

export default Menubar
