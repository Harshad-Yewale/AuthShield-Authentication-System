package com.harshadcodes.AuthShield.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.Components;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI authShieldOpenAPI() {

        final String securitySchemeName = "bearerAuth";

        return new OpenAPI()
                .info(new Info()
                                .title("AuthShield API")
                                .description("Authentication and Authorization API Documentation for AuthShield")
                                .version("1.0")
                                 .contact(new Contact()
                                                .name("Harshad Yewale")
                                                .email("your-email@example.com"))
                                 .license(
                                        new License()
                                                .name("Apache 2.0")
                                 )
                )

                .externalDocs(new ExternalDocumentation()
                        .description("Project Documentation")
                )

                .addSecurityItem(new SecurityRequirement()
                                .addList(securitySchemeName)
                )

                .components(new Components()
                                .addSecuritySchemes(
                                        securitySchemeName,

                                        new SecurityScheme()
                                                .name(securitySchemeName)
                                                .type(SecurityScheme.Type.HTTP)
                                                .scheme("bearer")
                                                .bearerFormat("JWT")
                                )
                );
    }
}