package com.guatequestore.backend.usuario.service;

import com.guatequestore.backend.usuario.model.RolUsuario;
import com.guatequestore.backend.usuario.model.Usuario;
import com.guatequestore.backend.usuario.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    /**
     * Obtiene todos los usuarios registrados.
     *
     * @return lista de usuarios
     */
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    /**
     * Obtiene un usuario por su ID.
     *
     * @param id ID del usuario
     * @return usuario encontrado
     * @throws RuntimeException si el usuario no existe
     */
    public Usuario getUsuarioById(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));
    }

    /**
     * Obtiene un usuario por su email.
     *
     * @param email email del usuario
     * @return usuario encontrado o null
     */
    public Usuario getUsuarioByEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElse(null);
    }

    /**
     * Crea un nuevo usuario.
     *
     * @param usuario usuario a crear
     * @return usuario creado
     * @throws RuntimeException si el email ya está registrado
     */
    public Usuario createUsuario(Usuario usuario) {
        // Validar que el email no exista
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new RuntimeException("El email '" + usuario.getEmail() + "' ya está registrado");
        }

        // Asegurar valores por defecto
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

    /**
     * Actualiza un usuario existente.
     *
     * @param id ID del usuario a actualizar
     * @param usuarioActualizado datos actualizados
     * @return usuario actualizado
     * @throws RuntimeException si el usuario no existe
     */
    public Usuario updateUsuario(Long id, Usuario usuarioActualizado) {
        Usuario usuarioExistente = getUsuarioById(id);

        // Verificar si se intenta cambiar el email a uno ya existente
        if (usuarioActualizado.getEmail() != null &&
                !usuarioActualizado.getEmail().equals(usuarioExistente.getEmail()) &&
                usuarioRepository.existsByEmail(usuarioActualizado.getEmail())) {
            throw new RuntimeException("El email '" + usuarioActualizado.getEmail() + "' ya está registrado");
        }

        // Actualizar campos permitidos
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

        // Solo actualizar contraseña si se proporciona una nueva
        if (usuarioActualizado.getContraseña() != null &&
                !usuarioActualizado.getContraseña().isEmpty() &&
                !usuarioActualizado.getContraseña().equals(usuarioExistente.getContraseña())) {
            usuarioExistente.setContraseña(usuarioActualizado.getContraseña());
        }

        // Actualizar fecha de modificación
        usuarioExistente.setFechaActualizacion(LocalDateTime.now());

        return usuarioRepository.save(usuarioExistente);
    }

    /**
     * Elimina un usuario (borrado lógico).
     *
     * @param id ID del usuario a eliminar
     */
    public void deleteUsuario(Long id) {
        Usuario usuario = getUsuarioById(id);
        usuario.setActivo(false);
        usuario.setFechaActualizacion(LocalDateTime.now());
        usuarioRepository.save(usuario);
    }

    /**
     * Reactiva un usuario previamente eliminado.
     *
     * @param id ID del usuario a reactivar
     * @return usuario reactivado
     */
    public Usuario reactivarUsuario(Long id) {
        Usuario usuario = getUsuarioById(id);
        usuario.setActivo(true);
        usuario.setFechaActualizacion(LocalDateTime.now());
        return usuarioRepository.save(usuario);
    }

    /**
     * Obtiene usuarios por rol.
     *
     * @param rol rol a filtrar
     * @return lista de usuarios con ese rol
     */
    public List<Usuario> getUsuariosByRol(RolUsuario rol) {
        return usuarioRepository.findByRol(rol);
    }

    /**
     * Obtiene usuarios activos.
     *
     * @return lista de usuarios activos
     */
    public List<Usuario> getUsuariosActivos() {
        return usuarioRepository.findByActivoTrue();
    }

    /**
     * Obtiene usuarios inactivos.
     *
     * @return lista de usuarios inactivos
     */
    public List<Usuario> getUsuariosInactivos() {
        return usuarioRepository.findByActivoFalse();
    }

    /**
     * Verifica si un usuario es administrador.
     *
     * @param id ID del usuario
     * @return true si es administrador
     */
    public boolean esAdministrador(Long id) {
        Usuario usuario = getUsuarioById(id);
        return usuario.getRol() == RolUsuario.ADMINISTRADOR;
    }
}