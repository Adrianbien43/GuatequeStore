package com.guatequestore.backend.exception;

// Excepción para errores de negocio
public class BusinessException extends RuntimeException {

    // Constructor con mensaje
    public BusinessException(String mensaje) {
        super(mensaje);
    }

    // Constructor con mensaje y causa
    public BusinessException(String mensaje, Throwable causa) {
        super(mensaje, causa);
    }
}

