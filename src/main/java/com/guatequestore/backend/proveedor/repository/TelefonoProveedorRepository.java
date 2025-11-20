package com.guatequestore.backend.proveedor.repository;

import com.guatequestore.backend.proveedor.model.TelefonoProveedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TelefonoProveedorRepository extends JpaRepository<TelefonoProveedor, Long> {
}