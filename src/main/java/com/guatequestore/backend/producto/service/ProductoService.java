package com.guatequestore.backend.producto.service;

import com.guatequestore.backend.producto.model.Producto;
import com.guatequestore.backend.producto.repository.ProductoRepository;
import com.guatequestore.backend.proveedor.model.Proveedor;
import com.guatequestore.backend.proveedor.repository.ProveedorRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductoService {

    private final ProductoRepository repository;
    private final ProveedorRepository proveedorRepository;

    public ProductoService(ProductoRepository repository, ProveedorRepository proveedorRepository) {
        this.repository = repository;
        this.proveedorRepository = proveedorRepository;
    }

    public List<Producto> getAllProductos() {
        return repository.findAll();
    }

    public Producto getProductoById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Producto createProducto(Producto producto) {
        if (producto.getProveedor() != null && producto.getProveedor().getId() != null) {
            Proveedor proveedor = proveedorRepository.findById(producto.getProveedor().getId()).orElse(null);
            producto.setProveedor(proveedor);
        }
        return repository.save(producto);
    }

    public Producto updateProducto(Long id, Producto producto) {
        return repository.findById(id).map(p -> {
            p.setNombre(producto.getNombre());
            p.setCategoria(producto.getCategoria());
            p.setTalla(producto.getTalla());
            p.setPrecioUnitario(producto.getPrecioUnitario());
            p.setMarca(producto.getMarca());
            p.setFechaFabricacion(producto.getFechaFabricacion());

            if (producto.getProveedor() != null && producto.getProveedor().getId() != null) {
                Proveedor proveedor = proveedorRepository.findById(producto.getProveedor().getId()).orElse(null);
                p.setProveedor(proveedor);
            } else {
                p.setProveedor(null);
            }

            return repository.save(p);
        }).orElse(null);
    }

    public boolean deleteProducto(Long id) {
        return repository.findById(id).map(p -> {
            repository.delete(p);
            return true;
        }).orElse(false);
    }
}