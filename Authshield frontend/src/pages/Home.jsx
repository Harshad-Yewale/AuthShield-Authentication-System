import React from 'react'
import Menubar from '../components/menubar/Menubar'
import LandingPageComponent from '../components/header/LandingPageComponent'

function Home() {
  return (
    <div className='homepage'>
    <Menubar />
    <div className="body">
      <LandingPageComponent/>
    </div>
    </div>
  )
}

export default Home
