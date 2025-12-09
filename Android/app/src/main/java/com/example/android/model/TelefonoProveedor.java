package com.example.android.model;

import java.io.Serializable;

public class TelefonoProveedor implements Serializable {
    private Long id;
    private String telefono;
    private String tipo; // "MOVIL" o "FIJO"

    public TelefonoProveedor() {}
    public TelefonoProveedor(String telefono, String tipo) {
        this.telefono = telefono;
        this.tipo = tipo;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
}