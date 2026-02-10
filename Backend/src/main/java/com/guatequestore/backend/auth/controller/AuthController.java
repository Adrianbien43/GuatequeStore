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

// Controlador para la autenticación de usuarios
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200", "http://localhost:5173"})
public class AuthController {

    // Servicio de autenticación
    private final AuthService authService;

    // Constructor del controlador
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Inicia sesión con email y contraseña
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        LoginResponse response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }

    // Registra un nuevo usuario
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

    // Valida un token JWT
    @PostMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestBody String token) {
        boolean isValid = authService.validateToken(token);
        return ResponseEntity.ok(isValid);
    }
}
