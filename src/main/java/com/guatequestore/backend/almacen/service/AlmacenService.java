package com.guatequestore.backend.almacen.service;

import com.guatequestore.backend.almacen.model.Almacen;
import com.guatequestore.backend.almacen.repository.AlmacenRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AlmacenService {

    private final AlmacenRepository repository;

    public AlmacenService(AlmacenRepository repository) {
        this.repository = repository;
    }

    public List<Almacen> getAllAlmacenes() {
        return repository.findAll();
    }

    public Almacen getAlmacenById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Almacen createAlmacen(Almacen almacen) {
        return repository.save(almacen);
    }

    public Almacen updateAlmacen(Long id, Almacen almacen) {
        return repository.findById(id).map(a -> {
            a.setNombre(almacen.getNombre());
            a.setCapacidad(almacen.getCapacidad());
            a.setDireccion(almacen.getDireccion());
            return repository.save(a);
        }).orElse(null);
    }

    public boolean deleteAlmacen(Long id) {
        return repository.findById(id).map(a -> {
            repository.delete(a);
            return true;
        }).orElse(false);
    }
}