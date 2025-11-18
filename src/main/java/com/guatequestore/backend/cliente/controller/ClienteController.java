package com.guatequestore.backend.cliente.controller;

import com.guatequestore.backend.cliente.model.Cliente;
import com.guatequestore.backend.cliente.service.ClienteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200", "http://localhost:5173"})
public class ClienteController {

    private final ClienteService service;

    public ClienteController(ClienteService service) {
        this.service = service;
    }

    @GetMapping
    public List<Cliente> getAll() {
        return service.getAllClientes();
    }

    @GetMapping("/{id}")
    public Cliente getById(@PathVariable Long id) {
        return service.getClienteById(id);
    }

    @PostMapping
    public Cliente create(@RequestBody Cliente cliente) {
        return service.createCliente(cliente);
    }

    @PutMapping("/{id}")
    public Cliente update(@PathVariable Long id, @RequestBody Cliente cliente) {
        return service.updateCliente(id, cliente);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteCliente(id);
    }
}