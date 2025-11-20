package com.guatequestore.backend.inventario.repository;

import com.guatequestore.backend.inventario.model.Inventario;
import org.springframework.data.jpa.repository.JpaRepository;
import com.guatequestore.backend.inventario.model.InventarioId;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface InventarioRepository extends JpaRepository<Inventario, InventarioId> {

    List<Inventario> findByAlmacenId(Long almacenId);

    List<Inventario> findByProductoId(Long productoId);

    Optional<Inventario> findByAlmacenIdAndProductoId(Long almacenId, Long productoId);

    @Query("SELECT i FROM Inventario i WHERE i.cantidad < :limite")
    List<Inventario> findBajoStock(@Param("limite") Integer limite);
}