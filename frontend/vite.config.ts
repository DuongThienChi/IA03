import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const devApiTarget = process.env.VITE_DEV_API_TARGET ?? 'http://47.84.75.104:8080'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: devApiTarget,
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
