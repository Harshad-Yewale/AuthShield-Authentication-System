import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Toast } from "bootstrap/dist/js/bootstrap.bundle";
import { toast } from "react-toastify";

function ProtectedRoute({ children }) {

    const { isLoggedIn } = useContext(AppContext);

    return isLoggedIn
        ? children
        : <Navigate to="/login" replace />;
}

export default ProtectedRoute;