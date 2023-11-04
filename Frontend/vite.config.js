import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:8000', 
        changeOrigin: true
      },
      '/main': {
        target: 'http://localhost:8000', 
        changeOrigin: true
      },
      '/subscribe': {
        target: 'http://localhost:8000', 
        changeOrigin: true
      },
      '/user': {
        target: 'http://localhost:8000', 
        changeOrigin: true
      },
      '/contact': {
        target: 'http://localhost:8000', 
        changeOrigin: true
      },
      '/wh': {
        target: 'http://localhost:8000', 
        changeOrigin: true
      },
      
    }
  }
});
