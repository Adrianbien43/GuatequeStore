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

/**
 * Servicio para manejar autenticación y registro de usuarios.
 *
 * Responsabilidades:
 * - Validar credenciales de login
 * - Registrar nuevos usuarios
 * - Generar y validar tokens JWT
 * - Hashear contraseñas
 */
@Service
@Transactional
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    /**
     * Autenticar usuario y generar token JWT.
     *
     * @param loginRequest Credenciales del usuario
     * @return LoginResponse con token y datos del usuario
     * @throws BusinessException Si las credenciales son inválidas
     */
    public LoginResponse login(LoginRequest loginRequest) {
        // Validar que no estén vacíos
        if (loginRequest.getEmail() == null || loginRequest.getEmail().isBlank()) {
            throw new BusinessException("El email es requerido");
        }

        if (loginRequest.getPassword() == null || loginRequest.getPassword().isBlank()) {
            throw new BusinessException("La contraseña es requerida");
        }

        // Buscar usuario por email
        Usuario usuario = usuarioRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new BusinessException("Credenciales inválidas"));

        // Verificar contraseña (comparando hash)
        if (!passwordEncoder.matches(loginRequest.getPassword(), usuario.getContraseña())) {
            throw new BusinessException("Credenciales inválidas");
        }

        // Verificar si el usuario está activo
        if (!usuario.getActivo()) {
            throw new BusinessException("La cuenta está desactivada. Contacta al administrador.");
        }

        // Generar token JWT
        String token = jwtUtil.generateToken(usuario.getEmail());

        // Crear y retornar respuesta
        return new LoginResponse(
                token,
                usuario.getEmail(),
                usuario.getNombre(),
                usuario.getRol().name()
        );
    }

    /**
     * Registrar nuevo usuario.
     *
     * @param registerRequest Datos del nuevo usuario
     * @return Usuario creado
     * @throws BusinessException Si el email ya existe
     */
    public Usuario register(RegisterRequest registerRequest) {
        // Validar que el email no esté registrado
        if (usuarioRepository.existsByEmail(registerRequest.getEmail())) {
            throw new BusinessException("El email '" + registerRequest.getEmail() + "' ya está registrado");
        }

        // Crear nuevo usuario
        Usuario usuario = new Usuario();
        usuario.setNombre(registerRequest.getNombre());
        usuario.setEmail(registerRequest.getEmail());
        usuario.setContraseña(passwordEncoder.encode(registerRequest.getPassword())); // Hashear contraseña
        usuario.setDireccion(registerRequest.getDireccion());
        usuario.setRol(RolUsuario.CLIENTE); // Rol por defecto: CLIENTE
        usuario.setActivo(true); // Usuario activo por defecto

        // Guardar usuario
        return usuarioRepository.save(usuario);
    }

    /**
     * Generar token JWT para un email.
     *
     * @param email Email del usuario
     * @return Token JWT
     */
    public String generateToken(String email) {
        return jwtUtil.generateToken(email);
    }

    /**
     * Validar token JWT.
     *
     * @param token Token a validar
     * @return true si el token es válido
     * @throws BusinessException Si el token es inválido o está expirado
     */
    public boolean validateToken(String token) {
        if (token == null || token.isBlank()) {
            throw new BusinessException("Token no proporcionado");
        }

        if (!jwtUtil.validateToken(token)) {
            throw new BusinessException("Token inválido");
        }

        if (jwtUtil.isTokenExpired(token)) {
            throw new BusinessException("Token expirado");
        }

        return true;
    }

    /**
     * Obtener usuario desde token JWT.
     *
     * @param token Token JWT
     * @return Usuario correspondiente al token
     * @throws BusinessException Si el usuario no existe
     */
    public Usuario getUsuarioFromToken(String token) {
        // Extraer email del token
        String email = jwtUtil.getEmailFromToken(token);

        // Buscar usuario por email
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException("Usuario no encontrado para el token proporcionado"));
    }
}