import { describe, it, expect } from 'vitest'
import { validateRegistro, getRegistroWarnings, getFieldRequirements } from './registro.validator'

describe('validateRegistro', () => {
    
    describe('Campo nombre', () => {
        it('debe retornar error cuando el nombre está vacío', () => {
            const formData = {
                email: 'test@test.com',
                password: '12345678',
                confirm: '12345678'
            }
            
            const errors = validateRegistro(formData)
            
            expect(errors.nombre).toBe('El nombre es obligatorio')
        })

        it('debe retornar error cuando el nombre es solo espacios', () => {
            const formData = {
                nombre: '   ',
                email: 'test@test.com',
                password: '12345678',
                confirm: '12345678'
            }
            
            const errors = validateRegistro(formData)
            
            expect(errors.nombre).toBe('El nombre es obligatorio')
        })

        it('debe retornar error cuando el nombre tiene menos de 2 caracteres', () => {
            const formData = {
                nombre: 'A',
                email: 'test@test.com',
                password: '12345678',
                confirm: '12345678'
            }
            
            const errors = validateRegistro(formData)
            
            expect(errors.nombre).toBe('El nombre debe tener al menos 2 caracteres')
        })

        it('debe retornar error cuando el nombre excede 100 caracteres', () => {
            const formData = {
                nombre: 'A'.repeat(101),
                email: 'test@test.com',
                password: '12345678',
                confirm: '12345678'
            }
            
            const errors = validateRegistro(formData)
            
            expect(errors.nombre).toBe('El nombre no puede exceder 100 caracteres')
        })
    })

    describe('Campo email', () => {
        it('debe retornar error cuando el email no tiene @', () => {
            const formData = {
                nombre: 'Juan',
                email: 'correo-sin-arroba.com',
                password: '12345678',
                confirm: '12345678'
            }
            
            const errors = validateRegistro(formData)
            
            expect(errors.email).toBe('Por favor ingresa un email válido (ej: usuario@ejemplo.com)')
        })

        it('debe retornar error cuando el email no tiene dominio', () => {
            const formData = {
                nombre: 'Juan',
                email: 'correo@',
                password: '12345678',
                confirm: '12345678'
            }
            
            const errors = validateRegistro(formData)
            
            expect(errors.email).toBe('Por favor ingresa un email válido (ej: usuario@ejemplo.com)')
        })

        it('debe retornar error cuando el email está vacío', () => {
            const formData = {
                nombre: 'Juan',
                email: '',
                password: '12345678',
                confirm: '12345678'
            }
            
            const errors = validateRegistro(formData)
            
            expect(errors.email).toBe('El email es obligatorio')
        })

        it('debe retornar error cuando el email tiene espacios', () => {
            const formData = {
                nombre: 'Juan',
                email: 'correo con espacios@test.com',
                password: '12345678',
                confirm: '12345678'
            }
            
            const errors = validateRegistro(formData)
            
            expect(errors.email).toBe('Por favor ingresa un email válido (ej: usuario@ejemplo.com)')
        })
    })

    describe('Campo password', () => {
        it('debe retornar error cuando password es menor a 8 caracteres', () => {
            const formData = {
                nombre: 'Juan',
                email: 'juan@test.com',
                password: '1234567',
                confirm: '1234567'
            }
            
            const errors = validateRegistro(formData)
            
            expect(errors.password).toBe('La contraseña debe tener al menos 8 caracteres')
        })

        it('debe retornar error cuando password está vacío', () => {
            const formData = {
                nombre: 'Juan',
                email: 'juan@test.com',
                password: '',
                confirm: ''
            }
            
            const errors = validateRegistro(formData)
            
            expect(errors.password).toBe('La contraseña es obligatoria')
        })
    })

    describe('Confirmación de password', () => {
        it('debe retornar error cuando confirmación está vacía', () => {
            const formData = {
                nombre: 'Juan',
                email: 'juan@test.com',
                password: '12345678',
                confirm: ''
            }
            
            const errors = validateRegistro(formData)
            
            expect(errors.confirm).toBe('Debes confirmar tu contraseña')
        })

        it('debe retornar error cuando las contraseñas no coinciden', () => {
            const formData = {
                nombre: 'Juan',
                email: 'juan@test.com',
                password: '12345678',
                confirm: '87654321'
            }
            
            const errors = validateRegistro(formData)
            
            expect(errors.confirm).toBe('Las contraseñas no coinciden')
        })
    })

    describe('Múltiples errores', () => {
        it('debe retornar múltiples errores cuando hay varios campos inválidos', () => {
            const formData = {
                nombre: '',
                email: 'invalido',
                password: '123',
                confirm: '456'
            }
            
            const errors = validateRegistro(formData)
            
            expect(errors).toEqual({
                nombre: 'El nombre es obligatorio',
                email: 'Por favor ingresa un email válido (ej: usuario@ejemplo.com)',
                password: 'La contraseña debe tener al menos 8 caracteres',
                confirm: 'Las contraseñas no coinciden'
            })
        })
    })

    describe('Caso exitoso', () => {
        it('debe retornar objeto vacío cuando todos los campos son válidos', () => {
            const formData = {
                nombre: 'Juan Pérez',
                email: 'juan.perez@test.com',
                password: '12345678',
                confirm: '12345678'
            }
            
            const errors = validateRegistro(formData)
            
            expect(errors).toEqual({})
        })

        it('debe aceptar nombre con 2 caracteres', () => {
            const formData = {
                nombre: 'Ju',
                email: 'juan@test.com',
                password: '12345678',
                confirm: '12345678'
            }
            
            const errors = validateRegistro(formData)
            
            expect(errors.nombre).toBeUndefined()
        })

        it('debe aceptar nombre con 100 caracteres exactos', () => {
            const formData = {
                nombre: 'A'.repeat(100),
                email: 'juan@test.com',
                password: '12345678',
                confirm: '12345678'
            }
            
            const errors = validateRegistro(formData)
            
            expect(errors.nombre).toBeUndefined()
        })
    })
})

