const http = require('http');

// Test if the server is actually listening on port 5000
const testConnection = () => {
  const req = http.request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/health',
    method: 'GET',
    timeout: 2000
  }, (res) => {
    console.log('✅ Server is responding! Status:', res.statusCode);
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('Response:', data);
    });
  });

  req.on('error', (err) => {
    console.log('❌ Server connection failed:', err.message);
  });

  req.on('timeout', () => {
    console.log('❌ Server connection timeout');
    req.destroy();
  });

  req.end();
};

// Test if port 5000 is available
const testPort = () => {
  const server = http.createServer();
  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log('✅ Port 5000 is in use (server is likely running)');
    } else {
      console.log('❌ Port 5000 error:', err.message);
    }
  });
  
  server.once('listening', () => {
    console.log('❌ Port 5000 is available (server is not running)');
    server.close();
  });
  
  server.listen(5000);
};

console.log('Testing server connection...');
testConnection();

console.log('\nTesting port availability...');
testPort();
