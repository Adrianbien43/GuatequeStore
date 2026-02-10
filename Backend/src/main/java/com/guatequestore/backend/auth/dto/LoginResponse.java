package com.guatequestore.backend.auth.dto;

// DTO para la respuesta del login
public class LoginResponse {

    // Token JWT
    private String token;

    // Tipo de token
    private String tipo;

    // Email del usuario
    private String email;

    // Nombre del usuario
    private String nombre;

    // Rol del usuario
    private String rol;

    // Mensaje de respuesta
    private String mensaje;

    // Constructor
    public LoginResponse(String token, String email, String nombre, String rol) {
        this.token = token;
        this.tipo = "Bearer";
        this.email = email;
        this.nombre = nombre;
        this.rol = rol;
        this.mensaje = "Autenticación exitosa";
    }

    // Getters y setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
}
