// Stellar's voice: ElevenLabs text-to-speech (Vercel function), also used by server.mjs locally.
// 语音合成 · Voz. The ElevenLabs key is read from the environment on the server; it never reaches the browser.
//   ELEVENLABS_API_KEY   required
//   ELEVENLABS_VOICE_ID  optional, default Sarah (EXAVITQu4vr4xnSDxMaL)
//   ELEVENLABS_MODEL     optional, default eleven_multilingual_v2 (most natural; eleven_flash_v2_5 is faster and cheaper)
// If the key is missing or anything fails, the browser falls back to its built-in voice.

const MAX_CHARS = 900;          // longest text spoken per request (controls credit use)
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 12;            // spoken replies per minute per visitor (best effort)
const LANGS = new Set(['en', 'zh', 'es', 'pt']);

const hits = new Map();
export function ttsRateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(t => now - t < RATE_WINDOW_MS);
  recent.push(now); hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_MAX;
}

// Keep whole sentences under the limit · 按整句截断
function trim(text) {
  const t = String(text ?? '').replace(/[\u0000-\u001f]/g, ' ').replace(/\s+/g, ' ').trim();
  if (t.length <= MAX_CHARS) return t;
  const cut = t.slice(0, MAX_CHARS), end = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('。'), cut.lastIndexOf('! '), cut.lastIndexOf('? '));
  return end > MAX_CHARS * 0.5 ? cut.slice(0, end + 1) : cut;
}

// Returns { status, audio (Buffer) } or { status, json: { error } }
export async function tts(body) {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) return { status: 503, json: { error: 'config' } };
  const text = trim(body?.text);
  if (!text) return { status: 400, json: { error: 'bad' } };
  const lang = LANGS.has(body?.lang) ? body.lang : undefined;
  const voice = (process.env.ELEVENLABS_VOICE_ID || 'EXAVITQu4vr4xnSDxMaL').replace(/[^\w]/g, '');
  const model = process.env.ELEVENLABS_MODEL || 'eleven_multilingual_v2';
  try {
    const r = await fetch(`${process.env.ELEVENLABS_API_BASE || 'https://api.elevenlabs.io'}/v1/text-to-speech/${voice}?output_format=mp3_44100_64`, {
      method: 'POST',
      headers: { 'xi-api-key': key, 'content-type': 'application/json', accept: 'audio/mpeg' },
      body: JSON.stringify({
        text, model_id: model,
        ...(lang && model !== 'eleven_multilingual_v2' ? { language_code: lang } : {}),
        voice_settings: { stability: 0.45, similarity_boost: 0.8, style: 0.3, use_speaker_boost: true },
      }),
    });
    if (!r.ok) {
      const detail = (await r.text()).slice(0, 300);
      console.error('ElevenLabs error', r.status, detail);
      return { status: 502, json: { error: r.status === 401 ? 'config' : r.status === 429 ? 'busy' : 'upstream' } };
    }
    return { status: 200, audio: Buffer.from(await r.arrayBuffer()) };
  } catch (e) {
    console.error('ElevenLabs request failed', e.message);
    return { status: 502, json: { error: 'network' } };
  }
}

// Vercel serverless handler: POST /api/tts  { text, lang } → audio/mpeg
export default async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ error: 'bad' }); return; }
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'anon';
  if (ttsRateLimited(ip)) { res.status(429).json({ error: 'rate' }); return; }
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const r = await tts(body || {});
  if (r.audio) { res.setHeader('content-type', 'audio/mpeg'); res.setHeader('cache-control', 'no-store'); res.status(200).send(r.audio); }
  else res.status(r.status).json(r.json);
}
