// ====== Archivo 3: DuplicateResourceException.java ======
package com.guatequestore.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Excepción cuando se intenta crear un recurso duplicado.
 *
 * Se lanza cuando hay violación de unicidad, por ejemplo:
 * - Intentar crear cliente con email que ya existe
 * - Crear un producto con SKU duplicado
 *
 * @author Guateque Store
 * @since 1.0
 */
@ResponseStatus(value = HttpStatus.CONFLICT)
public class DuplicateResourceException extends RuntimeException {

    public DuplicateResourceException(String recurso, String campo, String valor) {
        super(String.format("%s con %s '%s' ya existe", recurso, campo, valor));
    }

    public DuplicateResourceException(String mensaje) {
        super(mensaje);
    }
}