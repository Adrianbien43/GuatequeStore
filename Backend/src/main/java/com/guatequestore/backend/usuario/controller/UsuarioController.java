package com.guatequestore.backend.usuario.controller;

import com.guatequestore.backend.usuario.model.Usuario;
import com.guatequestore.backend.usuario.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Adrian Bienvenido
 * @version 1.0.5
 */

// Controlador REST para la gestión de usuarios
@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200", "http://localhost:5173"})
public class UsuarioController {

    // Inyección del servicio de usuarios
    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    // Obtener todos los usuarios registrados
    @GetMapping
    public List<Usuario> getAll() {
        return service.getAllUsuarios();
    }

    // Obtener un usuario por su ID
    @GetMapping("/{id}")
    public Usuario getById(@PathVariable Long id) {
        return service.getUsuarioById(id);
    }

    // Crear un nuevo usuario
    @PostMapping
    public Usuario create(@RequestBody Usuario usuario) {
        return service.createUsuario(usuario);
    }

    // Actualizar los datos de un usuario existente
    @PutMapping("/{id}")
    public Usuario update(@PathVariable Long id, @RequestBody Usuario usuario) {
        return service.updateUsuario(id, usuario);
    }

    // Eliminar un usuario por su ID
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteUsuario(id);
    }
}