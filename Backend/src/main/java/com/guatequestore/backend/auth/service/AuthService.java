package com.guatequestore.backend.auth.service;

import com.guatequestore.backend.auth.dto.LoginRequest;
import com.guatequestore.backend.auth.dto.LoginResponse;
import com.guatequestore.backend.auth.dto.RegisterRequest;
import com.guatequestore.backend.exception.BusinessException;
import com.guatequestore.backend.security.JwtUtil;
import com.guatequestore.backend.usuario.model.Contrasena;
import com.guatequestore.backend.usuario.model.RolUsuario;
import com.guatequestore.backend.usuario.model.Usuario;
import com.guatequestore.backend.usuario.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public LoginResponse login(LoginRequest loginRequest) {

        if (loginRequest.getEmail() == null || loginRequest.getEmail().isBlank()) {
            throw new BusinessException("El email es requerido");
        }
        if (loginRequest.getPassword() == null || loginRequest.getPassword().isBlank()) {
            throw new BusinessException("La contraseña es requerida");
        }

        Usuario usuario = usuarioRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new BusinessException("Credenciales inválidas"));

        // Obtener hash actual y validar
        String hashActual = usuario.getHashActual();
        if (hashActual == null || !passwordEncoder.matches(loginRequest.getPassword(), hashActual)) {
            throw new BusinessException("Credenciales inválidas");
        }

        if (!usuario.getActivo()) {
            throw new BusinessException("La cuenta está desactivada");
        }

        String token = jwtUtil.generateToken(usuario.getEmail());

        return new LoginResponse(
                token,
                usuario.getEmail(),
                usuario.getNombre(),
                usuario.getRol().name()
        );
    }

    public Usuario register(RegisterRequest registerRequest) {

        if (usuarioRepository.existsByEmail(registerRequest.getEmail())) {
            throw new BusinessException("El email ya está registrado");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(registerRequest.getNombre());
        usuario.setEmail(registerRequest.getEmail());
        usuario.setDireccion(registerRequest.getDireccion());
        usuario.setRol(RolUsuario.CLIENTE);
        usuario.setActivo(true);

        // Crear y asociar la contrasena (hash)
        String hash = passwordEncoder.encode(registerRequest.getPassword());
        Contrasena contrasena = new Contrasena();
        contrasena.setHash(hash);
        usuario.addContrasena(contrasena);

        return usuarioRepository.save(usuario);
    }

    public String generateToken(String email) {
        return jwtUtil.generateToken(email);
    }

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

    public Usuario getUsuarioFromToken(String token) {

        String email = jwtUtil.getEmailFromToken(token);

        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException("Usuario no encontrado"));
    }
}
