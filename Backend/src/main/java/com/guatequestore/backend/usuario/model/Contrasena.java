package com.guatequestore.backend.usuario.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 *
 * Esta entidad servira para guardar hashes de contraseña.
 * El registro presenta una contraseña usada por un usuario en el momento.
 *
 * @author Adrian Bienvenido Morales Perdomo
 * @version 2.0.0
 */

@Entity
@Table(name = "contrasenas")
public class Contrasena {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_contrasena")
    private Long id;

    // FK al usuario
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    //Fecha de creacion del hast
    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion = LocalDateTime.now();

    // Hash de la contraseña (BCrypt)
    @Column(nullable = false, length = 255)
    private String hash;

    //Contructores

    public Contrasena(){}

    public Contrasena(Usuario usuario, LocalDateTime fechaCreacion, String hash) {
        this.usuario = usuario;
        this.hash = hash;
        this.fechaCreacion = LocalDateTime.now();
    }

    //Getters AND Setters

    public Long getId() { return id; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public String getHash() { return hash; }
    public void setHash(String hash) { this.hash = hash; }

    public LocalDateTime getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(LocalDateTime fechaCreacion) { this.fechaCreacion = fechaCreacion; }
}
