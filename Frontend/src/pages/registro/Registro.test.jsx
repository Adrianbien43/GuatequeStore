// src/pages/registro/Registro.test.jsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import Registro from './Registro'

// Mockear axios
vi.mock('axios')
import axios from 'axios'

// Mockear navigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

describe('Registro', () => {
  const mockLogin = vi.fn()
  const mockContext = {
    login: mockLogin,
    user: null
  }

  const renderRegistro = () => {
    return render(
      <BrowserRouter>
        <AuthContext.Provider value={mockContext}>
          <Registro />
        </AuthContext.Provider>
      </BrowserRouter>
    )
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  // TEST 1: Error al dejar nombre vacío
  it('debe mostrar error al dejar el campo nombre vacío (onBlur)', async () => {
    const user = userEvent.setup()
    renderRegistro()
    
    const nombreInput = screen.getByPlaceholderText('Ej: Juan Pérez López')
    await user.click(nombreInput)
    await user.tab()
    
    await waitFor(() => {
      expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument() // ✅ Corregido
    }, { timeout: 2000 })
  })

  // TEST 2: Error al dejar email vacío
  it('debe mostrar error al dejar el campo email vacío', async () => {
    const user = userEvent.setup()
    renderRegistro()
    
    const emailInput = screen.getByPlaceholderText('Ej: tu@ejemplo.com')
    await user.click(emailInput)
    await user.tab()
    
    await waitFor(() => {
      expect(screen.getByText('El email es obligatorio')).toBeInTheDocument() // ✅ Corregido
    }, { timeout: 2000 })
  })

  // TEST 3: Error al dejar password vacío
  it('debe mostrar error al dejar el campo password vacío', async () => {
    const user = userEvent.setup()
    renderRegistro()
    
    const passwordInput = screen.getByPlaceholderText('Mínimo 8 caracteres (letras y números)')
    await user.click(passwordInput)
    await user.tab()
    
    await waitFor(() => {
      expect(screen.getByText('La contraseña es obligatoria')).toBeInTheDocument() // ✅ Corregido
    }, { timeout: 2000 })
  })

  // TEST 4: No hay errores al principio
  it('no debe mostrar errores al renderizar el formulario', () => {
    renderRegistro()
    
    expect(screen.queryByText('El nombre es obligatorio')).not.toBeInTheDocument()
    expect(screen.queryByText('El email es obligatorio')).not.toBeInTheDocument()
    expect(screen.queryByText('La contraseña es obligatoria')).not.toBeInTheDocument()
  })

  // TEST 5: Múltiples errores al dejar todos los campos vacíos
  it('debe mostrar múltiples errores al dejar todos los campos vacíos', async () => {
    const user = userEvent.setup()
    renderRegistro()
    
    const nombreInput = screen.getByPlaceholderText('Ej: Juan Pérez López')
    const emailInput = screen.getByPlaceholderText('Ej: tu@ejemplo.com')
    const passwordInput = screen.getByPlaceholderText('Mínimo 8 caracteres (letras y números)')
    const confirmInput = screen.getByPlaceholderText('Repite tu contraseña')
    
    await user.click(nombreInput)
    await user.tab()
    await user.tab()
    await user.tab()
    await user.tab()
    
    await waitFor(() => {
      expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument()
      expect(screen.getByText('El email es obligatorio')).toBeInTheDocument() // ✅ Corregido
      expect(screen.getByText('La contraseña es obligatoria')).toBeInTheDocument() // ✅ Corregido
      expect(screen.getByText('Debes confirmar tu contraseña')).toBeInTheDocument() // ✅ Corregido
    }, { timeout: 2000 })
  })

  // TEST 6: Envío del formulario con datos válidos
  it('debe enviar el formulario con datos válidos', async () => {
    const user = userEvent.setup()
    renderRegistro()
    
    const mockResponse = {
      data: {
        id: 1,
        nombre: 'Juan Pérez',
        email: 'juan@test.com',
        rol: 'CLIENTE'
      }
    }
    axios.post.mockResolvedValue(mockResponse)
    
    // Usar contraseña de 8 caracteres (requerida por el backend)
    await user.type(screen.getByPlaceholderText('Ej: Juan Pérez López'), 'Juan Pérez')
    await user.type(screen.getByPlaceholderText('Ej: tu@ejemplo.com'), 'juan@test.com')
    await user.type(screen.getByPlaceholderText('Mínimo 8 caracteres (letras y números)'), '12345678') // ✅ 8 caracteres
    await user.type(screen.getByPlaceholderText('Repite tu contraseña'), '12345678')
    
    // Hacer blur en confirm para quitar errores
    const confirmInput = screen.getByPlaceholderText('Repite tu contraseña')
    await user.click(confirmInput)
    await user.tab()
    
    // Esperar a que no haya errores
    await waitFor(() => {
      expect(screen.queryByText('La contraseña debe tener al menos 8 caracteres')).not.toBeInTheDocument()
    })
    
    await user.click(screen.getByRole('button', { name: 'Crear cuenta' }))
    
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8080/api/auth/register',
        {
          nombre: 'Juan Pérez',
          email: 'juan@test.com',
          password: '12345678' // ✅ 8 caracteres
        }
      )
      expect(mockLogin).toHaveBeenCalledWith(mockResponse.data)
      expect(mockNavigate).toHaveBeenCalledWith('/welcome')
    })
  })

  // TEST 7: Error de contraseñas no coinciden
  it('debe mostrar error cuando las contraseñas no coinciden', async () => {
    const user = userEvent.setup()
    renderRegistro()
    
    await user.type(screen.getByPlaceholderText('Mínimo 8 caracteres (letras y números)'), '12345678')
    await user.type(screen.getByPlaceholderText('Repite tu contraseña'), '87654321')
    
    const confirmInput = screen.getByPlaceholderText('Repite tu contraseña')
    await user.click(confirmInput)
    await user.tab()
    
    await waitFor(() => {
      expect(screen.getByText('Las contraseñas no coinciden')).toBeInTheDocument() // ✅ Verificar este mensaje
    })
  })
})