package com.guatequestore.backend.proveedor.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import com.guatequestore.backend.producto.model.Producto;

@Entity
@Table(name = "proveedor")
public class Proveedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Proveedor")
    private Long id;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "direccion")
    private String direccion;

    @JsonIgnore
    @OneToMany(mappedBy = "proveedor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TelefonoProveedor> telefonos = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "proveedor")
    private List<Producto> productos = new ArrayList<>();

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
    public List<Producto> getProductos() { return productos; }
    public void setProductos(List<Producto> productos) { this.productos = productos; }
}