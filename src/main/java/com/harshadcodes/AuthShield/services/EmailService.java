package com.harshadcodes.AuthShield.services;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.properties.mail.smtp.from}")
    private String fromMail;


    public void sendWelcomeMail(String toEmail, String name) {

        try {
            ClassPathResource resource = new ClassPathResource("templates/welcome-email.html");
            String html = new String(resource.getInputStream().readAllBytes());

            html=html.replace("{{name}}",name);
            html=html.replace("{{appName}}","AuthShield");
            html=html.replace("{{year}}","2026");

            MimeMessage message= mailSender.createMimeMessage();
            MimeMessageHelper helper=new MimeMessageHelper(message,true);

            helper.setTo(toEmail);
            helper.setSubject("Welcome To AuthShield");
            helper.setText(html,true);
            helper.setFrom(fromMail);

            mailSender.send(message);
        }
        catch (Exception e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }
}
