import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // This allows connections from other devices on your network
    port: 5173,       // Make sure this matches the port you're using
  },// vite.config.js

  
})

