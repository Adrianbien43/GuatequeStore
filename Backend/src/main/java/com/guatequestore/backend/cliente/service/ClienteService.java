package com.guatequestore.backend.cliente.service;

import com.guatequestore.backend.cliente.model.Cliente;
import com.guatequestore.backend.cliente.repository.ClienteRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository repository;

    public ClienteService(ClienteRepository repository) {
        this.repository = repository;
    }

    public List<Cliente> getAllClientes() {
        return repository.findAll();
    }

    public Cliente getClienteById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Cliente createCliente(Cliente cliente) {
        return repository.save(cliente);
    }

    public Cliente updateCliente(Long id, Cliente cliente) {
        return repository.findById(id).map(c -> {
            c.setNombre(cliente.getNombre());
            c.setEmail(cliente.getEmail());
            c.setDireccion(cliente.getDireccion());
            c.setPassword(cliente.getPassword());
            return repository.save(c);
        }).orElse(null);
    }

    public boolean deleteCliente(Long id) {
        return repository.findById(id).map(c -> {
            repository.delete(c);
            return true;
        }).orElse(false);
    }
}
