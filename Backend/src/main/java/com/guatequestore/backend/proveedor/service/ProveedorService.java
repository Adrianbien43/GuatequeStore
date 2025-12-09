package com.guatequestore.backend.proveedor.service;

import com.guatequestore.backend.proveedor.model.Proveedor;
import com.guatequestore.backend.proveedor.repository.ProveedorRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProveedorService {

    private final ProveedorRepository repository;

    public ProveedorService(ProveedorRepository repository) {
        this.repository = repository;
    }

    public List<Proveedor> getAllProveedores() {
        return repository.findAll();
    }

    public Proveedor getProveedorById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Proveedor createProveedor(Proveedor proveedor) {
        return repository.save(proveedor);
    }

    public Proveedor updateProveedor(Long id, Proveedor proveedor) {
        return repository.findById(id).map(p -> {
            p.setNombre(proveedor.getNombre());
            p.setDireccion(proveedor.getDireccion());
            return repository.save(p);
        }).orElse(null);
    }

    public void deleteProveedor(Long id) {
        repository.findById(id).ifPresent(repository::delete);
    }

}