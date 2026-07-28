import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function PublicRoute({ children }) {

    const {isLoggedIn} = useContext(AppContext);
    
    return isLoggedIn
     ? <Navigate to="/" replace /> 
     : children;
}

export default PublicRoute;