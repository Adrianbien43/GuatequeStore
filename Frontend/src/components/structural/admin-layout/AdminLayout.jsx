import { useState } from 'react';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import styles from './AdminLayout.module.css';

/**
 * AdminLayout - Layout principal del panel administrativo
 * Proporciona estructura con TopBar, Sidebar y área de contenido
 * 
 * Props:
 * - children: React.ReactNode - contenido a mostrar en el área principal
 * - activeSection: string - sección activa actual
 * - onSectionChange: function - callback al cambiar de sección
 * 
 * Structure:
 * ┌─────────────────────────────────────┐
 * │  TopBar (Nombre usuario + Logout)   │
 * ├──────────┬──────────────────────────┤
 * │          │                          │
 * │ Sidebar  │   Main Content           │
 * │  (Nav)   │    (children)            │
 * │          │                          │
 * └──────────┴──────────────────────────┘
 */
export default function AdminLayout({ children, activeSection, onSectionChange }) {
  return (
    <div className={styles.layoutContainer}>
      <TopBar />
      <Sidebar activeSection={activeSection} onSectionChange={onSectionChange} />
      <div className={styles.mainContent}>
        {children}
      </div>
    </div>
  );
}
