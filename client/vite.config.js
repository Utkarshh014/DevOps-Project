import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/DevOps-Project/',
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:5001',
                changeOrigin: true,
            }
        }
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.js',
        exclude: ['**/node_modules/**', '**/dist/**', './e2e/**'],
        reporters: ['default', 'junit', 'html'],
        outputFile: {
            junit: './test-results/junit.xml',
            html: './test-results/index.html'
        }
    },
})
