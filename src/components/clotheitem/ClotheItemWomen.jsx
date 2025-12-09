// src/components/ClotheItemWomen.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const ClotheItemWomen = ({ product }) => {
  return (
    <NavLink to={`/women/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{
        background: 'white',
        border: '2px solid #f8d7da',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(255,182,193,0.2)',
        transition: 'all 0.4s',
        cursor: 'pointer'
      }} onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(255,182,193,0.4)';
      }} onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(255,182,193,0.2)';
      }}>
        
        <img 
          src={product.imagen || 'https://via.placeholder.com/300'}
          alt={product.nombre}
          style={{ width: '100%', height: '320px', objectFit: 'cover' }}
        />
        
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '1.4em', color: '#d63384' }}>
            {product.nombre}
          </h3>
          <p style={{ margin: '0', color: '#888', fontStyle: 'italic' }}>{product.marca}</p>
          <p style={{ margin: '16px 0 0 0', fontSize: '1.6em', fontWeight: 'bold', color: '#e91e63' }}>
            ${product.precioUnitario?.toLocaleString('es-AR')}
          </p>
        </div>
      </div>
    </NavLink>
  );
};

export default ClotheItemWomen;