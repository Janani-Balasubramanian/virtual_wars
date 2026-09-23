import assert from 'node:assert/strict';
import { handleChat } from '../server/chat.mjs';
const request = (body, extra = {}) => new Request('https://example.com/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json', ...extra }, body: JSON.stringify(body) });
const env = { GEMINI_API_KEY: 'test-only-secret' };
assert.equal((await handleChat(request({ message: 'Hello' }), {})).status, 503);
assert.equal((await handleChat(request({ message: '' }), env)).status, 400);
assert.equal((await handleChat(request({ message: 'Hello' }, { origin: 'https://other.example' }), env)).status, 403);
assert.equal((await handleChat(request({ message: 'x'.repeat(10001) }), env)).status, 413);
const success = await handleChat(request({ message: 'How do I register?', persona: 'first_time' }), env, async (url, init) => {
  assert.equal(init.headers['x-goog-api-key'], env.GEMINI_API_KEY);
  assert.ok(!url.includes(env.GEMINI_API_KEY));
  assert.ok(JSON.parse(init.body).systemInstruction.parts[0].text.includes('first-time voter'));
  return Response.json({ candidates: [{ content: { parts: [{ text: 'Use the official voter portal.' }] } }] });
});
assert.deepEqual(await success.json(), { answer: 'Use the official voter portal.' });
const failed = await handleChat(request({ message: 'Hello' }), env, async () => new Response('secret provider diagnostics', { status: 500 }));
assert.equal(failed.status, 502);
assert.ok(!(await failed.text()).includes('secret provider diagnostics'));
console.log('Chat validation, origin check, server-only key, response handling and error redaction passed.');
