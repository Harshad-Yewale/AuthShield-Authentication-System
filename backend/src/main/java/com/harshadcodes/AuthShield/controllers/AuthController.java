package com.harshadcodes.AuthShield.controllers;


import com.harshadcodes.AuthShield.dtos.AuthRequest;
import com.harshadcodes.AuthShield.dtos.AuthResponse;
import com.harshadcodes.AuthShield.dtos.ResetPasswordRequest;
import com.harshadcodes.AuthShield.dtos.VerifyAccountRequest;
import com.harshadcodes.AuthShield.services.AppUserDetailsService;
import com.harshadcodes.AuthShield.services.ProfileService;
import com.harshadcodes.AuthShield.utils.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final AppUserDetailsService appUserDetailsService;
    private final JwtUtil jwtUtil;
    private final ProfileService profileService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) throws Exception {
        try {
           authenticate(request.email(),request.password());
           final UserDetails userDetails=appUserDetailsService.loadUserByUsername(request.email());
           final String jwtToken=jwtUtil.generateToken(userDetails);
            ResponseCookie cookie=ResponseCookie.from("jwt",jwtToken)
                    .httpOnly(true)
                    .path("/")
                    .maxAge(Duration.ofDays(1))
                    .sameSite("none")
                    .secure(true)
                    .build();

            return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,cookie.toString())
                    .body(new AuthResponse(request.email(), jwtToken));
        }
        catch (BadCredentialsException e){
          throw new BadCredentialsException("Invalid Credentials");
        }
    }


    @GetMapping("/is-authenticated")
    public ResponseEntity<Boolean> isAuthenticated(@CurrentSecurityContext(expression = "authentication?.name")String email){
        return ResponseEntity.ok(email!=null);
    }


    @GetMapping("/send_resetOtp")
    public void sendResetOtp(@RequestParam @Valid String email){
        profileService.sendResetOtp(email);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody @Valid ResetPasswordRequest request){
        String msg= profileService.resetPassword(request.email(),request.otp(),request.newPassword());
        return ResponseEntity.ok(msg);
    }

    @GetMapping("/send-verifyOtp")
    public ResponseEntity<String> sendVerifyOtp(@RequestParam @Valid String email){
        String msg=profileService.sendVerifyOtp(email);
        return ResponseEntity.ok(msg);
    }

    @PostMapping("/verify-account")
    public ResponseEntity<String> verifyAccount(@RequestBody @Valid VerifyAccountRequest request){
        String msg= profileService.verifyOtp(request.email(), request.otp());
        return ResponseEntity.ok(msg);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(){
        ResponseCookie cookie= ResponseCookie.from("jwt","")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("none")
                .secure(true)
                .build();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE,cookie.toString())
                .body("logout successful");
    }

    private void authenticate(String email, String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email,password));
    }
}
