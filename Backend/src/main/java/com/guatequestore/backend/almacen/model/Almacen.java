package com.guatequestore.backend.almacen.model; // Paquete para modelos de almacén

import com.guatequestore.backend.pedido.model.Pedido;
import com.guatequestore.backend.inventario.model.Inventario;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import java.util.Set;
import java.util.HashSet;


/**
 * @author Manuel Cruz
 * @version 1.0.2
 */

@Entity // Esta clase es una entidad JPA
@Table(name = "almacenes") // Se mapea a la tabla 'almacen' en la base de datos
public class Almacen { // Clase que representa un almacén físico

    @Id // Marca este campo como clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Valor auto-generado por la BD
    @Column(name = "id_almacen") // Nombre de columna en la tabla
    private Long id; // Identificador único del almacén

    @NotBlank // Validación: no puede estar vacío o solo espacios
    @Column(nullable = false) // Restricción en BD: campo obligatorio
    private String nombre; // Nombre descriptivo del almacén

    @Positive // Validación: solo valores positivos
    private Integer capacidad; // Capacidad máxima del almacén (en unidades, metros, etc.)

    private String direccion; // Ubicación física del almacén

    // RELACIÓN: Un almacén puede tener muchos pedidos
    @OneToMany(mappedBy = "almacen", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // Evita que Jackson serialice esta relación (previene ciclos infinitos en JSON)
    private Set<Pedido> pedidos = new HashSet<>(); // Conjunto de pedidos asociados a este almacén

    // RELACIÓN: Un almacén puede tener muchos items en inventario
    @OneToMany(mappedBy = "almacen", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // Evita que Jackson serialice esta relación
    private Set<Inventario> inventarios = new HashSet<>(); // Conjunto de items en inventario

    public Almacen() {} // Constructor vacío requerido por JPA

    // Constructor para crear nuevos almacenes fácilmente
    public Almacen(String nombre, Integer capacidad, String direccion) {
        this.nombre = nombre; // asigna el nombre
        this.capacidad = capacidad; // asigna la capacidad
        this.direccion = direccion; // asigna la dirección
    }

    // GETTERS Y SETTERS - Métodos para acceder y modificar los atributos

    public Long getId() { return id; } // obtiene el id

    public String getNombre() { return nombre; } // obtiene el nombre
    public void setNombre(String nombre) { this.nombre = nombre; } // cambia el nombre

    public Integer getCapacidad() { return capacidad; } // obtiene la capacidad
    public void setCapacidad(Integer capacidad) { this.capacidad = capacidad; } // cambia la capacidad

    public String getDireccion() { return direccion; } // obtiene la dirección
    public void setDireccion(String direccion) { this.direccion = direccion; } // cambia la dirección

    public Set<Pedido> getPedidos() { return pedidos; } // obtiene los pedidos
    public void setPedidos(Set<Pedido> pedidos) { this.pedidos = pedidos; } // cambia los pedidos

    public Set<Inventario> getInventarios() { return inventarios; } // obtiene el inventario
    public void setInventarios(Set<Inventario> inventarios) { this.inventarios = inventarios; } // cambia el inventario

    // MÉTODO PARA AÑADIR UN PEDIDO AL ALMACÉN
    public void addPedido(Pedido pedido) {
        pedidos.add(pedido); // añade el pedido a la colección
        pedido.setAlmacen(this); // establece este almacén como dueño del pedido
    }

    // MÉTODO PARA ELIMINAR UN PEDIDO DEL ALMACÉN
    public void removePedido(Pedido pedido) {
        pedidos.remove(pedido); // remueve el pedido de la colección
        pedido.setAlmacen(null); // desvincula el pedido de este almacén
    }

    // MÉTODO PARA AÑADIR UN ITEM AL INVENTARIO DEL ALMACÉN
    public void addInventario(Inventario inventario) {
        inventarios.add(inventario); // añade el item al inventario
        inventario.setAlmacen(this); // establece este almacén como ubicación del item
    }

    // MÉTODO PARA ELIMINAR UN ITEM DEL INVENTARIO DEL ALMACÉN
    public void removeInventario(Inventario inventario) {
        inventarios.remove(inventario); // remueve el item del inventario
        inventario.setAlmacen(null); // desvincula el item de este almacén
    }

    // Representación en texto del objeto (excluye relaciones para evitar recursividad)
    @Override
    public String toString() {
        return "Almacen{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", capacidad=" + capacidad +
                ", direccion='" + direccion + '\'' +
                '}';
    }
}