import { describe, it, expect } from 'vitest'
import { validateRegistro } from './registro.validator'

describe('validateRegistro', () => {
    
    describe('Campo nombre', () => {
        it('debe retornar error cuando el nombre está vacío', () => {
            // Arrange
            const formData = {
                email: 'test@test.com',
                password: '123456',
                confirm: '123456'
            }
            
            // Act
            const errors = validateRegistro(formData)
            
            // Assert
            expect(errors.nombre).toBe('El nombre es obligatorio')
        })

        it('debe retornar error cuando el nombre es solo espacios', () => {
            // Arrange
            const formData = {
                nombre: '   ',
                email: 'test@test.com',
                password: '123456',
                confirm: '123456'
            }
            
            // Act
            const errors = validateRegistro(formData)
            
            // Assert
            expect(errors.nombre).toBe('El nombre es obligatorio')
        })
    })

    describe('Campo email', () => {
        it('debe retornar error cuando el email no tiene @', () => {
            // Arrange
            const formData = {
                nombre: 'Juan',
                email: 'correo-sin-arroba.com',
                password: '123456',
                confirm: '123456'
            }
            
            // Act
            const errors = validateRegistro(formData)
            
            // Assert
            expect(errors.email).toBe('Email inválido')
        })

        it('debe retornar error cuando el email no tiene dominio', () => {
            // Arrange
            const formData = {
                nombre: 'Juan',
                email: 'correo@',
                password: '123456',
                confirm: '123456'
            }
            
            // Act
            const errors = validateRegistro(formData)
            
            // Assert
            expect(errors.email).toBe('Email inválido')
        })

        it('debe retornar error cuando el email está vacío', () => {
            // Arrange
            const formData = {
                nombre: 'Juan',
                email: '',
                password: '123456',
                confirm: '123456'
            }
            
            // Act
            const errors = validateRegistro(formData)
            
            // Assert
            expect(errors.email).toBe('Email inválido')
        })
    })

    describe('Campo password', () => {
        it('debe retornar error cuando password es menor a 6 caracteres', () => {
            // Arrange
            const formData = {
                nombre: 'Juan',
                email: 'juan@test.com',
                password: '12345',
                confirm: '12345'
            }
            
            // Act
            const errors = validateRegistro(formData)
            
            // Assert
            expect(errors.password).toBe('La contraseña debe tener al menos 6 caracteres')
        })

        it('debe retornar error cuando password está vacío', () => {
            // Arrange
            const formData = {
                nombre: 'Juan',
                email: 'juan@test.com',
                password: '',
                confirm: ''
            }
            
            // Act
            const errors = validateRegistro(formData)
            
            // Assert
            expect(errors.password).toBe('La contraseña debe tener al menos 6 caracteres')
        })
    })

    describe('Confirmación de password', () => {
        it('debe retornar error cuando las contraseñas no coinciden', () => {
            // Arrange
            const formData = {
                nombre: 'Juan',
                email: 'juan@test.com',
                password: '123456',
                confirm: '654321'
            }
            
            // Act
            const errors = validateRegistro(formData)
            
            // Assert
            expect(errors.confirm).toBe('Las contraseñas no coinciden')
        })
    })

    describe('Múltiples errores', () => {
        it('debe retornar múltiples errores cuando hay varios campos inválidos', () => {
            // Arrange
            const formData = {
                nombre: '',
                email: 'invalido',
                password: '123',
                confirm: '456'
            }
            
            // Act
            const errors = validateRegistro(formData)
            
            // Assert
            expect(errors).toEqual({
                nombre: 'El nombre es obligatorio',
                email: 'Email inválido',
                password: 'La contraseña debe tener al menos 6 caracteres',
                confirm: 'Las contraseñas no coinciden'
            })
        })
    })

    describe('Caso exitoso', () => {
        it('debe retornar objeto vacío cuando todos los campos son válidos', () => {
            // Arrange
            const formData = {
                nombre: 'Juan Pérez',
                email: 'juan.perez@test.com',
                password: '123456',
                confirm: '123456'
            }
            
            // Act
            const errors = validateRegistro(formData)
            
            // Assert
            expect(errors).toEqual({})
        })
    })
})