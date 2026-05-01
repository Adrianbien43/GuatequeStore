package com.example.android.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Proveedor implements Serializable {
    private Long id;
    private String nombre;
    private String direccion;
    private List<TelefonoProveedor> telefonos = new ArrayList<>();

    public Proveedor() {}
    public Proveedor(String nombre, String direccion) {
        this.nombre = nombre;
        this.direccion = direccion;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }
    public List<TelefonoProveedor> getTelefonos() { return telefonos; }
    public void setTelefonos(List<TelefonoProveedor> telefonos) { this.telefonos = telefonos; }
}