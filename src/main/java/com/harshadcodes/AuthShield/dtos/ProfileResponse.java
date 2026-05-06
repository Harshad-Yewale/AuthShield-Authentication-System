package com.harshadcodes.AuthShield.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
public record ProfileResponse(
        String userId,
        String name,
        String email,
        boolean isAccountVerified) {


}
