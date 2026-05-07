package com.harshadcodes.AuthShield.services;

import com.harshadcodes.AuthShield.exceptions.EmailException;
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
            helper.setFrom(fromMail,"AuthShieldTeam");

            mailSender.send(message);
        }
        catch (Exception e) {
            throw new EmailException("Failed to send Welcome email",e);
        }
    }

    public void sendResetOtp(String toEmail,String name,String otp){
        try {
            ClassPathResource resource=new ClassPathResource("templates/ResetOtp-email.html");
            String html=new String(resource.getInputStream().readAllBytes());

            html=html.replace("{{appName}}","AuthShield");
            html=html.replace("{{name}}",name);
            html=html.replace("{{otp}}",otp);

            MimeMessage message=mailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper=new MimeMessageHelper(message,true);

            mimeMessageHelper.setFrom(fromMail,"AuthShieldTeam");
            mimeMessageHelper.setTo(toEmail);
            mimeMessageHelper.setSubject("AuthShield Reset Otp");
            mimeMessageHelper.setText(html,true);

            mailSender.send(message);
        }
        catch (Exception e){
            throw new EmailException("failed to send reset Otp email",e);
        }
    }

    public void sendVerifyOtp(String toEmail, String name, String otp){

        try {
            ClassPathResource resource = new ClassPathResource("templates/VerifyOtp-email.html");
            String html = new String(resource.getInputStream().readAllBytes());

            html=html.replace("{{appName}}","AuthShield");
            html=html.replace("{{name}}",name);
            html=html.replace("{{otp}}",otp);

            MimeMessage message= mailSender.createMimeMessage();
            MimeMessageHelper helper= new MimeMessageHelper(message,true);

            helper.setTo(toEmail);
            helper.setSubject("Verify Otp Email");
            helper.setFrom(fromMail,"AuthShieldTeam");
            helper.setText(html,true);

            mailSender.send(message);
        }
        catch (Exception e){
            throw new EmailException("Failed to send Verify Otp email", e);
        }
    }
}
