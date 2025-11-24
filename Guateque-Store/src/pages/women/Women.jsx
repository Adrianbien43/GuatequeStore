import React, { useState, useEffect } from 'react';
import { productService } from '../../services/productService';

const Women = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const womenProducts = await productService.getByCategory('WOMEN');
      setProducts(womenProducts);
    } catch (error) {
      console.error('Error cargando productos:', error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Productos para Mujer</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
        {products.map(product => (
          <div key={product.id} style={{ 
            border: '1px solid #ccc', 
            padding: '1rem', 
            borderRadius: '8px',
            background: 'white'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>{product.name}</h3>
            <p style={{ margin: '0.25rem 0' }}><strong>Marca:</strong> {product.brand}</p>
            <p style={{ margin: '0.25rem 0' }}><strong>Precio:</strong> ${product.unitPrice}</p>
            <p style={{ margin: '0.25rem 0' }}><strong>Talla:</strong> {product.size}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Women;