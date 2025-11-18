package com.guatequestore.backend.cliente.repository;

import com.guatequestore.backend.cliente.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}

