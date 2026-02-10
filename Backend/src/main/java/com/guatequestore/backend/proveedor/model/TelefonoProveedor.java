package com.guatequestore.backend.proveedor.model;

import jakarta.persistence.*;

@Entity
@Table(name = "telefono_proveedores")
public class TelefonoProveedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_TelefonoProveedor")
    private Long id;

    @Column(name = "telefono", nullable = false)
    private String telefono;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo", nullable = false)
    private TipoTelefono tipo;

    @ManyToOne
    @JoinColumn(name = "ID_Proveedor", nullable = false)
    private Proveedor proveedor;

    public TelefonoProveedor() {}

    public TelefonoProveedor(String telefono, TipoTelefono tipo, Proveedor proveedor) {
        this.telefono = telefono;
        this.tipo = tipo;
        this.proveedor = proveedor;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }
    public TipoTelefono getTipo() { return tipo; }
    public void setTipo(TipoTelefono tipo) { this.tipo = tipo; }
    public Proveedor getProveedor() { return proveedor; }
    public void setProveedor(Proveedor proveedor) { this.proveedor = proveedor; }
}