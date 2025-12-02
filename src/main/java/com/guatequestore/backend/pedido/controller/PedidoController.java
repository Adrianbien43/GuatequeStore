package com.guatequestore.backend.pedido.controller;

import com.guatequestore.backend.pedido.model.Pedido;
import com.guatequestore.backend.pedido.service.PedidoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
/**
 * @author Gorka Jesús
 * @version 1.0.5
 */
@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200", "http://localhost:5173"})
public class PedidoController {

    private final PedidoService service;

    // Constructor que recibe el servicio
    public PedidoController(PedidoService service) {
        this.service = service;
    }

    // Esto sirve para obtener todos los pedidos
    @GetMapping
    public List<Pedido> getAllPedidos() {
        return service.getAllPedidos();
    }

    // Este lo obtiene pero por id
    @GetMapping("/{id}")
    public Pedido getPedidoById(@PathVariable Long id) {
        return service.getPedidoById(id);
    }

    // Con este creamos el nuevo pedido
    @PostMapping
    public Pedido createPedido(@RequestBody Pedido pedido) {
        return service.createPedido(pedido);
    }

    // Aqui podemos actualizar el pedido
    @PutMapping("/{id}")
    public Pedido updatePedido(@PathVariable Long id, @RequestBody Pedido pedido) {
        return service.updatePedido(id, pedido);
    }

    // Con este lo eliminamos
    @DeleteMapping("/{id}")
    public void deletePedido(@PathVariable Long id) {
        service.deletePedido(id);
    }
}