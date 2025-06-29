import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Jay-Copilot/',
  build: {
    rollupOptions: {
      output: {
        // Force new file names to bust cache
        entryFileNames: `assets/[name]-[hash]-v5-manual.js`,
        chunkFileNames: `assets/[name]-[hash]-v5-manual.js`,
        assetFileNames: `assets/[name]-[hash]-v5-manual.[ext]`
      }
    }
  }
})
