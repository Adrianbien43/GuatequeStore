package com.guatequestore.backend.pedido.repository;

import com.guatequestore.backend.pedido.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

// Esta interfaz se encarga de comunicarse con la base de datos
// JpaRepository nos da métodos gratis como save, findAll, findById, delete
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    // No necesitamos escribir métodos básicos, Spring Data JPA los provee automáticamente
}