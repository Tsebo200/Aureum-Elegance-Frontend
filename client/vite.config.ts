import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build:{
    outDir: 'dist-react',
  },
  // configuring the HotModule reloading server
  server: {
    port: 5123, // port for the dev server 
    strictPort: true, //the server will not try to use another port other than 5123
  },
})
