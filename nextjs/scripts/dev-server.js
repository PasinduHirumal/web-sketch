const { spawn } = require('child_process');
const os = require('os');

// Get local IPv4 address
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    const networkInterface = interfaces[name];
    if (networkInterface) {
      for (const net of networkInterface) {
        // Skip loopback and non-IPv4 addresses
        if ((net.family === 'IPv4' || net.family === 4) && !net.internal) {
          return net.address;
        }
      }
    }
  }
  return 'localhost';
}

const localIP = getLocalIP();

const path = require('path');
const nextCli = path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'bin', 'next');

// Spawn next dev command with -H 0.0.0.0, any additional CLI options passed, and force colored output
const child = spawn(process.execPath, [nextCli, 'dev', '-H', '0.0.0.0', ...process.argv.slice(2)], {
  stdio: ['inherit', 'pipe', 'pipe'],
  env: {
    ...process.env,
    FORCE_COLOR: '3',
  },
});

function handleStream(stream, isError = false) {
  let buffer = '';
  stream.on('data', (chunk) => {
    buffer += chunk.toString();
    const lines = buffer.split('\n');
    // Save the last incomplete line
    buffer = lines.pop() || '';

    for (const line of lines) {
      // Replace http://0.0.0.0:XXXX or https://0.0.0.0:XXXX with the actual network IP
      const modifiedLine = line.replace(/(https?:\/\/)(0\.0\.0\.0)(:\d+)/g, `$1${localIP}$3`);
      if (isError) {
        process.stderr.write(modifiedLine + '\n');
      } else {
        process.stdout.write(modifiedLine + '\n');
      }
    }
  });

  stream.on('end', () => {
    if (buffer) {
      const modifiedLine = buffer.replace(/(https?:\/\/)(0\.0\.0\.0)(:\d+)/g, `$1${localIP}$3`);
      if (isError) {
        process.stderr.write(modifiedLine);
      } else {
        process.stdout.write(modifiedLine);
      }
    }
  });
}

handleStream(child.stdout, false);
handleStream(child.stderr, true);

child.on('close', (code) => {
  process.exit(code || 0);
});

// Clean up child process on parent exit signals
process.on('SIGINT', () => {
  child.kill('SIGINT');
  process.exit(0);
});
process.on('SIGTERM', () => {
  child.kill('SIGTERM');
  process.exit(0);
});
