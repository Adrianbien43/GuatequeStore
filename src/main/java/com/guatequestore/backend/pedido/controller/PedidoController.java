package com.guatequestore.backend.pedido.controller;

import com.guatequestore.backend.pedido.model.Pedido;
import com.guatequestore.backend.pedido.service.PedidoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200", "http://localhost:5173"})
public class PedidoController {

    private final PedidoService service;

    // Constructor que recibe el servicio
    public PedidoController(PedidoService service) {
        this.service = service;
    }

    // OBTENER TODOS LOS PEDIDOS
    @GetMapping
    public List<Pedido> getAllPedidos() {
        return service.getAllPedidos();
    }

    // OBTENER UN PEDIDO POR SU ID
    @GetMapping("/{id}")
    public Pedido getPedidoById(@PathVariable Long id) {
        return service.getPedidoById(id);
    }

    // CREAR UN NUEVO PEDIDO
    @PostMapping
    public Pedido createPedido(@RequestBody Pedido pedido) {
        return service.createPedido(pedido);
    }

    // ACTUALIZAR UN PEDIDO EXISTENTE
    @PutMapping("/{id}")
    public Pedido updatePedido(@PathVariable Long id, @RequestBody Pedido pedido) {
        return service.updatePedido(id, pedido);
    }

    // ELIMINAR UN PEDIDO
    @DeleteMapping("/{id}")
    public void deletePedido(@PathVariable Long id) {
        service.deletePedido(id);
    }
}