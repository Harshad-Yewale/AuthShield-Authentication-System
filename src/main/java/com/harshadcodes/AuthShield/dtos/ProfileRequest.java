package com.harshadcodes.AuthShield.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


public record ProfileRequest (
        @NotBlank(message = "Name can not be blank!")
        String name,

        @Email(message = "Enter valid email address!")
        @NotBlank(message = "email can not be blank!")
        String email,

        @Size(min = 6 , message = "Password must be at least 6 characters ")
        String password
){ }
