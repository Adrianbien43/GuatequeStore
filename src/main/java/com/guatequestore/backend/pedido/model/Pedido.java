package com.guatequestore.backend.pedido.model; // Paquete pedido

import com.guatequestore.backend.almacen.model.Almacen;
import com.guatequestore.backend.cliente.model.Cliente;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

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

    // RELACIÓN BIDIRECCIONAL CON CLIENTE
    @NotNull // no nulo
    @ManyToOne(fetch = FetchType.EAGER) // relación many-to-one EAGER
    @JoinColumn(name = "cliente_id", nullable = false) // FK cliente_id
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "pedidos", "telefonos", "password"}) // evita propiedades en JSON
    private Cliente cliente; // cliente asociado

    // RELACIÓN BIDIRECCIONAL CON ALMACEN
    @NotNull // no nulo
    @ManyToOne(fetch = FetchType.EAGER) // relación many-to-one EAGER
    @JoinColumn(name = "almacen_id", nullable = false) // FK almacen_id
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "pedidos", "inventarios"}) // evita propiedades en JSON
    private Almacen almacen; // almacen asociado

    public Pedido() {} // ctor vacío

    public Pedido(LocalDate fechaPedido, EstadoPedido estadoPedido, Cliente cliente, Almacen almacen) {
        this.fechaPedido = fechaPedido; // asigna fecha
        this.estadoPedido = estadoPedido; // asigna estado
        this.cliente = cliente; // asigna cliente
        this.almacen = almacen; // asigna almacen
    }

    public Long getId() { return id; } // get id

    public LocalDate getFechaPedido() { return fechaPedido; } // get fechaPedido
    public void setFechaPedido(LocalDate fechaPedido) { this.fechaPedido = fechaPedido; } // set fechaPedido

    public EstadoPedido getEstadoPedido() { return estadoPedido; } // get estadoPedido
    public void setEstadoPedido(EstadoPedido estadoPedido) { this.estadoPedido = estadoPedido; } // set estadoPedido

    public Cliente getCliente() { return cliente; } // get cliente
    public void setCliente(Cliente cliente) { this.cliente = cliente; } // set cliente

    public Almacen getAlmacen() { return almacen; } // get almacen
    public void setAlmacen(Almacen almacen) { this.almacen = almacen; } // set almacen

    // Método toString() seguro
    @Override
    public String toString() {
        return "Pedido{" +
                "id=" + id + // id
                ", fechaPedido=" + fechaPedido + // fecha
                ", estadoPedido=" + estadoPedido + // estado
                ", clienteId=" + (cliente != null ? cliente.getId() : null) + // id cliente
                ", almacenId=" + (almacen != null ? almacen.getId() : null) + // id almacen
                '}';
    }

    // ENUM
    public enum EstadoPedido { // estados posibles
        PENDIENTE, CONFIRMADO, EN_PREPARACION, ENVIADO, ENTREGADO, CANCELADO
    }
}