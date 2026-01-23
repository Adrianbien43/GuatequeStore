package com.guatequestore.backend.auth.dto;

/**
 * DTO para respuesta de login exitoso.
 *
 * Contiene el token JWT y información básica del usuario.
 *
 * Ejemplo JSON:
 * {
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *   "tipo": "Bearer",
 *   "email": "usuario@ejemplo.com",
 *   "nombre": "Juan Pérez",
 *   "rol": "CLIENTE",
 *   "mensaje": "Autenticación exitosa"
 * }
 */
public class LoginResponse {
    private String token;
    private String tipo;
    private String email;
    private String nombre;
    private String rol;
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

    // Getters y Setters
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