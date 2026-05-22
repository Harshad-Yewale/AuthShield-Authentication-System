import React, { useRef } from "react";
import "./OTPInput.css";

function OTPInput({ length = 6, onChange }) {

    const inputRefs = useRef([]);

    const updateOtp = () => {

        const otp = inputRefs.current
            .map(input => input?.value || "")
            .join("");

        onChange(otp);
    };

    const handleChange = (e, index) => {

        const value = e.target.value;

        if (!/^\d*$/.test(value)) {
            e.target.value = "";
            return;
        }

        if (value.length > 0 && index < length - 1) {
            inputRefs.current[index + 1].focus();
        }

        updateOtp();
    };

    const handleKeyDown = (e, index) => {

        if (
            e.key === "Backspace" &&
            !e.target.value &&
            index > 0
        ) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {

        e.preventDefault();

        const pastedData =
            e.clipboardData
                .getData("text")
                .replace(/\D/g, "")
                .slice(0, length);

        pastedData
            .split("")
            .forEach((digit, index) => {

                if (inputRefs.current[index]) {
                    inputRefs.current[index].value = digit;
                }
            });

        updateOtp();

        const lastIndex =
            Math.min(
                pastedData.length,
                length
            ) - 1;

        if (lastIndex >= 0) {
            inputRefs.current[lastIndex].focus();
        }
    };

    return (

        <div className="otp-input-container">

            {
                Array.from({ length }).map((_, index) => (

                    <input
                        key={index}
                        type="text"
                        maxLength="1"
                        className="otp-input"
                        ref={(el) =>
                            (inputRefs.current[index] = el)
                        }
                        onChange={(e) =>
                            handleChange(e, index)
                        }
                        onKeyDown={(e) =>
                            handleKeyDown(e, index)
                        }
                        onPaste={handlePaste}
                    />
                ))
            }

        </div>
    );
}

export default OTPInput;