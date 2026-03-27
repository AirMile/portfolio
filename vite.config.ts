import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { existsSync } from 'fs'

const loadInspectOverlay = async () => {
  if (existsSync(resolve(__dirname, 'inspect-overlay.vite.ts'))) {
    const mod = await import('./inspect-overlay.vite')
    return mod.inspectOverlay()
  }
  return null
}

export default defineConfig(async () => ({
  plugins: [
    react({
      babel: {
        plugins: existsSync(
          resolve(__dirname, 'node_modules/@react-dev-inspector/babel-plugin')
        )
          ? ['@react-dev-inspector/babel-plugin']
          : [],
      },
    }),
    tailwindcss(),
    await loadInspectOverlay(),
  ].filter(Boolean),
  server: {
    allowedHosts: ['.trycloudflare.com'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
}))
