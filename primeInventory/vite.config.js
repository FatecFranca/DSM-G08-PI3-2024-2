import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,  // Garantir que a aplicação use a porta 5173
    host: true,  // Permitir que o Vite seja acessado por outras máquinas
  },
})
