import { createServer, IncomingMessage, ServerResponse } from 'http';
import { helloWorld } from './hello-world';
import { getSystemInfo } from './sysinfo';

const PORT = 8000;

const handleRequest = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
  // Route: /
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(helloWorld());
    return;
  }

  // Route: /api/v1/sysinfo
  if (req.method === 'GET' && req.url?.startsWith('/api/v1/sysinfo')) {
    try {
      const systemInfo = await getSystemInfo();
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(systemInfo);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error retrieving system information');
    }
    return;
  }

  // Route non trouvée ou méthode non autorisée
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 - Not Found');
};

const server = createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});