import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
const viteEnv = {}
Object.keys(process.env).forEach((key) => {
  if (['NETLIFY', 'URL'].includes(key)) {
    viteEnv[`import.meta.env.${key}`] = process.env[key]
  }
})


export default defineConfig({
  define: viteEnv,
  plugins: [vue()]
})
