package com.guatequestore.backend.inventario.controller;

import com.guatequestore.backend.inventario.model.Inventario;
import com.guatequestore.backend.inventario.service.InventarioService;
import com.guatequestore.backend.inventario.model.InventarioId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/inventario")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200", "http://localhost:5173"})
public class InventarioController {

    private final InventarioService service;

    public InventarioController(InventarioService service) {
        this.service = service;
    }

    @GetMapping
    public List<Inventario> getAll() {
        return service.getAll();
    }

    @GetMapping("/almacen/{almacenId}")
    public List<Inventario> getByAlmacen(@PathVariable Long almacenId) {
        return service.getByAlmacen(almacenId);
    }

    @GetMapping("/producto/{productoId}")
    public List<Inventario> getByProducto(@PathVariable Long productoId) {
        return service.getByProducto(productoId);
    }

    @GetMapping("/almacen/{almacenId}/producto/{productoId}")
    public ResponseEntity<Inventario> getByAlmacenAndProducto(
            @PathVariable Long almacenId,
            @PathVariable Long productoId) {
        Inventario inv = service.getByAlmacenAndProducto(almacenId, productoId);
        return inv != null ? ResponseEntity.ok(inv) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Inventario create(@RequestBody Inventario inventario) {
        return service.create(inventario);
    }

    @PutMapping("/almacen/{almacenId}/producto/{productoId}")
    public ResponseEntity<Inventario> update(
            @PathVariable Long almacenId,
            @PathVariable Long productoId,
            @RequestBody Inventario inventario) {
        InventarioId id = new InventarioId(almacenId, productoId);
        Inventario updated = service.update(id, inventario);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @PostMapping("/almacen/{almacenId}/producto/{productoId}/incrementar")
    public ResponseEntity<Void> incrementar(
            @PathVariable Long almacenId,
            @PathVariable Long productoId,
            @RequestBody Map<String, Integer> request) {
        Integer cantidad = request.get("cantidad");
        return service.incrementarCantidad(almacenId, productoId, cantidad)
                ? ResponseEntity.ok().build()
                : ResponseEntity.notFound().build();
    }

    @PostMapping("/almacen/{almacenId}/producto/{productoId}/decrementar")
    public ResponseEntity<Void> decrementar(
            @PathVariable Long almacenId,
            @PathVariable Long productoId,
            @RequestBody Map<String, Integer> request) {
        Integer cantidad = request.get("cantidad");
        return service.decrementarCantidad(almacenId, productoId, cantidad)
                ? ResponseEntity.ok().build()
                : ResponseEntity.notFound().build();
    }

    @GetMapping("/bajo-stock/{limite}")
    public List<Inventario> getBajoStock(@PathVariable Integer limite) {
        return service.getBajoStock(limite);
    }

    @DeleteMapping("/almacen/{almacenId}/producto/{productoId}")
    public ResponseEntity<Void> delete(
            @PathVariable Long almacenId,
            @PathVariable Long productoId) {
        InventarioId id = new InventarioId(almacenId, productoId);
        return service.delete(id)
                ? ResponseEntity.ok().build()
                : ResponseEntity.notFound().build();
    }
}