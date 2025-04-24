import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // '/api': {
      //   target: 'https://api.codemy.live/',
      //   changeOrigin: true,
      //   secure:false,
      // },
      // '/uploads': {
      //   target: 'https://api.codemy.live/',
      //   changeOrigin: true,
      //   secure:false,
      // },
      '/api': {
        target: 'http://localhost:5000/',
        changeOrigin: true,
        secure:false,
      },
      '/uploads': {
        target: 'https://api.codemy.live/',
        changeOrigin: true,
        secure:false,
      },
    },
  },
  base:'./',
  plugins: [react()],
})
