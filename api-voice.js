// Planet narration + transition sound effects with ElevenLabs (Vercel function; also used by server.mjs).
// 行星语音介绍与转场音效 · Narración y efectos.
//   GET /api/voice?kind=narrate&id=mars&lang=en   → spoken introduction (ElevenLabs Text to Speech)
//   GET /api/voice?kind=sfx&name=whoosh-in        → transition sound (ElevenLabs Sound Effects)
//   GET /api/voice?check=1                         → is the ElevenLabs key working? (uses no credits)
// Only fixed texts and prompts from narration-text.js can be requested, and successful audio is
// cached by Vercel's CDN, so each clip is generated once per deployment, not once per visitor.
import { NARRATION, SFX } from '../narration-text.js';

const API = process.env.ELEVENLABS_API_BASE || 'https://api.elevenlabs.io';   // override only for testing
const LANG_INDEX = { en: 0, zh: 1, es: 2 };
const CACHE = 'public, max-age=86400, s-maxage=31536000, immutable';

const hits = new Map();
export function voiceRateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(t => now - t < 60_000);
  recent.push(now); hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 40;
}

async function eleven(path, body, key) {
  const r = await fetch(API + path, {
    method: 'POST',
    headers: { 'xi-api-key': key, 'content-type': 'application/json', accept: 'audio/mpeg' },
    body: JSON.stringify(body),
  });
  if (!r.ok) {
    console.error('ElevenLabs', path, r.status, (await r.text()).slice(0, 300));
    return { status: 502, json: { error: r.status === 401 ? 'config' : r.status === 429 ? 'busy' : r.status === 402 ? 'credits' : 'upstream', upstream: r.status } };
  }
  return { status: 200, audio: Buffer.from(await r.arrayBuffer()) };
}

// Returns { status, audio?, json?, headers? }
export async function voice(query) {
  const key = process.env.ELEVENLABS_API_KEY;
  if (query.check) {
    if (!key) return { status: 200, json: { key: false, ok: false, note: 'ELEVENLABS_API_KEY is not set on the server' } };
    try {
      const r = await fetch(API + '/v1/user/subscription', { headers: { 'xi-api-key': key } });
      const j = r.ok ? await r.json() : null;
      return { status: 200, json: { key: true, ok: r.ok, upstream: r.status, tier: j?.tier, used: j?.character_count, limit: j?.character_limit,
        voice: process.env.ELEVENLABS_VOICE_ID || 'EXAVITQu4vr4xnSDxMaL (Sarah, default)', narrationModel: process.env.ELEVENLABS_NARRATION_MODEL || 'eleven_multilingual_v2', chatModel: process.env.ELEVENLABS_MODEL || 'eleven_flash_v2_5' } };
    } catch (e) { return { status: 200, json: { key: true, ok: false, error: 'network', detail: e.message } }; }
  }
  if (!key) return { status: 503, json: { error: 'config' } };

  if (query.kind === 'narrate') {
    const lines = NARRATION[query.id], li = LANG_INDEX[query.lang];
    if (!lines || li === undefined) return { status: 400, json: { error: 'bad' } };
    const voiceId = (process.env.ELEVENLABS_VOICE_ID || 'EXAVITQu4vr4xnSDxMaL').replace(/[^\w]/g, '');
    // Narration is generated once and cached, so it uses ElevenLabs' most natural model.
    const model = process.env.ELEVENLABS_NARRATION_MODEL || 'eleven_multilingual_v2';
    const r = await eleven(`/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
      text: lines[li], model_id: model,
      ...(model !== 'eleven_multilingual_v2' ? { language_code: query.lang } : {}),
      // A calm, warm documentary delivery · 沉稳温暖的纪录片语气
      voice_settings: { stability: 0.42, similarity_boost: 0.8, style: 0.35, use_speaker_boost: true, speed: 0.94 },
    }, key);
    return r.audio ? { ...r, headers: { 'cache-control': CACHE } } : r;
  }

  if (query.kind === 'sfx') {
    const s = SFX[query.name];
    if (!s) return { status: 400, json: { error: 'bad' } };
    const r = await eleven('/v1/sound-generation?output_format=mp3_44100_64', { text: s.prompt, duration_seconds: s.seconds, prompt_influence: 0.6 }, key);
    return r.audio ? { ...r, headers: { 'cache-control': CACHE } } : r;
  }
  return { status: 400, json: { error: 'bad' } };
}

// Vercel serverless handler
export default async function handler(req, res) {
  if (req.method !== 'GET') { res.status(405).json({ error: 'bad' }); return; }
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'anon';
  if (!req.query.check && voiceRateLimited(ip)) { res.status(429).json({ error: 'rate' }); return; }
  const r = await voice(req.query || {});
  if (r.audio) {
    res.setHeader('content-type', 'audio/mpeg');
    for (const [k, v] of Object.entries(r.headers || {})) res.setHeader(k, v);
    res.status(200).send(r.audio);
  } else {
    res.setHeader('cache-control', 'no-store');
    res.status(r.status).json(r.json);
  }
}
