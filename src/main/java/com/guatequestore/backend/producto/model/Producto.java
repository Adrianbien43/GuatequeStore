package com.guatequestore.backend.producto.model;


import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "producto")
public class Producto {

    // ------------------------------------------------------------
    // Clave primaria autoincremental (ID_Producto)
    // ------------------------------------------------------------
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_producto")
    private Long id;

    // ------------------------------------------------------------
    // Fecha de fabricación del producto (DATE)
    // ------------------------------------------------------------
    @Column(name = "fecha_fabricacion")
    private LocalDate fechaFabricacion;

    // ------------------------------------------------------------
    // Nombre del producto (VARCHAR)
    // ------------------------------------------------------------
    @Column(nullable = false)
    private String nombre;

    // ------------------------------------------------------------
    // Categoría como ENUM('HOMBRE','MUJER')
    // ------------------------------------------------------------
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Categoria categoria;

    // ------------------------------------------------------------
    // Talla del producto (VARCHAR)
    // ------------------------------------------------------------
    private String talla;

    // ------------------------------------------------------------
    // Precio unitario (DECIMAL(19,2))
    // ------------------------------------------------------------
    @Column(name = "precio_unitario", precision = 19, scale = 2, nullable = false)
    private BigDecimal precioUnitario;

    // ------------------------------------------------------------
    // Marca del producto (VARCHAR)
    // ------------------------------------------------------------
    private String marca;

    // ------------------------------------------------------------
    // FK hacia proveedor (NO existe aún la entidad)
    // Solo se define como columna simple
    // ------------------------------------------------------------
    @Column(name = "id_proveedor")
    private Long idProveedor;

    // ------------------------------------------------------------
    // Getters y Setters
    // ------------------------------------------------------------
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

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public String getTalla() {
        return talla;
    }

    public void setTalla(String talla) {
        this.talla = talla;
    }

    public BigDecimal getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(BigDecimal precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public Long getIdProveedor() {
        return idProveedor;
    }

    public void setIdProveedor(Long idProveedor) {
        this.idProveedor = idProveedor;
    }
}
