import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


import "./ResetPassword.css";
import OTPInput from "../../components/otp input/OTPInput";
import OTPResend from "../../components/otp resend/OTPResend";

function ResetPassword() {

    const {
        backendURL,
        userData
    } = useContext(AppContext);

    const navigate = useNavigate();

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

        try {

            setLoading(true);

            if (!userData?.email) {

                toast.error("User email not found");
                return;
            }

            const response = await axios.get(
                `${backendURL}/send_resetOtp`,
                {
                    params: {
                        email: userData.email
                    },
                    withCredentials: true
                }
            );

            if (response.status === 200) {

                toast.success(
                    "OTP sent successfully"
                );

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

        if(newPassword != confirmPassword){
            toast.error("passwords do not, match plz enter same password");
            return;
        }
        try {

            setLoading(true);
            const response = await axios.post(
                `${backendURL}/reset-password`,
                {
                    email: userData.email,
                    otp,
                    newPassword
                },
                {
                    withCredentials: true
                }
            );

            if (response.status === 200) {

                toast.success(
                    "Password updated successfully"
                );

                navigate("/");
            }

        } catch (error) {

           if(error.response?.data?.errors){
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

                <h2> Reset Password</h2>

                <p>
                    Secure your account by creating
                    a new password. We'll send a
                    verification OTP to your email.
                </p>

                {
                    !otpSent ? (

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

                    ) : (

                        <form onSubmit={resetPasswordHandler}>

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
                                    setNewPassword(
                                        e.target.value
                                    )
                                }
                            />

                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="password-input"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(
                                        e.target.value
                                    )
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

export default ResetPassword;
