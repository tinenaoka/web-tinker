import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  base: '',
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        listener: path.resolve(__dirname, 'entities/listener'),
        sender: path.resolve(__dirname, 'entities/sender'),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name.startsWith('listener')) {
            return 'entities/[name].js';
          }
          if (chunkInfo.name.startsWith('sender')) {
            return 'entities/[name].js';
          }
          return 'assets/[name].[hash].js';
        },
      }
    },
  },
})
