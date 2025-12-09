// src/components/maincomponents/womenproducts/WomenProducts.jsx
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getProductos } from '../../../services/productService';
import { womanImageService } from '../../../services/womanImageService';
import './WomenProducts.css';

const WomenProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await getProductos();
        const allProducts = response.data || [];

        const womenProducts = allProducts.filter(p =>
          p.categoria && /mujer|women|woman|femenino|femme/i.test(p.categoria)
        );

        setProducts(womenProducts);
      } catch (err) {
        setError('No se pudieron cargar los productos');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) return <div className="loading">Cargando moda femenina...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="women-products-container">
      <h1 className="title">Moda Femenina</h1>
      <p className="subtitle">{products.length} productos disponibles</p>

      <div className="products-grid">
        {products.map(product => (
          <NavLink
            key={product.id}
            to={`/women/${product.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <article className="product-card">
              <div className="image-wrapper">
                <img
                  src={womanImageService.getOptimizedImage(product)}
                  alt={product.nombre || 'Producto'}
                  className="product-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = womanImageService.getDefaultImage();
                  }}
                />
              </div>

              <div className="product-info">
                <h3 className="product-name">{product.nombre || 'Sin nombre'}</h3>
                <p className="product-brand">{product.marca || 'Marca exclusiva'}</p>
                <p className="product-category">{product.categoria || 'Categoría'}</p>
                {product.talla && <p className="product-size">Talla: {product.talla}</p>}

                <div className="price-section">
                  <span className="price">
                    ${product.precioUnitario?.toLocaleString('es-AR') || '0'}
                  </span>
                </div>

                <button className="add-to-cart-btn">
                  Ver detalle
                </button>
              </div>
            </article>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default WomenProducts;