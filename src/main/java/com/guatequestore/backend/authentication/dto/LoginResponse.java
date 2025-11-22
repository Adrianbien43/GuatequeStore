package com.guatequestore.backend.authentication.dto;

/**
 * DTO para respuesta de login exitoso.
 *
 * Respuesta:
 * 200 OK
 * {
 *   "token": "eyJhbGciOiJIUzUxMiJ9...",
 *   "tipo": "Bearer",
 *   "email": "usuario@example.com",
 *   "mensaje": "Autenticación exitosa"
 * }
 *
 * @author Guateque Store
 * @since 1.0
 */
public class LoginResponse {
    private String token;
    private String tipo;
    private String email;
    private String mensaje;

    public LoginResponse(String token, String email) {
        this.token = token;
        this.tipo = "Bearer";
        this.email = email;
        this.mensaje = "Autenticación exitosa";
    }

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

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
}