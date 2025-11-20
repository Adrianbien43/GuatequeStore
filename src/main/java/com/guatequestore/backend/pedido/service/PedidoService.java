package com.guatequestore.backend.pedido.service;

import com.guatequestore.backend.pedido.model.Pedido;
import com.guatequestore.backend.pedido.repository.PedidoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PedidoService {

    private final PedidoRepository repository;

    public PedidoService(PedidoRepository repository) {
        this.repository = repository;
    }

    public List<Pedido> getAllPedidos() {
        return repository.findAll();
    }

    public Pedido getPedidoById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Pedido createPedido(Pedido pedido) {
        return repository.save(pedido);
    }

    public Pedido updatePedido(Long id, Pedido pedido) {
        return repository.findById(id).map(p -> {
            p.setFechaPedido(pedido.getFechaPedido());
            p.setEstadoPedido(pedido.getEstadoPedido());
            p.setCliente(pedido.getCliente());
            return repository.save(p);
        }).orElse(null);
    }

    public boolean deletePedido(Long id) {
        return repository.findById(id).map(p -> {
            repository.delete(p);
            return true;
        }).orElse(false);
    }
}