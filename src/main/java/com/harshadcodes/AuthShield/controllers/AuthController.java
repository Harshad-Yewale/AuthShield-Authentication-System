package com.harshadcodes.AuthShield.controllers;


import com.harshadcodes.AuthShield.dtos.AuthRequest;
import com.harshadcodes.AuthShield.dtos.AuthResponse;
import com.harshadcodes.AuthShield.services.AppUserDetailsService;
import com.harshadcodes.AuthShield.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final AppUserDetailsService appUserDetailsService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request){
        try {
           authenticate(request.getEmail(),request.getPassword());
           final UserDetails userDetails=appUserDetailsService.loadUserByUsername(request.getEmail());
           final String jwtToken=jwtUtil.generateToken(userDetails);
            ResponseCookie cookie=ResponseCookie.from("jwt",jwtToken)
                    .httpOnly(true)
                    .path("/")
                    .maxAge(Duration.ofDays(1))
                    .sameSite("strict")
                    .build();

            return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,cookie.toString())
                    .body(new AuthResponse(request.getEmail(), jwtToken));
        }
        catch (BadCredentialsException e){
            Map<String, Object>error=new HashMap<>();

            error.put("error",true);
            error.put("message","Email or password Incorrect");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
        catch (DisabledException e){
            Map<String, Object>error=new HashMap<>();

            error.put("error",true);
            error.put("message","Account has been disabled");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
        catch (Exception e){
            Map<String, Object>error=new HashMap<>();

            error.put("error",true);
            error.put("message","Authentication failed");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }

    }

    private void authenticate(String email, String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email,password));
    }
}
