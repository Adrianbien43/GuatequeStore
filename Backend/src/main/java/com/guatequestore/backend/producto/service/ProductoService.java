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
        // Validar que haya proveedor
        if (producto.getProveedor() == null || producto.getProveedor().getId() == null) {
            throw new IllegalArgumentException("El producto debe tener un proveedor válido");
        }

        // Verificar que el proveedor exista
        Proveedor proveedor = proveedorRepository.findById(producto.getProveedor().getId())
                .orElseThrow(() -> new IllegalArgumentException("Proveedor no encontrado"));

        producto.setProveedor(proveedor);

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

            // Validar proveedor
            if (producto.getProveedor() == null || producto.getProveedor().getId() == null) {
                throw new IllegalArgumentException("El producto debe tener un proveedor válido");
            }

            // Verificar que el proveedor exista
            Proveedor proveedor = proveedorRepository.findById(producto.getProveedor().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Proveedor no encontrado"));
            p.setProveedor(proveedor);

            return repository.save(p);
        }).orElseThrow(() -> new IllegalArgumentException("Producto no encontrado"));
    }

    public void deleteProducto(Long id) {
        repository.findById(id).ifPresent(repository::delete);
    }
}
