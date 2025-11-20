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

    public PedidoController(PedidoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Pedido> getAll() {
        return service.getAllPedidos();
    }

    @GetMapping("/{id}")
    public Pedido getById(@PathVariable Long id) {
        return service.getPedidoById(id);
    }

    @PostMapping
    public Pedido create(@RequestBody Pedido pedido) {
        return service.createPedido(pedido);
    }

    @PutMapping("/{id}")
    public Pedido update(@PathVariable Long id, @RequestBody Pedido pedido) {
        return service.updatePedido(id, pedido);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deletePedido(id);
    }
}