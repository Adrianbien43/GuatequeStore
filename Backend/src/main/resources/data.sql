-- ==================================================
-- data.sql - DATOS DE PRUEBA REALISTAS Y SEGUROS
-- 1 proveedor con productos + otros sin productos
-- Actualizado para usar 'usuario' en lugar de 'clientes'
-- ==================================================

-- Desactivar verificaciones de claves foráneas temporalmente
SET FOREIGN_KEY_CHECKS = 0;

-- 1. PROVEEDORES (5 proveedores, solo el primero tiene productos)
INSERT INTO proveedor (nombre, direccion) VALUES
('RockWear Supplies S.L.', 'Polígono Industrial La Garena, Av. del Sol 45, 28806 Alcalá de Henares, Madrid'),
('Urban Trend Fashion', 'Calle de la Moda 12, 41003 Sevilla'),
('Vintage Soul Clothing', 'Carrer de Verdi 28, 08012 Barcelona'),
('Street Kings Co.', 'Avenida de América 89, 48005 Bilbao'),
('EcoThreads Atelier', 'Rúa do Franco 15, 15702 Santiago de Compostela');

-- 2. USUARIOS REALISTAS (TABLA: usuario, ROL: CLIENTE o ADMINISTRADOR)
INSERT INTO usuario (nombre, email, contraseña, direccion, activo, rol, fecha_creacion, fecha_actualizacion) VALUES
('Ana Martínez López', 'ana.martinez@email.com', '$2a$10$6VvP3fV8z1Z9k9L9m9N9O.9O9P9Q9R9S9T9U9V9W9X9Y9Z9A9B9C', 'Calle Mayor 23, 28013 Madrid', 1, 'CLIENTE', NOW(), NOW()),
('Carlos Ruiz Gómez', 'carlos.ruiz@email.com', '$2a$10$6VvP3fV8z1Z9k9L9m9N9O.9O9P9Q9R9S9T9U9V9W9X9Y9Z9A9B9C', 'Av. Libertad 56, 41002 Sevilla', 1, 'CLIENTE', NOW(), NOW()),
('Laura Fernández Díaz', 'laura.fd@email.com', '$2a$10$6VvP3fV8z1Z9k9L9m9N9O.9O9P9Q9R9S9T9U9V9W9X9Y9Z9A9B9C', 'Ronda de Sant Pere 45, 08010 Barcelona', 1, 'ADMINISTRADOR', NOW(), NOW()),
('Pablo Sánchez Torres', 'pablo.st@email.com', '$2a$10$6VvP3fV8z1Z9k9L9m9N9O.9O9P9Q9R9S9T9U9V9W9X9Y9Z9A9B9C', 'Calle Urzaiz 78, 36201 Vigo', 1, 'CLIENTE', NOW(), NOW()),
('Sofía Herrera Vega', 'sofia.hv@email.com', '$2a$10$6VvP3fV8z1Z9k9L9m9N9O.9O9P9Q9R9S9T9U9V9W9X9Y9Z9A9B9C', NULL, 1, 'CLIENTE', NOW(), NOW());

-- 3. TELÉFONOS DE USUARIOS (TABLA: telefono_usuario)
INSERT INTO telefono_usuario (ID_Usuario, telefono, tipo) VALUES
(1, '612345678', 'MOVIL'),
(1, '914567890', 'FIJO'),
(2, '654987321', 'MOVIL'),
(3, '699123456', 'MOVIL'),
(4, '986112233', 'FIJO'),
(5, '622334455', 'MOVIL');

-- 4. TELÉFONOS DE PROVEEDORES
INSERT INTO telefono_proveedor (ID_Proveedor, telefono, tipo) VALUES
(1, '911234567', 'FIJO'),
(1, '601234567', 'MOVIL'),
(2, '954112233', 'FIJO'),
(3, '933445566', 'FIJO'),
(4, '944556677', 'FIJO');

-- 5. ALMACENES
INSERT INTO almacen (nombre, direccion, capacidad) VALUES
('Almacén Central Madrid', 'Polígono Las Mercedes, 28022 Madrid', 5000),
('Almacén Sur Sevilla', 'Polígono Store, 41006 Sevilla', 3000),
('Almacén Norte Bilbao', 'Polígono Zorrozaurre, 48013 Bilbao', 2500);

-- 6. PRODUCTOS - SOLO DEL PROVEEDOR 1 (RockWear Supplies)
-- IMPORTANTE: Ahora Categoria es PANTALON/CAMISETA/GORRA/SUDADERA
-- y Genero es HOMBRE/MUJER como campos separados

INSERT INTO producto (Nombre, Categoria, Genero, Precio_Unitario, Talla, Marca, Fecha_Fabricacion, ID_Proveedor) VALUES
('Camiseta Nirvana Smile', 'CAMISETA', 'HOMBRE', 24.99, 'M', 'RockWear', '2024-03-15', 1),
('Hoodie Metallica Skull', 'SUDADERA', 'HOMBRE', 54.99, 'L', 'RockWear', '2024-04-20', 1),
('Camiseta Rolling Stones Tongue', 'CAMISETA', 'MUJER', 22.99, 'S', 'RockWear', '2024-05-10', 1),
('Sudadera Pink Floyd Prism', 'SUDADERA', 'HOMBRE', 49.99, 'XL', 'RockWear', '2024-06-01', 1),
('Camiseta Queen Crest', 'CAMISETA', 'MUJER', 26.99, 'M', 'RockWear', '2024-07-12', 1),
('Gorra AC/DC Thunder', 'GORRA', 'HOMBRE', 19.99, 'ÚNICA', 'RockWear', '2024-08-05', 1),
('Camiseta Guns N Roses Bullet', 'CAMISETA', 'HOMBRE', 27.99, 'L', 'RockWear', '2024-09-18', 1),
('Top Led Zeppelin Icarus', 'CAMISETA', 'MUJER', 21.99, 'XS', 'RockWear', '2024-10-22', 1);

-- 7. INVENTARIO (stock de los productos del proveedor 1)
INSERT INTO inventario (ID_Almacen, ID_Producto, Cantidad) VALUES
(1, 1, 120),
(1, 2, 80),
(1, 3, 150),
(2, 4, 60),
(2, 5, 90),
(3, 6, 200),
(1, 7, 70),
(2, 8, 110);

-- 8. PEDIDOS DE PRUEBA
-- CORREGIDO: Cambiado los nombres de columna según tu entidad Pedido
INSERT INTO pedidos (fecha_pedido, estado_pedido, usuario_id, almacen_id) VALUES
('2024-11-15', 'ENTREGADO', 1, 1),
('2024-12-01', 'ENVIADO', 2, 1),
('2024-12-05', 'EN_PREPARACION', 3, 2),
('2024-12-08', 'PENDIENTE', 4, 1),
('2024-12-09', 'CONFIRMADO', 1, 3);

-- Reactivar verificaciones de claves foráneas
SET FOREIGN_KEY_CHECKS = 1;
