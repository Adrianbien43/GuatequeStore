import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getClientes, createCliente, updateCliente, deleteCliente } from './clientesService'
import api from '../../../../api'

// Mockear el módulo api
vi.mock('../../../../api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}))

describe('clienteService', () => {
  
  beforeEach(() => {
    // Limpiar todos los mocks antes de cada test
    vi.clearAllMocks()
  })

  describe('getClientes', () => {
    it('debe retornar solo los usuarios con rol CLIENTE', async () => {
      // ARRANGE
      const mockResponse = {
        data: [
          { id: 1, nombre: 'Juan', rol: 'CLIENTE' },
          { id: 2, nombre: 'Admin', rol: 'ADMIN' },
          { id: 3, nombre: 'María', rol: 'CLIENTE' }
        ]
      }
      
      api.get.mockResolvedValue(mockResponse)

      // ACT
      const resultado = await getClientes()

      // ASSERT
      expect(api.get).toHaveBeenCalledWith('/usuarios')
      expect(api.get).toHaveBeenCalledTimes(1)
      expect(resultado).toHaveLength(2)
      expect(resultado).toEqual([
        { id: 1, nombre: 'Juan', rol: 'CLIENTE' },
        { id: 3, nombre: 'María', rol: 'CLIENTE' }
      ])
    })

    it('debe retornar array vacío cuando no hay clientes', async () => {
      // ARRANGE
      const mockResponse = {
        data: [
          { id: 1, nombre: 'Admin1', rol: 'ADMIN' },
          { id: 2, nombre: 'Admin2', rol: 'ADMIN' }
        ]
      }
      
      api.get.mockResolvedValue(mockResponse)

      // ACT
      const resultado = await getClientes()

      // ASSERT
      expect(resultado).toHaveLength(0)
      expect(resultado).toEqual([])
    })

    it('debe manejar errores de la API', async () => {
      // ARRANGE
      const errorMessage = 'Error de red'
      api.get.mockRejectedValue(new Error(errorMessage))

      // ACT & ASSERT
      await expect(getClientes()).rejects.toThrow(errorMessage)
      expect(api.get).toHaveBeenCalledWith('/usuarios')
    })
  })

  describe('createCliente', () => {
    it('debe crear un nuevo cliente correctamente', async () => {
      // ARRANGE
      const nuevoCliente = {
        nombre: 'Pedro',
        email: 'pedro@test.com',
        password: '123456'
      }
      
      const mockResponse = {
        data: { id: 4, ...nuevoCliente, rol: 'CLIENTE' }
      }
      
      api.post.mockResolvedValue(mockResponse)

      // ACT
      const resultado = await createCliente(nuevoCliente)

      // ASSERT
      expect(api.post).toHaveBeenCalledWith('/usuarios', nuevoCliente)
      expect(api.post).toHaveBeenCalledTimes(1)
      expect(resultado).toEqual(mockResponse.data)
    })

    it('debe manejar errores al crear cliente', async () => {
      // ARRANGE
      const nuevoCliente = { nombre: 'Pedro' }
      const errorMessage = 'Email duplicado'
      api.post.mockRejectedValue(new Error(errorMessage))

      // ACT & ASSERT
      await expect(createCliente(nuevoCliente)).rejects.toThrow(errorMessage)
    })
  })

  describe('updateCliente', () => {
    it('debe actualizar un cliente existente', async () => {
      // ARRANGE
      const clienteId = 1
      const datosActualizados = {
        nombre: 'Juan Actualizado',
        email: 'juan.nuevo@test.com'
      }
      
      const mockResponse = {
        data: { id: clienteId, ...datosActualizados, rol: 'CLIENTE' }
      }
      
      api.put.mockResolvedValue(mockResponse)

      // ACT
      const resultado = await updateCliente(clienteId, datosActualizados)

      // ASSERT
      expect(api.put).toHaveBeenCalledWith(`/usuarios/${clienteId}`, datosActualizados)
      expect(api.put).toHaveBeenCalledTimes(1)
      expect(resultado).toEqual(mockResponse.data)
    })

    it('debe manejar error al actualizar cliente inexistente', async () => {
      // ARRANGE
      const clienteId = 999
      const datosActualizados = { nombre: 'Test' }
      const errorMessage = 'Cliente no encontrado'
      api.put.mockRejectedValue(new Error(errorMessage))

      // ACT & ASSERT
      await expect(updateCliente(clienteId, datosActualizados)).rejects.toThrow(errorMessage)
    })
  })

  describe('deleteCliente', () => {
    it('debe eliminar un cliente correctamente', async () => {
      // ARRANGE
      const clienteId = 1
      api.delete.mockResolvedValue({ status: 204 })

      // ACT
      await deleteCliente(clienteId)

      // ASSERT
      expect(api.delete).toHaveBeenCalledWith(`/usuarios/${clienteId}`)
      expect(api.delete).toHaveBeenCalledTimes(1)
    })

    it('debe manejar error al eliminar cliente inexistente', async () => {
      // ARRANGE
      const clienteId = 999
      const errorMessage = 'Cliente no encontrado'
      api.delete.mockRejectedValue(new Error(errorMessage))

      // ACT & ASSERT
      await expect(deleteCliente(clienteId)).rejects.toThrow(errorMessage)
    })
  })
})