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

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  server: {
    host: '0.0.0.0'
  },
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    customLogger
  }
});