package com.guatequestore.backend.pedido.repository;

import com.guatequestore.backend.pedido.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    List<Pedido> findByUsuario_IdUsuario(Long usuarioId);

    @Query("SELECT DISTINCT p FROM Pedido p LEFT JOIN FETCH p.lineas WHERE p.usuario.idUsuario = :usuarioId")
    List<Pedido> findByUsuario_IdUsuarioWithLineas(@Param("usuarioId") Long usuarioId);
}