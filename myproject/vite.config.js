import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',  // Use './' to make it work on different domains or subfolders
  plugins: [react()]
})

