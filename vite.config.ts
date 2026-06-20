import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { existsSync } from 'fs'

// The inspect overlay is a local-only dev plugin: gitignored and synced
// per-machine (see .gitignore). It is absent in CI/prod builds, so load it
// only when present and fall back to a no-op otherwise.
async function inspectOverlayPlugin(): Promise<PluginOption> {
  const overlayPath = resolve(__dirname, 'inspect-overlay.vite.ts')
  if (!existsSync(overlayPath)) return false
  try {
    const mod = await import(/* @vite-ignore */ overlayPath)
    return mod.inspectOverlay()
  } catch {
    return false
  }
}

export default defineConfig(async () => ({
  plugins: [
    react({
      babel: {
        plugins: ['@react-dev-inspector/babel-plugin'],
      },
    }),
    tailwindcss(),
    await inspectOverlayPlugin(),
  ],
  server: {
    allowedHosts: ['.trycloudflare.com'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
}))
