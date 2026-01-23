package com.guatequestore.backend.usuario.model;

import com.guatequestore.backend.pedido.model.Pedido;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.util.Set;
import java.util.HashSet;
import java.time.LocalDateTime;

/**
 * Entidad Usuario que representa un usuario del sistema.
 *
 * @author Adrian Bienvenido
 * @version 1.0.5
 */

@Entity
@Table(name = "usuario") // Cambiado de "clientes" a "usuario"
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Usuario") // Alineado con tu CREATE TABLE
    private Long idUsuario;

    @NotBlank(message = "Tienes que colocar el nombre")
    @Size(min = 2, max = 100, message = "Tu nombre puede tener entre 2 y 100 caracteres")
    @Column(nullable = false, name = "nombre")
    private String nombre;

    @NotBlank(message = "Necesitas una contraseña")
    @Size(min = 8, message = "Requiere 8 caracteres mínimos para tu contraseña")
    @Column(nullable = false, name = "contraseña") // Nombre exacto del CREATE TABLE
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String contraseña; // Cambiado de "password" a "contraseña"

    @Size(max = 255, message = "La dirección puede tener hasta 255 caracteres")
    @Column(name = "direccion")
    private String direccion;

    @NotBlank(message = "No puedes dejar vacío el email")
    @Email(message = "El email debe ser válido")
    @Column(nullable = false, unique = true, name = "email")
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "rol")
    private RolUsuario rol = RolUsuario.CLIENTE; // Cambiado a RolUsuario y valor por defecto CLIENTE

    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;

    @Column(name = "activo", nullable = false)
    private Boolean activo = true;

    // Relación con teléfonos (actualizada)
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<TelefonoUsuario> telefonos = new HashSet<>();

    // Relación con pedidos
    @OneToMany(mappedBy = "usuario")
    @JsonIgnore
    private Set<Pedido> pedidos = new HashSet<>();

    // Constructores
    public Usuario() {
        this.rol = RolUsuario.CLIENTE; // Valor por defecto según CREATE TABLE
        this.fechaCreacion = LocalDateTime.now();
        this.activo = true;
    }

    public Usuario(String nombre, String contraseña, String direccion, String email) {
        this();
        this.nombre = nombre;
        this.contraseña = contraseña;
        this.direccion = direccion;
        this.email = email;
    }

    public Usuario(Long idUsuario, String nombre, String contraseña, String direccion, String email, RolUsuario rol) {
        this(nombre, contraseña, direccion, email);
        this.idUsuario = idUsuario;
        this.rol = rol != null ? rol : RolUsuario.CLIENTE;
    }

    @PreUpdate
    protected void preUpdate() {
        this.fechaActualizacion = LocalDateTime.now();
    }

    // Getters y Setters
    public Long getIdUsuario() {
        return idUsuario;
    }
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getContraseña() {
        return contraseña;
    }

    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public RolUsuario getRol() {
        return rol;
    }

    public void setRol(RolUsuario rol) {
        this.rol = rol != null ? rol : RolUsuario.CLIENTE;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public LocalDateTime getFechaActualizacion() {
        return fechaActualizacion;
    }

    public void setFechaActualizacion(LocalDateTime fechaActualizacion) {
        this.fechaActualizacion = fechaActualizacion;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    public Set<TelefonoUsuario> getTelefonos() {
        return telefonos;
    }

    public void setTelefonos(Set<TelefonoUsuario> telefonos) {
        this.telefonos = telefonos;
    }

    public Set<Pedido> getPedidos() {
        return pedidos;
    }

    public void setPedidos(Set<Pedido> pedidos) {
        this.pedidos = pedidos;
    }

    // Métodos de relación con teléfonos
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

    // Métodos de relación con pedidos
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

    /**
     * Verifica si el usuario tiene permisos de administrador
     * @return true si el rol es ADMINISTRADOR
     */
    public boolean esAdmin() {
        return this.rol == RolUsuario.ADMINISTRADOR;
    }

    /**
     * Verifica si el usuario está activo
     * @return true si está activo
     */
    public boolean estaActivo() {
        return Boolean.TRUE.equals(this.activo);
    }

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
                ", cantidadTelefonos=" + (telefonos != null ? telefonos.size() : 0) +
                ", cantidadPedidos=" + (pedidos != null ? pedidos.size() : 0) +
                ", contraseña='[PROTEGIDO]'" +
                '}';
    }
}