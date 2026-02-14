package com.harshadcodes.AuthShield.services;

import com.harshadcodes.AuthShield.dtos.ProfileRequest;
import com.harshadcodes.AuthShield.dtos.ProfileResponse;
import com.harshadcodes.AuthShield.models.User;
import com.harshadcodes.AuthShield.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements  ProfileService{

    private final UserRepository userRepository;

    @Override
    public ProfileResponse createUser(ProfileRequest request) {
        User userProfile=convertToUserEntity(request);
        User savedUser=userRepository.save(userProfile);
        return convertToProfileResponse(savedUser);
    }

    private ProfileResponse convertToProfileResponse(User savedUser) {
        return ProfileResponse.builder()
                .userId(savedUser.getUserId())
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .isAccountVerified(savedUser.getIsAccountVerified())
                .build();

    }

    private User convertToUserEntity(ProfileRequest request) {
        return User.builder()
                .userId(UUID.randomUUID().toString())
                .email(request.getEmail())
                .name(request.getName())
                .password(request.getPassword())
                .isAccountVerified(false)
                .resetOtpExpiredAt(0L)
                .verifyOtp(null)
                .verifyOtpExpireAt(0L)
                .resetOtp(null)
                .build();
    }
}
