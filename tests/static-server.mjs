/**
 * Servidor estático mínimo para os testes end-to-end.
 * Serve a pasta /out do export do Next, respeitando `trailingSlash: true`.
 * Escrito à mão de propósito, para não adicionar dependência só por causa dos
 * testes.
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';

const ROOT = new URL('../out/', import.meta.url).pathname;
const PORT = Number(process.env.PORT ?? 4321);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

async function resolveFile(pathname) {
  const safe = normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  const candidates = [
    join(ROOT, safe),
    join(ROOT, safe, 'index.html'),
    join(ROOT, `${safe.replace(/\/$/, '')}.html`),
  ];

  for (const candidate of candidates) {
    try {
      const info = await stat(candidate);
      if (info.isFile()) return candidate;
    } catch {
      // tenta o próximo
    }
  }
  return null;
}

createServer(async (req, res) => {
  const pathname = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname);
  const file = await resolveFile(pathname);

  if (!file) {
    const notFound = join(ROOT, '404.html');
    try {
      const body = await readFile(notFound);
      res.writeHead(404, { 'Content-Type': TYPES['.html'] });
      res.end(body);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404');
    }
    return;
  }

  const body = await readFile(file);
  res.writeHead(200, {
    'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream',
    'Cache-Control': 'no-store',
  });
  res.end(body);
}).listen(PORT, '127.0.0.1', () => {
  process.stdout.write(`static server on http://127.0.0.1:${PORT}\n`);
});
