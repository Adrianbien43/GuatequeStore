package com.guatequestore.backend.cliente.model;

import com.guatequestore.backend.pedido.model.Pedido;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.util.Set;
import java.util.HashSet;
import java.time.LocalDateTime;

/**
 * Entidad Cliente que representa un usuario del sistema.
 *
 * @author Adrian Bienvenido
 * @version 1.0.5
 */
@Entity
@Table(name = "clientes")
public class Cliente {

    /**
     * Identificador del cliente.
     * Se generará automáticamente mediante IDENTITY.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Tienes que colocar el nombre")
    @Size(min = 2, max = 100, message = "Tu nombre puede tener entre 2 y 100 caracteres")
    @Column(nullable = false)
    private String nombre;

    @NotBlank(message = "Necesitas una contraseña")
    @Size(min = 8, message = "Requiere 8 caracteres mínimos para tu contraseña")
    @Column(nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Size(max = 255, message = "La dirección puede tener hasta 255 caracteres")
    private String direccion;

    @NotBlank(message = "No puedes dejar vacío el email")
    @Email(message = "El email debe ser válido")
    @Column(nullable = false, unique = true)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Rol rol = Rol.USER;

    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;

    @Column(name = "activo", nullable = false)
    private Boolean activo = true;

    // Relación con teléfonos
    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<TelefonoCliente> telefonos = new HashSet<>();

    // Relación con pedidos
    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Pedido> pedidos = new HashSet<>();

    // Constructores
    public Cliente() {
        this.rol = Rol.obtenerRolPorDefecto();
        this.fechaCreacion = LocalDateTime.now();
        this.activo = true;
    }

    public Cliente(String nombre, String password, String direccion, String email) {
        this();
        this.nombre = nombre;
        this.password = password;
        this.direccion = direccion;
        this.email = email;
    }

    public Cliente(Long id, String nombre, String password, String direccion, String email, Rol rol) {
        this(nombre, password, direccion, email);
        this.rol = rol != null ? rol : Rol.obtenerRolPorDefecto();
    }

    @PreUpdate
    protected void preUpdate() {
        this.fechaActualizacion = LocalDateTime.now();
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

    public Rol getRol() { return rol; }
    public void setRol(Rol rol) { this.rol = rol != null ? rol : Rol.obtenerRolPorDefecto(); }

    public LocalDateTime getFechaCreacion() { return fechaCreacion; }
    public LocalDateTime getFechaActualizacion() { return fechaActualizacion; }

    public Boolean getActivo() { return activo; }
    public void setActivo(Boolean activo) { this.activo = activo; }

    public Set<TelefonoCliente> getTelefonos() { return telefonos; }
    public void setTelefonos(Set<TelefonoCliente> telefonos) { this.telefonos = telefonos; }

    public Set<Pedido> getPedidos() { return pedidos; }
    public void setPedidos(Set<Pedido> pedidos) { this.pedidos = pedidos; }

    // Métodos de relación con teléfonos
    public void addTelefono(TelefonoCliente telefono) {
        if (telefono != null) {
            telefonos.add(telefono);
            telefono.setCliente(this);
        }
    }

    public void removeTelefono(TelefonoCliente telefono) {
        if (telefono != null) {
            telefonos.remove(telefono);
            telefono.setCliente(null);
        }
    }

    // Métodos de relación con pedidos
    public void addPedido(Pedido pedido) {
        if (pedido != null) {
            pedidos.add(pedido);
            pedido.setCliente(this);
        }
    }

    /**
     * Elimina un pedido asociado al cliente.
     */
    public void removePedido(Pedido pedido) {
        if (pedido != null) {
            pedidos.remove(pedido);
            pedido.setCliente(null);
        }
    }

    /**
     * Verifica si el cliente tiene permisos de administrador
     * @return true si el rol es ADMIN
     */
    public boolean esAdmin() {
        return this.rol == Rol.ADMIN;
    }

    /**
     * Verifica si el cliente está activo
     * @return true si está activo
     */
    public boolean estaActivo() {
        return Boolean.TRUE.equals(this.activo);
    }

    @Override
    public String toString() {
        return "Cliente{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", direccion='" + direccion + '\'' +
                ", email='" + email + '\'' +
                ", rol=" + rol +
                ", activo=" + activo +
                ", fechaCreacion=" + fechaCreacion +
                ", cantidadTelefonos=" + (telefonos != null ? telefonos.size() : 0) +
                ", cantidadPedidos=" + (pedidos != null ? pedidos.size() : 0) +
                ", password='[PROTEGIDO]'" +
                '}';
    }
}
