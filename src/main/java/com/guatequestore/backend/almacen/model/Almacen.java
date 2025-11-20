package com.guatequestore.backend.almacen.model;

import com.guatequestore.backend.pedido.model.Pedido;
import com.guatequestore.backend.inventario.model.Inventario;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "almacen")
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

    // RELACIÓN BIDIRECCIONAL CON PEDIDO
    @OneToMany(mappedBy = "almacen", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Pedido> pedidos = new HashSet<>();

    // NUEVA RELACIÓN BIDIRECCIONAL CON INVENTARIO
    @OneToMany(mappedBy = "almacen", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Inventario> inventarios = new HashSet<>();

    public Almacen() {}

    public Almacen(String nombre, Integer capacidad, String direccion) {
        this.nombre = nombre;
        this.capacidad = capacidad;
        this.direccion = direccion;
    }

    // Getters y Setters
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

    // MÉTODOS UTILITARIOS PARA PEDIDOS
    public void addPedido(Pedido pedido) {
        pedidos.add(pedido);
        pedido.setAlmacen(this);
    }

    public void removePedido(Pedido pedido) {
        pedidos.remove(pedido);
        pedido.setAlmacen(null);
    }

    // MÉTODOS UTILITARIOS PARA INVENTARIO
    public void addInventario(Inventario inventario) {
        inventarios.add(inventario);
        inventario.setAlmacen(this);
    }

    public void removeInventario(Inventario inventario) {
        inventarios.remove(inventario);
        inventario.setAlmacen(null);
    }
}