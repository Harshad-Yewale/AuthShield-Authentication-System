package com.harshadcodes.AuthShield.controllers;


import com.harshadcodes.AuthShield.dtos.ProfileRequest;
import com.harshadcodes.AuthShield.dtos.ProfileResponse;
import com.harshadcodes.AuthShield.services.EmailService;
import com.harshadcodes.AuthShield.services.ProfileService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ProfileController {

   private final ProfileService profileService;
   private final EmailService emailService;

   @PostMapping("/register")
   @ResponseStatus(HttpStatus.CREATED)
   @Transactional
   public ProfileResponse createUser(@RequestBody @Valid ProfileRequest request) {
      System.out.println(">" + System.getenv("MAIL_USERNAME") + "<");
      System.out.println(">" + System.getenv("MAIL_PASSWORD") + "<");
      ProfileResponse response = profileService.createUser(request);
      emailService.sendWelcomeMail(response.email(), response.name());
      return response;
   }

   @GetMapping("/profile")
   public ProfileResponse getProfile(@CurrentSecurityContext(expression = "authentication?.name") String email) {
      return profileService.getProfile(email);

   }
}
