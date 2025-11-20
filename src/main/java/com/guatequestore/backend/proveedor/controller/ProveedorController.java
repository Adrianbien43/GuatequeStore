package com.guatequestore.backend.proveedor.controller;

import com.guatequestore.backend.proveedor.model.Proveedor;
import com.guatequestore.backend.proveedor.service.ProveedorService;
import com.guatequestore.backend.producto.model.Producto;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/proveedores")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200", "http://localhost:5173"})
public class ProveedorController {

    private final ProveedorService service;

    public ProveedorController(ProveedorService service) {
        this.service = service;
    }

    @GetMapping
    public List<Proveedor> getAll() {
        return service.getAllProveedores();
    }

    @GetMapping("/{id}")
    public Proveedor getById(@PathVariable Long id) {
        return service.getProveedorById(id);
    }

    @PostMapping
    public Proveedor create(@RequestBody Proveedor proveedor) {
        return service.createProveedor(proveedor);
    }

    @PutMapping("/{id}")
    public Proveedor update(@PathVariable Long id, @RequestBody Proveedor proveedor) {
        return service.updateProveedor(id, proveedor);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteProveedor(id);
    }

    @GetMapping("/{id}/productos")
    public List<Map<String, Object>> getProductosByProveedor(@PathVariable Long id) {
        Proveedor proveedor = service.getProveedorById(id);
        if (proveedor == null || proveedor.getProductos() == null) {
            return new ArrayList<>();
        }

        List<Map<String, Object>> productosResponse = new ArrayList<>();


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