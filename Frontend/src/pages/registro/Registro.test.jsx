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

  // TEST 1: Error aparece al hacer blur en campo vacío
  it('debe mostrar error al dejar el campo nombre vacío (onBlur)', async () => {
    // ARRANGE
    const user = userEvent.setup()
    renderRegistro()
    
    // ACT - Hacer focus y blur en el campo nombre
    const nombreInput = screen.getByPlaceholderText('Nombre completo')
    await user.click(nombreInput)
    await user.tab() // Salir del campo (blur)
    
    // ASSERT - Debería aparecer el error
    await waitFor(() => {
      expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  // TEST 2: Error aparece al hacer blur en email vacío
  it('debe mostrar error al dejar el campo email vacío', async () => {
    // ARRANGE
    const user = userEvent.setup()
    renderRegistro()
    
    // ACT
    const emailInput = screen.getByPlaceholderText('Correo electrónico')
    await user.click(emailInput)
    await user.tab()
    
    // ASSERT
    await waitFor(() => {
      expect(screen.getByText('Email inválido')).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  // TEST 3: Error aparece al hacer blur en password vacío
  it('debe mostrar error al dejar el campo password vacío', async () => {
    // ARRANGE
    const user = userEvent.setup()
    renderRegistro()
    
    // ACT
    const passwordInput = screen.getByPlaceholderText('Contraseña')
    await user.click(passwordInput)
    await user.tab()
    
    // ASSERT
    await waitFor(() => {
      expect(screen.getByText('La contraseña debe tener al menos 6 caracteres')).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  // TEST 4: No hay errores al principio
  it('no debe mostrar errores al renderizar el formulario', () => {
    // ARRANGE & ACT
    renderRegistro()
    
    // ASSERT
    expect(screen.queryByText('El nombre es obligatorio')).not.toBeInTheDocument()
    expect(screen.queryByText('Email inválido')).not.toBeInTheDocument()
    expect(screen.queryByText('La contraseña debe tener al menos 6 caracteres')).not.toBeInTheDocument()
  })

  // TEST 5: Múltiples errores al hacer blur en todos los campos
  it('debe mostrar múltiples errores al dejar todos los campos vacíos', async () => {
    // ARRANGE
    const user = userEvent.setup()
    renderRegistro()
    
    // ACT - Hacer blur en cada campo
    const nombreInput = screen.getByPlaceholderText('Nombre completo')
    const emailInput = screen.getByPlaceholderText('Correo electrónico')
    const passwordInput = screen.getByPlaceholderText('Contraseña')
    const confirmInput = screen.getByPlaceholderText('Confirmar contraseña')
    
    await user.click(nombreInput)
    await user.tab() // a email
    await user.tab() // a password
    await user.tab() // a confirm
    await user.tab() // salir
    
    // ASSERT
    await waitFor(() => {
      expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument()
      expect(screen.getByText('Email inválido')).toBeInTheDocument()
      expect(screen.getByText('La contraseña debe tener al menos 6 caracteres')).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  // TEST 6: Envío del formulario con datos válidos
  it('debe enviar el formulario con datos válidos', async () => {
    // ARRANGE
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
    
    // ACT - Llenar el formulario
    await user.type(screen.getByPlaceholderText('Nombre completo'), 'Juan Pérez')
    await user.type(screen.getByPlaceholderText('Correo electrónico'), 'juan@test.com')
    await user.type(screen.getByPlaceholderText('Contraseña'), '123456')
    await user.type(screen.getByPlaceholderText('Confirmar contraseña'), '123456')
    
    // Enviar
    await user.click(screen.getByRole('button', { name: 'Registrarse' }))
    
    // ASSERT
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8080/api/auth/register',
        {
          nombre: 'Juan Pérez',
          email: 'juan@test.com',
          password: '123456'
        }
      )
      expect(mockLogin).toHaveBeenCalledWith(mockResponse.data)
      expect(mockNavigate).toHaveBeenCalledWith('/welcome')
    })
  })

  // TEST 7: Error de contraseñas no coinciden
  it('debe mostrar error cuando las contraseñas no coinciden', async () => {
    // ARRANGE
    const user = userEvent.setup()
    renderRegistro()
    
    // ACT - Escribir contraseñas diferentes
    await user.type(screen.getByPlaceholderText('Contraseña'), '123456')
    await user.type(screen.getByPlaceholderText('Confirmar contraseña'), '654321')
    
    // Hacer blur en confirm
    const confirmInput = screen.getByPlaceholderText('Confirmar contraseña')
    await user.click(confirmInput)
    await user.tab()
    
    // ASSERT
    await waitFor(() => {
      expect(screen.getByText('Las contraseñas no coinciden')).toBeInTheDocument()
    })
  })
})