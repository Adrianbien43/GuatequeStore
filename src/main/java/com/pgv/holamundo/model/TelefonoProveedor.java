package com.pgv.holamundo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "telefono_proveedor")
public class TelefonoProveedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_TelefonoProveedor")
    private Long id;

    private String telefono;
    private String tipo;

    @ManyToOne
    @JoinColumn(name = "ID_Proveedor")
    private Proveedor proveedor;

    // Constructores
    public TelefonoProveedor() {}

    public TelefonoProveedor(String telefono, String tipo, Proveedor proveedor) {
        this.telefono = telefono;
        this.tipo = tipo;
        this.proveedor = proveedor;
    }

    // Getters y Setters
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

    public Proveedor getProveedor() {
        return proveedor;
    }

    public void setProveedor(Proveedor proveedor) {
        this.proveedor = proveedor;
    }
}