package com.harshadcodes.AuthShield.services;

import com.harshadcodes.AuthShield.dtos.ProfileRequest;
import com.harshadcodes.AuthShield.dtos.ProfileResponse;

public interface ProfileService {

    ProfileResponse createUser(ProfileRequest request);

    ProfileResponse getProfile(String email);
}
