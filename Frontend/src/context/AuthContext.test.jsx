import React, { useContext } from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AuthContext, AuthProvider } from './AuthContext';

// Componente auxiliar para consumir el contexto
const TestComponent = () => {
  const { user, token, login, logout } = useContext(AuthContext);
  
  return (
    <div>
      <div data-testid="user">{user ? JSON.stringify(user) : 'no-user'}</div>
      <div data-testid="token">{token || 'no-token'}</div>
      <button 
        data-testid="login-btn" 
        onClick={() => login({
          token: 'test-token-123',
          nombre: 'Juan',
          email: 'juan@test.com',
          rol: 'CLIENTE'
        })}
      >
        Login
      </button>
      <button data-testid="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

// Helper para renderizar con provider
const renderWithProvider = (component) => {
  return render(
    <AuthProvider>
      {component}
    </AuthProvider>
  );
};

describe('AuthContext', () => {
  // Mock de localStorage
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  };

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Inicialización', () => {
    it('inicia con usuario y token null cuando no hay datos en localStorage', () => {
      localStorageMock.getItem.mockReturnValue(null);
      
      renderWithProvider(<TestComponent />);
      
      expect(screen.getByTestId('user').textContent).toBe('no-user');
      expect(screen.getByTestId('token').textContent).toBe('no-token');
    });

    it('carga usuario y token desde localStorage al montar', async () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'token') return 'stored-token';
        if (key === 'user') return JSON.stringify({ nombre: 'Ana', email: 'ana@test.com', rol: 'ADMIN' });
        return null;
      });

      renderWithProvider(<TestComponent />);

      await waitFor(() => {
        expect(screen.getByTestId('token').textContent).toBe('stored-token');
      });

      expect(screen.getByTestId('user').textContent).toBe(
        JSON.stringify({ nombre: 'Ana', email: 'ana@test.com', rol: 'ADMIN' })
      );
    });

    it('no carga datos si solo existe token pero no usuario', () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'token') return 'solo-token';
        return null;
      });

      renderWithProvider(<TestComponent />);

      // No debería cargar nada porque falta user
      expect(screen.getByTestId('token').textContent).toBe('no-token');
      expect(screen.getByTestId('user').textContent).toBe('no-user');
    });

    it('no carga datos si solo existe usuario pero no token', () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'user') return JSON.stringify({ nombre: 'Pedro' });
        return null;
      });

      renderWithProvider(<TestComponent />);

      expect(screen.getByTestId('token').textContent).toBe('no-token');
      expect(screen.getByTestId('user').textContent).toBe('no-user');
    });
  });

  describe('Login', () => {
    it('actualiza estado y guarda en localStorage al hacer login', async () => {
      localStorageMock.getItem.mockReturnValue(null);
      
      renderWithProvider(<TestComponent />);

      // Estado inicial
      expect(screen.getByTestId('user').textContent).toBe('no-user');

      // Hacer login
      await act(async () => {
        screen.getByTestId('login-btn').click();
      });

      // Verificar estado actualizado
      expect(screen.getByTestId('token').textContent).toBe('test-token-123');
      expect(screen.getByTestId('user').textContent).toBe(
        JSON.stringify({ nombre: 'Juan', email: 'juan@test.com', rol: 'CLIENTE' })
      );

      // Verificar localStorage
      expect(localStorageMock.setItem).toHaveBeenCalledWith('token', 'test-token-123');
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'user',
        JSON.stringify({ nombre: 'Juan', email: 'juan@test.com', rol: 'CLIENTE' })
      );
    });
  });

  describe('Logout', () => {
    it('limpia estado y localStorage al hacer logout', async () => {
      // Pre-popular localStorage
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'token') return 'active-token';
        if (key === 'user') return JSON.stringify({ nombre: 'Maria' });
        return null;
      });

      renderWithProvider(<TestComponent />);

      // Esperar carga inicial
      await waitFor(() => {
        expect(screen.getByTestId('token').textContent).toBe('active-token');
      });

      // Hacer logout
      await act(async () => {
        screen.getByTestId('logout-btn').click();
      });

      // Verificar estado limpio
      expect(screen.getByTestId('token').textContent).toBe('no-token');
      expect(screen.getByTestId('user').textContent).toBe('no-user');

      // Verificar localStorage limpiado
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('token');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('user');
    });
  });

  describe('Edge cases', () => {
    it('maneja JSON.parse error en usuario corrupto', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'token') return 'valid-token';
        if (key === 'user') return 'json-invalido-{corrupto}';
        return null;
      });

      // No debería lanzar error, simplemente no carga
      expect(() => {
        renderWithProvider(<TestComponent />);
      }).not.toThrow();

      consoleSpy.mockRestore();
    });

    it('mantiene estado consistente entre múltiples logins', async () => {
      localStorageMock.getItem.mockReturnValue(null);
      
      renderWithProvider(<TestComponent />);

      // Primer login
      await act(async () => {
        screen.getByTestId('login-btn').click();
      });

      expect(screen.getByTestId('token').textContent).toBe('test-token-123');

      // Segundo login (simulando cambio de usuario)
      await act(async () => {
        screen.getByTestId('login-btn').click();
      });

      // Token debería mantenerse (o actualizarse si cambia la lógica)
      expect(screen.getByTestId('token').textContent).toBe('test-token-123');
    });
  });
});