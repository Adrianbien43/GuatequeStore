import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

// Componente que lanza error (para testing)
const ComponenteConError = () => {
  throw new Error('Error de prueba');
};

const ComponenteNormal = () => <div>Todo funciona correctamente</div>;

describe('ErrorBoundary', () => {
  // Silenciar console.error en los tests para no contaminar output
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renderiza los children cuando no hay error', () => {
    render(
      <ErrorBoundary>
        <ComponenteNormal />
      </ErrorBoundary>
    );

    expect(screen.getByText('Todo funciona correctamente')).toBeInTheDocument();
  });

  it('muestra mensaje de error cuando un child lanza excepción', () => {
    render(
      <ErrorBoundary>
        <ComponenteConError />
      </ErrorBoundary>
    );

    expect(screen.getByText('¡Ups! Algo salió mal al cargar la página.')).toBeInTheDocument();
  });

  it('aplica estilos correctos al mensaje de error', () => {
    const { container } = render(
      <ErrorBoundary>
        <ComponenteConError />
      </ErrorBoundary>
    );

    const errorDiv = container.querySelector('div');
    
    // Verificar estilos individuales (más flexible)
    expect(errorDiv).toHaveStyle({ padding: '2rem' });
    expect(errorDiv).toHaveStyle({ textAlign: 'center' });
    
    // Para colores, usar rgb o verificar que contiene el color
    const styles = window.getComputedStyle(errorDiv);
    expect(styles.color).toBe('rgb(255, 0, 0)'); // red en RGB
    expect(styles.backgroundColor).toBe('rgb(255, 238, 238)'); // #fee en RGB
  });

  it('captura el error en console.error', () => {
    render(
      <ErrorBoundary>
        <ComponenteConError />
      </ErrorBoundary>
    );

    expect(console.error).toHaveBeenCalledWith(
      "Error capturado:",
      expect.any(Error),
      expect.objectContaining({ componentStack: expect.any(String) })
    );
  });

  it('actualiza estado a hasError: true cuando ocurre error', () => {
    const { container } = render(
      <ErrorBoundary>
        <ComponenteConError />
      </ErrorBoundary>
    );

    // Verificar que se muestra el fallback (evidencia de que hasError es true)
    expect(container.textContent).toContain('Algo salió mal');
  });

  it('no renderiza children cuando hay error', () => {
    render(
      <ErrorBoundary>
        <ComponenteConError />
      </ErrorBoundary>
    );

    // El children nunca se renderiza porque falla antes
    expect(screen.queryByText('Todo funciona correctamente')).not.toBeInTheDocument();
  });

  it('maneja múltiples errores sin crash', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ComponenteNormal />
      </ErrorBoundary>
    );

    // Primero funciona normal
    expect(screen.getByText('Todo funciona correctamente')).toBeInTheDocument();

    // Forzar re-render con error (simulando cambio de ruta con error)
    rerender(
      <ErrorBoundary>
        <ComponenteConError />
      </ErrorBoundary>
    );

    // Ahora muestra error
    expect(screen.getByText('¡Ups! Algo salió mal al cargar la página.')).toBeInTheDocument();
  });
});