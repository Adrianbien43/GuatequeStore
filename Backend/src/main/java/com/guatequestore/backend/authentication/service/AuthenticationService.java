package com.guatequestore.backend.authentication.service;

import com.guatequestore.backend.usuario.model.Usuario;
import com.guatequestore.backend.usuario.repository.UsuarioRepository;
import com.guatequestore.backend.exception.BusinessException;
import com.guatequestore.backend.security.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Servicio de autenticación para login de usuarios.
 *
 * Responsabilidades:
 * - Validar credenciales (email y contraseña)
 * - Generar tokens JWT
 * - Validar tokens
 * - Extraer información de tokens
 *
 * Flujo de autenticación:
 * 1. Usuario envía email y contraseña
 * 2. Se validan credenciales
 * 3. Si son válidas, se genera JWT
 * 4. Usuario recibe token
 * 5. En futuras requests, envía token en header Authorization
 * 6. Se valida token antes de procesar request
 *
 * @author Guateque Store
 * @since 1.0
 * @see JwtUtil
 */
@Service
@Transactional
public class AuthenticationService {

    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthenticationService(
            UsuarioRepository usuarioRepository,
            BCryptPasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    /**
     * Autentica un usuario y retorna un token JWT.
     *
     * Proceso:
     * 1. Valida que email y contraseña no sean vacíos
     * 2. Busca usuario por email
     * 3. Verifica contraseña
     * 4. Si es válida, genera JWT
     * 5. Retorna token
     *
     * @param email email del usuario
     * @param password contraseña en texto plano
     * @return token JWT generado
     * @throws BusinessException si email o password son inválidos
     * @throws BusinessException si el usuario no existe
     * @throws BusinessException si la contraseña es incorrecta
     *
     * @see #validarCredenciales(String, String)
     */
    public String authenticate(String email, String password) {
        validarCredenciales(email, password);

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException("Email o contraseña incorrectos"));

        // Verificar contraseña - CAMBIADO AQUÍ
        if (!passwordEncoder.matches(password, usuario.getContraseña())) {
            throw new BusinessException("Email o contraseña incorrectos");
        }

        // Verificar que usuario esté activo
        if (!usuario.estaActivo()) {
            throw new BusinessException("La cuenta está desactivada");
        }

        // Generar y retornar token
        return jwtUtil.generateToken(email);
    }

    /**
     * Valida un token JWT.
     *
     * @param token token a validar
     * @return true si es válido
     * @throws BusinessException si el token es inválido o ha expirado
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
     * Obtiene el email del token JWT.
     *
     * @param token token JWT
     * @return email extraído del token
     * @throws BusinessException si el token es inválido
     */
    public String getEmailFromToken(String token) {
        try {
            return jwtUtil.getEmailFromToken(token);
        } catch (Exception e) {
            throw new BusinessException("No se pudo extraer información del token");
        }
    }

    /**
     * Obtiene el usuario autenticado desde el token.
     *
     * @param token token JWT
     * @return Usuario encontrado
     * @throws BusinessException si el token es inválido o usuario no existe
     */
    @Transactional(readOnly = true)
    public Usuario getUsuarioFromToken(String token) {
        String email = getEmailFromToken(token);
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException("Usuario no encontrado"));
    }

    /**
     * Valida que email y contraseña no sean vacíos.
     *
     * @param email email a validar
     * @param password contraseña a validar
     * @throws BusinessException si alguno está vacío
     */
    private void validarCredenciales(String email, String password) {
        if (email == null || email.isBlank()) {
            throw new BusinessException("El email es requerido");
        }

        if (password == null || password.isBlank()) {
            throw new BusinessException("La contraseña es requerida");
        }
    }

    /**
     * Registra un nuevo usuario.
     *
     * @param usuario usuario a registrar
     * @return usuario registrado
     * @throws BusinessException si el email ya está registrado
     */
    public Usuario register(Usuario usuario) {
        // Verificar si el email ya existe
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new BusinessException("El email ya está registrado");
        }

        // Encriptar contraseña - CAMBIADO AQUÍ
        usuario.setContraseña(passwordEncoder.encode(usuario.getContraseña()));

        // Asignar rol por defecto si no tiene
        if (usuario.getRol() == null) {
            usuario.setRol(com.guatequestore.backend.usuario.model.RolUsuario.CLIENTE);
        }

        return usuarioRepository.save(usuario);
    }
}