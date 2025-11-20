package com.guatequestore.backend.inventario.model;

import com.guatequestore.backend.almacen.model.Almacen;
import com.guatequestore.backend.producto.model.Producto;
import jakarta.persistence.*;

@Entity
@Table(name = "inventario")
@IdClass(InventarioId.class) // ✅ Usa tu clase InventarioId
public class Inventario {

    // ------------------------------------------------------------
    // CLAVE PRIMARIA COMPUESTA - Parte 1
    // ------------------------------------------------------------
    @Id
    @Column(name = "id_almacen")
    private Long almacenId;

    // ------------------------------------------------------------
    // CLAVE PRIMARIA COMPUESTA - Parte 2
    // ------------------------------------------------------------
    @Id
    @Column(name = "id_producto")
    private Long productoId;

    // ------------------------------------------------------------
    // Atributos normales
    // ------------------------------------------------------------
    private Integer cantidad;

    // ------------------------------------------------------------
    // Relaciones bidireccionales (solo para navegación)
    // ------------------------------------------------------------
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_almacen", insertable = false, updatable = false)
    private Almacen almacen;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_producto", insertable = false, updatable = false)
    private Producto producto;

    // ------------------------------------------------------------
    // Constructores
    // ------------------------------------------------------------
    public Inventario() {}

    public Inventario(Long almacenId, Long productoId, Integer cantidad) {
        this.almacenId = almacenId;
        this.productoId = productoId;
        this.cantidad = cantidad;
    }

    public Inventario(Almacen almacen, Producto producto, Integer cantidad) {
        this.almacen = almacen;
        this.producto = producto;
        this.almacenId = almacen.getId();
        this.productoId = producto.getId();
        this.cantidad = cantidad;
    }

    // ------------------------------------------------------------
    // Getters y Setters
    // ------------------------------------------------------------
    public Long getAlmacenId() { return almacenId; }
    public void setAlmacenId(Long almacenId) { this.almacenId = almacenId; }

    public Long getProductoId() { return productoId; }
    public void setProductoId(Long productoId) { this.productoId = productoId; }

    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }

    public Almacen getAlmacen() { return almacen; }
    public void setAlmacen(Almacen almacen) {
        this.almacen = almacen;
        if (almacen != null) {
            this.almacenId = almacen.getId();
        }
    }

    public Producto getProducto() { return producto; }
    public void setProducto(Producto producto) {
        this.producto = producto;
        if (producto != null) {
            this.productoId = producto.getId();
        }
    }

    // ------------------------------------------------------------
    // Métodos utilitarios
    // ------------------------------------------------------------
    public InventarioId getId() {
        return new InventarioId(almacenId, productoId);
    }

    public void setId(InventarioId id) {
        this.almacenId = id.getAlmacenId();
        this.productoId = id.getProductoId();
    }
}