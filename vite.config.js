import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/react-bootstrap-apexcharts-finnhub-stock-lookup/',
  plugins: [react()]
})