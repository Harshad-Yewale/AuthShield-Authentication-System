import React, { createContext, useState, useEffect } from 'react'
import { AppConstants } from '../util/constants';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext= createContext();

export const AppContextProvider = (props)=>{

  const backendURL= AppConstants.BACKEND_URI;
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setIsLoading] = useState(true);

  const getUserData= async () =>{

      try{
          const response = await axios.get(backendURL+"/profile");

          if(response.status === 200){
            setUserData(response.data);
          }
          else{
            toast.error("unable to get user data");
          }
      }
      catch(error) {
          toast.error(error.message);
      }
  }

  const logout = async () =>{
    try{
        const response = await axios.post(`${backendURL}/logout`);

        if(response.status === 200){
          setIsLoggedIn(false);
          setUserData(null);
          toast.success("Logged out succussfully")
        }
    }
    catch(error) {
      toast.error(error.message);
    }
  }

  const checkAuth = async () => {
    try {
      const response =
        await axios.get(`${backendURL}/is-authenticated`);

      if (response.data === true) {
        setIsLoggedIn(true);
        await getUserData();
      }

    } catch (error) {
      setIsLoggedIn(false);
      setUserData(null);
    }
    finally{
      setIsLoading(false);
    }
  };


  useEffect(() => {
    checkAuth();
  }, []);


  const contextValue={
      backendURL,
      isLoggedIn,
      setIsLoggedIn,
      userData,
      setUserData,
      getUserData,
      loading,
      logout

  }

  return(
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  )
}
