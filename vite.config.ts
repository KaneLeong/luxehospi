import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

/**
 * Injects __SW_VERSION__ into public/sw.js at build time.
 * Reads version from package.json, then reads sw.js, replaces the placeholder,
 * and writes the result to dist/sw.js after build.
 */
function swVersionPlugin(): Plugin {
  return {
    name: 'sw-version',
    closeBundle() {
      const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8'))
      const version = pkg.version || '0.0.0'
      const swSrc = path.resolve(__dirname, 'public/sw.js')
      const swDest = path.resolve(__dirname, 'dist/sw.js')
      if (fs.existsSync(swSrc) && fs.existsSync(swDest)) {
        let content = fs.readFileSync(swSrc, 'utf-8')
        // Replace the fallback line with a hardcoded version
        content = content.replace(
          /`luxehospi-t\$\{Date\.now\(\)\}`/,
          '`luxehospi-v' + version + '`'
        )
        // Remove the typeof check, just use the hardcoded value
        content = content.replace(
          "typeof __SW_VERSION__ !== 'undefined'\n  ? `luxehospi-v${__SW_VERSION__}`\n  :",
          ''
        )
        fs.writeFileSync(swDest, content, 'utf-8')
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), swVersionPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React ecosystem
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/react-router')) {
            return 'vendor-router'
          }
          // Zustand + helmet-async
          if (id.includes('node_modules/zustand') || id.includes('node_modules/react-helmet-async')) {
            return 'vendor-utils'
          }
        },
      },
    },
  },
})
