package com.guatequestore.backend.cliente.model;

import jakarta.persistence.*;

@Entity
public class TelefonoCliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String numero;

    @Enumerated(EnumType.STRING)
    private TipoTelefono tipo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    public TelefonoCliente() {}
    public TelefonoCliente(String numero, TipoTelefono tipo) {
        this.numero = numero;
        this.tipo = tipo;
    }

    public Long getId() { return id; }
    public String getNumero() { return numero; }
    public void setNumero(String numero) { this.numero = numero; }
    public TipoTelefono getTipo() { return tipo; }
    public void setTipo(TipoTelefono tipo) { this.tipo = tipo; }
    public Cliente getCliente() { return cliente; }
    public void setCliente(Cliente cliente) { this.cliente = cliente; }
}