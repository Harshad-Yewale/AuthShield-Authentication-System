package com.harshadcodes.AuthShield.dtos;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AuthRequest (
        @Email(message = "Enter a valid email address")
        @NotBlank(message = "email is required")
        String email,

        @NotBlank(message = "password is required")
        @Size(min = 6, message = "password must be at least 6 characters long")
        String password
) { }
