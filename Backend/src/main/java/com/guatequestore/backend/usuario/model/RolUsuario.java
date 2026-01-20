package com.guatequestore.backend.usuario.model;

public enum Rol {
    USER("usuario"),
    ADMIN("administrador"),
    MODERADOR("moderador");

    private final String descripcion;

    Rol(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDescripcion() {
        return descripcion;
    }

    /**
     * Obtiene el rol por defecto del sistema
     * @return Rol.USER como rol por defecto
     */
    public static Rol obtenerRolPorDefecto() {
        return USER;
    }
}