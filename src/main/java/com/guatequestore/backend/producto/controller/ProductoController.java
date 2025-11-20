package com.guatequestore.backend.producto.controller;

import com.guatequestore.backend.producto.model.Producto;
import com.guatequestore.backend.producto.service.ProductoService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200", "http://localhost:5173"})
public class ProductoController {

    private final ProductoService service;

    public ProductoController(ProductoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Producto> getAll() {
        return service.getAllProductos();
    }

    @GetMapping("/{id}")
    public Producto getById(@PathVariable Long id) {
        return service.getProductoById(id);
    }

    @PostMapping
    public Producto create(@RequestBody Producto producto) {
        return service.createProducto(producto);
    }

    @PutMapping("/{id}")
    public Producto update(@PathVariable Long id, @RequestBody Producto producto) {
        return service.updateProducto(id, producto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteProducto(id);
    }
}