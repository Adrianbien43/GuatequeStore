package com.guatequestore.backend.pedido.model;

import com.guatequestore.backend.almacen.model.Almacen;
import com.guatequestore.backend.cliente.model.Cliente;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Table(name = "pedidos")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(nullable = false)
    private LocalDate fechaPedido;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoPedido estadoPedido;

    // RELACIÓN BIDIRECCIONAL CON CLIENTE
    @NotNull
    @ManyToOne(fetch = FetchType.EAGER) // ← CAMBIA a EAGER
    @JoinColumn(name = "cliente_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "pedidos", "telefonos", "password"})
    private Cliente cliente;

    // RELACIÓN BIDIRECCIONAL CON ALMACEN
    @NotNull
    @ManyToOne(fetch = FetchType.EAGER) // ← CAMBIA a EAGER
    @JoinColumn(name = "almacen_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "pedidos", "inventarios"})
    private Almacen almacen;

    public Pedido() {}

    public Pedido(LocalDate fechaPedido, EstadoPedido estadoPedido, Cliente cliente, Almacen almacen) {
        this.fechaPedido = fechaPedido;
        this.estadoPedido = estadoPedido;
        this.cliente = cliente;
        this.almacen = almacen;
    }

    public Long getId() { return id; }

    public LocalDate getFechaPedido() { return fechaPedido; }
    public void setFechaPedido(LocalDate fechaPedido) { this.fechaPedido = fechaPedido; }

    public EstadoPedido getEstadoPedido() { return estadoPedido; }
    public void setEstadoPedido(EstadoPedido estadoPedido) { this.estadoPedido = estadoPedido; }

    public Cliente getCliente() { return cliente; }
    public void setCliente(Cliente cliente) { this.cliente = cliente; }

    public Almacen getAlmacen() { return almacen; }
    public void setAlmacen(Almacen almacen) { this.almacen = almacen; }

    // Método toString() seguro
    @Override
    public String toString() {
        return "Pedido{" +
                "id=" + id +
                ", fechaPedido=" + fechaPedido +
                ", estadoPedido=" + estadoPedido +
                ", clienteId=" + (cliente != null ? cliente.getId() : null) +
                ", almacenId=" + (almacen != null ? almacen.getId() : null) +
                '}';
    }

    // ENUM
    public enum EstadoPedido {
        PENDIENTE, CONFIRMADO, EN_PREPARACION, ENVIADO, ENTREGADO, CANCELADO
    }
}