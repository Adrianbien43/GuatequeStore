// Datos mock para desarrollo
let inventoryMock = [
  { warehouseId: 1, productId: 1, quantity: 50 },
  { warehouseId: 1, productId: 2, quantity: 30 },
  { warehouseId: 2, productId: 1, quantity: 20 }
];

export const inventoryService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...inventoryMock];
  },

  getByWarehouse: async (warehouseId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return inventoryMock.filter(item => item.warehouseId === warehouseId);
  },

  getByProduct: async (productId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return inventoryMock.filter(item => item.productId === productId);
  }
};