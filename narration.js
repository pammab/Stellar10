// Narration & transition sounds · 语音介绍与转场音效 · Narración y efectos
//   • narrate(id): Stellar introduces each planet in 2–3 sentences (ElevenLabs voice, with captions)
//   • sfx(name): whooshes and chimes for transitions (ElevenLabs Sound Effects)
// Both fall back to the browser (built-in voice, synthesized whoosh) when ElevenLabs isn't available,
// for example with no key or when the page is opened as a file.
import { NARRATION } from './narration-text.js';
import { getLanguage } from './i18n.js';
import { stopSpeaking } from './voice.js';

const LANG_INDEX = { en: 0, zh: 1, es: 2 }, VOICE_LANG = { en: 'en-US', zh: 'zh-CN', es: 'es-ES' };
let enabled = true; try { enabled = localStorage.getItem('stellar-voice') !== 'off'; } catch {}
let online = location.protocol !== 'file:';         // set false after the server says "no key"
let ctx = null, audio = null, narrationId = 0;
const buffers = new Map(), pending = new Map();
const button = document.getElementById('voiceToggle'), caption = document.getElementById('caption');

/* ───────── Shared audio context · 音频上下文 ───────── */
function ac() {
  if (!ctx) { const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null; ctx = new AC(); }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

/* ───────── Sound effects · 音效 ───────── */
async function loadSfx(name) {
  if (buffers.has(name)) return buffers.get(name);
  if (!online) return null;
  if (!pending.has(name)) pending.set(name, (async () => {
    try {
      const r = await fetch(`/api/voice?kind=sfx&name=${name}`);
      if (r.status === 503 || r.status === 404 || r.status === 405) { online = false; window.__stellarVoiceFallback(fallbackReason(r.status)); return null; }
      if (!r.ok) return null;
      const buf = await ac().decodeAudioData(await r.arrayBuffer());
      buffers.set(name, buf); return buf;
    } catch { return null; } finally { pending.delete(name); }
  })());
  return pending.get(name);
}
// Synthesized fallback: filtered noise sweeping up or down · 合成的“嗖”声
function synthWhoosh(name) {
  const c = ac(); if (!c) return;
  const dur = name === 'warp' ? 1.8 : name === 'chime' ? 0.6 : 1.1, t = c.currentTime;
  if (name === 'chime') {
    for (const [f, d] of [[1318.5, 0], [1975.5, 0.06]]) {
      const o = c.createOscillator(), g = c.createGain(); o.type = 'sine'; o.frequency.value = f;
      g.gain.setValueAtTime(0, t + d); g.gain.linearRampToValueAtTime(0.08, t + d + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + d + dur);
      o.connect(g).connect(c.destination); o.start(t + d); o.stop(t + d + dur);
    }
    return;
  }
  const n = c.createBuffer(1, c.sampleRate * dur, c.sampleRate), d = n.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
  src.buffer = n; f.type = 'bandpass'; f.Q.value = 1.4;
  const [a, b] = name === 'whoosh-out' ? [2400, 300] : name === 'warp' ? [200, 3200] : [300, 2200];
  f.frequency.setValueAtTime(a, t); f.frequency.exponentialRampToValueAtTime(b, t + dur * 0.8);
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.22, t + dur * 0.35); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f).connect(g).connect(c.destination); src.start(t); src.stop(t + dur);
}
export async function sfx(name) {
  if (!enabled) return;
  const c = ac(); if (!c) return;
  const buf = buffers.get(name) || (online ? await Promise.race([loadSfx(name), new Promise(r => setTimeout(() => r(null), 350))]) : null);
  if (!buf) { synthWhoosh(name); return; }                     // not ready in time: play the synthesized one
  const s = c.createBufferSource(), g = c.createGain(); s.buffer = buf; g.gain.value = name === 'chime' ? 0.5 : 0.7;
  s.connect(g).connect(c.destination); s.start();
}
// Fetch the sounds after the first click, so they are ready for the next transitions.
addEventListener('pointerdown', async () => {
  if (!enabled || !online) return;
  await loadSfx('whoosh-in');                               // one probe first: no key means no more requests
  if (online) ['whoosh-out', 'warp', 'chime'].forEach(loadSfx);
}, { once: true });

