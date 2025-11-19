package com.guatequestore.backend.almacen.model;


import jakarta.persistence.*;

@Entity
@Table(name = "almacen")
public class Almacen {

    // ------------------------------------------------------------
    // Clave primaria autoincremental (ID_Almacen)
    // ------------------------------------------------------------
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_almacen")
    private Long id;

    // ------------------------------------------------------------
    // Nombre del almacén (VARCHAR)
    // ------------------------------------------------------------
    @Column(nullable = false)
    private String nombre;

    // ------------------------------------------------------------
    // Capacidad del almacén (INT)
    // ------------------------------------------------------------
    private Integer capacidad;

    // ------------------------------------------------------------
    // Dirección del almacén (VARCHAR)
    // ------------------------------------------------------------
    private String direccion;

    // No se incluye relación con Pedido porque aún no existe

    // ------------------------------------------------------------
    // Getters y Setters
    // ------------------------------------------------------------
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getCapacidad() {
        return capacidad;
    }

    public void setCapacidad(Integer capacidad) {
        this.capacidad = capacidad;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }
}
