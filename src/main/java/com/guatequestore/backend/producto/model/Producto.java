package com.guatequestore.backend.producto.model; // Paquete producto

import com.guatequestore.backend.proveedor.model.Proveedor;
import com.guatequestore.backend.inventario.model.Inventario;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;
import java.util.HashSet;

/**
 * Modelo para los productos en la tienda
 * Representa la entidad Producto.
 * @author Gorka Jesus
 * @version 1.0.1
 */



@Entity // Entidad JPA
@Table(name = "producto") // Tabla 'producto'
public class Producto { // Clase Producto

    @Id // clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment
    @Column(name = "ID_Producto") // columna ID_Producto
    private Long id; // id producto

    @Column(name = "Fecha_Fabricacion") // columna fecha de fabricación
    private LocalDate fechaFabricacion; // fecha fabricación

    @Column(name = "Nombre", nullable = false) // nombre obligatorio
    private String nombre; // nombre producto

    @Enumerated(EnumType.STRING) // guarda enum como texto
    @Column(name = "Categoria", nullable = false) // categoria obligatoria
    private Categoria categoria; // categoría del producto

    @Column(name = "Talla") // columna talla
    private String talla; // talla

    @Column(name = "Precio_Unitario", precision = 19, scale = 2, nullable = false) // precio con precisión
    private BigDecimal precioUnitario; // precio unitario

    @Column(name = "Marca") // columna marca
    private String marca; // marca

    //Relacion con Proveedor
    @ManyToOne // Many producto -> One proveedor
    @JoinColumn(name = "ID_Proveedor") // FK ID_Proveedor
    private Proveedor proveedor; // proveedor

    //Relacion con Inventario
    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, orphanRemoval = true) // 1 producto - N inventarios
    @JsonIgnore // evita serializar inventarios en JSON
    private Set<Inventario> inventarios = new HashSet<>(); // conjunto inventarios

    // Enums
    public enum Categoria { // categorías disponibles
        HOMBRE, MUJER
    }

    // Constructores
    public Producto() {} // constructor vacío

    public Producto(String nombre, Categoria categoria, BigDecimal precioUnitario) {
        this.nombre = nombre; // asigna nombre
        this.categoria = categoria; // asigna categoria
        this.precioUnitario = precioUnitario; // asigna precio
    }

    public Producto(String nombre, Categoria categoria, BigDecimal precioUnitario, String marca) {
        this.nombre = nombre; // asigna nombre
        this.categoria = categoria; // asigna categoria
        this.precioUnitario = precioUnitario; // asigna precio
        this.marca = marca; // asigna marca
    }

    // Getters y Setters
    public Long getId() { return id; } // get id
    public void setId(Long id) { this.id = id; } // set id

    public LocalDate getFechaFabricacion() { return fechaFabricacion; } // get fechaFabricacion
    public void setFechaFabricacion(LocalDate fechaFabricacion) { this.fechaFabricacion = fechaFabricacion; } // set fechaFabricacion

    public String getNombre() { return nombre; } // get nombre
    public void setNombre(String nombre) { this.nombre = nombre; } // set nombre

    public Categoria getCategoria() { return categoria; } // get categoria
    public void setCategoria(Categoria categoria) { this.categoria = categoria; } // set categoria

    public String getTalla() { return talla; } // get talla
    public void setTalla(String talla) { this.talla = talla; } // set talla

    public BigDecimal getPrecioUnitario() { return precioUnitario; } // get precioUnitario
    public void setPrecioUnitario(BigDecimal precioUnitario) { this.precioUnitario = precioUnitario; } // set precioUnitario

    public String getMarca() { return marca; } // get marca
    public void setMarca(String marca) { this.marca = marca; } // set marca

    public Proveedor getProveedor() { return proveedor; } // get proveedor
    public void setProveedor(Proveedor proveedor) { this.proveedor = proveedor; } // set proveedor

    public Set<Inventario> getInventarios() { return inventarios; } // get inventarios
    public void setInventarios(Set<Inventario> inventarios) { this.inventarios = inventarios; } // set inventarios

    // Métodos utilitarios para Inventario
    public void addInventario(Inventario inventario) {
        inventarios.add(inventario); // añade inventario
        inventario.setProducto(this); // setea relación inversa
    }

    public void removeInventario(Inventario inventario) {
        inventarios.remove(inventario); // elimina inventario
        inventario.setProducto(null); // limpia relación inversa
    }

    // Metodo de calculo
    @Transient // no persistente
    public Integer getStockTotal() {
        if (inventarios == null || inventarios.isEmpty()) {
            return 0; // sin inventarios
        }
        return inventarios.stream()
                .mapToInt(Inventario::getCantidad) // suma cantidades
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