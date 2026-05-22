import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "./EmailVerify.css";
import OTPInput from "../../components/otp input/OTPInput";
import OTPResend from "../../components/otp resend/OTPResend";

function EmailVerify() {

    const {
        backendURL,
        getUserData,
        userData
    } = useContext(AppContext);

    const navigate = useNavigate();

    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");

    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(0);

    // Countdown Logic
    useEffect(() => {

        if (countdown <= 0) return;

        const timer = setInterval(() => {

            setCountdown(prev => prev - 1);

        }, 1000);

        return () => clearInterval(timer);

    }, [countdown]);

    // Send OTP
    const sendOtpHandler = async () => {

        try {

            setLoading(true);

            if (!userData?.email) {

                toast.error("User email not found");
                return;
            }

            const response = await axios.get(
                `${backendURL}/send-verifyOtp`,
                {
                    params: {
                        email: userData.email
                    },
                    withCredentials: true
                }
            );

            if (response.status === 200) {

                toast.success("OTP sent successfully");
                setOtpSent(true);
                setCountdown(15);
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

    // Verify OTP
    const verifyOtpHandler = async (e) => {

        e.preventDefault();

        if (otp.length !== 6) {

            toast.error("Please enter valid OTP");

            return;
        }

        try {

            setLoading(true);

            const response = await axios.post(
                `${backendURL}/verify-account`,
                {
                    email: userData.email,
                    otp
                },
                {
                    withCredentials: true
                }
            );

            if (response.status === 200) {

                toast.success(
                    "Email verified successfully"
                );
                await getUserData();
                navigate("/");
            }

        } catch (error) {

            toast.error(
              error.response?.data?.message ||
                "Verification failed"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="verify-container">

            <div className="verify-card">

                <h2>
                    Verify Email
                </h2>

                <p>
                    Verify your email address to unlock
                    all AuthShield features and enhance
                    account security.
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

                        <form
                            onSubmit={verifyOtpHandler}
                        >

                            <OTPInput
                                length={6}
                                onChange={setOtp}
                            />

                            <OTPResend
                                countdown={countdown}
                                onResend={sendOtpHandler}
                                loading={loading}
                            />

                            <button
                                type="submit"
                                className="verify-btn"
                                disabled={loading}
                            >

                                {
                                    loading
                                        ? "Verifying..."
                                        : "Verify Email"
                                }

                            </button>

                        </form>

                    )
                }

            </div>

        </div>
    );
}

export default EmailVerify;