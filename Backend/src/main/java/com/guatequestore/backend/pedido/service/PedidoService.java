package com.guatequestore.backend.pedido.service;

import com.guatequestore.backend.pedido.model.Pedido;
import com.guatequestore.backend.lineapedido.model.LineaPedido;
import com.guatequestore.backend.pedido.repository.PedidoRepository;
import com.guatequestore.backend.lineapedido.repository.LineaPedidoRepository;
import com.guatequestore.backend.usuario.model.Usuario;
import com.guatequestore.backend.usuario.repository.UsuarioRepository;
import com.guatequestore.backend.almacen.model.Almacen;
import com.guatequestore.backend.almacen.repository.AlmacenRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final UsuarioRepository usuarioRepository;
    private final AlmacenRepository almacenRepository;
    private final LineaPedidoRepository lineaPedidoRepository;

    public PedidoService(PedidoRepository pedidoRepository,
                         UsuarioRepository usuarioRepository,
                         AlmacenRepository almacenRepository,
                         LineaPedidoRepository lineaPedidoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.usuarioRepository = usuarioRepository;
        this.almacenRepository = almacenRepository;
        this.lineaPedidoRepository = lineaPedidoRepository;
    }

    public List<Pedido> getAllPedidos() {
        return pedidoRepository.findAll();
    }

    public Pedido getPedidoById(Long id) {
        return pedidoRepository.findById(id).orElse(null);
    }

    public List<Pedido> getPedidosByUsuarioId(Long usuarioId) {
        return pedidoRepository.findByUsuario_IdUsuarioWithLineas(usuarioId);
    }

    public Pedido createPedido(Pedido pedido) {
        try {
            System.out.println("=== CREANDO PEDIDO ===");
            System.out.println("Datos recibidos:");
            System.out.println("- Fecha: " + pedido.getFechaPedido());
            System.out.println("- Estado: " + pedido.getEstadoPedido());
            System.out.println("- Usuario objeto: " + pedido.getUsuario());

            if (pedido.getUsuario() != null) {
                System.out.println("- Usuario ID (getId()): " + pedido.getUsuario().getId());
                System.out.println("- Usuario ID (getIdUsuario()): " + pedido.getUsuario().getIdUsuario());
            }

            System.out.println("- Almacén objeto: " + pedido.getAlmacen());
            if (pedido.getAlmacen() != null) {
                System.out.println("- Almacén ID: " + pedido.getAlmacen().getId());
            }

            System.out.println("- Líneas del pedido: " + (pedido.getLineas() != null ? pedido.getLineas().size() : 0));

            if (pedido.getFechaPedido() == null) {
                pedido.setFechaPedido(LocalDate.now());
            }

            if (pedido.getEstadoPedido() == null) {
                pedido.setEstadoPedido(Pedido.EstadoPedido.PENDIENTE);
            }

            if (pedido.getUsuario() == null) {
                throw new IllegalArgumentException("El usuario es requerido");
            }

            Long usuarioId = pedido.getUsuario().getId();

            if (usuarioId == null) {
                usuarioId = pedido.getUsuario().getIdUsuario();
                if (usuarioId == null) {
                    throw new IllegalArgumentException("ID de usuario no proporcionado");
                }
            }

            Usuario usuario = usuarioRepository.findById(usuarioId)
                    .orElseThrow(() -> {
                        List<Usuario> usuarios = usuarioRepository.findAll();
                        StringBuilder error = new StringBuilder("Usuario con ID no existe. ");
                        if (!usuarios.isEmpty()) {
                            error.append("Usuarios disponibles: ");
                            for (Usuario u : usuarios) {
                                error.append("ID=").append(u.getIdUsuario()).append("(").append(u.getNombre()).append("), ");
                            }
                        } else {
                            error.append("No hay usuarios en la base de datos.");
                        }
                        return new RuntimeException(error.toString());
                    });

            if (pedido.getAlmacen() == null) {
                throw new IllegalArgumentException("El almacén es requerido");
            }

            Long almacenId = pedido.getAlmacen().getId();

            if (almacenId == null) {
                throw new IllegalArgumentException("ID de almacén es requerido");
            }

            Almacen almacen = almacenRepository.findById(almacenId)
                    .orElseThrow(() -> {
                        List<Almacen> almacenes = almacenRepository.findAll();
                        StringBuilder error = new StringBuilder("Almacén con ID " + almacenId + " no existe. ");
                        if (!almacenes.isEmpty()) {
                            error.append("Almacenes disponibles: ");
                            for (Almacen a : almacenes) {
                                error.append("ID=").append(a.getId()).append("(").append(a.getNombre()).append("), ");
                            }
                        } else {
                            error.append("No hay almacenes en la base de datos.");
                        }
                        return new RuntimeException(error.toString());
                    });

            pedido.setUsuario(usuario);
            pedido.setAlmacen(almacen);

            Pedido pedidoGuardado = pedidoRepository.save(pedido);
            System.out.println("✓ Pedido creado exitosamente con ID: " + pedidoGuardado.getId());

            if (pedido.getLineas() != null && !pedido.getLineas().isEmpty()) {
                System.out.println("Guardando líneas del pedido...");
                for (LineaPedido linea : pedido.getLineas()) {
                    linea.setPedido(pedidoGuardado);
                    if (linea.getSubtotal() == null) {
                        linea.setSubtotal(linea.getCantidad() * linea.getPrecioUnitarioVenta());
                    }
                    lineaPedidoRepository.save(linea);
                    System.out.println("✓ Línea guardada - Producto ID: " + linea.getProductoId() +
                            ", Cantidad: " + linea.getCantidad() +
                            ", Subtotal: " + linea.getSubtotal());
                }
            }

            return pedidoGuardado;

        } catch (Exception e) {
            System.err.println("ERROR AL CREAR PEDIDO: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Error al crear pedido: " + e.getMessage(), e);
        }
    }

    public Pedido updatePedido(Long id, Pedido pedidoActualizado) {
        return pedidoRepository.findById(id).map(pedidoExistente -> {

            if (pedidoActualizado.getFechaPedido() != null) {
                pedidoExistente.setFechaPedido(pedidoActualizado.getFechaPedido());
            }

            if (pedidoActualizado.getEstadoPedido() != null) {
                pedidoExistente.setEstadoPedido(pedidoActualizado.getEstadoPedido());
            }

            if (pedidoActualizado.getUsuario() != null) {
                Long usuarioId = pedidoActualizado.getUsuario().getId();
                if (usuarioId == null) {
                    usuarioId = pedidoActualizado.getUsuario().getIdUsuario();
                }

                if (usuarioId != null) {
                    Usuario usuario = usuarioRepository.findById(usuarioId)
                            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
                    pedidoExistente.setUsuario(usuario);
                }
            }

            if (pedidoActualizado.getAlmacen() != null &&
                    pedidoActualizado.getAlmacen().getId() != null) {

                Almacen almacen = almacenRepository.findById(pedidoActualizado.getAlmacen().getId())
                        .orElseThrow(() -> new RuntimeException(
                                "Almacén no encontrado: " + pedidoActualizado.getAlmacen().getId()));

                pedidoExistente.setAlmacen(almacen);
            }

            return pedidoRepository.save(pedidoExistente);

        }).orElse(null);
    }

    public void deletePedido(Long id) {
        pedidoRepository.deleteById(id);
    }
}