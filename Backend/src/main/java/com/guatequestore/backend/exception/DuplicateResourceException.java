package com.guatequestore.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// Excepción para recurso duplicado
@ResponseStatus(value = HttpStatus.CONFLICT)
public class DuplicateResourceException extends RuntimeException {

    // Constructor con detalles del recurso duplicado
    public DuplicateResourceException(String recurso, String campo, String valor) {
        super(String.format("%s con %s '%s' ya existe", recurso, campo, valor));
    }

    // Constructor con mensaje personalizado
    public DuplicateResourceException(String mensaje) {
        super(mensaje);
    }
}
