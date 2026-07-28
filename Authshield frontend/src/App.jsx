import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";

import Home from "./pages/Home";
import Login from "./pages/login/Login";
import ForgotPassword from "./pages/forgot password/ForgotPassword";
import EmailVerify from "./pages/email verify/EmailVerify";
import ResetPassword from "./pages/reset password/ResetPassword";

import ProtectedRoute from "./util/ProtectedRoute";
import PublicRoute from "./util/PublicRoute";

function App() {

    return (

        <div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                newestOnTop
                closeOnClick
                pauseOnHover
            />

            <Routes>

                {/* Public */}

                <Route path="/" element={<Home />} />

                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/forgot-password"
                    element={
                        <PublicRoute>
                            <ForgotPassword />
                        </PublicRoute>
                    }
                />

                {/* Protected */}

                <Route
                    path="/verify-email"
                    element={
                        <ProtectedRoute>
                           <EmailVerify />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/reset-password"
                    element={
                        <ProtectedRoute>
                            <ResetPassword />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />

            </Routes>
            <Analytics />

        </div>

    );
}

export default App;