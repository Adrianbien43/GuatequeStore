// src/components/ClotheItemMen.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const ClotheItemMen = ({ product }) => {
  return (
    <NavLink to={`/men/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{
        background: '#1a1a1a',
        color: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
        transition: 'transform 0.3s',
        cursor: 'pointer'
      }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'}
         onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
        
        <img 
          src={product.imagen || 'https://via.placeholder.com/300'}
          alt={product.nombre}
          style={{ width: '100%', height: '280px', objectFit: 'cover' }}
        />
        
        <div style={{ padding: '16px' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '1.3em' }}>{product.nombre}</h3>
          <p style={{ margin: '0', opacity: '0.8', fontSize: '0.95em' }}>{product.marca}</p>
          <p style={{ margin: '12px 0 0 0', fontSize: '1.5em', fontWeight: 'bold', color: '#00ff9d' }}>
            ${product.precioUnitario?.toLocaleString('es-AR')}
          </p>
        </div>
      </div>
    </NavLink>
  );
};

export default ClotheItemMen;