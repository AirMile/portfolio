import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { inspectOverlay } from './inspect-overlay.vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['@react-dev-inspector/babel-plugin'],
      },
    }),
    tailwindcss(),
    inspectOverlay(),
  ],
  server: {
    allowedHosts: ['.trycloudflare.com'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
