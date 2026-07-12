const { createServer } = require('http');
const { parse } = require('url');
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const hostname = 'localhost';

const standalonePath = path.join(__dirname, '.next', 'standalone', 'server.js');

if (fs.existsSync(standalonePath)) {
  console.log('> Running in Next.js standalone mode...');
  process.env.NODE_ENV = 'production';
  process.env.PORT = port;
  require(standalonePath);
} else {
  console.log('> Running in Next.js custom server mode...');
  const next = require('next');
  const app = next({ dev, hostname, port });
  const handle = app.getRequestHandler();

  app.prepare().then(() => {
    createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error('Error occurred handling', req.url, err);
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port} (mode: ${dev ? 'development' : 'production'})`);
    });
  });
}
