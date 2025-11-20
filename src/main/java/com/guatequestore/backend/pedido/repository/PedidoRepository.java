package com.guatequestore.backend.pedido.repository;

import com.guatequestore.backend.pedido.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}