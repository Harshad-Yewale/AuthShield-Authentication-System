package com.harshadcodes.AuthShield.services;

import com.harshadcodes.AuthShield.dtos.ProfileRequest;
import com.harshadcodes.AuthShield.dtos.ProfileResponse;

public interface ProfileService {

    ProfileResponse createUser(ProfileRequest request);

    ProfileResponse getProfile(String email);

    void sendResetOtp(String email);

    String resetPassword(String email,String otp,String newPassword);

    String sendVerifyOtp(String toEmail);

    String verifyOtp(String email , String otp);
}
