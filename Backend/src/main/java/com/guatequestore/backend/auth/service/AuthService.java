package com.guatequestore.backend.auth.service;

import com.guatequestore.backend.auth.dto.LoginRequest;
import com.guatequestore.backend.auth.dto.LoginResponse;
import com.guatequestore.backend.auth.dto.RegisterRequest;
import com.guatequestore.backend.exception.BusinessException;
import com.guatequestore.backend.security.JwtUtil;
import com.guatequestore.backend.usuario.model.RolUsuario;
import com.guatequestore.backend.usuario.model.Usuario;
import com.guatequestore.backend.usuario.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// Servicio para la autenticación y registro
@Service
@Transactional
public class AuthService {

    // Repositorio de usuarios
    private final UsuarioRepository usuarioRepository;

    // Codificador de contraseñas
    private final PasswordEncoder passwordEncoder;

    // Utilidad para JWT
    private final JwtUtil jwtUtil;

    // Constructor del servicio
    public AuthService(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // Inicia sesión y genera el token
    public LoginResponse login(LoginRequest loginRequest) {

        // Validar email
        if (loginRequest.getEmail() == null || loginRequest.getEmail().isBlank()) {
            throw new BusinessException("El email es requerido");
        }

        // Validar contraseña
        if (loginRequest.getPassword() == null || loginRequest.getPassword().isBlank()) {
            throw new BusinessException("La contraseña es requerida");
        }

        // Buscar usuario por email
        Usuario usuario = usuarioRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new BusinessException("Credenciales inválidas"));

        // Verificar contraseña
        if (!passwordEncoder.matches(loginRequest.getPassword(), usuario.getContraseña())) {
            throw new BusinessException("Credenciales inválidas");
        }

        // Verificar si el usuario está activo
        if (!usuario.getActivo()) {
            throw new BusinessException("La cuenta está desactivada");
        }

        // Generar token
        String token = jwtUtil.generateToken(usuario.getEmail());

        // Retornar respuesta
        return new LoginResponse(
                token,
                usuario.getEmail(),
                usuario.getNombre(),
                usuario.getRol().name()
        );
    }

    // Registra un nuevo usuario
    public Usuario register(RegisterRequest registerRequest) {

        // Verificar si el email ya existe
        if (usuarioRepository.existsByEmail(registerRequest.getEmail())) {
            throw new BusinessException("El email ya está registrado");
        }

        // Crear usuario
        Usuario usuario = new Usuario();
        usuario.setNombre(registerRequest.getNombre());
        usuario.setEmail(registerRequest.getEmail());
        usuario.setContraseña(passwordEncoder.encode(registerRequest.getPassword()));
        usuario.setDireccion(registerRequest.getDireccion());
        usuario.setRol(RolUsuario.CLIENTE);
        usuario.setActivo(true);

        // Guardar usuario
        return usuarioRepository.save(usuario);
    }

    // Genera un token a partir del email
    public String generateToken(String email) {
        return jwtUtil.generateToken(email);
    }

    // Valida un token JWT
    public boolean validateToken(String token) {

        // Verificar token vacío
        if (token == null || token.isBlank()) {
            throw new BusinessException("Token no proporcionado");
        }

        // Verificar token válido
        if (!jwtUtil.validateToken(token)) {
            throw new BusinessException("Token inválido");
        }

        // Verificar expiración
        if (jwtUtil.isTokenExpired(token)) {
            throw new BusinessException("Token expirado");
        }

        return true;
    }

    // Obtiene el usuario a partir del token
    public Usuario getUsuarioFromToken(String token) {

        // Obtener email del token
        String email = jwtUtil.getEmailFromToken(token);

        // Buscar usuario
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException("Usuario no encontrado"));
    }
}
