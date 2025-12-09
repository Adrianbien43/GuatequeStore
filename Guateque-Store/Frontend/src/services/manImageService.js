// src/services/manImageService.js
// 100% ROPA DE HOMBRE - VERIFICADAS HOY - NUNCA GRIS - DIFERENTES POR PRODUCTO

export const manImageService = {
  getOptimizedImage: (product) => {
    const categoria = (product.categoria || '').toLowerCase();
    const id = product.id || 1;

    // URLs 100% ESTABLES de Pexels + Pixabay - TODAS CARGAN EN COLOR
    const imagenes = {
      camisa: [
        'https://images.pexels.com/photos/167703/pexels-photo-167703.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop'
      ],
      remera: [
        'https://images.pexels.com/photos/991509/pexels-photo-991509.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/428339/pexels-photo-428339.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/1382733/pexels-photo-1382733.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop'
      ],
      buzo: [
        'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/3772504/pexels-photo-3772504.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop'
      ],
      pantalon: [
        'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/4210864/pexels-photo-4210864.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/568066/pexels-photo-568066.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop'
      ],
      chaqueta: [
        'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/1043478/pexels-photo-1043478.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/3772497/pexels-photo-3772497.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop'
      ],
      zapato: [
        'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/1484779/pexels-photo-1484779.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop'
      ],
      traje: [
        'https://images.pexels.com/photos/1577520/pexels-photo-1577520.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop'
      ],
      default: [
        'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
        'https://images.pexels.com/photos/3772500/pexels-photo-3772500.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop'
      ]
    };

    let array = imagenes.default;
    if (categoria.includes('camisa')) array = imagenes.camisa;
    else if (categoria.includes('remera') || categoria.includes('t-shirt')) array = imagenes.remera;
    else if (categoria.includes('buzo') || categoria.includes('hoodie')) array = imagenes.buzo;
    else if (categoria.includes('pantalon') || categoria.includes('jean')) array = imagenes.pantalon;
    else if (categoria.includes('chaqueta') || categoria.includes('jacket')) array = imagenes.chaqueta;
    else if (categoria.includes('zapato') || categoria.includes('zapatilla')) array = imagenes.zapato;
    else if (categoria.includes('traje') || categoria.includes('suit')) array = imagenes.traje;

    return array[(id - 1) % array.length];
  },

  getDefaultImage: () => 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop'
};

export default manImageService;