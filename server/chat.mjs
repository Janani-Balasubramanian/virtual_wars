const windows = new Map();
const json = (data, status = 200) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });

export async function handleChat(request, env, fetcher = fetch) {
  if (request.method !== 'POST') return json({ error: 'Use POST for chat.' }, 405);
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return json({ error: 'This request is not allowed.' }, 403);
  if (!env.GEMINI_API_KEY) return json({ error: 'Live chat is awaiting configuration. You can still explore the educational demo.' }, 503);
  if (!request.headers.get('content-type')?.includes('application/json')) return json({ error: 'Send a JSON message.' }, 415);
  if (Number(request.headers.get('content-length') || 0) > 10000) return json({ error: 'Message is too long.' }, 413);
  let body;
  try {
    const text = await request.text();
    if (text.length > 10000) return json({ error: 'Message is too long.' }, 413);
    body = JSON.parse(text);
  } catch { return json({ error: 'Invalid message.' }, 400); }
  if (typeof body?.message !== 'string' || !body.message.trim() || body.message.length > 2000) return json({ error: 'Enter a question of 1–2,000 characters.' }, 400);
  const personas = { first_time: 'first-time voter', nri: 'overseas Indian voter', senior_pwd: 'senior citizen or person with a disability', relocated: 'voter who has changed residence' };
  const persona = personas[body.persona] || 'general learner';
  const now = Date.now();
  for (const [ip, value] of windows) if (now - value.start > 60000) windows.delete(ip);
  if (windows.size > 2000) return json({ error: 'Chat is busy. Please try again shortly.' }, 429);
  const ip = request.headers.get('cf-connecting-ip') || 'local';
  const window = windows.get(ip) || { start: now, count: 0 };
  if (window.count >= 8) return json({ error: 'Please wait a minute before asking more questions.' }, 429);
  window.count++; windows.set(ip, window);
  const prompt = `You are CivicWise, an independent, non-partisan election education assistant. You are not the Election Commission or a registration service. The learner has selected the ${persona} perspective. Explain Indian voter registration and voting procedures in concise accessible language. Never invent dates, polling locations, official contacts, eligibility decisions, or claim to check the electoral roll. The website's timeline, candidates, and polling station are fictional demonstration data. For current requirements and deadlines direct users to https://voters.eci.gov.in or https://www.eci.gov.in. Express uncertainty when needed. Do not ask for Aadhaar, EPIC numbers, addresses, or other identifying data. Do not endorse or oppose parties or candidates. For unrelated requests, politely redirect to election education. Format with short headings and bullet points.`;
  try {
    const model = env.GEMINI_MODEL || 'gemini-3.1-flash-lite';
    const response = await fetcher(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
      body: JSON.stringify({ systemInstruction: { parts: [{ text: prompt }] }, contents: [{ role: 'user', parts: [{ text: body.message.trim() }] }], generationConfig: { maxOutputTokens: 1000, temperature: 0.2 } }),
      signal: AbortSignal.timeout(25000)
    });
    if (!response.ok) return json({ error: response.status === 429 ? 'Live chat has reached its usage limit. Please try again later.' : 'Live chat is temporarily unavailable. Please try again later.' }, response.status === 429 ? 429 : 502);
    const result = await response.json();
    const answer = result.candidates?.[0]?.content?.parts?.map(part => part.text || '').join('').trim();
    if (!answer) return json({ error: 'No answer was returned. Please rephrase your question.' }, 502);
    return json({ answer });
  } catch { return json({ error: 'Live chat could not connect. Please try again shortly.' }, 502); }
}
