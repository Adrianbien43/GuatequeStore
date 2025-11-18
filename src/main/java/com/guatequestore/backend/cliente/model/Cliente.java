package com.guatequestore.backend.cliente.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "clientes")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank @Size(min = 2, max = 100)
    @Column(nullable = false)
    private String nombre;

    @NotBlank @Size(min = 8)
    @Column(nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) // no se expone al devolver JSON
    private String password;

    @Size(max = 255)
    private String direccion;

    @NotBlank @Email
    @Column(nullable = false, unique = true)
    private String email;

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<TelefonoCliente> telefonos = new HashSet<>();

    // Constructores
    public Cliente() {}
    public Cliente(String nombre, String password, String direccion, String email) {
        this.nombre = nombre;
        this.password = password;
        this.direccion = direccion;
        this.email = email;
    }

    // Getters y Setters
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

    // Utilidades para la relación bidireccional
    public void addTelefono(TelefonoCliente telefono) {
        telefonos.add(telefono);
        telefono.setCliente(this);
    }

    public void removeTelefono(TelefonoCliente telefono) {
        telefonos.remove(telefono);
        telefono.setCliente(null);
    }
}
