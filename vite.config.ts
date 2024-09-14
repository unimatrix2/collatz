import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      external: ['d3-zoom', 'd3-selection', 'd3-force', 'd3-scale', 'd3-scale-chromatic', 'd3-drag', 'd3-array', 'd3-shape', 'd3-interpolate', 'd3-color', 'd3-ease', 'd3-timer', 'd3-dispatch', 'd3-transition', 'd3-hierarchy', 'd3-path', 'd3-quadtree', 'd3-random', 'd3-format', 'd3-time']
    }
  }

})
