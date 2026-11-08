 const http = require('http');
 const fs = require('fs');
 const path = require('path');
 
 const PORT = 3005;
 const MIME_TYPES = {
   '.html': 'text/html; charset=utf-8',
   '.js': 'application/javascript; charset=utf-8',
   '.css': 'text/css; charset=utf-8',
   '.json': 'application/json',
   '.png': 'image/png',
   '.jpg': 'image/jpeg',
   '.svg': 'image/svg+xml',
 };
 
 const server = http.createServer((req, res) => {
   let filePath = path.join(__dirname, req.url.split('?')[0]);
   if (filePath.endsWith('/') || filePath === __dirname) {
     filePath = path.join(__dirname, 'index.html');
   }
 
   const ext = path.extname(filePath);
   const contentType = MIME_TYPES[ext] || 'application/octet-stream';
 
   fs.readFile(filePath, (err, content) => {
     if (err) {
       if (err.code === 'ENOENT') {
         res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
         res.end('404 Not Found');
       } else {
         res.writeHead(500);
         res.end('Server Error: ' + err.code);
       }
     } else {
       res.writeHead(200, { 'Content-Type': contentType });
       res.end(content);
     }
   });
 });
 
 server.listen(PORT, '127.0.0.1', () => {
   console.log(`GCMC Admin Server is running at http://127.0.0.1:${PORT}/`);
 });
