package com.pgv.holamundo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "linea_pedido")
public class LineaPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_LineaPedido")
    private Long id;

    private Integer cantidad;

    @Column(name = "Precio_Unitario_Venta")
    private Double precioUnitarioVenta;

    @ManyToOne
    @JoinColumn(name = "ID_Pedido")
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "ID_Producto")
    private Producto producto;

    @JsonIgnore
    @OneToOne(mappedBy = "lineaPedido", cascade = CascadeType.ALL)
    private LineaFactura lineaFactura;

    // Constructores
    public LineaPedido() {}

    public LineaPedido(Integer cantidad, Double precioUnitarioVenta, Pedido pedido, Producto producto) {
        this.cantidad = cantidad;
        this.precioUnitarioVenta = precioUnitarioVenta;
        this.pedido = pedido;
        this.producto = producto;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Double getPrecioUnitarioVenta() {
        return precioUnitarioVenta;
    }

    public void setPrecioUnitarioVenta(Double precioUnitarioVenta) {
        this.precioUnitarioVenta = precioUnitarioVenta;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public LineaFactura getLineaFactura() {
        return lineaFactura;
    }

    public void setLineaFactura(LineaFactura lineaFactura) {
        this.lineaFactura = lineaFactura;
    }
}