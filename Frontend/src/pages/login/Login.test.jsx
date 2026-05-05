import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import Login from './Login'

// Mockear axios
vi.mock('axios')
import axios from 'axios'

// Mockear useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

describe('Login Component', () => {
  
  const mockLogin = vi.fn()
  const mockContext = {
    login: mockLogin,
    user: null
  }

  const renderLogin = () => {
    return render(
      <BrowserRouter>
        <AuthContext.Provider value={mockContext}>
          <Login />
        </AuthContext.Provider>
      </BrowserRouter>
    )
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Renderizado inicial', () => {
    it('debe renderizar el formulario correctamente', () => {
      renderLogin()

      expect(screen.getByPlaceholderText('tu@email.com')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument()
    })

    it('debe tener el título "Guateque Store"', () => {
      renderLogin()
      expect(screen.getByText('Guateque Store')).toBeInTheDocument()
    })
  })

  describe('Interacciones del usuario', () => {
    it('debe actualizar el email cuando el usuario escribe', async () => {
      const user = userEvent.setup()
      renderLogin()
      const emailInput = screen.getByPlaceholderText('tu@email.com')

      await user.type(emailInput, 'test@test.com')

      expect(emailInput).toHaveValue('test@test.com')
    })

    it('debe actualizar la contraseña cuando el usuario escribe', async () => {
      const user = userEvent.setup()
      renderLogin()
      const passwordInput = screen.getByPlaceholderText('••••••••')

      await user.type(passwordInput, '123456')

      expect(passwordInput).toHaveValue('123456')
    })
  })

  describe('Submit del formulario', () => {
    it('debe llamar a axios.post con los datos correctos', async () => {
      const user = userEvent.setup()
      renderLogin()
      
      const mockResponse = {
        data: {
          id: 1,
          email: 'test@test.com',
          rol: 'CLIENTE'
        }
      }
      
      axios.post.mockResolvedValue(mockResponse)

      await user.type(screen.getByPlaceholderText('tu@email.com'), 'test@test.com')
      await user.type(screen.getByPlaceholderText('••••••••'), '123456')
      await user.click(screen.getByRole('button', { name: 'Entrar' }))

      expect(axios.post).toHaveBeenCalledTimes(1)
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8080/api/auth/login',
        {
          email: 'test@test.com',
          password: '123456'
        }
      )
    })

    it('debe llamar a login del contexto y navegar a welcome para CLIENTE', async () => {
      const user = userEvent.setup()
      renderLogin()
      
      const mockResponse = {
        data: {
          id: 1,
          email: 'cliente@test.com',
          rol: 'CLIENTE'
        }
      }
      
      axios.post.mockResolvedValue(mockResponse)

      await user.type(screen.getByPlaceholderText('tu@email.com'), 'cliente@test.com')
      await user.type(screen.getByPlaceholderText('••••••••'), '123456')
      await user.click(screen.getByRole('button', { name: 'Entrar' }))

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith(mockResponse.data)
        expect(mockNavigate).toHaveBeenCalledWith('/welcome')
      })
    })

    it('debe llamar a login del contexto y navegar a panel para ADMINISTRADOR', async () => {
      const user = userEvent.setup()
      renderLogin()
      
      const mockResponse = {
        data: {
          id: 1,
          email: 'admin@test.com',
          rol: 'ADMINISTRADOR'
        }
      }
      
      axios.post.mockResolvedValue(mockResponse)

      await user.type(screen.getByPlaceholderText('tu@email.com'), 'admin@test.com')
      await user.type(screen.getByPlaceholderText('••••••••'), '123456')
      await user.click(screen.getByRole('button', { name: 'Entrar' }))

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith(mockResponse.data)
        expect(mockNavigate).toHaveBeenCalledWith('/panel')
      })
    })

    it('debe mostrar alerta cuando hay error en el login', async () => {
      const user = userEvent.setup()
      renderLogin()
      
      const mockAlert = vi.spyOn(window, 'alert').mockImplementation(() => {})
      const errorMessage = 'Credenciales inválidas'
      
      axios.post.mockRejectedValue({
        response: {
          data: {
            message: errorMessage
          }
        }
      })

      await user.type(screen.getByPlaceholderText('tu@email.com'), 'test@test.com')
      await user.type(screen.getByPlaceholderText('••••••••'), 'wrongpass')
      await user.click(screen.getByRole('button', { name: 'Entrar' }))

      await waitFor(() => {
        expect(mockAlert).toHaveBeenCalledWith(errorMessage)
      })
      
      expect(mockLogin).not.toHaveBeenCalled()
      expect(mockNavigate).not.toHaveBeenCalled()
      
      mockAlert.mockRestore()
    })

    it('debe deshabilitar el botón mientras carga', async () => {
      const user = userEvent.setup()
      renderLogin()
      
      axios.post.mockImplementation(() => new Promise(resolve => {
        setTimeout(() => resolve({ data: { rol: 'CLIENTE' } }), 100)
      }))

      await user.type(screen.getByPlaceholderText('tu@email.com'), 'test@test.com')
      await user.type(screen.getByPlaceholderText('••••••••'), '123456')
      await user.click(screen.getByRole('button', { name: 'Entrar' }))

      // ✅ CORREGIDO: Solo verifica que el botón está deshabilitado
      // (no verifiques el texto "Cargando..." si no existe)
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('Validación HTML5', () => {
    it('los inputs deben tener atributo required', () => {
      renderLogin()

      expect(screen.getByPlaceholderText('tu@email.com')).toBeRequired()
      expect(screen.getByPlaceholderText('••••••••')).toBeRequired()
    })

    it('el input email debe ser de tipo email', () => {
      renderLogin()

      expect(screen.getByPlaceholderText('tu@email.com')).toHaveAttribute('type', 'email')
    })
  })
})