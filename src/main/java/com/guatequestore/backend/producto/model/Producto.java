package com.guatequestore.backend.producto.model;

import com.guatequestore.backend.proveedor.model.Proveedor;
import com.guatequestore.backend.inventario.model.Inventario;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "producto")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Producto")
    private Long id;

    @Column(name = "Fecha_Fabricacion")
    private LocalDate fechaFabricacion;

    @Column(name = "Nombre", nullable = false)
    private String nombre;

    @Enumerated(EnumType.STRING)
    @Column(name = "Categoria", nullable = false)
    private Categoria categoria;

    @Column(name = "Talla")
    private String talla;

    @Column(name = "Precio_Unitario", precision = 19, scale = 2, nullable = false)
    private BigDecimal precioUnitario;

    @Column(name = "Marca")
    private String marca;

    @ManyToOne
    @JoinColumn(name = "ID_Proveedor")
    private Proveedor proveedor;

    // NUEVA: Relación bidireccional con Inventario
    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // ← Evita que se serialice en JSON
    private Set<Inventario> inventarios = new HashSet<>();

    // Enums
    public enum Categoria {
        HOMBRE, MUJER
    }

    // Constructores
    public Producto() {}

    public Producto(String nombre, Categoria categoria, BigDecimal precioUnitario) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.precioUnitario = precioUnitario;
    }

    public Producto(String nombre, Categoria categoria, BigDecimal precioUnitario, String marca) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.precioUnitario = precioUnitario;
        this.marca = marca;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getFechaFabricacion() { return fechaFabricacion; }
    public void setFechaFabricacion(LocalDate fechaFabricacion) { this.fechaFabricacion = fechaFabricacion; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public Categoria getCategoria() { return categoria; }
    public void setCategoria(Categoria categoria) { this.categoria = categoria; }

    public String getTalla() { return talla; }
    public void setTalla(String talla) { this.talla = talla; }

    public BigDecimal getPrecioUnitario() { return precioUnitario; }
    public void setPrecioUnitario(BigDecimal precioUnitario) { this.precioUnitario = precioUnitario; }

    public String getMarca() { return marca; }
    public void setMarca(String marca) { this.marca = marca; }

    public Proveedor getProveedor() { return proveedor; }
    public void setProveedor(Proveedor proveedor) { this.proveedor = proveedor; }

    public Set<Inventario> getInventarios() { return inventarios; }
    public void setInventarios(Set<Inventario> inventarios) { this.inventarios = inventarios; }

    // Métodos utilitarios para Inventario
    public void addInventario(Inventario inventario) {
        inventarios.add(inventario);
        inventario.setProducto(this);
    }

    public void removeInventario(Inventario inventario) {
        inventarios.remove(inventario);
        inventario.setProducto(null);
    }

    // Método para obtener stock total en todos los almacenes
    @Transient // No se persiste en la base de datos
    public Integer getStockTotal() {
        if (inventarios == null || inventarios.isEmpty()) {
            return 0;
        }
        return inventarios.stream()
                .mapToInt(Inventario::getCantidad)
                .sum();
    }

    // Método toString() seguro
    @Override
    public String toString() {
        return "Producto{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", categoria=" + categoria +
                ", precioUnitario=" + precioUnitario +
                ", marca='" + marca + '\'' +
                ", cantidadInventarios=" + (inventarios != null ? inventarios.size() : 0) +
                '}';
    }
}