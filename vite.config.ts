import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Cloudflare Pages 部署：使用根路径 '/'
// 如果部署到 GitHub Pages 子路径，改为 '/repo-name/'
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
