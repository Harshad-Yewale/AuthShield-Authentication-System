import React from "react";
import "./OTPResend.css";

function OTPResend({
    countdown,
    onResend,
    loading = false
}) {

    return (

        <div className="otp-resend-container">

            {
                countdown > 0 ? (

                    <p className="otp-countdown">

                        Resend OTP in

                        <span>
                            {" "}
                            {countdown}s
                        </span>

                    </p>

                ) : (

                    <button
                        type="button"
                        className="otp-resend-btn"
                        onClick={onResend}
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Sending..."
                                : "Resend OTP"
                        }

                    </button>

                )
            }

        </div>
    );
}

export default OTPResend;