package com.guatequestore.backend.cliente.model; // Paquete cliente

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
@Entity // Entidad JPA
@Table(name = "clientes") // Tabla 'clientes'
public class Cliente { // Clase Cliente

    /**
     * Identificador del cliente.
     * Se generará automáticamente mediante IDENTITY.
     */
    @Id // clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment
    private Long id; // id cliente

    @NotBlank(message = "Tienes que colocar el nombre") // no vacío
    @Size(min = 2, max = 100, message = "Tu nombre puede tener entre 2 y 100 caracteres") // longitud
    @Column(nullable = false) // columna no nula
    private String nombre; // nombre cliente

    @NotBlank(message = "Necesitas una contraseña") // no vacío
    @Size(min = 8, message = "Requiere 8 caracteres mínimos para tu contraseña") // mínimo 8
    @Column(nullable = false) // columna no nula
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) // solo escritura en JSON
    private String password; // contraseña (protegida en JSON)

    @Size(max = 255, message = "La dirección puede tener hasta 255 caracteres") // longitud
    private String direccion; // dirección del cliente

    @NotBlank(message = "No puedes dejar vacío el email") // no vacío
    @Email(message = "El email debe ser válido") // formato email
    @Column(nullable = false, unique = true) // no nulo y único
    private String email; // correo electrónico

    @Enumerated(EnumType.STRING) // guarda enum como String
    @Column(nullable = false) // no nulo
    private Rol rol = Rol.USER; // rol por defecto USER

    @Column(name = "fecha_creacion", nullable = false, updatable = false) // fecha creación inmutable
    private LocalDateTime fechaCreacion; // fecha de creación

    @Column(name = "fecha_actualizacion") // fecha última actualización
    private LocalDateTime fechaActualizacion; // fecha actualización

    @Column(name = "activo", nullable = false) // indicador activo
    private Boolean activo = true; // true si activo

    // Relación con teléfonos
    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true) // 1 cliente - N teléfonos
    @JsonIgnore // ignorar en JSON para evitar recursión
    private Set<TelefonoCliente> telefonos = new HashSet<>(); // conjunto de teléfonos

    // Relación con pedidos
    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true) // 1 cliente - N pedidos
    @JsonIgnore // ignorar en JSON
    private Set<Pedido> pedidos = new HashSet<>(); // conjunto de pedidos

    // Constructores
    public Cliente() {
        this.rol = Rol.obtenerRolPorDefecto(); // rol por defecto
        this.fechaCreacion = LocalDateTime.now(); // marca creación ahora
        this.activo = true; // activo por defecto
    }

    public Cliente(String nombre, String password, String direccion, String email) {
        this(); // llama ctor por defecto
        this.nombre = nombre; // set nombre
        this.password = password; // set password
        this.direccion = direccion; // set direccion
        this.email = email; // set email
    }

    public Cliente(Long id, String nombre, String password, String direccion, String email, Rol rol) {
        this(nombre, password, direccion, email); // delega al otro ctor
        this.rol = rol != null ? rol : Rol.obtenerRolPorDefecto(); // asigna rol o por defecto
    }

    @PreUpdate // hook JPA antes de actualizar
    protected void preUpdate() {
        this.fechaActualizacion = LocalDateTime.now(); // actualiza timestamp
    }

    // Getters y Setters
    public Long getId() { return id; } // get id

    public String getNombre() { return nombre; } // get nombre
    public void setNombre(String nombre) { this.nombre = nombre; } // set nombre

    public String getPassword() { return password; } // get password
    public void setPassword(String password) { this.password = password; } // set password

    public String getDireccion() { return direccion; } // get direccion
    public void setDireccion(String direccion) { this.direccion = direccion; } // set direccion

    public String getEmail() { return email; } // get email
    public void setEmail(String email) { this.email = email; } // set email

    public Rol getRol() { return rol; } // get rol
    public void setRol(Rol rol) { this.rol = rol != null ? rol : Rol.obtenerRolPorDefecto(); } // set rol segura

    public LocalDateTime getFechaCreacion() { return fechaCreacion; } // get fechaCreacion
    public LocalDateTime getFechaActualizacion() { return fechaActualizacion; } // get fechaActualizacion

    public Boolean getActivo() { return activo; } // get activo
    public void setActivo(Boolean activo) { this.activo = activo; } // set activo

    public Set<TelefonoCliente> getTelefonos() { return telefonos; } // get telefonos
    public void setTelefonos(Set<TelefonoCliente> telefonos) { this.telefonos = telefonos; } // set telefonos

    public Set<Pedido> getPedidos() { return pedidos; } // get pedidos
    public void setPedidos(Set<Pedido> pedidos) { this.pedidos = pedidos; } // set pedidos

    // Métodos de relación con teléfonos
    public void addTelefono(TelefonoCliente telefono) {
        if (telefono != null) {
            telefonos.add(telefono); // añade al set
            telefono.setCliente(this); // setea relación inversa
        }
    }

    public void removeTelefono(TelefonoCliente telefono) {
        if (telefono != null) {
            telefonos.remove(telefono); // elimina del set
            telefono.setCliente(null); // limpia relación inversa
        }
    }

    // Métodos de relación con pedidos
    public void addPedido(Pedido pedido) {
        if (pedido != null) {
            pedidos.add(pedido); // añade pedido
            pedido.setCliente(this); // setea relación inversa
        }
    }

    /**
     * Elimina un pedido asociado al cliente.
     */
    public void removePedido(Pedido pedido) {
        if (pedido != null) {
            pedidos.remove(pedido); // elimina pedido
            pedido.setCliente(null); // limpia relación inversa
        }
    }

    /**
     * Verifica si el cliente tiene permisos de administrador
     * @return true si el rol es ADMIN
     */
    public boolean esAdmin() {
        return this.rol == Rol.ADMIN; // true si rol ADMIN
    }

    /**
     * Verifica si el cliente está activo
     * @return true si está activo
     */
    public boolean estaActivo() {
        return Boolean.TRUE.equals(this.activo); // true si activo es TRUE
    }

    @Override
    public String toString() {
        return "Cliente{" +
                "id=" + id + // id
                ", nombre='" + nombre + '\'' + // nombre
                ", direccion='" + direccion + '\'' + // direccion
                ", email='" + email + '\'' + // email
                ", rol=" + rol + // rol
                ", activo=" + activo + // activo
                ", fechaCreacion=" + fechaCreacion + // fechaCreacion
                ", cantidadTelefonos=" + (telefonos != null ? telefonos.size() : 0) + // cuenta teléfonos
                ", cantidadPedidos=" + (pedidos != null ? pedidos.size() : 0) + // cuenta pedidos
                ", password='[PROTEGIDO]'" + // password oculto
                '}';
    }
}
