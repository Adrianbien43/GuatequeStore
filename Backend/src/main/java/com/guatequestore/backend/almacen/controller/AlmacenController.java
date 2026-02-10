package com.guatequestore.backend.almacen.controller;

import com.guatequestore.backend.almacen.model.Almacen;
import com.guatequestore.backend.almacen.service.AlmacenService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Controlador para manejar los almacenes
@RestController
@RequestMapping("/api/almacenes")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200", "http://localhost:5173"})
public class AlmacenController {

    // Servicio de almacenes
    private final AlmacenService service;

    // Constructor del controlador
    public AlmacenController(AlmacenService service) {
        this.service = service;
    }

    // Devuelve todos los almacenes
    @GetMapping
    public List<Almacen> getAll() {
        return service.getAllAlmacenes();
    }

    // Devuelve un almacén por su ID
    @GetMapping("/{id}")
    public Almacen getById(@PathVariable Long id) {
        return service.getAlmacenById(id);
    }

    // Crea un nuevo almacén
    @PostMapping
    public Almacen create(@RequestBody Almacen almacen) {
        return service.createAlmacen(almacen);
    }

    // Actualiza un almacén existente
    @PutMapping("/{id}")
    public Almacen update(@PathVariable Long id, @RequestBody Almacen almacen) {
        return service.updateAlmacen(id, almacen);
    }

    // Elimina un almacén por su ID
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteAlmacen(id);
    }
}
