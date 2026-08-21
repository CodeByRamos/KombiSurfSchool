/**
 * Servidor estático mínimo para os testes end-to-end.
 * Serve a pasta /out do export do Next, respeitando `trailingSlash: true`.
 * Escrito à mão de propósito, para não adicionar dependência só por causa dos
 * testes.
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { join, extname, normalize } from 'node:path';

const ROOT = new URL('../out/', import.meta.url).pathname;
const PORT = Number(process.env.PORT ?? 4321);

/**
 * Os testes rodam com os MESMOS cabeçalhos que a Vercel vai servir — lidos do
 * próprio vercel.json. É o que faz o Content-Security-Policy ser testado de
 * verdade: se uma política nova quebrar o mapa, a fonte ou a chamada da API de
 * ondas, o teste falha aqui em vez de falhar na frente do cliente.
 */
const VERCEL_CONFIG = new URL('../vercel.json', import.meta.url).pathname;

function loadHeaderRules() {
  try {
    const config = JSON.parse(readFileSync(VERCEL_CONFIG, 'utf8'));
    return (config.headers ?? []).map((rule) => ({
      // "/(.*)" e "/_next/static/(.*)" são os únicos padrões usados aqui.
      test: new RegExp(`^${rule.source.replace(/\(\.\*\)/g, '.*')}$`),
      headers: rule.headers ?? [],
    }));
  } catch {
    return [];
  }
}

const HEADER_RULES = loadHeaderRules();

function headersFor(pathname) {
  const result = {};
  for (const rule of HEADER_RULES) {
    if (!rule.test.test(pathname)) continue;
    for (const { key, value } of rule.headers) result[key] = value;
  }
  return result;
}

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

  const extra = headersFor(pathname);

  if (!file) {
    const notFound = join(ROOT, '404.html');
    try {
      const body = await readFile(notFound);
      res.writeHead(404, { ...extra, 'Content-Type': TYPES['.html'] });
      res.end(body);
    } catch {
      res.writeHead(404, { ...extra, 'Content-Type': 'text/plain' });
      res.end('404');
    }
    return;
  }

  const body = await readFile(file);
  res.writeHead(200, {
    ...extra,
    'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream',
    // Cache desligado de propósito no ambiente local: o `Cache-Control` longo
    // do vercel.json só faz sentido em produção e atrapalharia os testes.
    'Cache-Control': 'no-store',
  });
  res.end(body);
}).listen(PORT, '127.0.0.1', () => {
  process.stdout.write(`static server on http://127.0.0.1:${PORT}\n`);
});
