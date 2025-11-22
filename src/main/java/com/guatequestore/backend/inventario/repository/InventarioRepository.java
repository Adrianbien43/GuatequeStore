package com.guatequestore.backend.inventario.repository;

import com.guatequestore.backend.inventario.model.Inventario;
import org.springframework.data.jpa.repository.JpaRepository;
import com.guatequestore.backend.inventario.model.InventarioId;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

/**
 * Repositorio para acceder a los datos de Inventario
 *
 * @author Gorka Jesus
 * @version 1.0.3
 */

@Repository
public interface InventarioRepository extends JpaRepository<Inventario, InventarioId> {

    //Busca todos los inventarios de un almacen especifico
    List<Inventario> findByAlmacenId(Long almacenId);

    //Busca todos los almacenes donde existe un producto
    List<Inventario> findByProductoId(Long productoId);

    //Busca un inventario especifico por almacen y producto
    Optional<Inventario> findByAlmacenIdAndProductoId(Long almacenId, Long productoId);

    //Busca productos con stock bajo
    @Query("SELECT i FROM Inventario i WHERE i.cantidad < :limite")
    List<Inventario> findBajoStock(@Param("limite") Integer limite);
}