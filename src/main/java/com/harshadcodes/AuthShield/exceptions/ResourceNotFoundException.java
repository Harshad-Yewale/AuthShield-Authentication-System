package com.harshadcodes.AuthShield.exceptions;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String entity,String resource,String resourceName) {

        super(entity+" not found with "+resource+" : "+resourceName);
    }
}
