package com.guatequestore.backend.authentication.dto;

/**
 * DTO para solicitud de login.
 *
 * Uso:
 * POST /api/auth/login
 * {
 *   "email": "usuario@example.com",
 *   "password": "miContraseña123"
 * }
 *
 * @author Guateque Store
 * @since 1.0
 */
public class LoginRequest {
    private String email;
    private String password;

    public LoginRequest() {}

    public LoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}