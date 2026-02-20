import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  assetsInclude: ['**/*.glb', '**/*.mp4'],
  build: {
    copyPublicDir: true,
    assetsDir: 'assets',
  },
  server: {
    allowedHosts: ['although-predicted-technical-entitled.trycloudflare.com'],
    proxy: {
      '/search': 'http://localhost:5000',
      '/api': 'http://localhost:5000',
    },
  },
});
