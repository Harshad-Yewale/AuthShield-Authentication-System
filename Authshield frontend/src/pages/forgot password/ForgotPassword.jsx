import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../reset password/ResetPassword.css";
import OTPInput from "../../components/otp input/OTPInput";
import OTPResend from "../../components/otp resend/OTPResend";

function ForgotPassword() {

    const { backendURL } = useContext(AppContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {

        if (countdown <= 0) return;
        const timer = setInterval(() => {
            setCountdown(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [countdown]);

    const sendOtpHandler = async () => {
        if (!email.trim()) {
            toast.error("Please enter your email");
            return;
        }
        try {
            setLoading(true);
            const response = await axios.get(
                `${backendURL}/send_resetOtp`,
                {
                    params: {
                        email
                    }
                }
            );
            if (response.status === 200) {
                toast.success("OTP sent successfully");
                setOtpSent(true);
                setCountdown(60);
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to send OTP"
            );
        } finally {
            setLoading(false);
        }

    };

    const resetPasswordHandler = async (e) => {
        e.preventDefault();
        if (!otp.trim()) {
            toast.error("Please enter OTP");
            return;
        }
        if (!newPassword.trim()) {
            toast.error("Please enter new password");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post(
                `${backendURL}/reset-password`,
                {
                    email,
                    otp,
                    newPassword
                }
            );
            if (response.status === 200) {
                toast.success("Password updated successfully");
                navigate("/login");
            }
        } catch (error) {

            if (error.response?.data?.errors) {
                toast.error(
                    Object.values(error.response.data.errors)[0]
                );
                return;
            }
            toast.error(
                error.response?.data?.message ||
                "Failed to reset password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="verify-container">

            <div className="verify-card">

                <h2>Forgot Password</h2>

                <p>
                    Enter your registered email address.
                    We'll send you a verification OTP to reset
                    your password.
                </p>

                {
                    !otpSent ? (

                        <>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="password-input"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                            />

                            <button
                                className="send-btn"
                                onClick={sendOtpHandler}
                                disabled={loading}
                            >
                                {
                                    loading
                                        ? "Sending..."
                                        : "Send OTP"
                                }
                            </button>

                        </>

                    ) : (

                        <form onSubmit={resetPasswordHandler}>

                            <input
                                type="email"
                                className="password-input"
                                value={email}
                                disabled
                            />

                            <OTPInput
                                length={6}
                                onChange={setOtp}
                            />

                            <OTPResend
                                countdown={countdown}
                                onResend={sendOtpHandler}
                                loading={loading}
                            />

                            <input
                                type="password"
                                placeholder="New Password"
                                className="password-input"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(e.target.value)
                                }
                            />

                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="password-input"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />

                            <button
                                type="submit"
                                className="verify-btn"
                                disabled={loading}
                            >
                                {
                                    loading
                                        ? "Updating..."
                                        : "Update Password"
                                }
                            </button>

                        </form>

                    )
                }

            </div>

        </div>

    );

}

export default ForgotPassword;