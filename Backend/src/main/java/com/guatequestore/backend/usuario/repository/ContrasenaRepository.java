package com.guatequestore.backend.usuario.repository;

import com.guatequestore.backend.usuario.model.Contrasena;
import com.guatequestore.backend.usuario.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ContrasenaRepository extends JpaRepository<Contrasena, Long> {

    // Obtener la contraseña más reciente para un usuario
    Optional<Contrasena> findTopByUsuarioOrderByFechaCreacionDesc(Usuario usuario);

    // Obtener las últimas contraseñas (Spring Data no soporta "TopN" dinámico directo,
    // pero podemos definir "Top5" o usar Pageable; definimos Top5 por defecto)
    List<Contrasena> findTop5ByUsuarioOrderByFechaCreacionDesc(Usuario usuario);
}
