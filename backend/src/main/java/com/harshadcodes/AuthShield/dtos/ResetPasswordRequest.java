package com.harshadcodes.AuthShield.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


public record ResetPasswordRequest (
        @Email(message = "enter a valid email address")
        @NotBlank(message = "Email is required")
        String email,

        @Size(min = 6,message = "Enter a correct 6 digit Otp")
        @NotBlank(message = "Otp is required")
        String otp,
        @NotBlank(message = "Password is required")
        @Size(min = 6,message = "password must be at least 6 characters")
        String newPassword
){ }
