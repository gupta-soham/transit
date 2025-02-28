import react from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'process.env.BACKEND_APP_URL': JSON.stringify(process.env.BACKEND_APP_URL || 'http://localhost:8000'),
    'process.env.FRONTEND_APP_URL': JSON.stringify(process.env.FRONTEND_APP_URL || 'http://localhost:5173')
  },
})
