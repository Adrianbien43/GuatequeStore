package com.guatequestore.backend.usuario.repository;

import com.guatequestore.backend.usuario.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repositorio para la entidad Usuario.
 *
 * Proporciona métodos CRUD y búsquedas personalizadas para Usuario.
 *
 * Principios aplicados:
 * - Repository Pattern: Abstrae el acceso a datos
 * - Single Responsibility: Solo gestiona operaciones de persistencia
 * - Dependency Injection: Es inyectable en servicios
 *
 * @author Guateque Store
 * @since 1.0
 * @see Usuario
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    /**
     * Busca un usuario por su email.
     *
     * El email es único, por lo que retorna un Optional.
     *
     * Casos de uso:
     * - Autenticación: Validar credenciales de login
     * - Verificar disponibilidad de email al registrar
     * - Recuperación de contraseña
     *
     * @param email el email del usuario a buscar
     * @return Optional<Usuario> con el usuario si existe, vacío si no
     *
     * @example
     * Optional<Usuario> usuario = usuarioRepository.findByEmail("juan@example.com");
     * if (usuario.isPresent()) {
     *     System.out.println("Usuario encontrado: " + usuario.get().getNombre());
     * }
     */
    Optional<Usuario> findByEmail(String email);

    /**
     * Verifica si existe un usuario con el email especificado.
     *
     * @param email email a verificar
     * @return true si existe, false si no
     */
    boolean existsByEmail(String email);

    /**
     * Busca usuarios por su rol.
     *
     * @param rol rol a buscar (CLIENTE o ADMINISTRADOR)
     * @return lista de usuarios con ese rol
     */
    List<Usuario> findByRol(com.guatequestore.backend.usuario.model.RolUsuario rol);

    /**
     * Busca usuarios activos.
     *
     * @return lista de usuarios con activo = true
     */
    List<Usuario> findByActivoTrue();

    /**
     * Busca usuarios inactivos.
     *
     * @return lista de usuarios con activo = false
     */
    List<Usuario> findByActivoFalse();
}