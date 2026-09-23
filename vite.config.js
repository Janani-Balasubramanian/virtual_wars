import { defineConfig, loadEnv } from 'vite';
import { handleChat } from './server/chat.mjs';

export default defineConfig(({ mode }) => ({
  build: { outDir: 'dist/client' },
  plugins: [{
    name: 'civicwise-chat-preview',
    configureServer(server) {
      const env = loadEnv(mode, process.cwd(), 'GEMINI_');
      server.middlewares.use('/api/chat', async (req, res) => {
        try {
          let text = '';
          for await (const chunk of req) { text += chunk; if (text.length > 10000) { res.statusCode = 413; res.end('Message too long'); return; } }
          const url = `http://${req.headers.host}/api/chat`;
          const request = new Request(url, { method: req.method, headers: req.headers, ...(req.method !== 'GET' && req.method !== 'HEAD' ? { body: text } : {}) });
          const response = await handleChat(request, env);
          res.statusCode = response.status;
          response.headers.forEach((value, key) => res.setHeader(key, value));
          res.end(await response.text());
        } catch { res.statusCode = 500; res.end(JSON.stringify({ error: 'Preview chat is unavailable.' })); }
      });
    }
  }]
}));
