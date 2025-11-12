package com.pgv.holamundo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "telefono_cliente")
public class TelefonoCliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_TelefonoCliente")
    private Long id;

    @Column(name = "telefono", length = 20, nullable = false)
    private String telefono;

    @Column(name = "tipo", length = 10)
    private String tipo; // Ejemplo: "CASA", "TRABAJO", "MOVIL"

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_Cliente", nullable = false)
    private Cliente cliente;

    // Constructores
    public TelefonoCliente() {}

    public TelefonoCliente(String telefono, String tipo, Cliente cliente) {
        this.telefono = telefono;
        this.tipo = tipo;
        this.cliente = cliente;
    }

    // Getters y Setters (se mantienen igual)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
}