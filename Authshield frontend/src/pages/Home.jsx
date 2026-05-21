import React, { useContext } from 'react';
import Menubar from '../components/menubar/Menubar';
import { AppContext } from '../context/AppContext';
import HomePage from '../components/mainpagecomponants/HomePageComponent';
import LandingPage from '../components/mainpagecomponants/LandingPageComponent';
import LoadingSpinner from '../components/loading spinner/LoadingSpinner';

function Home() {

  const { loading ,userData } = useContext(AppContext);

   if (loading) {
    return <LoadingSpinner />;
  }
  return (


    <div className="homepage">
      <Menubar />
      <div className="body">
      {
        userData
        ? <HomePage />
        : <LandingPage />
      }
      </div>
    </div>
  );
}

export default Home;