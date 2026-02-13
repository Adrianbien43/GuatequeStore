package com.guatequestore.backend.usuario.service;

import com.guatequestore.backend.usuario.dto.ChangePasswordRequest;
import com.guatequestore.backend.usuario.model.Contrasena;
import com.guatequestore.backend.usuario.model.RolUsuario;
import com.guatequestore.backend.usuario.model.Usuario;
import com.guatequestore.backend.usuario.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository,
                          PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario getUsuarioById(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));
    }

    public Usuario getUsuarioByEmail(String email) {
        return usuarioRepository.findByEmail(email).orElse(null);
    }

    public Usuario createUsuario(Usuario usuario) {

        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new RuntimeException("El email '" + usuario.getEmail() + "' ya está registrado");
        }

        if (usuario.getRol() == null) {
            usuario.setRol(RolUsuario.CLIENTE);
        }

        if (usuario.getFechaCreacion() == null) {
            usuario.setFechaCreacion(LocalDateTime.now());
        }

        if (usuario.getActivo() == null) {
            usuario.setActivo(true);
        }

        return usuarioRepository.save(usuario);
    }

    public Usuario updateUsuario(Long id, Usuario usuarioActualizado) {

        Usuario usuarioExistente = getUsuarioById(id);

        if (usuarioActualizado.getEmail() != null &&
                !usuarioActualizado.getEmail().equals(usuarioExistente.getEmail()) &&
                usuarioRepository.existsByEmail(usuarioActualizado.getEmail())) {
            throw new RuntimeException("El email '" + usuarioActualizado.getEmail() + "' ya está registrado");
        }

        if (usuarioActualizado.getNombre() != null) {
            usuarioExistente.setNombre(usuarioActualizado.getNombre());
        }

        if (usuarioActualizado.getEmail() != null) {
            usuarioExistente.setEmail(usuarioActualizado.getEmail());
        }

        if (usuarioActualizado.getDireccion() != null) {
            usuarioExistente.setDireccion(usuarioActualizado.getDireccion());
        }

        if (usuarioActualizado.getRol() != null) {
            usuarioExistente.setRol(usuarioActualizado.getRol());
        }

        if (usuarioActualizado.getActivo() != null) {
            usuarioExistente.setActivo(usuarioActualizado.getActivo());
        }

        usuarioExistente.setFechaActualizacion(LocalDateTime.now());

        return usuarioRepository.save(usuarioExistente);
    }

    // 🔐 MÉTODO SEPARADO (CORRECTAMENTE FUERA)
    public void cambiarPassword(Long usuarioId, ChangePasswordRequest request) {

        Usuario usuario = getUsuarioById(usuarioId);

        String hashActual = usuario.getHashActual();

        if (hashActual == null ||
                !passwordEncoder.matches(request.getPasswordActual(), hashActual)) {
            throw new RuntimeException("La contraseña actual es incorrecta");
        }

        String nuevoHash = passwordEncoder.encode(request.getNuevaPassword());

        Contrasena nuevaContrasena = new Contrasena();
        nuevaContrasena.setHash(nuevoHash);

        usuario.addContrasena(nuevaContrasena);

        usuarioRepository.save(usuario);
    }

    public void deleteUsuario(Long id) {
        Usuario usuario = getUsuarioById(id);
        usuario.setActivo(false);
        usuario.setFechaActualizacion(LocalDateTime.now());
        usuarioRepository.save(usuario);
    }

    public Usuario reactivarUsuario(Long id) {
        Usuario usuario = getUsuarioById(id);
        usuario.setActivo(true);
        usuario.setFechaActualizacion(LocalDateTime.now());
        return usuarioRepository.save(usuario);
    }

    public List<Usuario> getUsuariosByRol(RolUsuario rol) {
        return usuarioRepository.findByRol(rol);
    }

    public List<Usuario> getUsuariosActivos() {
        return usuarioRepository.findByActivoTrue();
    }

    public List<Usuario> getUsuariosInactivos() {
        return usuarioRepository.findByActivoFalse();
    }

    public boolean esAdministrador(Long id) {
        Usuario usuario = getUsuarioById(id);
        return usuario.getRol() == RolUsuario.ADMINISTRADOR;
    }
}
