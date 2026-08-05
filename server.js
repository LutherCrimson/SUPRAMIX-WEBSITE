// server.js - Hostinger Node.js Production Server Entrypoint
process.env.HOST = process.env.HOST || '0.0.0.0';
if (!process.env.PORT) {
  process.env.PORT = '3000';
}

import './dist/server/entry.mjs';
