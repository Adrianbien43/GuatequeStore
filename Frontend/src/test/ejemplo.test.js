import { describe, it, expect } from 'vitest'

describe('Configuración de tests', () => {
  it('debe funcionar correctamente', () => {
    // Arrange
    const suma = (a, b) => a + b
    
    // Act
    const resultado = suma(2, 3)
    
    // Assert
    expect(resultado).toBe(5)
  })
})