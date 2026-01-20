package com.guatequestore.backend.pedido.model; // Paquete pedido

import com.guatequestore.backend.almacen.model.Almacen;
import com.guatequestore.backend.usuario.model.Usuario;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

/**
 * Modelo para los pedidos que esta relacionado con los usuarios.
 * Representan los pedidos.
 * @author Gorka Jesus
 * @version 1.0.3
 */

@Entity // Entidad JPA
@Table(name = "pedidos") // Tabla 'pedidos'
@JsonInclude(JsonInclude.Include.NON_NULL) // omite null en JSON
public class Pedido { // Clase Pedido

    @Id // clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment
    private Long id; // id pedido

    @NotNull // no nulo
    @Column(nullable = false) // columna no nula
    private LocalDate fechaPedido; // fecha del pedido

    @NotNull // no nulo
    @Enumerated(EnumType.STRING) // guarda enum como String
    @Column(nullable = false) // columna no nula
    private EstadoPedido estadoPedido; // estado del pedido

    // RELACIÓN BIDIRECCIONAL CON USUARIO
    @NotNull // no nulo
    @ManyToOne(fetch = FetchType.EAGER) // relación many-to-one EAGER
    @JoinColumn(name = "usuario_id", nullable = false) // FK usuario_id (cambiado de cliente_id)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "pedidos", "telefonos", "contraseña"}) // evita propiedades en JSON
    private Usuario usuario; // usuario asociado (cambiado de cliente)

    // RELACIÓN BIDIRECCIONAL CON ALMACEN
    @NotNull // no nulo
    @ManyToOne(fetch = FetchType.EAGER) // relación many-to-one EAGER
    @JoinColumn(name = "almacen_id", nullable = false) // FK almacen_id
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "pedidos", "inventarios"}) // evita propiedades en JSON
    private Almacen almacen; // almacen asociado

    public Pedido() {} // ctor vacío

    public Pedido(LocalDate fechaPedido, EstadoPedido estadoPedido, Usuario usuario, Almacen almacen) {
        this.fechaPedido = fechaPedido; // asigna fecha
        this.estadoPedido = estadoPedido; // asigna estado
        this.usuario = usuario; // asigna usuario (cambiado de cliente)
        this.almacen = almacen; // asigna almacen
    }

    public Long getId() { return id; } // get id

    public LocalDate getFechaPedido() { return fechaPedido; } // get fechaPedido
    public void setFechaPedido(LocalDate fechaPedido) { this.fechaPedido = fechaPedido; } // set fechaPedido

    public EstadoPedido getEstadoPedido() { return estadoPedido; } // get estadoPedido
    public void setEstadoPedido(EstadoPedido estadoPedido) { this.estadoPedido = estadoPedido; } // set estadoPedido

    public Usuario getUsuario() { return usuario; } // get usuario (cambiado de getCliente)
    public void setUsuario(Usuario usuario) { this.usuario = usuario; } // set usuario (cambiado de setCliente)

    public Almacen getAlmacen() { return almacen; } // get almacen
    public void setAlmacen(Almacen almacen) { this.almacen = almacen; } // set almacen

    // Método toString() seguro
    @Override
    public String toString() {
        return "Pedido{" +
                "id=" + id +
                ", fechaPedido=" + fechaPedido +
                ", estadoPedido=" + estadoPedido +
                ", usuarioId=" + (usuario != null ? usuario.getIdUsuario() : null) +
                ", almacenId=" + (almacen != null ? almacen.getId() : null) +
                '}';
    }

    // ENUM
    public enum EstadoPedido { // estados posibles
        PENDIENTE, CONFIRMADO, EN_PREPARACION, ENVIADO, ENTREGADO, CANCELADO
    }
}