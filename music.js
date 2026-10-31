// STELLAR · ambient soundtrack (team feature): one looping track per scene, cross-faded.
// 配乐 · Música. Plain script, loaded after the page.
/* STELLAR SOUND · procedural ambient score; no external audio dependencies.
   Artistic sonification, not recordings of sound travelling through vacuum. */
(() => {
'use strict';
const $=id=>document.getElementById(id), button=$('musicToggle'), options=$('musicOptions'), panel=$('musicPanel'), slider=$('musicVolume');
// Individually composed stereo soundtracks with distinct lead instruments.
const profiles={"cosmos": {"title": ["Starlight · Quiet Wonder", "星光 · 静谧奇境", "Luz estelar · Asombro"], "root": 60, "chord": [0, 7, 12, 16], "notes": [12, 7, 16, 19, 14, 12, 7, 24], "pace": 3.7, "cut": 1800, "overtone": 0.14}, "trajectory": {"title": ["Voyage · Weightless", "航行 · 失重漫游", "Viaje · Ingravidez"], "root": 60, "chord": [0, 7, 14, 19], "notes": [7, 12, 19, 16, 14, 12, 7, 19], "pace": 2.8, "cut": 1900, "overtone": 0.12}, "sun": {"title": ["Sun · Golden Warmth", "太阳 · 金色暖光", "Sol · Calidez dorada"], "root": 60, "chord": [0, 4, 7, 12], "notes": [7, 12, 16, 12, 7, 4, 12, 19], "pace": 3.9, "cut": 1400, "overtone": 0.28}, "mercury": {"title": ["Mercury · Silver Drops", "水星 · 银色微光", "Mercurio · Gotas de plata"], "root": 60, "chord": [7, 12, 16, 19], "notes": [19, 12, 24, 16, 19, 12, 7, 24], "pace": 4.2, "cut": 2400, "overtone": 0.06}, "venus": {"title": ["Venus · Silk Clouds", "金星 · 丝绒云幕", "Venus · Nubes de seda"], "root": 60, "chord": [0, 7, 12, 16], "notes": [12, 16, 7, 12, 19, 16, 12, 7], "pace": 4.5, "cut": 1300, "overtone": 0.1}, "earth": {"title": ["Earth · Blue Calm", "地球 · 蔚蓝安宁", "Tierra · Calma azul"], "root": 60, "chord": [4, 7, 12, 19], "notes": [12, 7, 16, 19, 12, 14, 7, 16], "pace": 3.6, "cut": 1900, "overtone": 0.18}, "mars": {"title": ["Mars · Amber Horizon", "火星 · 琥珀地平线", "Marte · Horizonte ámbar"], "root": 60, "chord": [0, 7, 12, 19], "notes": [7, 12, 19, 12, 7, 16, 12, 7], "pace": 4.4, "cut": 1500, "overtone": 0.22}, "jupiter": {"title": ["Jupiter · Floating Majesty", "木星 · 浮光辽阔", "Júpiter · Majestad flotante"], "root": 60, "chord": [0, 4, 7, 19], "notes": [7, 12, 4, 19, 12, 16, 7, 12], "pace": 4.7, "cut": 1300, "overtone": 0.24}, "saturn": {"title": ["Saturn · Luminous Rings", "土星 · 流光之环", "Saturno · Anillos luminosos"], "root": 60, "chord": [7, 12, 16, 19], "notes": [19, 12, 16, 24, 19, 14, 12, 16], "pace": 3.3, "cut": 2300, "overtone": 0.12}, "uranus": {"title": ["Uranus · Crystal Veil", "天王星 · 冰晶轻纱", "Urano · Velo de cristal"], "root": 60, "chord": [7, 12, 14, 19], "notes": [24, 19, 12, 14, 19, 16, 12, 24], "pace": 4.6, "cut": 2200, "overtone": 0.04}, "neptune": {"title": ["Neptune · Blue Reverie", "海王星 · 深蓝遐想", "Neptuno · Ensueño azul"], "root": 60, "chord": [0, 7, 12, 14], "notes": [12, 19, 14, 7, 12, 16, 19, 12], "pace": 4.3, "cut": 1600, "overtone": 0.08}};
let ctx,master,compressor,reverb,dry,wet,group,enabled=false,current='cosmos',volume=.32,timer=null,suspendTimer=null,ducked=false,failed=false,loading=false,sceneRequest=0;
try{const v=localStorage.getItem('stellar-music-volume');if(v!==null && Number.isFinite(+v))volume=Math.max(0,Math.min(1,+v));}catch{}
const language=()=>document.documentElement.dataset.lang||'en';
const tr=(en,zh,es)=>({en,zh,es}[language()]||en);
function render(){
 button.textContent=enabled?tr('♫ Music On','♫ 音乐已开启','♫ Música activada'):tr('♪ Music Off','♪ 音乐已关闭','♪ Música desactivada');
 button.classList.toggle('active',enabled);button.setAttribute('aria-pressed',String(enabled));
 options.setAttribute('aria-label',tr('Music settings','音乐设置','Ajustes de música'));
 $('musicHeading').textContent=tr('AMBIENT SOUNDTRACK','沉浸式太空配乐','BANDA SONORA AMBIENTAL');
 const titles=profiles[current].title;$('musicTrack').textContent=titles[language()==='zh'?1:language()==='es'?2:0];
 $('musicState').textContent=failed?tr('Audio unavailable in this browser','此浏览器暂无法启动音频','Audio no disponible'):enabled&&loading?tr('Preparing soundtrack…','正在准备配乐…','Preparando música…'):enabled?tr('Playing · Smooth transitions','播放中 · 平滑过渡','Reproduciendo · Transiciones suaves'):tr('Off · Turn on to listen','已关闭 · 点击音乐按钮开启','Desactivada · Activa para escuchar');
 $('musicVolumeLabel').textContent=tr('Volume','音量','Volumen');$('musicValue').textContent=Math.round(volume*100)+'%';slider.value=Math.round(volume*100);
 $('musicNote').textContent=tr('Composed planetary themes: piano, harp, flute, glass and warm strings. Soft musical atmospheres, with matched listening levels.','每颗星球独立编曲：钢琴、竖琴、长笛、玻璃琴与温暖弦乐。音量经过统一校准。','Música espacial sintetizada original. Cada mundo tiene su propia atmósfera.');
}
const frequency=m=>440*Math.pow(2,(m-69)/12);
function smooth(param,value,seconds=.8){param.cancelScheduledValues(ctx.currentTime);param.setTargetAtTime(value,ctx.currentTime,seconds/3);}
function initialize(){
 const AC=window.AudioContext||window.webkitAudioContext;if(!AC)throw Error('No Web Audio');
 ctx=new AC();master=ctx.createGain();master.gain.value=0;
 compressor=ctx.createDynamicsCompressor();compressor.threshold.value=-16;compressor.knee.value=18;compressor.ratio.value=4;compressor.attack.value=.02;compressor.release.value=.5;
 master.connect(compressor);compressor.connect(ctx.destination);
 dry=ctx.createGain();dry.gain.value=1;dry.connect(master);

}
function dispose(g){if(!g||g.disposed)return;g.disposed=true;for(const n of g.sources){try{n.stop();}catch{}try{n.disconnect();}catch{}}for(const n of g.nodes){try{n.disconnect();}catch{}}g.sources.clear();g.nodes.clear();}
// Tracks are the files music-<scene>.mp3 next to index.html. The single-file build embeds them in
// <script id="stellarAudioData"> instead. 音乐文件：music-<场景>.mp3
const audioNode=document.getElementById('stellarAudioData');
const embeddedScores=audioNode?JSON.parse(audioNode.textContent):null;
const decodedScores=new Map();
async function scoreBuffer(id){
 if(decodedScores.has(id))return decodedScores.get(id);
 let bytes;
 if(embeddedScores){const binary=atob(embeddedScores[id]);bytes=new Uint8Array(binary.length);for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);}
 else{const r=await fetch('music-'+id+'.mp3');if(!r.ok)throw Error('Missing music-'+id+'.mp3');bytes=new Uint8Array(await r.arrayBuffer());}
 const buffer=await ctx.decodeAudioData(bytes.buffer);
 if(decodedScores.size>=3)decodedScores.delete(decodedScores.keys().next().value);
 decodedScores.set(id,buffer);return buffer;
}
function makeGroup(id,buffer){
 const source=ctx.createBufferSource(),mix=ctx.createGain();source.buffer=buffer;source.loop=true;
 mix.gain.value=0;source.connect(mix);mix.connect(dry);source.start(ctx.currentTime+.02);
 smooth(mix.gain,1,2.5);return{sources:new Set([source]),nodes:new Set([mix]),mix,disposed:false};
}
function switchScene(id){
 if(!profiles[id])id='cosmos';if(current===id){render();return;}current=id;
 if(ctx && enabled)crossfade();render();
}
async function crossfade(){
 const request=++sceneRequest,id=current;loading=true;render();
 try{
  const buffer=await scoreBuffer(id);
  if(request!==sceneRequest||!enabled||current!==id)return;
  const old=group;group=makeGroup(id,buffer);loading=false;render();
  if(old){smooth(old.mix.gain,0,2.5);setTimeout(()=>dispose(old),5500);}
 }catch(e){if(request!==sceneRequest)return;loading=false;enabled=false;failed=true;updateGain();render();}
}
function updateGain(){if(ctx)smooth(master.gain,enabled&&!document.hidden?volume*(ducked?.22:1):0,.65);}
function tick(){
 if(!ctx||!enabled||document.hidden||ctx.state!=='running')return;
 const d=!!window.speechSynthesis?.speaking||!!window.__stellarSpeaking||!!document.querySelector('.mic.live');if(d!==ducked){ducked=d;updateGain();}

}
async function toggle(){
 enabled=!enabled;failed=false;if(!enabled){sceneRequest++;loading=false;}clearTimeout(suspendTimer);render();
 if(!enabled){updateGain();clearInterval(timer);timer=null;suspendTimer=setTimeout(()=>{if(!enabled)ctx?.suspend().catch(()=>{});},900);return;}
 try{if(!ctx)initialize();await ctx.resume();if(!enabled)return;if(group)dispose(group);group=null;crossfade();updateGain();clearInterval(timer);timer=setInterval(tick,200);tick();}
 catch(e){enabled=false;failed=true;clearInterval(timer);timer=null;if(ctx)updateGain();}render();
}
function syncScene(){const id=document.body.classList.contains('mode-focus')?document.querySelector('#nav button.active')?.dataset.id:document.body.classList.contains('mode-trajectory')?'trajectory':'cosmos';switchScene(id||'cosmos');}
button.addEventListener('click',toggle);
options.addEventListener('click',()=>{panel.hidden=!panel.hidden;options.setAttribute('aria-expanded',String(!panel.hidden));});
slider.addEventListener('input',()=>{volume=Number(slider.value)/100;try{localStorage.setItem('stellar-music-volume',String(volume));}catch{}updateGain();render();});
document.addEventListener('pointerdown',e=>{if(!e.target.closest('#stellarMusic')){panel.hidden=true;options.setAttribute('aria-expanded','false');}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){panel.hidden=true;options.setAttribute('aria-expanded','false');}});
document.addEventListener('visibilitychange',async()=>{if(!ctx||!enabled)return;if(document.hidden){updateGain();clearTimeout(suspendTimer);suspendTimer=setTimeout(()=>{if(document.hidden)ctx.suspend().catch(()=>{});},900);}else{clearTimeout(suspendTimer);try{await ctx.resume();updateGain();tick();}catch{enabled=false;render();}}});
addEventListener('pagehide',()=>{clearInterval(timer);clearTimeout(suspendTimer);if(ctx)ctx.suspend().catch(()=>{});});
addEventListener('pageshow',()=>{if(enabled&&ctx){clearInterval(timer);timer=setInterval(tick,200);ctx.resume().then(()=>{updateGain();tick();}).catch(()=>{enabled=false;render();});}});
new MutationObserver(syncScene).observe(document.body,{attributes:true,attributeFilter:['class']});
if($('nav'))new MutationObserver(syncScene).observe($('nav'),{subtree:true,attributes:true,attributeFilter:['class']});
new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['data-lang']});
syncScene();render();
})();
