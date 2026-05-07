package com.harshadcodes.AuthShield.services;

import com.harshadcodes.AuthShield.exceptions.ResourceNotFoundException;
import com.harshadcodes.AuthShield.models.CustomUserDetails;
import com.harshadcodes.AuthShield.models.UserEntity;
import com.harshadcodes.AuthShield.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity existingUser= userRepository.findByEmail(email).orElseThrow(()->
                new ResourceNotFoundException("user","email",email));

        return new CustomUserDetails(existingUser);
    }
}
