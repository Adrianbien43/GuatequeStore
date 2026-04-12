package com.guatequestore.backend.usuario.dto;

import java.util.List;

/**
 * DTO para transferir datos de Usuario.
 * 
 * Contiene:
 * - Información básica del usuario (id, nombre, email, rol)
 * - Lista de teléfonos como strings (conversión automática)
 * 
 * NO contiene:
 * - Hashes de contraseña (sensible)
 * - Historial de pedidos completo (ineficiente)
 * - Direcciones internas complejas
 * 
 * Se utiliza para:
 * - Retornar datos seguros a través de la API
 * - Recibir datos de creación/actualización desde el Frontend
 * - Desacoplar la estructura de BD del contrato de API
 * 
 * @author Adrian Bienvenido
 * @version 1.0.0
 */
public class UsuarioDTO {

    private Long id;
    private String nombre;
    private String email;
    private String direccion;
    private String rol;
    private Boolean activo;
    private List<String> telefonos;

    /**
     * Constructor vacío (necesario para Jackson serialización)
     */
    public UsuarioDTO() {}

    /**
     * Constructor con parámetros principales
     */
    public UsuarioDTO(Long id, String nombre, String email, String direccion, String rol, Boolean activo, List<String> telefonos) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.direccion = direccion;
        this.rol = rol;
        this.activo = activo;
        this.telefonos = telefonos;
    }

    // GETTERS Y SETTERS 

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    public List<String> getTelefonos() {
        return telefonos;
    }

    public void setTelefonos(List<String> telefonos) {
        this.telefonos = telefonos;
    }
}
