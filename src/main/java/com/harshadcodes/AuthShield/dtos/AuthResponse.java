package com.harshadcodes.AuthShield.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthResponse {
    private String email;
    private String token;
}
