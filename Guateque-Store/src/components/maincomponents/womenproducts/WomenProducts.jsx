// src/components/WomenProducts.jsx
import React, { useState, useEffect } from 'react';
import { getProductos } from '../../../services/productService';
import './WomenProducts.css'

// Componente para mostrar productos de mujer
const WomenProducts = () => {
  // Estado para almacenar la lista de productos
  const [products, setProducts] = useState([]);
  // Estado para controlar si está cargando los datos
  const [loading, setLoading] = useState(true);
  // Estado para almacenar mensajes de error
  const [error, setError] = useState(null);

  // Efecto que se ejecuta cuando el componente se monta
  useEffect(() => {
    // Función asíncrona para cargar productos de mujer
    const loadWomenProducts = async () => {
      try {
        // Activo el estado de carga y reseteo errores
        setLoading(true);
        setError(null);

        // Llamo al servicio para obtener todos los productos
        const response = await getProductos();
        const allProducts = response.data;

        // Filtro los productos para obtener solo los de categoría mujer
        const womenProducts = allProducts.filter((product) => {
          // Convierto la categoría a mayúsculas para comparación case-insensitive
          const category = product.categoria.toUpperCase();
          // Incluyo varias posibles formas de escribir la categoría mujer
          return category === 'MUJER' || category === 'WOMEN' || category === 'WOMAN';
        });

        // Actualizo el estado con los productos filtrados
        setProducts(womenProducts);
      } catch (err) {
        // Manejo errores de la petición
        console.error('Error cargando productos de mujer:', err);
        setError('No se pudieron cargar los productos. Por favor, intenta más tarde.');
      } finally {
        // Desactivo el estado de carga
        setLoading(false);
      }
    };

    // Ejecuto la función de carga
    loadWomenProducts();
  }, []); // Array de dependencias vacío = se ejecuta solo al montar el componente

  // Renderizado condicional para estado de carga
  if (loading) {
    return (
      <div className="loading-container">
        <p>Cargando productos...</p>
      </div>
    );
  }

  // Renderizado condicional para estado de error
  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    );
  }

  // Renderizado principal del componente
  return (
    <div className="women-products-container">
      <h1 className="women-products-title">Productos para Mujer</h1>

      {/* Verifico si hay productos para mostrar */}
      {products.length === 0 ? (
        <p className="no-products-message">
          No hay productos disponibles en esta categoría en este momento.
        </p>
      ) : (
        <div className="products-grid">
          {/* Mapeo cada producto a su tarjeta correspondiente */}
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <h3 className="product-name">{product.nombre}</h3>
              <p className="product-brand">
                <strong>Marca:</strong> {product.marca}
              </p>
              <p className="product-price">
                <strong>Precio:</strong> ${product.precioUnitario.toLocaleString('es-AR')}
              </p>
              <p className="product-size">
                <strong>Talla:</strong> {product.talla}
              </p>
              <p className="product-manufacturing">
                <strong>Fecha de fabricación:</strong> {product.fechaFabricacion}
              </p>
              <p className="product-stock">
                <strong>Stock:</strong> {product.stockTotal}
              </p>
              <p className="product-supplier">
                <strong>Proveedor:</strong> {product.proveedor.nombre}
              </p>
              <p className="product-supplier-address">
                <strong>Dirección del proveedor:</strong> {product.proveedor.direccion}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Exporto el componente para poder usarlo en otros archivos
export default WomenProducts;