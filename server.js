// server.js - Hostinger Node.js Production Server Entrypoint
import { createServer } from 'http';
import { handler as ssrHandler } from './dist/server/entry.mjs';

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

const server = createServer((req, res) => {
  ssrHandler(req, res);
});

server.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
});

export default server;
