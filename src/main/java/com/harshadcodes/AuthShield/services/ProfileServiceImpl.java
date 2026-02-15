package com.harshadcodes.AuthShield.services;

import com.harshadcodes.AuthShield.dtos.ProfileRequest;
import com.harshadcodes.AuthShield.dtos.ProfileResponse;
import com.harshadcodes.AuthShield.models.UserEntity;
import com.harshadcodes.AuthShield.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements  ProfileService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public ProfileResponse createUser(ProfileRequest request) {
        if(!userRepository.existsByEmail(request.getEmail())) {
            UserEntity userProfile = convertToUserEntity(request);
            UserEntity savedUser = userRepository.save(userProfile);
            return convertToProfileResponse(savedUser);
        }
        throw new ResponseStatusException(HttpStatus.CONFLICT,"Email is already in use");
    }

    @Override
    public ProfileResponse getProfile(String email) {
       UserEntity existingUser= userRepository.findByEmail(email).orElseThrow(()->{
            return new UsernameNotFoundException("User not found With Email: "+email);
       });
       return convertToProfileResponse(existingUser);
    }

    private ProfileResponse convertToProfileResponse(UserEntity savedUser) {
        return ProfileResponse.builder()
                .userId(savedUser.getUserId())
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .isAccountVerified(savedUser.getIsAccountVerified())
                .build();

    }

    private UserEntity convertToUserEntity(ProfileRequest request) {
        return UserEntity.builder()
                .userId(UUID.randomUUID().toString())
                .email(request.getEmail())
                .name(request.getName())
                .password(passwordEncoder.encode(request.getPassword()))
                .isAccountVerified(false)
                .resetOtpExpiredAt(0L)
                .verifyOtp(null)
                .verifyOtpExpireAt(0L)
                .resetOtp(null)
                .build();
    }
}
