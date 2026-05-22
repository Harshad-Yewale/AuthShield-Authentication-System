package com.harshadcodes.AuthShield.services;

import com.harshadcodes.AuthShield.dtos.ProfileRequest;
import com.harshadcodes.AuthShield.dtos.ProfileResponse;
import com.harshadcodes.AuthShield.exceptions.EmailException;
import com.harshadcodes.AuthShield.exceptions.ResourceAlreadyExistException;
import com.harshadcodes.AuthShield.exceptions.ResourceNotFoundException;
import com.harshadcodes.AuthShield.models.UserEntity;
import com.harshadcodes.AuthShield.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.security.SecureRandom;
import java.util.UUID;



@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements  ProfileService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private static final SecureRandom secureRandom=new SecureRandom();
    private final EmailService emailService;

    @Override
    public ProfileResponse createUser(ProfileRequest request) {
        if(!userRepository.existsByEmail(request.email())) {
            UserEntity userProfile = convertToUserEntity(request);
            UserEntity savedUser = userRepository.save(userProfile);
            return convertToProfileResponse(savedUser);
        }
        throw new ResourceAlreadyExistException("user","email", request.email());
    }

    @Override
    public ProfileResponse getProfile(String email) {
       UserEntity existingUser= userRepository.findByEmail(email)
               .orElseThrow(()->new ResourceNotFoundException("user","email",email)
       );
       return convertToProfileResponse(existingUser);
    }

    @Override
    @Transactional
    public void sendResetOtp(String email) {
        UserEntity user=userRepository.findByEmail(email)
                .orElseThrow(()->new ResourceNotFoundException("user","email",email));

        String otp=String.valueOf(100000+secureRandom.nextInt(900000));
        long expirationTime=System.currentTimeMillis()+(5*60*1000);
        user.setResetOtp(otp);
        user.setResetOtpExpiredAt(expirationTime);
        userRepository.save(user);
        emailService.sendResetOtp(email, user.getName(),otp);


    }

    @Override
    public String resetPassword(String email, String otp, String newPassword) {
        UserEntity user=userRepository.findByEmail(email)
                .orElseThrow(()->new ResourceNotFoundException("user","email",email));

        if(user.getResetOtp() == null || !user.getResetOtp().equals(otp)){
            throw new EmailException("Otp Invalid");
        }

        if(user.getResetOtpExpiredAt()<System.currentTimeMillis()){
            throw new  EmailException("Otp Expired");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetOtp(null);
        user.setResetOtpExpiredAt(0L);

        userRepository.save(user);

        return "Password Changed Successfully";
    }

    @Override
    @Transactional
    public String sendVerifyOtp(String toEmail) {
        UserEntity user=userRepository.findByEmail(toEmail)
                .orElseThrow(()->new ResourceNotFoundException("user","email",toEmail));

        if (user.getIsAccountVerified()!=null && user.getIsAccountVerified()){
            return "User is already verified";
        }

        String otp=String.valueOf(100000 + secureRandom.nextInt(900000));
        Long expirationTime=System.currentTimeMillis()+(15 * 60 *  1000);

        user.setVerifyOtp(otp);
        user.setVerifyOtpExpireAt(expirationTime);

        userRepository.save(user);

        emailService.sendVerifyOtp(toEmail,user.getName(),otp);
        return "Otp sent Successfully";
    }

    @Override
    public String verifyOtp(String email, String otp) {

        UserEntity user=userRepository.findByEmail(email)
                .orElseThrow(()->new ResourceNotFoundException("user","email",email));

        if(user.getVerifyOtp()== null || !user.getVerifyOtp().equals(otp)){
            throw new EmailException("Otp Invalid");
        }

        if(user.getVerifyOtpExpireAt()<System.currentTimeMillis()){
            throw new EmailException("Otp Expired");
        }

        user.setIsAccountVerified(true);
        userRepository.save(user);

        return "Account verified Successfully";
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
                .email(request.email())
                .name(request.name())
                .password(passwordEncoder.encode(request.password()))
                .isAccountVerified(false)
                .resetOtpExpiredAt(0L)
                .verifyOtp(null)
                .verifyOtpExpireAt(0L)
                .resetOtp(null)
                .build();
    }
}
