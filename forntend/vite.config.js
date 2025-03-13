import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://145.223.21.225:5000',
        changeOrigin: true,
        secure:false,
      },
      '/uploads': {
        target: 'http://145.223.21.225:5000',
        changeOrigin: true,
        secure:false,
      },
    },
  },
  plugins: [react()],
})
