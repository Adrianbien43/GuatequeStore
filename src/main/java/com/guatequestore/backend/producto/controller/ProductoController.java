package com.guatequestore.backend.producto.controller;

import com.guatequestore.backend.producto.model.Producto;
import com.guatequestore.backend.producto.service.ProductoService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * @author Gorka Jesús
 * @version 1.0.5
 */

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200", "http://localhost:5173"})
public class ProductoController {

    private final ProductoService service;

    public ProductoController(ProductoService service) {
        this.service = service;
    }
    // Aqui obtengo todos los pedidos
    @GetMapping
    public List<Producto> getAll() {
        return service.getAllProductos();
    }
    //Aqui obtengo el pedido por el id
    @GetMapping("/{id}")
    public Producto getById(@PathVariable Long id) {
        return service.getProductoById(id);
    }
    //Aqui es para generar un nuevo producto
    @PostMapping
    public Producto create(@RequestBody Producto producto) {
        return service.createProducto(producto);
    }
    //Aqui actualizo por el id
    @PutMapping("/{id}")
    public Producto update(@PathVariable Long id, @RequestBody Producto producto) {
        return service.updateProducto(id, producto);
    }
    //Este es para eliminarlo
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteProducto(id);
    }
}