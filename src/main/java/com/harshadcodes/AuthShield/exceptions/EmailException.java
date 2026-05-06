package com.harshadcodes.AuthShield.exceptions;

public class EmailException extends RuntimeException {
    public EmailException(String message){super(message);}
    public EmailException(String message, Exception e) {
        super(message);
    }
}
