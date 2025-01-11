import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {}, // Add this line to define process.env
  },
  server: {
    proxy: {
      "/api": "http://localhost:4001",
    },
  },
});
