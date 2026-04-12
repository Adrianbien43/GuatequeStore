package com.guatequestore.backend.proveedor.dto;

import java.util.List;

/**
 * DTO para transferir datos de Proveedor.
 * 
 * Contiene:
 * - Información básica del proveedor (id, nombre, direccion)
 * - Lista de teléfonos como strings (conversión automática)
 * 
 * Se utiliza para:
 * - Retornar datos a través de la API REST
 * - Recibir datos de creación/actualización desde el Frontend
 * - Simplificar la gestión de teléfonos (1 listado, no relación JPA)
 * - Desacoplar la estructura de BD del contrato de API
 * 
 * Flujo:
 * 1. Frontend envía: { nombre: "...", direccion: "...", telefonos: ["123", "456"] }
 * 2. ProveedorService recibe ProveedorDTO
 * 3. ProveedorService crea/actualiza Proveedor + TelefonoProveedor entities
 * 4. ProveedorService retorna ProveedorDTO (conversión automática)
 * 5. Frontend recibe limpio y simplificado
 * 
 * @author Adrian Bienvenido
 * @version 1.0.1
 */
public class ProveedorDTO {

    private Long id;
    private String nombre;
    private String direccion;
    private List<String> telefonos;

    /**
     * Constructor vacío (necesario para Jackson serialización)
     */
    public ProveedorDTO() {}

    /**
     * Constructor con todos los parámetros
     */
    public ProveedorDTO(Long id, String nombre, String direccion, List<String> telefonos) {
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefonos = telefonos;
    }

    // ==================== GETTERS Y SETTERS ====================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public List<String> getTelefonos() {
        return telefonos;
    }

    public void setTelefonos(List<String> telefonos) {
        this.telefonos = telefonos;
    }
}
