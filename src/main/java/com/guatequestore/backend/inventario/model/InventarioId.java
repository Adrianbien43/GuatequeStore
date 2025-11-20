package com.guatequestore.backend.inventario.model;


import java.io.Serializable;
import java.util.Objects;

// ------------------------------------------------------------
// Clase que representa la clave primaria compuesta:
// ID_Almacen + ID_Producto
// ------------------------------------------------------------
public class InventarioId implements Serializable {

    private Long almacenId;
    private Long productoId;

    public InventarioId() {}

    public InventarioId(Long almacenId, Long productoId) {
        this.almacenId = almacenId;
        this.productoId = productoId;
    }

    // ------------------------------------------------------------
    // equals() y hashCode() obligatorios para @IdClass
    // ------------------------------------------------------------
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof InventarioId)) return false;
        InventarioId that = (InventarioId) o;
        return Objects.equals(almacenId, that.almacenId) &&
                Objects.equals(productoId, that.productoId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(almacenId, productoId);
    }

    public Long getAlmacenId() {
        return almacenId;
    }

    public void setAlmacenId(Long almacenId) {
        this.almacenId = almacenId;
    }

    public Long getProductoId() {
        return productoId;
    }

    public void setProductoId(Long productoId) {
        this.productoId = productoId;
    }
}