describe('getRegistroWarnings', () => {
    it('debe retornar warning cuando email parece temporal/spam', () => {
        const warnings = getRegistroWarnings({
            email: 'usuario+spam@dominio.com'
        })
        
        expect(warnings.email).toBe('Asegúrate de usar un email que puedas recuperar')
    })

    it('no debe retornar warning para email Gmail con +', () => {
        const warnings = getRegistroWarnings({
            email: 'usuario+etiqueta@gmail.com'
        })
        
        expect(warnings.email).toBeUndefined()
    })

    it('debe retornar warning cuando password solo tiene letras', () => {
        const warnings = getRegistroWarnings({
            password: 'solotexto'
        })
        
        expect(warnings.password).toBe('Incluye números y letras para mayor seguridad')
    })

    it('debe retornar warning cuando password solo tiene números', () => {
        const warnings = getRegistroWarnings({
            password: '12345678'
        })
        
        expect(warnings.password).toBe('Incluye números y letras para mayor seguridad')
    })

    it('no debe retornar warning cuando password combina letras y números', () => {
        const warnings = getRegistroWarnings({
            password: 'Juan1234'
        })
        
        expect(warnings.password).toBeUndefined()
    })

    it('debe retornar objeto vacío cuando no hay warnings', () => {
        const warnings = getRegistroWarnings({
            nombre: 'Juan Pérez',
            email: 'juan@test.com',
            password: 'Juan1234'
        })
        
        expect(warnings).toEqual({})
    })
})

describe('getFieldRequirements', () => {
    it('debe retornar requisito para nombre', () => {
        const req = getFieldRequirements('nombre')
        expect(req).toBe('Entre 2 y 100 caracteres. Usa tu nombre real para mejor experiencia.')
    })

    it('debe retornar requisito para email', () => {
        const req = getFieldRequirements('email')
        expect(req).toBe('Usa un email válido que puedas acceder. Lo usarás para iniciar sesión.')
    })

    it('debe retornar requisito para password', () => {
        const req = getFieldRequirements('password')
        expect(req).toBe('Mínimo 8 caracteres. Combina letras y números para mayor seguridad.')
    })

    it('debe retornar requisito para confirm', () => {
        const req = getFieldRequirements('confirm')
        expect(req).toBe('Repite exactamente la misma contraseña que escribiste arriba.')
    })

    it('debe retornar string vacío para campo desconocido', () => {
        const req = getFieldRequirements('campo_inexistente')
        expect(req).toBe('')
    })
})