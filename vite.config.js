import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [react(), svgr({
    svgrOptions: { exportType: 'default', ref: true, svgo: false, titleProp: true },
    include: '**/assets/icons/**/*.svg',
  }),
  viteImagemin({
    gifsicle: { optimizationLevel: 7 },
    optipng: { optimizationLevel: 7 },
    mozjpeg: { quality: 70 },
    webp: { quality: 70 }
  })
  ],

  server: {
    port: 3000,
  },
  define: {
    global: 'globalThis', // 🔧 shim `global`
  },
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      'icons': path.resolve(__dirname, 'src/assets/icons'),
      '@': path.resolve(__dirname, 'src'),
    }
  },
})