package com.guatequestore.backend.almacen.controller;

import com.guatequestore.backend.almacen.model.Almacen;
import com.guatequestore.backend.almacen.service.AlmacenService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


// Controlador REST para la gestión de almacenes
@RestController
@RequestMapping("/api/almacenes")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200", "http://localhost:5173"})
public class AlmacenController {

    // Inyección del servicio de almacenes
    private final AlmacenService service;

    public AlmacenController(AlmacenService service) {
        this.service = service;
    }

    // Obtener todos los almacenes registrados
    @GetMapping
    public List<Almacen> getAll() {
        return service.getAllAlmacenes();
    }

    // Obtener un almacén por su ID
    @GetMapping("/{id}")
    public Almacen getById(@PathVariable Long id) {
        return service.getAlmacenById(id);
    }

    // Crear un nuevo almacén
    @PostMapping
    public Almacen create(@RequestBody Almacen almacen) {
        return service.createAlmacen(almacen);
    }

    // Actualizar un almacén existente
    @PutMapping("/{id}")
    public Almacen update(@PathVariable Long id, @RequestBody Almacen almacen) {
        return service.updateAlmacen(id, almacen);
    }

    // Eliminar un almacén por su ID
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteAlmacen(id);
    }
}
