package com.harshadcodes.AuthShield.exceptions;

public class ResourceAlreadyExistException extends RuntimeException {
    public ResourceAlreadyExistException(String entity,String resource,String resourceName) {

        super(entity+" already exists with "+resource+" : "+resourceName);
    }
}
