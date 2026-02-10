package com.guatequestore.backend.inventario.model; // Paquete inventario

import com.guatequestore.backend.almacen.model.Almacen;
import com.guatequestore.backend.producto.model.Producto;
import jakarta.persistence.*;


/**
 * Modelo para el stock donde estan los productos.
 * Representa el inventario (stock).
 * @author Gorka Jesus
 * @version 1.0.2
 */

@Entity // Entidad JPA
@Table(name = "inventarios") // Tabla 'inventario'
@IdClass(InventarioId.class) // Clave compuesta (almacenId + productoId)
public class Inventario { // Entidad inventario

    @Id // PK parte 1
    @Column(name = "id_almacen") // columna 'id_almacen'
    private Long almacenId; // id almacén

    @Id // PK parte 2
    @Column(name = "id_producto") // columna 'id_producto'
    private Long productoId; // id producto

    private Integer cantidad; // unidades en stock

    @ManyToOne(fetch = FetchType.LAZY) // relación a Almacen (LAZY)
    @JoinColumn(name = "id_almacen", insertable = false, updatable = false) // join id_almacen (no write)
    private Almacen almacen; // referencia Almacen

    @ManyToOne(fetch = FetchType.LAZY) // relación a Producto (LAZY)
    @JoinColumn(name = "id_producto", insertable = false, updatable = false) // join id_producto (no write)
    private Producto producto; // referencia Producto


    // Constructores

    public Inventario() {} // Constructor vacío (JPA)

    public Inventario(Long almacenId, Long productoId, Integer cantidad) {
        this.almacenId = almacenId; // asigna id almacén
        this.productoId = productoId; // asigna id producto
        this.cantidad = cantidad; // asigna cantidad
    }

    public Inventario(Almacen almacen, Producto producto, Integer cantidad) {
        this.almacen = almacen; // asigna Almacen
        this.producto = producto; // asigna Producto
        this.almacenId = almacen.getId(); // sincroniza almacenId
        this.productoId = producto.getId(); // sincroniza productoId
        this.cantidad = cantidad; // asigna cantidad
    }

    // Accesores
    public Long getAlmacenId() { return almacenId; } // get almacenId
    public void setAlmacenId(Long almacenId) { this.almacenId = almacenId; } // set almacenId

    public Long getProductoId() { return productoId; } // get productoId
    public void setProductoId(Long productoId) { this.productoId = productoId; } // set productoId

    public Integer getCantidad() { return cantidad; } // get cantidad
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; } // set cantidad

    public Almacen getAlmacen() { return almacen; } // get Almacen
    public void setAlmacen(Almacen almacen) {
        this.almacen = almacen; // set Almacen
        if (almacen != null) { // si no es null
            this.almacenId = almacen.getId(); // actualizar almacenId
        }
    }

    public Producto getProducto() { return producto; } // get Producto
    public void setProducto(Producto producto) {
        this.producto = producto; // set Producto
        if (producto != null) { // si no es null
            this.productoId = producto.getId(); // actualizar productoId
        }
    }

    // Utilidades

    public InventarioId getId() {
        return new InventarioId(almacenId, productoId); // devuelve clave compuesta
    }

    public void setId(InventarioId id) {
        this.almacenId = id.getAlmacenId(); // set almacenId desde InventarioId
        this.productoId = id.getProductoId(); // set productoId desde InventarioId
    }
}