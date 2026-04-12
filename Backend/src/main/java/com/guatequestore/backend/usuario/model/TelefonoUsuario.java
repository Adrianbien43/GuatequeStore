package com.guatequestore.backend.usuario.model;

import com.guatequestore.backend.shared.model.TipoTelefono;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

/**
 * Entidad que representa un teléfono de un usuario.
 * 
 * Validación:
 * - Número debe ser de Guatemala (8 dígitos) o formato internacional (+502)
 * - Formato válido: "7234-5678" o "+502 7234-5678" o "72345678"
 * 
 * Patrón regex:
 * - ^(\+502\s?)?[0-9]{4}-?[0-9]{4}$ → Con o sin código +502, con o sin guión
 * - [0-9]{8}$ → Solo 8 dígitos sin guión ni código
 * 
 * @author Adrian Bienvenido
 * @version 1.0.2
 */
@Entity
@Table(name = "telefonos_usuarios")
public class TelefonoUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_TelefonoUsuario")
    private Long idTelefonoUsuario;

    @NotBlank(message = "El número de teléfono es requerido")
    @Pattern(
        regexp = "^(\\+502\\s?)?[0-9]{4}-?[0-9]{4}$|^[0-9]{8}$",
        message = "Teléfono inválido para Guatemala. Formatos válidos: 7234-5678, 72345678, +502 7234-5678"
    )
    @Column(name = "telefono", nullable = false)
    private String numero;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo", nullable = false)
    private TipoTelefono tipo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_Usuario")
    private Usuario usuario;

    /**
     * Constructor vacío
     */
    public TelefonoUsuario() {}

    /**
     * Constructor con parámetros
     */
    public TelefonoUsuario(String numero, TipoTelefono tipo) {
        this.numero = numero;
        this.tipo = tipo;
    }

    //GETTERS Y SETTERS

    public Long getIdTelefonoUsuario() {
        return idTelefonoUsuario;
    }

    public void setIdTelefonoUsuario(Long idTelefonoUsuario) {
        this.idTelefonoUsuario = idTelefonoUsuario;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public TipoTelefono getTipo() {
        return tipo;
    }

    public void setTipo(TipoTelefono tipo) {
        this.tipo = tipo;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}