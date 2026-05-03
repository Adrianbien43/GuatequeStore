package com.guatequestore.backend.pedido.controller;

import com.guatequestore.backend.pedido.model.Pedido;
import com.guatequestore.backend.pedido.service.PedidoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200", "http://localhost:5173"},
        allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class PedidoController {

    private final PedidoService service;

    public PedidoController(PedidoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Pedido> getAllPedidos() {
        return service.getAllPedidos();
    }

    @GetMapping("/{id}")
    public Pedido getPedidoById(@PathVariable Long id) {
        return service.getPedidoById(id);
    }

    @GetMapping("/cliente/{usuarioId}")
    public List<Pedido> getPedidosByUsuarioId(@PathVariable Long usuarioId) {
        return service.getPedidosByUsuarioId(usuarioId);
    }

    @PostMapping
    public Pedido createPedido(@RequestBody Pedido pedido) {
        return service.createPedido(pedido);
    }

    @PutMapping("/{id}")
    public Pedido updatePedido(@PathVariable Long id, @RequestBody Pedido pedido) {
        return service.updatePedido(id, pedido);
    }

    @DeleteMapping("/{id}")
    public void deletePedido(@PathVariable Long id) {
        service.deletePedido(id);
    }
}