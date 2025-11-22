// ====== Archivo 1: BusinessException.java ======
package com.guatequestore.backend.exception;

/**
 * Excepción base para errores de negocio.
 *
 * Se lanza cuando ocurre un error relacionado con reglas de negocio,
 * validaciones o procesos específicos de la aplicación.
 *
 * @author Guateque Store
 * @since 1.0
 */
public class BusinessException extends RuntimeException {

    public BusinessException(String mensaje) {
        super(mensaje);
    }

    public BusinessException(String mensaje, Throwable causa) {
        super(mensaje, causa);
    }
}
