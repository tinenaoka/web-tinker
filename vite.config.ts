import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

const input = process.env.INPUT || 'main';

export default defineConfig({
  plugins: [vue()],
  base: '',
  build: {
    outDir: `dist/${input}`,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        listener: path.resolve(__dirname, 'workers/listener'),
        sender: path.resolve(__dirname, 'workers/sender'),
      }[input],
      output: {
        entryFileNames: () => {
          if (input === 'listener') {
            return '[name].js';
          }
          if (input === 'sender') {
            return '[name].js';
          }
          return 'assets/[name].[hash].js';
        },
      }
    },
  },
})
