package com.guatequestore.backend.proveedor.model; // Paquete proveedor

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import com.guatequestore.backend.producto.model.Producto;


/**
 * @author Adrián Bienvenido
 * @version 1.0.2
 */


@Entity // Entidad JPA
@Table(name = "proveedores") // Tabla 'proveedor'
public class Proveedor { // Clase Proveedor

    @Id // clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment
    @Column(name = "ID_Proveedor") // columna ID_Proveedor
    private Long id; // id proveedor

    @Column(name = "nombre", nullable = false) // nombre obligatorio
    private String nombre; // nombre proveedor

    @Column(name = "direccion") // columna direccion
    private String direccion; // direccion proveedor

    @JsonIgnore // ignorar en JSON para evitar recursión
    @OneToMany(mappedBy = "proveedor", cascade = CascadeType.ALL, orphanRemoval = true) // 1 proveedor - N teléfonos
    private List<TelefonoProveedor> telefonos = new ArrayList<>(); // lista teléfonos

    @JsonIgnore // ignorar en JSON
    @OneToMany(mappedBy = "proveedor") // 1 proveedor - N productos
    private List<Producto> productos = new ArrayList<>(); // lista productos

    public Proveedor() {} // ctor vacío

    public Proveedor(String nombre, String direccion) {
        this.nombre = nombre; // asigna nombre
        this.direccion = direccion; // asigna direccion
    }

    public Long getId() { return id; } // get id
    public void setId(Long id) { this.id = id; } // set id
    public String getNombre() { return nombre; } // get nombre
    public void setNombre(String nombre) { this.nombre = nombre; } // set nombre
    public String getDireccion() { return direccion; } // get direccion
    public void setDireccion(String direccion) { this.direccion = direccion; } // set direccion
    public List<TelefonoProveedor> getTelefonos() { return telefonos; } // get telefonos
    public void setTelefonos(List<TelefonoProveedor> telefonos) { this.telefonos = telefonos; } // set telefonos
    public List<Producto> getProductos() { return productos; } // get productos
    public void setProductos(List<Producto> productos) { this.productos = productos; } // set productos
}