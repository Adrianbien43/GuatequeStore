package com.guatequestore.backend.almacen.repository;

import com.guatequestore.backend.almacen.model.Almacen;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlmacenRepository extends JpaRepository<Almacen, Long> {
}