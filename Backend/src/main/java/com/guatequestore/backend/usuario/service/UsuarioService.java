package com.guatequestore.backend.usuario.service;

import com.guatequestore.backend.usuario.model.Usuario;
import com.guatequestore.backend.usuario.repository.ClienteRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository repository;

    public ClienteService(ClienteRepository repository) {
        this.repository = repository;
    }

    public List<Usuario> getAllClientes() {
        return repository.findAll();
    }

    public Usuario getClienteById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Usuario createCliente(Usuario cliente) {
        return repository.save(cliente);
    }

    public Usuario updateCliente(Long id, Usuario cliente) {
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
