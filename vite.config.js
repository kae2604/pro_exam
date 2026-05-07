import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve("src"),
            "@constants": path.resolve("src", "constants"),
            "@pages": path.resolve("src", "pages"),
            "@router": path.resolve("src", "router"),
            "@store": path.resolve("src", "store"),
            "@layouts": path.resolve("src", "layouts"),
            "@components": path.resolve("src", "components"),
            "@assets": path.resolve("src", "assets"),
            "@styles": path.resolve("src", "styles"),
            "@utils": path.resolve("src", "utils"),
        },
    },
})
