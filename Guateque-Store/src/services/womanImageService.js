// src/services/womanImageService.js
// 100% MODA FEMENINA - IMÁGENES REALES - DIFERENTES POR PRODUCTO - SIN GRIS

export const womanImageService = {
  getOptimizedImage: (product) => {
    const categoria = (product.categoria || '').toLowerCase();
    const id = product.id || 1;

    const imagenes = {
      vestido: [
        'https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/794064/pexels-photo-794064.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/291759/pexels-photo-291759.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop'
      ],
      blusa: [
        'https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/2065196/pexels-photo-2065196.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop'
      ],
      remera: [
        'https://images.pexels.com/photos/2065200/pexels-photo-2065200.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/1536618/pexels-photo-1536618.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop'
      ],
      pantalon: [
        'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/1576757/pexels-photo-1576757.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop'
      ],
      falda: [
        'https://images.pexels.com/photos/1576758/pexels-photo-1576758.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/2065203/pexels-photo-2065203.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop'
      ],
      zapatillas: [
        'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop'
      ],
      tacones: [
        'https://images.pexels.com/photos/1129413/pexels-photo-1129413.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop'
      ],
      default: [
        'https://images.pexels.com/photos/794064/pexels-photo-794064.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/2065200/pexels-photo-2065200.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop'
      ]
    };

    let array = imagenes.default;
    if (categoria.includes('vestido')) array = imagenes.vestido;
    else if (categoria.includes('blusa')) array = imagenes.blusa;
    else if (categoria.includes('remera') || categoria.includes('top')) array = imagenes.remera;
    else if (categoria.includes('pantalon') || categoria.includes('jean')) array = imagenes.pantalon;
    else if (categoria.includes('falda')) array = imagenes.falda;
    else if (categoria.includes('zapatilla')) array = imagenes.zapatillas;
    else if (categoria.includes('tacon') || categoria.includes('zapato')) array = imagenes.tacones;

    return array[(id - 1) % array.length];
  },

  getDefaultImage: () => 'https://images.pexels.com/photos/794064/pexels-photo-794064.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop'
};

export default womanImageService;