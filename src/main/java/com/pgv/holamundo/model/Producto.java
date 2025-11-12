package com.pgv.holamundo.model;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Producto")
    private Long id;

    @Column(name = "Fecha_Fabricacion")
    private LocalDate fechaFabricacion;

    private String nombre;

    @Column(name = "Precio_Unitario")
    private Double precioUnitario;

    private String marca;

    @Column(name = "Stock_Total")
    private Integer stockTotal;

    @ManyToOne
    @JoinColumn(name = "ID_Proveedor")
    private Proveedor proveedor;

    @JsonIgnore
    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    private List<LineaPedido> lineasPedido;

    // Relación muchos a muchos con Almacén
    @ManyToMany
    @JoinTable(
            name = "producto_almacen",
            joinColumns = @JoinColumn(name = "ID_Producto"),
            inverseJoinColumns = @JoinColumn(name = "ID_Almacen")
    )
    @JsonIgnore
    private Set<Almacen> almacenes;

    // Constructores
    public Producto() {}

    public Producto(String nombre, Double precioUnitario, String marca, Integer stockTotal, Proveedor proveedor) {
        this.nombre = nombre;
        this.precioUnitario = precioUnitario;
        this.marca = marca;
        this.stockTotal = stockTotal;
        this.proveedor = proveedor;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaFabricacion() {
        return fechaFabricacion;
    }

    public void setFechaFabricacion(LocalDate fechaFabricacion) {
        this.fechaFabricacion = fechaFabricacion;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Double getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(Double precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public Integer getStockTotal() {
        return stockTotal;
    }

    public void setStockTotal(Integer stockTotal) {
        this.stockTotal = stockTotal;
    }

    public Proveedor getProveedor() {
        return proveedor;
    }

    public void setProveedor(Proveedor proveedor) {
        this.proveedor = proveedor;
    }

    public List<LineaPedido> getLineasPedido() {
        return lineasPedido;
    }

    public void setLineasPedido(List<LineaPedido> lineasPedido) {
        this.lineasPedido = lineasPedido;
    }

    public Set<Almacen> getAlmacenes() {
        return almacenes;
    }

    public void setAlmacenes(Set<Almacen> almacenes) {
        this.almacenes = almacenes;
    }
}