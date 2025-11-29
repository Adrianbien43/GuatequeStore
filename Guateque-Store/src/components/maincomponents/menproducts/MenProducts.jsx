// src/components/maincomponents/menproducts/MenProducts.jsx
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getProductos } from '../../../services/productService';
import { manImageService } from '../../../services/manImageService';
import './MenProducts.css';

const MenProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await getProductos();
        const allProducts = response.data || [];

        const menProducts = allProducts.filter(p =>
          p.categoria && /hombre|men|masculino|masc|male/i.test(p.categoria)
        );

        setProducts(menProducts);
      } catch (err) {
        setError('No se pudieron cargar los productos');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) return <div className="loading">Cargando productos...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="men-products-container">
      <h1 className="title">Moda Masculina</h1>
      <p className="subtitle">{products.length} productos disponibles</p>

      <div className="products-grid">
        {products.map(product => (
          <NavLink
            key={product.id}
            to={`/men/${product.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <article className="product-card">
              <div className="image-wrapper">
                <img
                  src={manImageService.getOptimizedImage(product)}
                  alt={product.nombre || 'Producto'}
                  className="product-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = manImageService.getDefaultImage();
                  }}
                />
              </div>

              <div className="product-info">
                <h3 className="product-name">{product.nombre || 'Sin nombre'}</h3>
                <p className="product-brand">{product.marca || 'Marca premium'}</p>
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

export default MenProducts;