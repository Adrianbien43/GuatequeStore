package com.guatequestore.backend.usuario.model;

import jakarta.persistence.*;

@Entity
@Table(name = "telefonos_usuarios") // Alineado con CREATE TABLE
public class TelefonoUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_TelefonoUsuario") // Alineado con CREATE TABLE
    private Long idTelefonoUsuario;

    @Column(name = "telefono", nullable = false) // Alineado con CREATE TABLE
    private String numero;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo", nullable = false) // Alineado con CREATE TABLE
    private TipoTelefono tipo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_Usuario") // Alineado con CREATE TABLE
    private Usuario usuario;

    public TelefonoUsuario() {}

    public TelefonoUsuario(String numero, TipoTelefono tipo) {
        this.numero = numero;
        this.tipo = tipo;
    }

    // Getters y Setters
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