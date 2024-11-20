import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'public',  // Diretório onde os arquivos de build serão gerados
  },
  server: {
    port: 5173,  // Porta de desenvolvimento do Vite
    host: true,  // Permite que o Vite seja acessado por outras máquinas
    proxy: {
      '/api': 'https://dsm-g08-pi3-2024-2-backend.onrender.com',  // Proxy para direcionar as requisições API para o backend
    },
  },
});
