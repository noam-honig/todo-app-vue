import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { express } from "vite3-plugin-express";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), express('src/backend/index.ts')]
})

