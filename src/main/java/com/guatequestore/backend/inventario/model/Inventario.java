package com.guatequestore.backend.inventario.model;


import com.guatequestore.backend.almacen.model.Almacen;
import com.guatequestore.backend.producto.model.Producto;
import jakarta.persistence.*;

@Entity
@Table(name = "inventario")
@IdClass(InventarioId.class)
public class Inventario {

    // ------------------------------------------------------------
    // Parte 1 de la clave primaria compuesta (ID_Almacen)
    // ------------------------------------------------------------
    @Id
    @Column(name = "id_almacen")
    private Long almacenId;

    // ------------------------------------------------------------
    // Parte 2 de la clave primaria compuesta (ID_Producto)
    // ------------------------------------------------------------
    @Id
    @Column(name = "id_producto")
    private Long productoId;

    // ------------------------------------------------------------
    // Cantidad disponible (INT)
    // ------------------------------------------------------------
    private Integer cantidad;

    // ------------------------------------------------------------
    // Relaciones opcionales para navegación
    // insertable = false, updatable = false
    // porque los IDs forman parte de la clave primaria
    // ------------------------------------------------------------
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_almacen", insertable = false, updatable = false)
    private Almacen almacen;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_producto", insertable = false, updatable = false)
    private Producto producto;

    // ------------------------------------------------------------
    // Getters y Setters
    // ------------------------------------------------------------
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

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Almacen getAlmacen() {
        return almacen;
    }

    public Producto getProducto() {
        return producto;
    }
}
