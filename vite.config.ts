import { lingui } from "@lingui/vite-plugin";
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets')
    },
  },
  plugins: [
    react({
      babel: {
        plugins: ['macros']
      }
    }),
    lingui()
  ],
})
