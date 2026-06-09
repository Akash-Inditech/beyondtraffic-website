import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig(({ command }) => ({
  // Base path depends on where we deploy:
  //  - cPanel / own domain root (default production build) -> '/'
  //  - GitHub Pages sub-path -> set DEPLOY_TARGET=ghpages in the build env
  //  - dev server always uses '/'
  base:
    command === 'build'
      ? process.env.DEPLOY_TARGET === 'ghpages'
        ? '/beyondtraffic-website/'
        : '/'
      : '/',
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  build: {
    rollupOptions: {
      output: {
        // Split heavy vendor libraries into their own chunks so the main app
        // bundle stays small and vendor code caches independently between
        // deploys (recharts/motion rarely change; app code changes often).
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('recharts') || id.includes('/d3-') || id.includes('/victory-'))
            return 'charts'
          if (id.includes('/motion/') || id.includes('framer-motion'))
            return 'motion'
          if (id.includes('react-router') || id.includes('/@remix-run/'))
            return 'router'
          if (id.includes('/@radix-ui/')) return 'radix'
          if (id.includes('lucide-react')) return 'icons'
          if (
            id.includes('/react/') ||
            id.includes('/react-dom/') ||
            id.includes('/scheduler/')
          )
            return 'react'
          return 'vendor'
        },
      },
    },
  },
}))
