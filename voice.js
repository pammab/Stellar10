// ─────────────────────────────────────────────────────────────────────────────
// Voice · 语音 — speech-to-text (Web Speech API) and spoken replies.
// Speech recognition works in Chrome and Edge (and Safari 14.1+). In Chrome the
// audio is processed by Google's speech service. Replies are spoken with ElevenLabs when the
// server has a key, otherwise with the browser's built-in voice.
// ─────────────────────────────────────────────────────────────────────────────
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
export const canListen = !!SR;
export const canSpeak = 'speechSynthesis' in window;

export const VOICE_LANGS = [
  { code: 'en-US', label: 'English' },
  { code: 'zh-CN', label: '中文' },
  { code: 'es-ES', label: 'Español' },
  { code: 'pt-PT', label: 'Português' },
];
export function defaultLang() {
  const l = (navigator.language || 'en').toLowerCase();
  return (VOICE_LANGS.find(v => l.startsWith(v.code.slice(0, 2))) || VOICE_LANGS[0]).code;
}

let current = null;
// Listen once; resolves with the final transcript ('' if nothing was heard).
export function listen(lang, onInterim = () => {}) {
  if (!SR) return Promise.reject(Object.assign(new Error('unsupported'), { code: 'unsupported' }));
  stopListening();
  return new Promise((resolve, reject) => {
    const r = new SR(); current = r;
    r.lang = lang; r.interimResults = true; r.continuous = false; r.maxAlternatives = 1;
    let finalText = '', latest = '';
    r.onresult = e => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalText += t; else interim += t;
      }
      latest = (finalText + interim).trim(); onInterim(latest);
    };
    r.onerror = e => { current = null; if (e.error === 'no-speech' || e.error === 'aborted') resolve(''); else reject(Object.assign(new Error(e.error), { code: e.error })); };
    r.onend = () => { current = null; resolve((finalText || latest).trim()); };
    r.start();
  });
}
export function stopListening() { try { current?.stop(); } catch {} current = null; }
export const isListening = () => !!current;

function pickVoice(lang) {
  const voices = speechSynthesis.getVoices(), base = lang.slice(0, 2).toLowerCase();
  const same = voices.filter(v => v.lang?.toLowerCase().startsWith(base));
  return same.find(v => /natural|google|neural|premium|enhanced/i.test(v.name)) || same.find(v => v.lang === lang) || same[0] || null;
}
// Spoken replies: ElevenLabs voice through our server (/api/tts), falling back to the
// browser's built-in voice if the server has no key or the request fails.
// 回答朗读：优先使用 ElevenLabs，失败时改用浏览器自带语音。
let premium = true, audio = null, speakId = 0;
const setSpeaking = on => { window.__stellarSpeaking = on; };
// Without ElevenLabs the reply stays as text on screen: no robotic browser voice.
// Set window.STELLAR_BROWSER_VOICE = true to allow the built-in voice as a fallback.
function browserSpeak(text, lang, onEnd) {
  if (!canSpeak || !window.STELLAR_BROWSER_VOICE) { setSpeaking(false); return onEnd(); }
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang; const v = pickVoice(lang); if (v) u.voice = v;
  u.rate = 1.02; u.pitch = 1; u.onend = u.onerror = () => { setSpeaking(false); onEnd(); };
  speechSynthesis.speak(u);
}
export async function speak(text, lang, onEnd = () => {}) {
  if (!text) return onEnd();
  stopSpeaking(); dispatchEvent(new Event('stellar-speak')); const id = ++speakId; setSpeaking(true);
  if (premium && location.protocol !== 'file:') {
    try {
      const r = await fetch('/api/tts', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ text, lang: lang.slice(0, 2).toLowerCase() }) });
      if (id !== speakId) return;                                   // a newer reply started meanwhile
      if (r.ok && (r.headers.get('content-type') || '').includes('audio')) {
        const url = URL.createObjectURL(await r.blob());
        if (id !== speakId) { URL.revokeObjectURL(url); return; }
        audio = new Audio(url);
        const done = () => { URL.revokeObjectURL(url); if (id === speakId) { audio = null; setSpeaking(false); onEnd(); } };
        audio.onended = done;
        audio.onerror = () => { URL.revokeObjectURL(url); if (id === speakId) { audio = null; browserSpeak(text, lang, onEnd); } };
        await audio.play();
        return;
      }
      if (r.status === 503 || r.status === 404 || r.status === 405) premium = false;   // no key / no server: stop asking
      window.__stellarVoiceFallback?.(r.status === 503 ? 'config' : r.status === 404 || r.status === 405 ? 'missing' : 'error');
    } catch { if (id !== speakId) return; window.__stellarVoiceFallback?.('error'); }
  } else window.__stellarVoiceFallback?.(location.protocol === 'file:' ? 'file' : 'config');
  browserSpeak(text, lang, onEnd);
}
export function stopSpeaking() {
  speakId++;
  if (audio) { try { audio.pause(); } catch {} audio = null; }
  if (canSpeak) speechSynthesis.cancel();
  setSpeaking(false);
}
if (canSpeak) speechSynthesis.getVoices(); // warm up the voice list
