package com.guatequestore.backend.pedido.service;

import com.guatequestore.backend.pedido.model.Pedido;
import com.guatequestore.backend.pedido.repository.PedidoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PedidoService {

    private final PedidoRepository repository;

    // Inyectamos el repository mediante constructor
    public PedidoService(PedidoRepository repository) {
        this.repository = repository;
    }

    // OBTENER TODOS LOS PEDIDOS
    public List<Pedido> getAllPedidos() {
        return repository.findAll();
    }

    // OBTENER UN PEDIDO POR ID
    public Pedido getPedidoById(Long id) {
        // Busca el pedido por ID, si no existe devuelve null
        return repository.findById(id).orElse(null);
    }

    // CREAR UN NUEVO PEDIDO
    public Pedido createPedido(Pedido pedido) {
        // Guarda el pedido en la base de datos
        return repository.save(pedido);
    }

    // ACTUALIZAR UN PEDIDO EXISTENTE
    public Pedido updatePedido(Long id, Pedido pedidoActualizado) {
        // Busca el pedido existente
        return repository.findById(id).map(pedidoExistente -> {
            // Actualiza solo los campos permitidos
            pedidoExistente.setFechaPedido(pedidoActualizado.getFechaPedido());
            pedidoExistente.setEstadoPedido(pedidoActualizado.getEstadoPedido());
            pedidoExistente.setCliente(pedidoActualizado.getCliente());
            pedidoExistente.setAlmacen(pedidoActualizado.getAlmacen());

            // Guarda los cambios
            return repository.save(pedidoExistente);
        }).orElse(null); // Si no encuentra el pedido, devuelve null
    }

    // ELIMINAR UN PEDIDO
    public void deletePedido(Long id) {
        // Elimina el pedido de la base de datos
        repository.deleteById(id);
    }
}