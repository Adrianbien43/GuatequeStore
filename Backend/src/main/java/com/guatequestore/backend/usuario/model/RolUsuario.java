package com.guatequestore.backend.usuario.model;

public enum RolUsuario {
    CLIENTE("cliente"),
    ADMINISTRADOR("administrador");

    private final String descripcion;

    RolUsuario(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDescripcion() {
        return descripcion;
    }

    /**
     * Obtiene el rol por defecto del sistema según CREATE TABLE
     * @return RolUsuario.CLIENTE como rol por defecto
     */
    public static RolUsuario obtenerRolPorDefecto() {
        return CLIENTE;
    }
}