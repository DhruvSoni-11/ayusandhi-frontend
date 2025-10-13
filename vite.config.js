import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    host: true, // ← This binds to 0.0.0.0, allowing access from other devices
    port: 5173, // Optional: default Vite port
  },
})
