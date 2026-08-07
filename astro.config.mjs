// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';
import { createLogger } from 'vite';

const customLogger = createLogger();
const originalWarn = customLogger.warn;
customLogger.warn = (msg, options) => {
  if (typeof msg === 'string' && (msg.includes('esbuild') || msg.includes('optimizeDeps') || msg.includes('vite:react-babel') || msg.includes('Rolldown'))) {
    return;
  }
  originalWarn(msg, options);
};

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    customLogger
  }
});