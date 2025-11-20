package com.guatequestore.backend.almacen.controller;

import com.guatequestore.backend.almacen.model.Almacen;
import com.guatequestore.backend.almacen.service.AlmacenService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/almacenes")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200", "http://localhost:5173"})
public class AlmacenController {

    private final AlmacenService service;

    public AlmacenController(AlmacenService service) {
        this.service = service;
    }

    @GetMapping
    public List<Almacen> getAll() {
        return service.getAllAlmacenes();
    }

    @GetMapping("/{id}")
    public Almacen getById(@PathVariable Long id) {
        return service.getAlmacenById(id);
    }

    @PostMapping
    public Almacen create(@RequestBody Almacen almacen) {
        return service.createAlmacen(almacen);
    }

    @PutMapping("/{id}")
    public Almacen update(@PathVariable Long id, @RequestBody Almacen almacen) {
        return service.updateAlmacen(id, almacen);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteAlmacen(id);
    }
}