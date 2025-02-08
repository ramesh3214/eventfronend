import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true, // Allows access from network/external
    strictPort: true, // Ensures the selected port is used
    allowedHosts: ['b4dd-103-106-200-60.ngrok-free.app'], // Add your ngrok host
    cors: true, // Enable CORS (optional, for cross-origin requests)
  }
})
