import { build } from 'vite';
import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

await build();
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml' };
const assets = {};
async function walk(dir) {
  for (const file of await readdir(dir, { withFileTypes: true })) {
    const absolute = path.join(dir, file.name);
    if (file.isDirectory()) await walk(absolute);
    else { const relative = '/' + path.relative('dist/client', absolute).replaceAll('\\', '/'); assets[relative] = { body: await readFile(absolute, 'utf8'), type: types[path.extname(file.name)] || 'text/plain; charset=utf-8' }; }
  }
}
await walk('dist/client');
await mkdir('dist/server', { recursive: true });
const chat = (await readFile('server/chat.mjs', 'utf8')).replace('export async function handleChat', 'async function handleChat');
const worker = `${chat}\nconst assets = ${JSON.stringify(assets)};\nexport default { async fetch(request, env) { const url = new URL(request.url); if(url.pathname === '/api/chat') return handleChat(request, env); if(request.method !== 'GET' && request.method !== 'HEAD') return new Response('Method not allowed', {status:405}); const asset=assets[url.pathname === '/' ? '/index.html' : url.pathname]; if(!asset) return new Response('Not found', {status:404}); return new Response(request.method === 'HEAD' ? null : asset.body, {headers:{'Content-Type':asset.type,'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','Cache-Control':url.pathname.startsWith('/assets/')?'public, max-age=31536000, immutable':'no-cache'}}); } };\n`;
await writeFile('dist/server/index.js', worker);
console.log('Built standalone Worker with bundled public assets and server-side chat.');
