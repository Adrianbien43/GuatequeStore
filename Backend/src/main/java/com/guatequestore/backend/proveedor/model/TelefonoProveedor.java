package com.guatequestore.backend.proveedor.model;

import com.guatequestore.backend.shared.model.TipoTelefono;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

/**
 * Entidad que representa un teléfono de un proveedor.
 * 
 * Validación:
 * - Número debe ser de Guatemala (8 dígitos) o formato internacional (+502)
 * - Formato válido: "7234-5678" o "+502 7234-5678" o "72345678"
 * 
 * Patrón regex:
 * - ^(\+502\s?)?[0-9]{4}-?[0-9]{4}$ → Con o sin código +502, con o sin guión
 * - [0-9]{8}$ → Solo 8 dígitos sin guión ni código
 * 
 * Ejemplos válidos:
 * ✅ 7234-5678
 * ✅ 72345678
 * ✅ +502 7234-5678
 * ✅ +5027234-5678
 * 
 * Ejemplos INVÁLIDOS:
 * ❌ 123456 (muy corto)
 * ❌ 9875672345 (10 dígitos, formato USA)
 * ❌ 53283279343 (11 dígitos, formato Brasil)
 * 
 * @author Adrian Bienvenido
 * @version 1.0.2
 */
@Entity
@Table(name = "telefonos_proveedores")
public class TelefonoProveedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_TelefonoProveedor")
    private Long id;

    @NotBlank(message = "El número de teléfono es requerido")
    @Pattern(
        regexp = "^(\\+502\\s?)?[0-9]{4}-?[0-9]{4}$|^[0-9]{8}$",
        message = "Teléfono inválido para Guatemala. Formatos válidos: 7234-5678, 72345678, +502 7234-5678"
    )
    @Column(name = "telefono", nullable = false)
    private String telefono;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo", nullable = false)
    private TipoTelefono tipo;

    @ManyToOne
    @JoinColumn(name = "ID_Proveedor", nullable = false)
    private Proveedor proveedor;

    /**
     * Constructor vacío (necesario para JPA)
     */
    public TelefonoProveedor() {}

    /**
     * Constructor con parámetros
     */
    public TelefonoProveedor(String telefono, TipoTelefono tipo, Proveedor proveedor) {
        this.telefono = telefono;
        this.tipo = tipo;
        this.proveedor = proveedor;
    }

    // ==================== GETTERS Y SETTERS ====================

    public Long getId() { 
        return id; 
    }

    public void setId(Long id) { 
        this.id = id; 
    }

    public String getTelefono() { 
        return telefono; 
    }

    public void setTelefono(String telefono) { 
        this.telefono = telefono; 
    }

    public TipoTelefono getTipo() { 
        return tipo; 
    }

    public void setTipo(TipoTelefono tipo) { 
        this.tipo = tipo; 
    }

    public Proveedor getProveedor() { 
        return proveedor; 
    }

    public void setProveedor(Proveedor proveedor) { 
        this.proveedor = proveedor; 
    }
}