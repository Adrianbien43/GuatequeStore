import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Cargando from './Cargando';

// Mocks para los estilos CSS Modules
vi.mock('./Cargando.module.css', () => ({
  default: {
    contenedor: 'contenedor',
    mensaje: 'mensaje',
    puerta1: 'puerta1',
    puerta2: 'puerta2',
    puerta1Abierta: 'puerta1Abierta',
    puerta2Abierta: 'puerta2Abierta',
  },
}));

describe('Cargando', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('renderiza el mensaje "Felices fiestas"', () => {
    render(<Cargando />);
    
    expect(screen.getByText('Felices fiestas')).toBeInTheDocument();
  });

  it('renderiza el contenedor y las puertas', () => {
    const { container } = render(<Cargando />);
    
    expect(container.firstChild).toHaveClass('contenedor');
    expect(container.querySelector('.puerta1')).toBeInTheDocument();
    expect(container.querySelector('.puerta2')).toBeInTheDocument();
  });

  it('las puertas inician cerradas (sin clase abierta)', () => {
    const { container } = render(<Cargando />);
    
    const puerta1 = container.querySelector('.puerta1');
    const puerta2 = container.querySelector('.puerta2');
    
    expect(puerta1).not.toHaveClass('puerta1Abierta');
    expect(puerta2).not.toHaveClass('puerta2Abierta');
  });

  it('abre las puertas después de 100ms', async () => {
    const { container } = render(<Cargando />);
    
    const puerta1 = container.querySelector('.puerta1');
    const puerta2 = container.querySelector('.puerta2');
    
    // Antes de los 100ms
    expect(puerta1).not.toHaveClass('puerta1Abierta');
    
    // Avanzar 100ms dentro de act()
    await act(async () => {
      vi.advanceTimersByTime(100);
    });
    
    // Después de 100ms
    expect(puerta1).toHaveClass('puerta1Abierta');
    expect(puerta2).toHaveClass('puerta2Abierta');
  });

  it('llama a onFinish después de 1100ms', async () => {
    const mockOnFinish = vi.fn();
    render(<Cargando onFinish={mockOnFinish} />);
    
    // Antes de los 1100ms
    expect(mockOnFinish).not.toHaveBeenCalled();
    
    // Avanzar 1100ms dentro de act()
    await act(async () => {
      vi.advanceTimersByTime(1100);
    });
    
    // Después de 1100ms
    expect(mockOnFinish).toHaveBeenCalledTimes(1);
  });

  it('no llama a onFinish si no se proporciona', async () => {
    // No debería lanzar error
    await act(async () => {
      render(<Cargando />);
      vi.advanceTimersByTime(1100);
    });
  });

  it('limpia los timers al desmontar', () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
    const { unmount } = render(<Cargando />);
    
    unmount();
    
    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });

  it('reinicia timers cuando cambia onFinish', async () => {
    const mockOnFinish1 = vi.fn();
    const mockOnFinish2 = vi.fn();
    
    const { rerender } = render(<Cargando onFinish={mockOnFinish1} />);
    
    // Cambiar la prop onFinish
    rerender(<Cargando onFinish={mockOnFinish2} />);
    
    // Avanzar tiempo dentro de act()
    await act(async () => {
      vi.advanceTimersByTime(1100);
    });
    
    // El nuevo callback debería ser llamado
    expect(mockOnFinish2).toHaveBeenCalled();
  });
});