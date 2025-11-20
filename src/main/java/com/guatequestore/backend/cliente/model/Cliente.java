package com.guatequestore.backend.cliente.model;

import com.guatequestore.backend.pedido.model.Pedido;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "clientes")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min = 2, max = 100)
    @Column(nullable = false)
    private String nombre;

    @NotBlank
    @Size(min = 8)
    @Column(nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) // Solo se usa al crear/actualizar
    private String password;

    @Size(max = 255)
    private String direccion;

    @NotBlank
    @Email
    @Column(nullable = false, unique = true)
    private String email;

    // Relación con teléfonos - SIN problemas de recursividad
    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<TelefonoCliente> telefonos = new HashSet<>();

    // Relación con pedidos - CON JsonIgnore para evitar recursividad
    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // ← Esto evita que se serialicen los pedidos en el JSON
    private Set<Pedido> pedidos = new HashSet<>();

    // Constructores
    public Cliente() {}

    public Cliente(String nombre, String password, String direccion, String email) {
        this.nombre = nombre;
        this.password = password;
        this.direccion = direccion;
        this.email = email;
    }

    // Getters and Setters
    public Long getId() { return id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Set<TelefonoCliente> getTelefonos() { return telefonos; }
    public void setTelefonos(Set<TelefonoCliente> telefonos) { this.telefonos = telefonos; }

    public Set<Pedido> getPedidos() { return pedidos; }
    public void setPedidos(Set<Pedido> pedidos) { this.pedidos = pedidos; }

    // Métodos para teléfonos
    public void addTelefono(TelefonoCliente telefono) {
        telefonos.add(telefono);
        telefono.setCliente(this);
    }

    public void removeTelefono(TelefonoCliente telefono) {
        telefonos.remove(telefono);
        telefono.setCliente(null);
    }

    // Métodos para pedidos (funcionan internamente, pero no se serializan a JSON)
    public void addPedido(Pedido pedido) {
        pedidos.add(pedido);
        pedido.setCliente(this);
    }

    public void removePedido(Pedido pedido) {
        pedidos.remove(pedido);
        pedido.setCliente(null);
    }

    // Método toString() seguro (evita recursividad)
    @Override
    public String toString() {
        return "Cliente{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", direccion='" + direccion + '\'' +
                ", email='" + email + '\'' +
                ", cantidadTelefonos=" + (telefonos != null ? telefonos.size() : 0) +
                ", cantidadPedidos=" + (pedidos != null ? pedidos.size() : 0) +
                '}';
    }
}