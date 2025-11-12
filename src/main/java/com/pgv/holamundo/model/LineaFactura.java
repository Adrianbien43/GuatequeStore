package com.pgv.holamundo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "linea_factura")
public class LineaFactura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_LineaFactura")
    private Long id;

    private Double subtotal;

    @ManyToOne
    @JoinColumn(name = "ID_Factura")
    private Factura factura;

    @OneToOne
    @JoinColumn(name = "ID_LineaPedido")
    private LineaPedido lineaPedido;

    // Constructores
    public LineaFactura() {}

    public LineaFactura(Double subtotal, Factura factura, LineaPedido lineaPedido) {
        this.subtotal = subtotal;
        this.factura = factura;
        this.lineaPedido = lineaPedido;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }

    public Factura getFactura() {
        return factura;
    }

    public void setFactura(Factura factura) {
        this.factura = factura;
    }

    public LineaPedido getLineaPedido() {
        return lineaPedido;
    }

    public void setLineaPedido(LineaPedido lineaPedido) {
        this.lineaPedido = lineaPedido;
    }
}