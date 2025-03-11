import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: 'localhost',
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // @를 ./src로 설정
    },
  },
});
