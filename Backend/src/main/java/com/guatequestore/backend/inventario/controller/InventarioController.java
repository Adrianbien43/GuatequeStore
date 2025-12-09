package com.guatequestore.backend.inventario.controller;

import com.guatequestore.backend.inventario.model.Inventario;
import com.guatequestore.backend.inventario.service.InventarioService;
import com.guatequestore.backend.inventario.model.InventarioId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

// Controlador REST para operaciones de inventario
@RestController
@RequestMapping("/api/inventario")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200", "http://localhost:5173"})
public class InventarioController {

    // Inyección del servicio de inventario
    private final InventarioService service;

    public InventarioController(InventarioService service) {
        this.service = service;
    }

    // Obtener todos los registros de inventario
    @GetMapping
    public List<Inventario> getAll() {
        return service.getAll();
    }

    // Obtener inventario filtrado por almacén
    @GetMapping("/almacen/{almacenId}")
    public List<Inventario> getByAlmacen(@PathVariable Long almacenId) {
        return service.getByAlmacen(almacenId);
    }

    // Obtener inventario filtrado por producto
    @GetMapping("/producto/{productoId}")
    public List<Inventario> getByProducto(@PathVariable Long productoId) {
        return service.getByProducto(productoId);
    }

    // Obtener inventario específico por almacén y producto
    @GetMapping("/almacen/{almacenId}/producto/{productoId}")
    public ResponseEntity<Inventario> getByAlmacenAndProducto(
            @PathVariable Long almacenId,
            @PathVariable Long productoId) {
        Inventario inv = service.getByAlmacenAndProducto(almacenId, productoId);
        return inv != null ? ResponseEntity.ok(inv) : ResponseEntity.notFound().build();
    }

    // Crear un nuevo registro de inventario
    @PostMapping
    public Inventario create(@RequestBody Inventario inventario) {
        return service.create(inventario);
    }

    // Actualizar un registro de inventario existente
    @PutMapping("/almacen/{almacenId}/producto/{productoId}")
    public ResponseEntity<Inventario> update(
            @PathVariable Long almacenId,
            @PathVariable Long productoId,
            @RequestBody Inventario inventario) {
        InventarioId id = new InventarioId(almacenId, productoId);
        Inventario updated = service.update(id, inventario);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    // Incrementar cantidades en inventario
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

    // Decrementar cantidades en inventario
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

    // Obtener productos que están por debajo de cierto límite de stock
    @GetMapping("/bajo-stock/{limite}")
    public List<Inventario> getBajoStock(@PathVariable Integer limite) {
        return service.getBajoStock(limite);
    }

    // Eliminar un registro de inventario por almacén y producto
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
