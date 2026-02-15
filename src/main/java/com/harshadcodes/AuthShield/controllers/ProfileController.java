package com.harshadcodes.AuthShield.controllers;


import com.harshadcodes.AuthShield.dtos.ProfileRequest;
import com.harshadcodes.AuthShield.dtos.ProfileResponse;
import com.harshadcodes.AuthShield.services.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ProfileController {

   private final ProfileService profileService;

   @PostMapping("/register")
   @ResponseStatus(HttpStatus.CREATED)
    public ProfileResponse createUser(@RequestBody ProfileRequest request){
       ProfileResponse response= profileService.createUser(request);
       return response;
   }

   @GetMapping("/profile")
   public ProfileResponse getProfile(@CurrentSecurityContext(expression = "authentication?.name")String email){
     return profileService.getProfile(email);

   }

}
