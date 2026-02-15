package com.harshadcodes.AuthShield.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileRequest {

    @NotBlank(message = "Name can not be blank!")
    private String name;

    @Email(message = "Enter valid email address!")
    @NotBlank(message = "email can not be blank!")
    private String email;

    @Size(min = 6 , message = "Password must be at least 6 characters ")
    private String password;

}
