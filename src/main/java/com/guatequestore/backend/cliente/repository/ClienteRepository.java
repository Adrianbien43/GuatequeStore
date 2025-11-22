package com.guatequestore.backend.cliente.repository;

import com.guatequestore.backend.cliente.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repositorio para la entidad Cliente.
 *
 * Proporciona métodos CRUD y búsquedas personalizadas para Cliente.
 *
 * Principios aplicados:
 * - Repository Pattern: Abstrae el acceso a datos
 * - Single Responsibility: Solo gestiona operaciones de persistencia
 * - Dependency Injection: Es inyectable en servicios
 *
 * @author Guateque Store
 * @since 1.0
 * @see Cliente
 */
@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    /**
     * Busca un cliente por su email.
     *
     * El email es único, por lo que retorna un Optional.
     *
     * Casos de uso:
     * - Autenticación: Validar credenciales de login
     * - Verificar disponibilidad de email al registrar
     * - Recuperación de contraseña
     *
     * @param email el email del cliente a buscar
     * @return Optional<Cliente> con el cliente si existe, vacío si no
     *
     * @example
     * Optional<Cliente> cliente = clienteRepository.findByEmail("juan@example.com");
     * if (cliente.isPresent()) {
     *     System.out.println("Cliente encontrado: " + cliente.get().getNombre());
     * }
     */
    Optional<Cliente> findByEmail(String email);
}