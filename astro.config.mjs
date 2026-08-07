// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';
import { createLogger } from 'vite';

// Filter out deprecated esbuild/rolldown warning messages emitted by vite:react-babel plugin
const customLogger = createLogger();
const originalWarn = customLogger.warn;
/**
 * @param {string} msg
 * @param {import('vite').LogOptions} [options]
 */
customLogger.warn = (msg, options) => {
  if (typeof msg === 'string' && (msg.includes('esbuild') || msg.includes('optimizeDeps.esbuildOptions'))) {
    return;
  }
  originalWarn(msg, options);
};

export default defineConfig({
  output: 'static',
  adapter: node({
    mode: 'middleware'
  }),
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    customLogger,
    build: {
      minify: 'esbuild',
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor-react';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-lucide';
              }
              if (id.includes('@supabase')) {
                return 'vendor-supabase';
              }
              if (id.includes('framer-motion')) {
                return 'vendor-framer';
              }
              return 'vendor-core';
            }
          }
        }
      }
    }
  }
});