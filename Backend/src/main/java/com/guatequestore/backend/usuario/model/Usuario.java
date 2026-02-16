package com.guatequestore.backend.usuario.model;

import com.guatequestore.backend.pedido.model.Pedido;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.Set;
import java.util.HashSet;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.Optional;

/**
 * Entidad Usuario que representa un usuario del sistema.
 *
 * @author Adrian Bienvenido
 * @version 1.0.6
 */
@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Usuario")
    private Long idUsuario;

    @NotBlank
    @Size(min = 2, max = 100)
    @Column(nullable = false, name = "nombre")
    private String nombre;

    @Size(max = 255)
    @Column(name = "direccion")
    private String direccion;

    @NotBlank
    @Email
    @Column(nullable = false, unique = true, name = "email")
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "rol")
    private RolUsuario rol = RolUsuario.CLIENTE;

    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;

    @Column(name = "activo", nullable = false)
    private Boolean activo = true;

    // Historial de contraseñas (lista; la más reciente es la actual)
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Contrasena> contrasenas = new HashSet<>();

    // Relación con teléfonos
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<TelefonoUsuario> telefonos = new HashSet<>();

    // Relación con pedidos
    @OneToMany(mappedBy = "usuario")
    @JsonIgnore
    private Set<Pedido> pedidos = new HashSet<>();

    // Constructores
    public Usuario() {
        this.rol = RolUsuario.CLIENTE;
        this.fechaCreacion = LocalDateTime.now();
        this.activo = true;
    }

    public Usuario(String nombre, String direccion, String email) {
        this();
        this.nombre = nombre;
        this.direccion = direccion;
        this.email = email;
    }

    public Usuario(Long idUsuario, String nombre, String direccion, String email, RolUsuario rol) {
        this(nombre, direccion, email);
        this.idUsuario = idUsuario;
        this.rol = rol != null ? rol : RolUsuario.CLIENTE;
    }

    @PreUpdate
    protected void preUpdate() {
        this.fechaActualizacion = LocalDateTime.now();
    }

    // Getters / Setters (incluyo getId()/setId() para compatibilidad)
    public Long getIdUsuario() { return idUsuario; }
    public Long getId() { return idUsuario; }
    public void setId(Long id) { this.idUsuario = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public RolUsuario getRol() { return rol; }
    public void setRol(RolUsuario rol) { this.rol = rol != null ? rol : RolUsuario.CLIENTE; }

    public LocalDateTime getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(LocalDateTime fechaCreacion) { this.fechaCreacion = fechaCreacion; }

    public LocalDateTime getFechaActualizacion() { return fechaActualizacion; }
    public void setFechaActualizacion(LocalDateTime fechaActualizacion) { this.fechaActualizacion = fechaActualizacion; }

    public Boolean getActivo() { return activo; }
    public void setActivo(Boolean activo) { this.activo = activo; }

    public Set<Contrasena> getContrasenas() { return contrasenas; }
    public void setContrasenas(Set<Contrasena> contrasenas) { this.contrasenas = contrasenas; }

    public Set<TelefonoUsuario> getTelefonos() { return telefonos; }
    public void setTelefonos(Set<TelefonoUsuario> telefonos) { this.telefonos = telefonos; }

    public Set<Pedido> getPedidos() { return pedidos; }
    public void setPedidos(Set<Pedido> pedidos) { this.pedidos = pedidos; }

    // Métodos auxiliares para contraseñas
    public void addContrasena(Contrasena c) {
        if (c != null) {
            contrasenas.add(c);
            c.setUsuario(this);
        }
    }

    public void removeContrasena(Contrasena c) {
        if (c != null) {
            contrasenas.remove(c);
            c.setUsuario(null);
        }
    }

    // Métodos auxiliares relaciones (telefonos/pedidos)
    public void addTelefono(TelefonoUsuario telefono) {
        if (telefono != null) {
            telefonos.add(telefono);
            telefono.setUsuario(this);
        }
    }

    public void removeTelefono(TelefonoUsuario telefono) {
        if (telefono != null) {
            telefonos.remove(telefono);
            telefono.setUsuario(null);
        }
    }

    public void addPedido(Pedido pedido) {
        if (pedido != null) {
            pedidos.add(pedido);
            pedido.setUsuario(this);
        }
    }

    public void removePedido(Pedido pedido) {
        if (pedido != null) {
            pedidos.remove(pedido);
            pedido.setUsuario(null);
        }
    }


    public String getHashActual() {
        Optional<Contrasena> ultima = this.contrasenas.stream()
                .max(Comparator.comparing(Contrasena::getFechaCreacion));
        return ultima.map(Contrasena::getHash).orElse(null);
    }

    // Utilidades
    public boolean esAdmin() { return this.rol == RolUsuario.ADMINISTRADOR; }
    public boolean estaActivo() { return Boolean.TRUE.equals(this.activo); }

    @Override
    public String toString() {
        return "Usuario{" +
                "idUsuario=" + idUsuario +
                ", nombre='" + nombre + '\'' +
                ", direccion='" + direccion + '\'' +
                ", email='" + email + '\'' +
                ", rol=" + rol +
                ", activo=" + activo +
                ", fechaCreacion=" + fechaCreacion +
                // ELIMINA COMPLETAMENTE estas líneas problemáticas:
                // ", cantidadTelefonos=" + (telefonos != null ? telefonos.size() : 0) +
                // ", cantidadPedidos=" + (pedidos != null ? pedidos.size() : 0) +
                '}';
    }
}

