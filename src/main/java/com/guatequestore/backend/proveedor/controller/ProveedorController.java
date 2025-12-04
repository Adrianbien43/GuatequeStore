package com.guatequestore.backend.proveedor.controller;

import com.guatequestore.backend.proveedor.model.Proveedor;
import com.guatequestore.backend.proveedor.service.ProveedorService;
import com.guatequestore.backend.producto.model.Producto;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Adrian Bienvenido
 * @version 1.0.5
 */
// Controlador REST para manejar operaciones relacionadas con proveedores.
@RestController
@RequestMapping("/api/proveedores")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200", "http://localhost:5173"})
public class ProveedorController {

    // Inyección del servicio de proveedores
    private final ProveedorService service;

    public ProveedorController(ProveedorService service) {
        this.service = service;
    }

    // Obtener todos los proveedores
    @GetMapping
    public List<Proveedor> getAll() {
        return service.getAllProveedores();
    }

    // Obtener un proveedor por ID
    @GetMapping("/{id}")
    public Proveedor getById(@PathVariable Long id) {
        return service.getProveedorById(id);
    }

    // Crear un nuevo proveedor
    @PostMapping
    public Proveedor create(@RequestBody Proveedor proveedor) {
        return service.createProveedor(proveedor);
    }

    // Actualizar los datos de un proveedor existente
    @PutMapping("/{id}")
    public Proveedor update(@PathVariable Long id, @RequestBody Proveedor proveedor) {
        return service.updateProveedor(id, proveedor);
    }

    // Eliminar un proveedor por ID
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteProveedor(id);
    }

    // Obtener listado de productos asociados a un proveedor
    @GetMapping("/{id}/productos")
    public List<Map<String, Object>> getProductosByProveedor(@PathVariable Long id) {
        Proveedor proveedor = service.getProveedorById(id);

        // Si no existen productos asociados, devolver lista vacía
        if (proveedor == null || proveedor.getProductos() == null) {
            return new ArrayList<>();
        }

        List<Map<String, Object>> productosResponse = new ArrayList<>();

        // Convertir cada producto a un mapa para una respuesta personalizada
        for (Producto producto : proveedor.getProductos()) {
            Map<String, Object> productoMap = new HashMap<>();
            productoMap.put("id", producto.getId());
            productoMap.put("nombre", producto.getNombre());
            productoMap.put("categoria", producto.getCategoria().name());
            productoMap.put("talla", producto.getTalla());
            productoMap.put("precioUnitario", producto.getPrecioUnitario());
            productoMap.put("marca", producto.getMarca());
            productoMap.put("fechaFabricacion", producto.getFechaFabricacion() != null
                    ? producto.getFechaFabricacion().toString() : null);
            productosResponse.add(productoMap);
        }
        return productosResponse;
    }
}
