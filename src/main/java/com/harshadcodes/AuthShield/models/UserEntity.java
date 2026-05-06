package com.harshadcodes.AuthShield.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "tbl_users")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String userId;

    @NotBlank
    private String name;

    @Column(unique = true)
    @Email
    @NotBlank
    private String email;

    @Size(min = 8)
    @NotBlank
    private String password;

    @Size(min=6)
    private String verifyOtp;
    private Boolean isAccountVerified;
    private Long verifyOtpExpireAt;
    private String resetOtp;
    private Long resetOtpExpiredAt;

    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;
}