/* ───────── Narration · 语音介绍 ───────── */
function showCaption(text) {
  if (!caption) return;
  caption.textContent = text; caption.classList.toggle('show', !!text);
}
function done(id) { if (id !== narrationId) return; audio = null; clearTimeout(captionTimer); window.__stellarSpeaking = false; showCaption(''); }
// Split into sentences; each gets a share of the time proportional to its length · 按句显示字幕
const sentences = text => text.match(/[^.!?。！？]+[.!?。！？]+["”’]?\s*|[^.!?。！？]+$/g)?.map(s => s.trim()).filter(Boolean) || [text];
function syncCaptions(parts, progress) {          // progress 0..1 → show the sentence being spoken
  const total = parts.reduce((n, s) => n + s.length, 0); let acc = 0;
  for (const s of parts) { acc += s.length; if (progress <= acc / total) { if (caption?.textContent !== s) showCaption(s); return; } }
}
// No ElevenLabs: captions only (no robotic voice) · 无 ElevenLabs 时只显示字幕
let captionTimer = 0;
function captionsOnly(text, lang, id) {
  const parts = sentences(text), perChar = lang === 'zh' ? 230 : 62; let i = 0;
  const next = () => { if (id !== narrationId) return; if (i >= parts.length) return done(id); showCaption(parts[i]); captionTimer = setTimeout(next, Math.max(1800, parts[i++].length * perChar)); };
  next();
}
// A soft, spacious reverb around the narrator · 空间混响
let reverbIn = null;
function reverbBus() {
  const c = ac(); if (!c) return null; if (reverbIn) return reverbIn;
  const len = c.sampleRate * 2.6, ir = c.createBuffer(2, len, c.sampleRate);
  for (let ch = 0; ch < 2; ch++) { const d = ir.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2); }
  const conv = c.createConvolver(), wet = c.createGain(), dry = c.createGain(), lp = c.createBiquadFilter();
  conv.buffer = ir; wet.gain.value = 0.2; dry.gain.value = 1; lp.type = 'lowpass'; lp.frequency.value = 5200;
  reverbIn = c.createGain(); reverbIn.connect(dry).connect(c.destination); reverbIn.connect(lp).connect(conv).connect(wet).connect(c.destination);
  return reverbIn;
}
export async function narrate(bodyId) {
  stopNarration();
  if (!enabled) return;
  const lines = NARRATION[bodyId]; if (!lines) return;
  const lang = getLanguage(), text = lines[LANG_INDEX[lang] ?? 0], id = ++narrationId;
  const parts = sentences(text);
  stopSpeaking(); window.__stellarSpeaking = true; showCaption(parts[0]);
  if (online) {
    try {
      const r = await fetch(`/api/voice?kind=narrate&id=${bodyId}&lang=${lang}`);
      if (id !== narrationId) return;
      if (r.ok) {
        const url = URL.createObjectURL(await r.blob());
        if (id !== narrationId) { URL.revokeObjectURL(url); return; }
        audio = new Audio(url);
        try { const bus = reverbBus(); if (bus && ctx.state === 'running') ctx.createMediaElementSource(audio).connect(bus); } catch {}   // only when audio is unlocked
        audio.ontimeupdate = () => { if (id === narrationId && audio?.duration) syncCaptions(parts, audio.currentTime / audio.duration); };
        audio.onended = () => { URL.revokeObjectURL(url); done(id); };
        audio.onerror = () => { URL.revokeObjectURL(url); if (id === narrationId) captionsOnly(text, lang, id); };
        await audio.play(); return;
      }
      if (r.status === 503 || r.status === 404) online = false;
      window.__stellarVoiceFallback(fallbackReason(r.status));
    } catch { if (id !== narrationId) return; window.__stellarVoiceFallback('error'); }
  } else window.__stellarVoiceFallback(location.protocol === 'file:' ? 'file' : 'config');
  captionsOnly(text, lang, id);
}
export function stopNarration() {
  narrationId++;
  if (audio) { try { audio.pause(); } catch {} audio = null; }
  clearTimeout(captionTimer);
  window.__stellarSpeaking = false; showCaption('');
}
// When Stellar answers in the chat, stop the narration · 对话朗读时停止介绍
addEventListener('stellar-speak', () => { narrationId++; clearTimeout(captionTimer); if (audio) { try { audio.pause(); } catch {} audio = null; } showCaption(''); });

/* ───────── On/off button · 开关 ───────── */
function render() {
  if (!button) return;
  button.classList.toggle('active', enabled); button.setAttribute('aria-pressed', String(enabled));
  button.innerHTML = enabled
    ? window.bi('🗣 Voice On', '🗣 语音已开启', '🗣 Voz activada')
    : window.bi('🔇 Voice Off', '🔇 语音已关闭', '🔇 Voz desactivada');
}
if (button) button.onclick = () => {
  enabled = !enabled; try { localStorage.setItem('stellar-voice', enabled ? 'on' : 'off'); } catch {}
  if (!enabled) stopNarration(); else sfx('chime');
  render();
};
render();

// Chimes for the team's panels · 面板提示音
for (const id of ['habitability', 'asteroidOpen', 'resourcesOpen']) document.getElementById(id)?.addEventListener('click', () => sfx('chime'));

export const voiceStatus = () => ({ enabled, online });

// Say clearly when the ElevenLabs voice can't be used, instead of switching silently · 明确提示
let warned = false;
window.__stellarVoiceFallback = reason => {
  if (warned) return; warned = true;
  const s = document.getElementById('status'); if (!s) return;
  const why = {
    file: ['Opened as a file, so the ElevenLabs voice is off. Use the website or npm start.', '以文件方式打开，ElevenLabs 语音不可用。请使用网站或 npm start。', 'Abierto como archivo: la voz de ElevenLabs no está disponible. Usa la web o npm start.'],
    config: ['ElevenLabs voice not connected: add ELEVENLABS_API_KEY on the server and redeploy. Showing captions for now.', 'ElevenLabs 语音未连接：请在服务器添加 ELEVENLABS_API_KEY 并重新部署。暂时只显示字幕。', 'Voz de ElevenLabs no conectada: añade ELEVENLABS_API_KEY en el servidor y vuelve a desplegar. Por ahora solo subtítulos.'],
    missing: ['ElevenLabs voice not found on the server: upload api/voice.js and api/tts.js, then redeploy.', '服务器上没有 ElevenLabs 语音接口：请上传 api/voice.js 和 api/tts.js 并重新部署。', 'Falta la voz de ElevenLabs en el servidor: sube api/voice.js y api/tts.js y vuelve a desplegar.'],
    error: ['ElevenLabs did not answer (key, credits or limit). Showing captions for now.', 'ElevenLabs 没有响应（密钥、额度或限制）。暂时只显示字幕。', 'ElevenLabs no respondió (clave, créditos o límite). Por ahora solo subtítulos.'],
  }[reason] || null;
  if (!why) return;
  s.innerHTML = window.bi(...why); s.style.display = 'block';
  clearTimeout(s.__t); s.__t = setTimeout(() => s.style.display = 'none', 9000);
  console.warn('[Stellar voice] ElevenLabs not used:', reason);
};
const fallbackReason = status => status === 503 ? 'config' : status === 404 || status === 405 ? 'missing' : 'error';
