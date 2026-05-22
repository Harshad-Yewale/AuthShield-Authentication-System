import React, { useContext, useRef, useState, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import './EmailVerify.css'

const VerifyEmail = () => {

    const {
    backendURL,
    getUserData,
    userData
    } = useContext(AppContext);

    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const inputRefs = useRef([]);

    // SEND OTP
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
            console.log(error);
            console.log(error.response);
            console.log(error.response?.data);
            toast.error(
                error.response?.data?.message || "Failed to send OTP"
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(countdown <= 0) return;
        const timer = setInterval(() => {
            setCountdown(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [countdown]);

    // HANDLE INPUT
    const handleInput = (e, index) => {

        if (e.target.value.length > 0 && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    // HANDLE BACKSPACE
    const handleKeyDown = (e, index) => {

        if (
            e.key === "Backspace" &&
            !e.target.value &&
            index > 0
        ) {
            inputRefs.current[index - 1].focus();
        }
    };

    // VERIFY OTP
    const verifyOtpHandler = async (e) => {

        e.preventDefault();

        const otp = inputRefs.current
            .map(input => input.value)
            .join("");

        if (otp.length !== 6) {
            toast.error("Please enter valid OTP");
            return;
        }

        try {

            setLoading(true);

            const response = await axios.post(
                `${backendURL}/verify-account`,
                { email: userData.email
                  ,otp },
                { withCredentials: true }
            );

            if (response.status === 200) {

                toast.success("Email Verified Successfully");

                await getUserData();

                setTimeout(() => {
                    window.location.href = "/";
                }, 1500);
            }

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Verification Failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="verify-container">

            <div className="verify-card">

                <h2>Verify Email</h2>

                <p>
                    Verify your email address to unlock all
                    AuthShield features.
                </p>

                {!otpSent ? (

                    <button
                        className="send-btn"
                        onClick={sendOtpHandler}
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send OTP"}
                    </button>

                ) : (

                    <form onSubmit={verifyOtpHandler}>

                        <div className="otp-boxes">

                            {[0,1,2,3,4,5].map((_, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    ref={(el) =>
                                        (inputRefs.current[index] = el)
                                    }
                                    onInput={(e) =>
                                        handleInput(e, index)
                                    }
                                    onKeyDown={(e) =>
                                        handleKeyDown(e, index)
                                    }
                                />
                            ))}

                        </div>
                        <div className="resend-container">
                            {
                                countdown > 0 ? (
                                    <span className="countdown-text">
                                        Resend OTP in {countdown}s
                                    </span>
                                ) : (
                                    <button
                                        type="button"
                                        className="resend-btn"
                                        onClick={sendOtpHandler}
                                    >
                                        Resend OTP
                                    </button>
                                )
                            }

                        </div>

                        <button
                            type="submit"
                            className="verify-btn"
                            disabled={loading}
                        >
                            {loading
                                ? "Verifying..."
                                : "Verify Email"}
                        </button>

                    </form>
                )}

            </div>

        </div>
    );
};

export default VerifyEmail;