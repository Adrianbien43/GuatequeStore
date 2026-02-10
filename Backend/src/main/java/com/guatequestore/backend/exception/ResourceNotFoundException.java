package com.guatequestore.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// Excepción cuando un recurso no se encuentra
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

    // Constructor con detalles del recurso y su ID
    public ResourceNotFoundException(String recurso, Long id) {
        super(String.format("%s con ID %d no encontrado", recurso, id));
    }

    // Constructor con mensaje personalizado
    public ResourceNotFoundException(String mensaje) {
        super(mensaje);
    }
}
