package com.guatequestore.backend.cliente.controller;

import com.guatequestore.backend.cliente.model.Cliente;
import com.guatequestore.backend.cliente.service.ClienteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Adrian Bienvenido
 * @version 1.0.5
 */

// Controlador REST para la gestión de clientes
@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200", "http://localhost:5173"})
public class ClienteController {

    // Inyección del servicio de clientes
    private final ClienteService service;

    public ClienteController(ClienteService service) {
        this.service = service;
    }

    // Obtener todos los clientes registrados
    @GetMapping
    public List<Cliente> getAll() {
        return service.getAllClientes();
    }

    // Obtener un cliente por su ID
    @GetMapping("/{id}")
    public Cliente getById(@PathVariable Long id) {
        return service.getClienteById(id);
    }

    // Crear un nuevo cliente
    @PostMapping
    public Cliente create(@RequestBody Cliente cliente) {
        return service.createCliente(cliente);
    }

    // Actualizar los datos de un cliente existente
    @PutMapping("/{id}")
    public Cliente update(@PathVariable Long id, @RequestBody Cliente cliente) {
        return service.updateCliente(id, cliente);
    }

    // Eliminar un cliente por su ID
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteCliente(id);
    }
}
