// ====== Archivo 2: ResourceNotFoundException.java ======
package com.guatequestore.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Excepción cuando un recurso no es encontrado.
 *
 * Se lanza cuando se intenta acceder a un cliente, pedido u otro recurso
 * que no existe en la base de datos.
 *
 * @author Guateque Store
 * @since 1.0
 */
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String recurso, Long id) {
        super(String.format("%s con ID %d no encontrado", recurso, id));
    }

    public ResourceNotFoundException(String mensaje) {
        super(mensaje);
    }
}