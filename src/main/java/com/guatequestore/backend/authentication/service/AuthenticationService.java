package com.guatequestore.backend.authentication.service;

import com.guatequestore.backend.cliente.model.Cliente;
import com.guatequestore.backend.cliente.repository.ClienteRepository;
import com.guatequestore.backend.exception.BusinessException;
import com.guatequestore.backend.security.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Servicio de autenticación para login de clientes.
 *
 * Responsabilidades:
 * - Validar credenciales (email y contraseña)
 * - Generar tokens JWT
 * - Validar tokens
 * - Extraer información de tokens
 *
 * Flujo de autenticación:
 * 1. Cliente envía email y contraseña
 * 2. Se validan credenciales
 * 3. Si son válidas, se genera JWT
 * 4. Cliente recibe token
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

    private final ClienteRepository clienteRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthenticationService(
            ClienteRepository clienteRepository,
            BCryptPasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {
        this.clienteRepository = clienteRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    /**
     * Autentica un cliente y retorna un token JWT.
     *
     * Proceso:
     * 1. Valida que email y contraseña no sean vacíos
     * 2. Busca cliente por email
     * 3. Verifica contraseña
     * 4. Si es válida, genera JWT
     * 5. Retorna token
     *
     * @param email email del cliente
     * @param password contraseña en texto plano
     * @return token JWT generado
     * @throws BusinessException si email o password son inválidos
     * @throws BusinessException si el cliente no existe
     * @throws BusinessException si la contraseña es incorrecta
     *
     * @see #validarCredenciales(String, String)
     */
    public String authenticate(String email, String password) {
        validarCredenciales(email, password);

        Cliente cliente = clienteRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException("Email o contraseña incorrectos"));

        // Verificar contraseña
        if (!passwordEncoder.matches(password, cliente.getPassword())) {
            throw new BusinessException("Email o contraseña incorrectos");
        }

        // Verificar que cliente esté activo
        if (!cliente.estaActivo()) {
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
     * Obtiene el cliente autenticado desde el token.
     *
     * @param token token JWT
     * @return Cliente encontrado
     * @throws BusinessException si el token es inválido o cliente no existe
     */
    @Transactional(readOnly = true)
    public Cliente getClienteFromToken(String token) {
        String email = getEmailFromToken(token);
        return clienteRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException("Cliente no encontrado"));
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
}