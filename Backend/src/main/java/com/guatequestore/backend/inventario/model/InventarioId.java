package com.guatequestore.backend.inventario.model; // Paquete inventario


import java.io.Serializable;
import java.util.Objects;

/**
 * Clase que representa la clave primaria compuesta de inventario.
 * Usa dos IDs: almacen y producto.
 * @author Gorka Jesus
 * @version 1.0
 */
public class InventarioId implements Serializable {

    private Long almacenId; // id del almacén
    private Long productoId; // id del producto


    // Constructores
    public InventarioId() {} // ctor vacío (serializable)

    public InventarioId(Long almacenId, Long productoId) {
        this.almacenId = almacenId; // asigna almacenId
        this.productoId = productoId; // asigna productoId
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true; // misma referencia
        if (!(o instanceof InventarioId)) return false; // distinto tipo
        InventarioId that = (InventarioId) o; // casteo seguro
        return Objects.equals(almacenId, that.almacenId) && // compara almacenId
                Objects.equals(productoId, that.productoId); // compara productoId
    }

    @Override
    public int hashCode() {
        return Objects.hash(almacenId, productoId); // hash basado en ambos ids
    }

    public Long getAlmacenId() { return almacenId; } // get almacenId

    public void setAlmacenId(Long almacenId) { this.almacenId = almacenId; } // set almacenId

    public Long getProductoId() { return productoId; } // get productoId

    public void setProductoId(Long productoId) { this.productoId = productoId; } // set productoId
}