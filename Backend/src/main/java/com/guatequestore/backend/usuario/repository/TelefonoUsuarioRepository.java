package com.guatequestore.backend.usuario.repository;

import com.guatequestore.backend.usuario.model.TelefonoUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TelefonoUsuarioRepository extends JpaRepository<TelefonoUsuario, Long> {
    // Aquí podrías agregar consultas personalizadas si quieres, por ejemplo por usuario
}
