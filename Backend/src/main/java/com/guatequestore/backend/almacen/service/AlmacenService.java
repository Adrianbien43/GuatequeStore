package com.guatequestore.backend.almacen.service;

import com.guatequestore.backend.almacen.model.Almacen;
import com.guatequestore.backend.almacen.repository.AlmacenRepository;
import org.springframework.stereotype.Service;
import java.util.List;

// Servicio para la lógica de los almacenes
@Service
public class AlmacenService {

    // Repositorio de almacenes
    private final AlmacenRepository repository;

    // Constructor del servicio
    public AlmacenService(AlmacenRepository repository) {
        this.repository = repository;
    }

    // Obtiene todos los almacenes
    public List<Almacen> getAllAlmacenes() {
        return repository.findAll();
    }

    // Obtiene un almacén por su ID
    public Almacen getAlmacenById(Long id) {
        return repository.findById(id).orElse(null);
    }

    // Crea un nuevo almacén
    public Almacen createAlmacen(Almacen almacen) {
        return repository.save(almacen);
    }

    // Actualiza un almacén existente
    public Almacen updateAlmacen(Long id, Almacen almacen) {
        return repository.findById(id).map(a -> {
            a.setNombre(almacen.getNombre());
            a.setCapacidad(almacen.getCapacidad());
            a.setDireccion(almacen.getDireccion());
            return repository.save(a);
        }).orElse(null);
    }

    // Elimina un almacén por su ID
    public boolean deleteAlmacen(Long id) {
        return repository.findById(id).map(a -> {
            repository.delete(a);
            return true;
        }).orElse(false);
    }
}
