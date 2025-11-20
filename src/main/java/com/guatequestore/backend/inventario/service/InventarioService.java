package com.guatequestore.backend.inventario.service;

import com.guatequestore.backend.inventario.model.Inventario;
import com.guatequestore.backend.inventario.model.InventarioId;
import com.guatequestore.backend.inventario.repository.InventarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class InventarioService {

    private final InventarioRepository repository;

    public InventarioService(InventarioRepository repository) {
        this.repository = repository;
    }

    public List<Inventario> getAll() {
        return repository.findAll();
    }

    public Inventario getById(InventarioId id) {
        return repository.findById(id).orElse(null);
    }

    public Inventario getByAlmacenAndProducto(Long almacenId, Long productoId) {
        return repository.findByAlmacenIdAndProductoId(almacenId, productoId).orElse(null);
    }

    public List<Inventario> getByAlmacen(Long almacenId) {
        return repository.findByAlmacenId(almacenId);
    }

    public List<Inventario> getByProducto(Long productoId) {
        return repository.findByProductoId(productoId);
    }

    public Inventario create(Inventario inventario) {
        return repository.save(inventario);
    }

    public Inventario update(InventarioId id, Inventario inventario) {
        return repository.findById(id).map(inv -> {
            inv.setCantidad(inventario.getCantidad());
            return repository.save(inv);
        }).orElse(null);
    }

    public boolean incrementarCantidad(Long almacenId, Long productoId, Integer cantidad) {
        return repository.findByAlmacenIdAndProductoId(almacenId, productoId)
                .map(inv -> {
                    inv.setCantidad(inv.getCantidad() + cantidad);
                    repository.save(inv);
                    return true;
                }).orElse(false);
    }

    public boolean decrementarCantidad(Long almacenId, Long productoId, Integer cantidad) {
        return repository.findByAlmacenIdAndProductoId(almacenId, productoId)
                .map(inv -> {
                    Integer nuevaCantidad = inv.getCantidad() - cantidad;
                    if (nuevaCantidad >= 0) {
                        inv.setCantidad(nuevaCantidad);
                        repository.save(inv);
                        return true;
                    }
                    return false;
                }).orElse(false);
    }

    public List<Inventario> getBajoStock(Integer limite) {
        return repository.findBajoStock(limite);
    }

    public boolean delete(InventarioId id) {
        return repository.findById(id).map(inv -> {
            repository.delete(inv);
            return true;
        }).orElse(false);
    }
}

