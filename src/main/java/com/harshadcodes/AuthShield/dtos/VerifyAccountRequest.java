package com.harshadcodes.AuthShield.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;



@Builder
public record VerifyAccountRequest (
        @NotBlank(message = "email is required")
        @Email(message = "plz enter valid email address")
        String email,

        @NotBlank(message = "Otp is required")
        @Size(min = 6 ,message = "Enter a valid 6 digit otp")
        String otp
){ }
