package com.guatequestore.backend.lineapedido.repository;



import com.guatequestore.backend.lineapedido.model.LineaPedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LineaPedidoRepository extends JpaRepository<LineaPedido, Long> {
    List<LineaPedido> findByPedidoId(Long pedidoId);
}