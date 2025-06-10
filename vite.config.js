import { defineConfig } from "vite"

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://mon-app-backend.onrender.com",
        changeOrigin: true,
        secure: false
      }
    }
  }
})
