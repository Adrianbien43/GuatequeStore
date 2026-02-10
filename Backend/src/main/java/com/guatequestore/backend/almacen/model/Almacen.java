package com.guatequestore.backend.almacen.model; // Paquete para modelos de almacén

import com.guatequestore.backend.pedido.model.Pedido;
import com.guatequestore.backend.inventario.model.Inventario;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import java.util.Set;
import java.util.HashSet;


/**
 * @author Adrián Bienvenido Morales Perdomo
 * @version 1.1.5
 *
 * Esta clase es una entidad: almacenes de la base de datos.
 */

@Entity
@Table(name = "almacenes")
public class Almacen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_almacen")
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String nombre;

    @Positive
    private Integer capacidad;

    private String direccion;

    // RELACIÓN: Un almacén puede tener muchos pedidos
    @OneToMany(mappedBy = "almacen", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Pedido> pedidos = new HashSet<>();

    // RELACIÓN: Un almacén puede tener muchos items en inventario
    @OneToMany(mappedBy = "almacen", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Inventario> inventarios = new HashSet<>();

    //Constructores

    public Almacen() {}

    public Almacen(String nombre, Integer capacidad, String direccion) {
        this.nombre = nombre;
        this.capacidad = capacidad;
        this.direccion = direccion;
    }

    // GETTERS AND SETTERS

    public Long getId() { return id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public Integer getCapacidad() { return capacidad; }
    public void setCapacidad(Integer capacidad) { this.capacidad = capacidad; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }

    public Set<Pedido> getPedidos() { return pedidos; }
    public void setPedidos(Set<Pedido> pedidos) { this.pedidos = pedidos; }

    public Set<Inventario> getInventarios() { return inventarios; }
    public void setInventarios(Set<Inventario> inventarios) { this.inventarios = inventarios; }


    // Métodos auxiliares

    // Añade un pedido al almacén
    public void addPedido(Pedido pedido) {
        pedidos.add(pedido);
        pedido.setAlmacen(this);
    }

    // Elimina un pedido del almacén
    public void removePedido(Pedido pedido) {
        pedidos.remove(pedido);
        pedido.setAlmacen(null);
    }

    // Añade un inventario al almacén
    public void addInventario(Inventario inventario) {
        inventarios.add(inventario);
        inventario.setAlmacen(this);
    }

    // Elimina un inventario del almacén
    public void removeInventario(Inventario inventario) {
        inventarios.remove(inventario);
        inventario.setAlmacen(null);
    }

    // Representación en texto del objeto (excluye relaciones para evitar recursividad)
    @Override
    public String toString() {
        return "Almacen{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", capacidad=" + capacidad +
                ", direccion='" + direccion + '\'' +
                '}';
    }
}