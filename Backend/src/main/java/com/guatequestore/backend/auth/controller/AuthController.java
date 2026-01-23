package com.guatequestore.backend.auth.controller;

import com.guatequestore.backend.auth.dto.LoginRequest;
import com.guatequestore.backend.auth.dto.LoginResponse;
import com.guatequestore.backend.auth.dto.RegisterRequest;
import com.guatequestore.backend.auth.service.AuthService;
import com.guatequestore.backend.usuario.model.Usuario;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controlador para autenticación y registro de usuarios.
 *
 * Endpoints:
 * POST /api/auth/login     - Iniciar sesión
 * POST /api/auth/register  - Registrar nuevo usuario
 * POST /api/auth/validate  - Validar token
 *
 * @author Adrian Bienvenido
 * @version 1.0.0
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200", "http://localhost:5173"})
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Iniciar sesión con email y contraseña.
     *
     * @param loginRequest Email y contraseña
     * @return Token JWT y datos del usuario
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        LoginResponse response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }

    /**
     * Registrar nuevo usuario.
     *
     * @param registerRequest Datos del nuevo usuario
     * @return Usuario creado y token
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            Usuario usuario = authService.register(registerRequest);
            LoginResponse response = new LoginResponse(
                    authService.generateToken(usuario.getEmail()),
                    usuario.getEmail(),
                    usuario.getNombre(),
                    usuario.getRol().name()
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Validar un token JWT.
     *
     * @param token Token a validar
     * @return true si el token es válido
     */
    @PostMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestBody String token) {
        boolean isValid = authService.validateToken(token);
        return ResponseEntity.ok(isValid);
    }
}