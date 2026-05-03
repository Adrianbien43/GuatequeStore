package com.guatequestore.backend.lineapedido.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.guatequestore.backend.pedido.model.Pedido;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

@Entity
@Table(name = "lineas_pedido")
public class LineaPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pedido_id", nullable = false)
    @JsonIgnore
    private Pedido pedido;

    @NotNull
    @Column(name = "producto_id", nullable = false)
    private Long productoId;

    @NotNull
    private Integer cantidad;

    @NotNull
    @Column(name = "precio_unitario_venta", nullable = false)
    private Double precioUnitarioVenta;

    @Column(name = "subtotal")
    private Double subtotal;

    @Column(name = "created_at")
    private LocalDate createdAt;

    public LineaPedido() {
        this.createdAt = LocalDate.now();
    }

    public LineaPedido(Pedido pedido, Long productoId, Integer cantidad, Double precioUnitarioVenta) {
        this.pedido = pedido;
        this.productoId = productoId;
        this.cantidad = cantidad;
        this.precioUnitarioVenta = precioUnitarioVenta;
        this.subtotal = cantidad * precioUnitarioVenta;
        this.createdAt = LocalDate.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
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
        calcularSubtotal();
    }

    public Double getPrecioUnitarioVenta() {
        return precioUnitarioVenta;
    }

    public void setPrecioUnitarioVenta(Double precioUnitarioVenta) {
        this.precioUnitarioVenta = precioUnitarioVenta;
        calcularSubtotal();
    }

    public Double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    private void calcularSubtotal() {
        if (cantidad != null && precioUnitarioVenta != null) {
            this.subtotal = cantidad * precioUnitarioVenta;
        }
    }
}