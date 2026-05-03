package com.guatequestore.backend.pedido.model;

import com.guatequestore.backend.almacen.model.Almacen;
import com.guatequestore.backend.usuario.model.Usuario;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import com.guatequestore.backend.lineapedido.model.LineaPedido;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "pedidos", "telefonos", "contraseña"})
    private Usuario usuario;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "almacen_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "pedidos", "inventarios"})
    private Almacen almacen;

    @OneToMany(mappedBy = "pedido", fetch = FetchType.EAGER, orphanRemoval = true)
    @JsonIgnoreProperties({"pedido"})
    private List<LineaPedido> lineas = new ArrayList<>();

    public Pedido() {}

    public Pedido(LocalDate fechaPedido, EstadoPedido estadoPedido, Usuario usuario, Almacen almacen) {
        this.fechaPedido = fechaPedido;
        this.estadoPedido = estadoPedido;
        this.usuario = usuario;
        this.almacen = almacen;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaPedido() {
        return fechaPedido;
    }

    public void setFechaPedido(LocalDate fechaPedido) {
        this.fechaPedido = fechaPedido;
    }

    public EstadoPedido getEstadoPedido() {
        return estadoPedido;
    }

    public void setEstadoPedido(EstadoPedido estadoPedido) {
        this.estadoPedido = estadoPedido;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Almacen getAlmacen() {
        return almacen;
    }

    public void setAlmacen(Almacen almacen) {
        this.almacen = almacen;
    }

    public List<LineaPedido> getLineas() {
        return lineas;
    }

    public void setLineas(List<LineaPedido> lineas) {
        this.lineas = lineas;
    }

    public void addLinea(LineaPedido linea) {
        lineas.add(linea);
        linea.setPedido(this);
    }

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

    public enum EstadoPedido {
        PENDIENTE, CONFIRMADO, EN_PREPARACION, ENVIADO, ENTREGADO, CANCELADO
    }
}