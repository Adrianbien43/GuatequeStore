import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import visualizer from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Plugin para visualizar el tamaño de los bundles (opcional)
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
  },
  build: {
    rollupOptions: {
      output: {
        // Separa las librerías grandes en chunks independientes
        manualChunks: {
          // React y sus dependencias
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          
          // Iconos - solo los que usas realmente
          'icons': ['react-icons/fa', 'react-icons/si']
        }
      }
    },
    // Activa la minificación avanzada
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // Elimina console.log en producción
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'], // Elimina funciones específicas
      },
    },
    // Genera reporte de tamaño
    reportCompressedSize: true,
    // Activa el tree shaking más agresivo
    treeshake: 'recommended',
  },
  optimizeDeps: {
    // Fuerza la optimización de estos paquetes
    include: ['react-icons/fa', 'react-icons/si'],
  },
})