package com.guatequestore.backend.almacen.repository;

import com.guatequestore.backend.almacen.model.Almacen;
import org.springframework.data.jpa.repository.JpaRepository;

// Repositorio para acceder a los datos de almacenes
public interface AlmacenRepository extends JpaRepository<Almacen, Long> {
}
