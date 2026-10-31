// ─────────────────────────────────────────────────────────────────────────────
// STELLAR · Solar System Explorer — main scene, camera, modes and controls
// 太阳系交互探索 —— 场景、相机、模式与交互
//   Modes: overview (orbits) · lineup (true sizes side by side) · focus (one body)
//   Inputs: mouse / touch, hand gestures (camera), voice + text (Ask Stellar)
// ─────────────────────────────────────────────────────────────────────────────
import { setLanguage, initialLanguage, onLanguage, voiceCode } from './i18n.js';
import * as T from 'three';
import { SUN, PLANETS, byId, orbitUnits } from './data.js';
import { buildPlanet, buildSun, buildStars, buildAsteroidBelt, orbitLine, upgradeTexture, buildParticles, buildRingParticles, applyMaps, setVenusSurface } from './bodies.js';
import { loadMaps } from './maps.js';
import { HandTracker, GESTURE_COLORS } from './gestures.js';
import { initChat } from './chat.js';
import { buildHighlights, HIGHLIGHTS } from './highlights.js';
import { initHabitability } from './habitability.js';
import { narrate, stopNarration, sfx } from './narration.js';
const $ = s => document.querySelector(s), clamp = T.MathUtils.clamp, bi = window.bi;
const nameOf = p => [p.en.charAt(0) + p.en.slice(1).toLowerCase(), p.zh, p.es.charAt(0) + p.es.slice(1).toLowerCase()];
const wrapPI = a => ((a + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;
const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/* ───────── Renderer & scene · 渲染与场景 ───────── */
const renderer = new T.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75)); renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = T.SRGBColorSpace; renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.1;
document.body.prepend(renderer.domElement);
const scene = new T.Scene(); scene.background = new T.Color('#02050b');
const camera = new T.PerspectiveCamera(42, innerWidth / innerHeight, 0.01, 8000);
scene.add(new T.AmbientLight(0x9fb4d0, 0.1));
scene.add(new T.PointLight(0xfff3e2, 3.1, 0, 0));          // the Sun lights everything, no fall-off
scene.add(buildStars());

/* ───────── Bodies · 天体 ───────── */
const sun = buildSun(SUN); scene.add(sun.anchor);
const planets = PLANETS.map((p, i) => {
  const b = buildPlanet(p); b.orbit = orbitUnits(p.au); b.angle = i * 2.39 + 0.6;
  b.line = orbitLine(b.orbit); scene.add(b.anchor, b.line); return b;
});
const bodies = [sun, ...planets], bodyById = Object.fromEntries(bodies.map(b => [b.p.id, b]));
const belt = buildAsteroidBelt(orbitUnits(2.2), orbitUnits(3.3)); scene.add(belt);
bodies.forEach(b => { b.tint = '#ffffff'; b.glow = 0.14; b.spinOn = true; b.anchor.position.set(b.orbit ? Math.cos(b.angle) * b.orbit : 0, 0, b.orbit ? Math.sin(b.angle) * b.orbit : 0); });

// Line-up positions: true sizes side by side, starting at the Sun's edge · 按真实大小并排
const lineX = {}; { let x = sun.r + 1.6; for (const b of planets) { const half = b.ring && b.p.id === 'saturn' ? b.r * 2.4 : b.r; x += half; lineX[b.p.id] = x; x += half + 0.9; } lineX.end = x; }

/* ───────── State · 状态 ───────── */
let mode = 'overview', focus = null, paused = false, lineBlend = 0, orbitSpeed = 1;
let sliderSpread = 0, handSpread = 0, expansion = 0, last = performance.now();
const zooms = { overview: 1, lineup: 1, focus: 1, trajectory: 1 };
const rig = { target: new T.Vector3(), logDist: Math.log(300), yaw: 0.6, pitch: 0.55 }, goal = { yaw: 0.6, pitch: 0.55 };
const from = { target: new T.Vector3(), logDist: 0 }; let trans = 1;
const tanHalf = () => Math.tan(T.MathUtils.degToRad(camera.fov / 2));
const fitAspect = () => Math.min(camera.aspect, 1.8);
const baseDist = {
  trajectory: () => 205 / (tanHalf() * fitAspect()),
  overview: () => Math.max(170, 112 / (tanHalf() * fitAspect())),
  lineup: () => ((lineX.end - sun.r * 0.55) / 2) / (tanHalf() * fitAspect()),
  focus: () => focus.r * (focus.isSun ? 2.6 : focus.ring ? 4.6 : 3.3) / Math.min(1, camera.aspect * 0.9),
};
const zoomLimits = { trajectory: () => [0.45, 4], overview: () => [0.45, baseDist.overview() / (sun.r * 1.9)], lineup: () => [0.6, 6], focus: () => [0.45, focus?.isSun ? 2 : 5] };
const clampZoom = (z, m = mode) => clamp(z, ...zoomLimits[m]());
const lineCenter = () => (sun.r * 0.55 + lineX.end) / 2;

function startTransition() { camera.fov=mode==='trajectory'?52:42;camera.updateProjectionMatrix(); from.target.copy(rig.target); from.logDist = rig.logDist; trans = 0; }
function goalTarget(out) {
  if (mode === 'focus') return out.copy(focus.anchor.position);
  if (mode === 'lineup') return out.set(lineCenter(), 0, 0);
  return out.set(0, 0, 0);
}
const goalDist = () => baseDist[mode]() / zooms[mode];

/* ───────── Labels on screen · 屏幕标签 ───────── */
bodies.forEach(b => {
  const el = document.createElement('button'); el.className = 'tag'; el.type = 'button';
  el.innerHTML = `<span class="ring" style="--c:${b.p.color}"></span><span class="name">${bi(b.p.en, b.p.zh, b.p.es)}</span>`;
  el.onclick = () => select(b.p.id);
  el.onmouseenter = () => setHover(b.p.id); el.onmouseleave = () => setHover(null);
  document.body.append(el); b.tag = el;
});
let hoverId = null;
function setHover(id) {
  if (id === hoverId) return; hoverId = id;
  bodies.forEach(b => { b.tag.classList.toggle('hover', b.p.id === id); if (b.line) b.line.material.opacity = b.p.id === id ? 0.75 : 0.3; });
  renderer.domElement.style.cursor = id ? 'pointer' : '';
}

/* ───────── Picking (works for tiny planets too) · 拾取 ───────── */
const v3 = new T.Vector3(), flightPickRay=new T.Raycaster(), flightPickNdc=new T.Vector2();
function screenOf(b) {
  v3.copy(b.anchor.position).project(camera);
  const dist = camera.position.distanceTo(b.anchor.position);
  return { x: (v3.x * 0.5 + 0.5) * innerWidth, y: (-v3.y * 0.5 + 0.5) * innerHeight, r: b.r / (dist * tanHalf()) * innerHeight / 2, front: v3.z < 1 };
}
function pickAt(x, y, minPx = 22) {
  if (mode === 'focus') return null;
  if (mode === 'trajectory') {
    flight.updateMatrixWorld(true);
    flightPickNdc.set(x/innerWidth*2-1,1-y/innerHeight*2);flightPickRay.setFromCamera(flightPickNdc,camera);
    const hits=flightPickRay.intersectObjects(flightItems.map(it=>it.visual),true).filter(hit=>hit.object.material?.visible!==false);
    if(hits.length){let obj=hits[0].object;while(obj && obj.parent!==flight)obj=obj.parent;const item=flightItems.find(it=>it.mesh===obj);if(item)return item.p.id;}
    let best=null,score=Infinity;
    for(const item of flightItems){
      item.mesh.getWorldPosition(v3);const dist=camera.position.distanceTo(v3);v3.project(camera);
      if(v3.z < -1 || v3.z>1)continue;
      const px=(v3.x+1)*innerWidth/2,py=(1-v3.y)*innerHeight/2,reach=Math.max(minPx,item.size/(dist*tanHalf())*innerHeight/2),d=Math.hypot(px-x,py-y);
      const candidate=d/reach+(item.i?0:1);
      if(d<=reach && candidate<score){best=item.p.id;score=candidate;}
    }
    return best;
  }
  let best = null, bestScore = Infinity;
  for (const b of bodies) {
    const s = screenOf(b); if (!s.front) continue;
    const reach = Math.max(minPx, s.r * 1.05), d = Math.hypot(s.x - x, s.y - y);
    if (d > reach) continue;
    const score = d / reach + (b.isSun ? 1 : 0);              // prefer a planet over the Sun behind it
    if (score < bestScore) { bestScore = score; best = b.p.id; }
  }
  return best;
}

/* ───────── Modes · 模式 ───────── */

/* Motion trails: shared time axis, real relative orbital periods, illustrative
   galactic translation. Distances/radii compressed; not an ephemeris. */
const flight = new T.Group(); scene.add(flight); flight.visible = false;
const flightPanel = document.createElement('aside'); flightPanel.className = 'flight-panel';
flightPanel.innerHTML = `<div class="eyebrow">${bi('TRAJECTORY CONTROL','轨迹控制','CONTROL DE TRAYECTORIAS')}</div>
<div class="flight-time" id="flightTime">+0.00 yr</div>
<label>${bi('Time speed','时间速度','Velocidad')} <b id="flightRate">1×</b><input id="flightSpeed" aria-label="Motion speed" type="range" min="0.2" max="4" step="0.2" value="1"></label>
<div class="flight-actions"><button id="flightReset">${bi('Restart','重新开始','Reiniciar')}</button><button id="flightView">${bi('Change angle ↗','切换机位 ↗','Cambiar ángulo ↗')}</button></div>
<p>${bi('Drag for 360° · Scroll to zoom · Click a planet to explore','拖动 360° 旋转 · 滚轮缩放 · 点击行星或名字查看详情','Arrastra para girar · Rueda para zoom · Espacio para pausar')}</p>
<p>${bi('JPL J2000 eccentricities and inclinations, fixed Keplerian ellipses and relative periods. Earth uses the Earth–Moon barycenter approximation. Sizes/distances compressed. Straight solar travel and its direction are illustrative; not a live ephemeris or full Galactic model.','采用 JPL J2000 离心率、轨道倾角与固定开普勒椭圆，保留公转周期比例；地球采用地月质心近似。大小和距离经过压缩。太阳直线前进及其方向为示意，不是实时星历或完整银河运动模型。','Marco móvil ilustrativo. Períodos orbitales relativos reales; distancias comprimidas y cuerpos ampliados. Fases iniciales, velocidad de avance y trayectoria solar recta ilustrativas; no es una efeméride.')}</p>`;
document.body.append(flightPanel);
const trailCount = 1800, trailYears = 12;
let flightTime = 0, flightRate = 1, flightSide = false;

// Real planet surfaces, clouds, atmospheres and Saturn's textured rings.
const flightLight=new T.PointLight(0xffe6bb,700,500,1.3);flight.add(flightLight);
flight.add(new T.HemisphereLight(0xb3dfff,0x080e22,1.8));
const haloCanvas=document.createElement('canvas');haloCanvas.width=haloCanvas.height=128;
const haloCtx=haloCanvas.getContext('2d'), hg=haloCtx.createRadialGradient(64,64,0,64,64,64);
hg.addColorStop(0,'rgba(255,255,255,1)');hg.addColorStop(.08,'rgba(255,235,180,.9)');hg.addColorStop(.24,'rgba(255,184,70,.22)');hg.addColorStop(1,'rgba(255,154,30,0)');haloCtx.fillStyle=hg;haloCtx.fillRect(0,0,128,128);
const haloTexture=new T.CanvasTexture(haloCanvas);
const solarHalo=new T.Sprite(new T.SpriteMaterial({map:haloTexture,color:0xffd6a0,blending:T.AdditiveBlending,transparent:true,depthWrite:false}));solarHalo.scale.set(115,115,1);flight.add(solarHalo);
const flightItems = [SUN,...PLANETS].map((p,i) => {
  const radius = i ? 28 + 13*Math.sqrt(p.au) : 0;
  const original=bodyById[p.id];
  const mesh=new T.Group();flight.add(mesh);
  const visual=original.tilt.clone(true), size=1.6*Math.pow(p.radiusKm/6371,.55); // Compressed size scale preserves ordering and clear differences.
  visual.scale.setScalar(size/original.r);mesh.add(visual);
  const sourceNodes=[],copyNodes=[];original.tilt.traverse(n=>{if(n.isMesh)sourceNodes.push(n)});visual.traverse(n=>{if(n.isMesh)copyNodes.push(n)});
  const positions = new Float32Array(trailCount*3), colors=new Float32Array(trailCount*3), c=new T.Color(p.color);
  for(let j=0;j<trailCount;j++){const age=j/(trailCount-1),fade=Math.pow(age,2.3);colors[j*3]=c.r*fade;colors[j*3+1]=c.g*fade;colors[j*3+2]=c.b*fade;}
  const geo=new T.BufferGeometry();geo.setAttribute('position',new T.BufferAttribute(positions,3));geo.setAttribute('color',new T.BufferAttribute(colors,3));
  const line=new T.Line(geo,new T.LineBasicMaterial({vertexColors:true,transparent:true,opacity:.85,blending:T.AdditiveBlending,depthWrite:false}));line.frustumCulled=false;flight.add(line);
  const sparkCount=900, sparkGeo=new T.BufferGeometry();sparkGeo.setAttribute('position',new T.BufferAttribute(new Float32Array(sparkCount*3),3));
  const ages=new Float32Array(sparkCount);for(let j=0;j<sparkCount;j++)ages[j]=j/(sparkCount-1);sparkGeo.setAttribute('age',new T.BufferAttribute(ages,1));
  const sparks=new T.Points(sparkGeo,new T.ShaderMaterial({uniforms:{tint:{value:c},pulse:{value:0},pixelRatio:{value:Math.min(devicePixelRatio,1.75)}},vertexShader:`attribute float age; varying float vAge; uniform float pixelRatio; void main(){vAge=age;vec4 pos=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*pos;gl_PointSize=clamp((1.8+age*3.5)*pixelRatio*170./max(20.,-pos.z),1.,12.);}`,fragmentShader:`varying float vAge;uniform vec3 tint;uniform float pulse;void main(){float r=length(gl_PointCoord-.5)*2.;if(r>1.)discard;float glow=pow(1.-r,2.);float breathe=.72+.28*sin(vAge*34.-pulse*2.);float alpha=pow(vAge,1.7)*glow*breathe;gl_FragColor=vec4(mix(tint,vec3(1.),pow(vAge,16.)*.65),alpha*.85);}`,transparent:true,blending:T.AdditiveBlending,depthWrite:false}));sparks.frustumCulled=false;flight.add(sparks);
  const label=document.createElement('button');label.type='button';label.className='flight-label';label.innerHTML=bi(p.en.toUpperCase(),p.zh,p.es.toUpperCase());label.setAttribute('aria-label','Explore '+p.en);label.onclick=()=>select(p.id);label.onmouseenter=()=>setHover(p.id);label.onmouseleave=()=>setHover(null);document.body.append(label);
  return {p,i,radius,size,mesh,line,label,visual,sourceNodes,copyNodes,sparks,sparkCount};
});
// A diagonal flight axis gives the trails a cinematic rising composition.
flight.rotation.set(.12,-.22,.38);
// NASA/JPL Table 1, J2000: e, inclination, mean longitude, perihelion longitude, node.
// Fixed-element educational Kepler model; no secular rates or N-body perturbations.
// https://ssd.jpl.nasa.gov/planets/approx_pos.html
const flightElements={
 mercury:[.20563593,7.00497902,252.25032350,77.45779628,48.33076593],
 venus:[.00677672,3.39467605,181.97909950,131.60246718,76.67984255],
 earth:[.01671123,-.00001531,100.46457166,102.93768193,0],
 mars:[.09339410,1.84969142,-4.55343205,-23.94362959,49.55953891],
 jupiter:[.04838624,1.30439695,34.39644051,14.72847983,100.47390909],
 saturn:[.05386179,2.48599187,49.95424423,92.59887831,113.66242448],
 uranus:[.04725744,.77263783,313.23810451,170.95427630,74.01692503],
 neptune:[.00859048,1.77004347,-55.12002969,44.96476227,131.78422574]
};
const flightOrbitBasis={};
for(const [id,[e,inc,L,peri,node]] of Object.entries(flightElements)){
 const d=Math.PI/180,I=inc*d,O=node*d,w=(peri-node)*d,cw=Math.cos(w),sw=Math.sin(w),co=Math.cos(O),so=Math.sin(O),ci=Math.cos(I),si=Math.sin(I);
 flightOrbitBasis[id]={e,M0:(L-peri)*d,u:[cw*co-sw*so*ci,cw*so+sw*co*ci,sw*si],v:[-sw*co-cw*so*ci,-sw*so+cw*co*ci,cw*si]};
}
// Look along the orbital plane's normal, rather than along translation.
// This changes only the viewpoint: circular orbits are not stretched to look round.
flight.updateMatrixWorld(true);
const orbitFacing=new T.Vector3(.5,0,-Math.sqrt(.75)).applyQuaternion(flight.quaternion).normalize();
const flightFaceYaw=Math.atan2(orbitFacing.x,orbitFacing.z),flightFacePitch=Math.asin(orbitFacing.y);
function flightPosition(item,t,out) {
 const drift=95+(t-flightTime)*22;
 if(!item.i)return out.set(drift,0,0);
 const o=flightOrbitBasis[item.p.id],M=wrapPI(o.M0+t*365.25/item.p.periodDays*Math.PI*2);
 let E=M;for(let k=0;k<5;k++)E-=(E-o.e*Math.sin(E)-M)/(1-o.e*Math.cos(E));
 const x=item.radius*(Math.cos(E)-o.e),y=item.radius*Math.sqrt(1-o.e*o.e)*Math.sin(E);
 const X=o.u[0]*x+o.v[0]*y,Y=o.u[1]*x+o.v[1]*y,Z=o.u[2]*x+o.v[2]*y;
 // Orthonormal basis: preserve orbital shape in 3D; translation stays illustrative.
 return out.set(drift+X*Math.sqrt(.75)+Z*.5,Y,X*.5-Z*Math.sqrt(.75));
}
function updateFlight(dt) {
  const active=mode==='trajectory'; flight.visible=active;flightPanel.style.display=active?'block':'none';
  $('#trajectory').classList.toggle('active',active);$('#trajectory').setAttribute('aria-pressed',active);
  bodies.forEach(b=>b.anchor.visible=!active);belt.visible=!active;
  flightItems.forEach(item=>item.label.style.display='none');
  if(!active)return;
  if(!paused) flightTime+=dt*.35*flightRate;
  $('#flightTime').textContent='+'+flightTime.toFixed(2)+' '+({zh:'年',es:'años'}[document.documentElement.dataset.lang]||'yr');
  for(const item of flightItems){
    flightPosition(item,flightTime,item.mesh.position);
    item.visual.rotation.y=paused?item.visual.rotation.y:item.visual.rotation.y+dt*.16;
    item.sourceNodes.forEach((n,j)=>{if(item.copyNodes[j])item.copyNodes[j].material=n.material;});
    item.line.material.opacity=hoverId===item.p.id ? 1 : .62+.22*Math.sin(flightTime*1.8+item.i*.7);
    item.label.classList.toggle('hover',hoverId===item.p.id);
    item.sparks.material.uniforms.pulse.value=flightTime*3;
    const sparkArr=item.sparks.geometry.attributes.position.array;
    for(let j=0;j<item.sparkCount;j++){
      const age=j/(item.sparkCount-1),t=flightTime-trailYears*(1-age);flightPosition(item,t,tv);
      const spread=(1-age)*1.8,seed=j*12.9898+item.i*78.233;
      tv.x+=Math.sin(seed)*spread;tv.y+=Math.sin(seed*1.7)*spread;tv.z+=Math.cos(seed*2.3)*spread;tv.toArray(sparkArr,j*3);
    }
    item.sparks.geometry.attributes.position.needsUpdate=true;
    if(!item.i){solarHalo.position.copy(item.mesh.position);flightLight.position.copy(item.mesh.position);solarHalo.material.opacity=.7+.12*Math.sin(flightTime*4);}

    const arr=item.line.geometry.attributes.position.array;
    for(let j=0;j<trailCount;j++){flightPosition(item,flightTime-trailYears*(1-j/(trailCount-1)),tv);tv.toArray(arr,j*3);}
    item.line.geometry.attributes.position.needsUpdate=true;
    flight.updateMatrixWorld(true);item.mesh.getWorldPosition(tv);tv.project(camera);
    if(tv.z<1 && Math.abs(tv.x)<.98 && Math.abs(tv.y)<.95){
      item.mesh.getWorldPosition(orbitPos);
      const labelOffset=item.size/(camera.position.distanceTo(orbitPos)*tanHalf())*innerHeight/2+10;
      item.label.style.display='block';item.label.style.transform=`translate(${(tv.x+1)*innerWidth/2}px,${(1-tv.y)*innerHeight/2+labelOffset}px) translateX(-50%)`;
    }
  }
}
function trajectory(){
  if(mode==='trajectory'){home();return;}
  sfx('warp'); stopNarration();
  mode='trajectory';focus=null;planets.forEach(b=>{if(!b.hiRes)upgradeTexture(b,1024);});zooms.trajectory=1;startTransition();goal.yaw=flightFaceYaw;goal.pitch=flightFacePitch;flightPreset=0;
  document.body.className=document.body.className.replace(/\bmode-\w+/g,'')+' mode-trajectory';
  $('#info').classList.add('hidden');setHover(null);hideParticles();showHighlights(null);highlightNav(null);setIntro('trajectory');chat?.refresh();
}
$('#trajectory').onclick=trajectory;
$('#flightSpeed').oninput=e=>{flightRate=+e.target.value;$('#flightRate').textContent=flightRate.toFixed(1)+'×';};
$('#flightReset').onclick=()=>{flightTime=0;};
let flightPreset=0;
$('#flightView').onclick=()=>{const views=[[flightFaceYaw,flightFacePitch],[flightFaceYaw-.35,flightFacePitch+.2],[1.2,.55],[-.8,-.45],[.1,1.45]];flightPreset=(flightPreset+1)%views.length;[goal.yaw,goal.pitch]=views[flightPreset];};

function home() {
  if (mode === 'overview') return;
  sfx('whoosh-out'); stopNarration();
  mode = 'overview'; focus = null; startTransition(); zooms.overview = 1;
  goal.pitch = 0.55; goal.yaw = rig.yaw;
  $('#info').classList.add('hidden'); document.body.className = document.body.className.replace(/\bmode-\w+/g, '') + ' mode-overview';
  setIntro('overview'); highlightNav(null); hideParticles(); showHighlights(null); chat?.refresh();
}
function lineup() {
  if (mode === 'lineup') { home(); return; }
  sfx('warp'); stopNarration();
  mode = 'lineup'; focus = null; startTransition(); zooms.lineup = 1;
  goal.yaw = rig.yaw + wrapPI(0 - rig.yaw); goal.pitch = 0.06;
  $('#info').classList.add('hidden'); document.body.className = document.body.className.replace(/\bmode-\w+/g, '') + ' mode-lineup';
  setIntro('lineup'); highlightNav(null); hideParticles(); showHighlights(null); chat?.refresh();
}
function select(id) {
  if (!id) return home();
  const b = bodyById[id]; if (!b) return;
  if (mode === 'focus' && focus === b) return;
  // Whoosh in, then Stellar introduces the planet once the camera arrives · 飞入音效后语音介绍
  sfx('whoosh-in'); stopNarration(); setTimeout(() => { if (mode === 'focus' && focus === b) narrate(id); }, 1400);
  mode = 'focus'; focus = b; startTransition(); zooms.focus = 1; sliderSpread = 0; handSpread = 0;
  // Start on the sunlit side, a little off-axis, so the day/night line shows · 从向阳面略偏处观察
  // use the orbit position, not the line-up spot, so we land on the day side · 以轨道位置计算向阳面
  const px = b.orbit ? Math.cos(b.angle) * b.orbit : 0, pz = b.orbit ? Math.sin(b.angle) * b.orbit : 0, sunYaw = b.isSun ? rig.yaw : Math.atan2(-px, -pz) + 0.65;
  goal.yaw = rig.yaw + wrapPI(sunYaw - rig.yaw); goal.pitch = b.isSun ? 0.2 : 0.16;
  document.body.className = document.body.className.replace(/\bmode-\w+/g, '') + ' mode-focus';
  setHover(null); highlightNav(id); renderInfo(b); setIntro('focus', b); hideParticles();
  setTimeout(() => showHighlights(b), 60);
  if (!b.isSun) setTimeout(() => { if (!b.realMap) upgradeTexture(b); ensureParticles(b); }, 30);
  chat?.refresh();
}
function cycle(step) {
  const ids = bodies.map(b => b.p.id), i = focus ? ids.indexOf(focus.p.id) : step > 0 ? -1 : 0;
  select(ids[(i + step + ids.length) % ids.length]);
}
function setPaused(v) { paused = v; $('#pause').innerHTML = paused ? bi('Resume Orbits', '恢复公转') : bi('Pause Orbits', '暂停公转'); }

function ensureParticles(b) {
  if (b.particles) return;
  b.particles = buildParticles(b.texCanvas, b.r, b.p.id === 'earth' || b.p.id === 'mars' ? 14000 : 10000);
  b.particles.material.opacity = b.glow; b.spin.add(b.particles);
  if (b.p.id === 'saturn') { b.ringParticles = buildRingParticles('saturn', b.r); b.tilt.add(b.ringParticles); }
}
// Rebuild a planet's particles after its texture changes (real maps, Venus radar view).
function refreshParticles(b) {
  if (!b.particles) return;
  b.spin.remove(b.particles); b.particles.geometry.dispose(); b.particles.material.dispose(); b.particles = null;
  if (b.ringParticles) { b.tilt.remove(b.ringParticles); b.ringParticles.geometry.dispose(); b.ringParticles = null; }
  ensureParticles(b); hideParticles();
}
/* Highlights: moons, living features, spacecraft (built the first time a body is opened) · 亮点 */
function showHighlights(b) {
  for (const x of bodies) if (x.hl) x.hl.setVisible(x === b && mode === 'focus' && focus === b);
  if (!b || mode !== 'focus' || focus !== b) return;
  if (!b.hl) {
    try {
      b.hl = buildHighlights(b);
      b.hl.items.forEach(it => { const el = document.createElement('div'); el.className = 'mtag ' + it.type; el.innerHTML = bi(...it.label); document.body.append(el); it.el = el; });
    } catch (e) { console.warn('Highlights failed for', b.p.id, e); b.hl = { items: [], setVisible() {}, update() {} }; }
  }
  b.hl.setVisible(true);
}
function hideParticles() { bodies.forEach(b => { if (b.particles) b.particles.visible = b === focus; if (b.ringParticles) b.ringParticles.visible = b === focus; }); }

/* ───────── Panels & text · 面板与文字 ───────── */
function setIntro(m, b) {
  if (m === 'focus') {
    const idx = b.isSun ? 'STAR' : 'PLANET / ' + String(PLANETS.indexOf(b.p) + 1).padStart(2, '0'), idxZh = b.isSun ? '恒星' : '行星 / ' + String(PLANETS.indexOf(b.p) + 1).padStart(2, '0');
    $('#headline').innerHTML = bi(...nameOf(b.p)); $('#subtitle').innerHTML = bi(idx, idxZh, idx.replace('STAR', 'ESTRELLA').replace('PLANET', 'PLANETA'));
  } else if (m === 'trajectory') {
    $('#headline').innerHTML = bi('Worlds in motion.', '群星，向前。', 'Mundos en movimiento.');
    $('#subtitle').innerHTML = bi('Our star moves. Eight worlds travel with it. Explore their luminous paths through a moving reference frame.', '太阳向前，八颗行星与它同行。旋转视角，探索运动参考系下交织的发光轨迹。', 'Nuestra estrella se mueve. Ocho mundos viajan con ella. Explora sus trayectorias luminosas.');
  } else if (m === 'lineup') {
    $('#headline').innerHTML = bi('True sizes, side by side.', '真实大小，并排比较。');
    $('#subtitle').innerHTML = bi('The Sun is 109 times wider than Earth. Jupiter is 11 times wider. Mercury is smaller than some moons.', '太阳的直径是地球的 109 倍，木星是地球的 11 倍，水星甚至比一些卫星还小。');
  } else {
    $('#headline').innerHTML = bi('Among the worlds.', '在群星之间。');
    $('#subtitle').innerHTML = bi('Eight worlds and their star, shown at their true sizes. Select a planet, use your hands, or just ask.', '八颗行星与太阳，按真实大小呈现。点击行星、用手势控制，或直接提问。');
  }
}
function highlightNav(id) { document.querySelectorAll('#nav button').forEach(b => b.classList.toggle('active', b.dataset.id === id)); }

function highlightsHTML(id) {
  const h = HIGHLIGHTS[id]; if (!h) return '';
  const moons = h.moons.length
    ? h.moons.map(m => `<li><b>${bi(m[0], m[1], m[2])}</b>${bi(m[7], m[8], m[9])}</li>`).join('')
    : `<li>${bi('No moons.', '没有卫星。', 'Sin lunas.')}</li>`;
  return `<div class="hl">
    <div class="hlh">${bi('✦ Living feature', '✦ 动态现象', '✦ Fenómeno vivo')}</div><p>${bi(...h.feature)}</p>
    ${id === 'sun' ? '' : `<div class="hlh">${bi('◐ Moons', '◐ 卫星', '◐ Lunas')}</div><ul>${moons}</ul>`}
    <div class="hlh">${bi('🛰 Spacecraft moment', '🛰 航天器时刻', '🛰 Momento espacial')}</div><p><b>${bi(...h.craft.name)}</b> ${bi(...h.craft.text)}</p>
    <small>${bi('Moon sizes are true to scale; very small moons are drawn larger, and orbit distances are shortened. Spacecraft are enlarged to be visible.', '卫星大小按真实比例；很小的卫星画得更大，轨道距离也被缩短。航天器被放大以便看见。', 'Las lunas tienen tamaño real a escala; las muy pequeñas se dibujan más grandes y las órbitas se acortan. Las naves están ampliadas para que se vean.')}</small>
  </div>`;
}
function renderInfo(b) {
  const p = b.p, earthX = (p.radiusKm / 6371).toFixed(p.radiusKm < 6371 ? 2 : 1);
  document.documentElement.style.setProperty('--accent', p.color);
  $('#info').innerHTML = `
    <div class="eyebrow">${bi(p.type[0].toUpperCase(), p.type[1], window.esText(p.type[0]).toUpperCase())}</div>
    <h2>${bi(...nameOf(p))}</h2>
    <div class="scale">${bi(`${earthX} × Earth’s width`, `宽度为地球的 ${earthX} 倍`, `${earthX.replace('.', ',')} × el ancho de la Tierra`)}</div>
    <p>${bi(p.descEn, p.descZh)}</p>
    <div class="facts">${p.facts.map(f => `<div><small>${bi(f[0], f[1])}</small><b>${bi(f[2], f[3])}</b></div>`).join('')}</div>
    <p class="feature">${bi(p.featureEn, p.featureZh)}</p>
    ${highlightsHTML(p.id)}
    <button class="ask" id="askAbout">${bi(`Ask Stellar about ${nameOf(p)[0]}`, `问 Stellar 关于${p.zh}的问题`, `Pregunta a Stellar sobre ${nameOf(p)[2]}`)}</button>
    ${b.isSun ? '' : `<div class="controls">
      <div class="control"><span>${bi('Tint · keeps surface detail', '色调 · 保留表面细节')}</span><input aria-label="Tint" id="tint" type="color" value="${b.tint}"></div>
      <div class="control"><span>${bi('Particle glow', '粒子光感')}</span><span id="glowval">${Math.round(b.glow * 100)}%</span></div>
      <input id="glow" aria-label="Particle glow" type="range" min="0" max="1" step=".01" value="${b.glow}">
      <div class="control"><span>${bi('Particle spread', '粒子扩散')}</span><span>${bi('Open palm / fist', '张手 / 握拳')}</span></div>
      <input id="spread" aria-label="Particle spread" type="range" min="0" max="1" step=".01" value="0">
      ${p.id === 'venus' && maps.venusSurface ? `<div class="control"><span>${bi('View', '视图')}</span><button id="venusView">${b.venusSurface ? bi('Show clouds', '显示云层') : bi('Radar surface', '雷达地表')}</button></div>` : ''}
      <div class="control"><button id="spin">${b.spinOn ? bi('Pause spin', '暂停自转') : bi('Resume spin', '恢复自转')}</button><button id="reset">${bi('Reset look', '恢复外观')}</button></div>
    </div>`}`;
  $('#info').classList.remove('hidden'); $('#info').scrollTop = 0;
  $('#askAbout').onclick = () => chat.open();
  if (b.isSun) return;
  $('#tint').oninput = e => { b.tint = e.target.value; b.surface.material.color.set(b.tint); };
  $('#glow').oninput = e => { b.glow = +e.target.value; if (b.particles) b.particles.material.opacity = b.glow; $('#glowval').textContent = Math.round(b.glow * 100) + '%'; };
  $('#spread').oninput = e => { sliderSpread = +e.target.value; };
  if ($('#venusView')) $('#venusView').onclick = () => { setVenusSurface(b, maps, !b.venusSurface); refreshParticles(b); renderInfo(b); };
  $('#spin').onclick = () => { b.spinOn = !b.spinOn; $('#spin').innerHTML = b.spinOn ? bi('Pause spin', '暂停自转') : bi('Resume spin', '恢复自转'); };
  $('#reset').onclick = () => { b.tint = '#ffffff'; b.glow = 0.14; b.spinOn = true; b.surface.material.color.set('#fff'); if (b.particles) b.particles.material.opacity = 0.14; sliderSpread = 0; renderInfo(b); };
}

/* ───────── Nav & header · 导航与顶部按钮 ───────── */
bodies.forEach(b => {
  const btn = document.createElement('button'); btn.dataset.id = b.p.id;
  btn.innerHTML = `<i style="background:${b.p.color}"></i>${bi(...nameOf(b.p))}`;
  btn.onclick = () => select(b.p.id); $('#nav').append(btn);
});
$('#home').onclick = home; $('#lineup').onclick = lineup; $('#pause').onclick = () => setPaused(!paused);

function notice(en, zh, es, ms = 4500) { const s = $('#status'); s.innerHTML = bi(en, zh, es); s.style.display = 'block'; clearTimeout(notice.t); notice.t = setTimeout(() => s.style.display = 'none', ms); }

/* ───────── Mouse & touch · 鼠标与触控 ───────── */
const canvas = renderer.domElement, pointers = new Map(); let down = null, moved = false, pinchDist = 0;
canvas.addEventListener('pointerdown', e => { pointers.set(e.pointerId, { x: e.clientX, y: e.clientY }); canvas.setPointerCapture(e.pointerId); down = { x: e.clientX, y: e.clientY }; moved = false; if (pointers.size === 2) { const [a, b] = [...pointers.values()]; pinchDist = Math.hypot(a.x - b.x, a.y - b.y); } });
canvas.addEventListener('pointermove', e => {
  if (!pointers.has(e.pointerId)) { if (e.pointerType === 'mouse') setHover(pickAt(e.clientX, e.clientY)); return; }
  const old = pointers.get(e.pointerId); if (Math.hypot(e.clientX - down.x, e.clientY - down.y) > 5) moved = true;
  if (pointers.size === 1) { goal.yaw -= (e.clientX - old.x) * 0.006; goal.pitch = mode === 'trajectory' ? goal.pitch + (e.clientY-old.y)*.005 : clamp(goal.pitch + (e.clientY - old.y) * 0.005, mode === 'focus' ? -1.35 : 0.02, 1.45); }
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (pointers.size === 2) { const [a, b] = [...pointers.values()], d = Math.hypot(a.x - b.x, a.y - b.y); zooms[mode] = clampZoom(zooms[mode] * d / Math.max(1, pinchDist)); pinchDist = d; }
});
canvas.addEventListener('pointerup', e => { pointers.delete(e.pointerId); if (!moved && pointers.size === 0) { const id = pickAt(e.clientX, e.clientY, e.pointerType === 'touch' ? 34 : 22); if (id) select(id); } });
canvas.addEventListener('pointercancel', e => pointers.delete(e.pointerId));
canvas.addEventListener('wheel', e => { e.preventDefault(); zooms[mode] = clampZoom(zooms[mode] * Math.exp(-e.deltaY * 0.0012)); }, { passive: false });
addEventListener('keydown', e => {
  if (e.target.closest?.('input,textarea,select')) return;
  if (e.key === 'Escape') home(); else if (e.key === 'ArrowRight') cycle(1); else if (e.key === 'ArrowLeft') cycle(-1);
  else if (e.key.toLowerCase() === 'l') lineup(); else if (e.key === ' ') { e.preventDefault(); setPaused(!paused); }
});

/* ───────── Hand gestures · 手势 ───────── */
const cursorEl = $('#handCursor'), pill = $('#gpill');
const hand = { present: false, x: 0, y: 0, prev: 'none', since: 0, hoverId: null, hoverAt: 0, dwellId: null, dwellSince: 0, dwellDone: null, pinch: null, fistDone: false, vDone: false, lastSeen: 0 };
const T3 = (en, zh, es) => [en, zh, es];
const HINTS = {
  point: { browse: T3('Point · hold on a planet to open it', '指向 · 停留在行星上即可打开', 'Apunta · quédate sobre un planeta para abrirlo'), focus: T3('Point · move to look around', '指向 · 移动旋转视角', 'Apunta · muévete para mirar alrededor') },
  pinch: { browse: T3('Pinch · open · pinch + move up/down to zoom', '捏合 · 打开 · 捏住上下移动缩放', 'Pellizca · abrir · pellizca y sube/baja para zoom'), focus: T3('Pinch + move up/down · zoom', '捏住上下移动 · 缩放', 'Pellizca y sube/baja · zoom') },
  open: { browse: T3('Open palm · move to turn the system', '张开手掌 · 移动旋转太阳系', 'Palma abierta · muévela para girar el sistema'), focus: T3('Open palm · spread fingers to scatter particles', '张开手掌 · 张开手指让粒子扩散', 'Palma abierta · separa los dedos para dispersar partículas') },
  fist: { browse: T3('Hold fist · back to overview', '保持握拳 · 返回总览', 'Mantén el puño · volver a la vista general'), focus: T3('Hold fist · gather, then go back', '保持握拳 · 聚合并返回', 'Mantén el puño · reunir y volver') },
  victory: { browse: T3('Victory ✌ · hold to talk to Stellar', '剪刀手 ✌ · 保持以和 Stellar 对话', 'Victoria ✌ · mantén para hablar con Stellar'), focus: T3('Victory ✌ · hold to talk to Stellar', '剪刀手 ✌ · 保持以和 Stellar 对话', 'Victoria ✌ · mantén para hablar con Stellar') },
  other: { browse: T3('Hand found · try ☝ 🤏 ✋ ✊ ✌', '已检测到手 · 试试 ☝ 🤏 ✋ ✊ ✌', 'Mano detectada · prueba ☝ 🤏 ✋ ✊ ✌'), focus: T3('Hand found · try ☝ 🤏 ✋ ✊ ✌', '已检测到手 · 试试 ☝ 🤏 ✋ ✊ ✌', 'Mano detectada · prueba ☝ 🤏 ✋ ✊ ✌') },
};
// Small, careful movements stay precise; quick sweeps travel further · 慢动作精确，快动作移动更远
const accel = (d, gain) => d * gain * (1 + Math.min(2, Math.abs(d) / 35) * 0.6);
let sensitivity = 3;
const dwellMs = () => [0, 1700, 1450, 1200, 1000, 850][sensitivity];

function onHand(u) {
  const now = performance.now();
  if (!u.present) {
    hand.present = false; handSpread = 0; cursorEl.classList.add('hidden'); hand.prev = 'none'; hand.dwellId = null;
    pill.innerHTML = bi('Show one hand to the camera', '请把一只手放到镜头前', 'Muestra una mano a la cámara'); pill.style.color = GESTURE_COLORS.none; return;
  }
  const g = u.gesture, x = u.cursor.x * innerWidth, y = u.cursor.y * innerHeight, gain = u.gain || 1;
  const dx = hand.present ? x - hand.x : 0, dy = hand.present ? y - hand.y : 0, onset = g !== hand.prev;
  hand.present = true; hand.x = x; hand.y = y; hand.lastSeen = now; if (onset) hand.since = now;
  const held = now - hand.since, browsing = mode !== 'focus';
  let progress = 0;

  // Aim: hover a planet with the cursor (bigger target area for hands) · 瞄准行星
  if (browsing && (g === 'point' || g === 'open' || g === 'other')) {
    const id = pickAt(x, y, 54); setHover(id);
    if (id) { hand.hoverId = id; hand.hoverAt = now; }
    // Dwell to open: keep pointing at the same planet · 停留打开
    if (g === 'point' && id) {
      if (hand.dwellId !== id) { hand.dwellId = id; hand.dwellSince = now; }
      progress = Math.min(1, (now - hand.dwellSince) / dwellMs());
      if (progress >= 1 && hand.dwellDone !== id) { hand.dwellDone = id; select(id); }
    } else hand.dwellId = null;
  } else hand.dwellId = null;
  if (!hand.hoverId || hand.dwellId === null) { /* keep */ }
  if (browsing && hand.dwellDone && hand.hoverId !== hand.dwellDone) hand.dwellDone = null;

  if (g === 'point' && !browsing) { goal.yaw -= accel(dx, gain) / innerWidth * 4.4; goal.pitch = clamp(goal.pitch + accel(dy, gain) / innerHeight * 2.8, -1.35, 1.45); }
  if (g === 'pinch') {
    if (onset) {
      const recent = hand.hoverId && now - hand.hoverAt < 900;
      if (browsing && recent) { select(hand.hoverId); hand.dwellDone = hand.hoverId; hand.pinch = null; }
      else hand.pinch = { y, z: zooms[mode], m: mode };
    } else if (hand.pinch && hand.pinch.m === mode) zooms[mode] = clampZoom(hand.pinch.z * Math.exp((hand.pinch.y - y) / innerHeight * 3.4 * gain));
  } else hand.pinch = null;
  if (g === 'open') {
    if (!browsing) handSpread = clamp((u.openness - 1.35) * 1.25, 0, 1);
    else { goal.yaw -= accel(dx, gain) / innerWidth * 3.8; goal.pitch = mode === 'trajectory' ? goal.pitch + accel(dy,gain)/innerHeight*2.2 : clamp(goal.pitch + accel(dy, gain) / innerHeight * 2.2, mode === 'lineup' ? -0.4 : 0.02, 1.45); }
  }
  if (g === 'fist') {
    handSpread = 0;
    if (mode !== 'overview') { progress = Math.min(1, held / 1100); if (held > 1100 && !hand.fistDone) { hand.fistDone = true; home(); } }
  } else hand.fistDone = false;
  if (g === 'victory') { progress = Math.min(1, held / 500); if (held > 500 && !hand.vDone) { hand.vDone = true; chat.startVoice(); } } else hand.vDone = false;

  hand.prev = g;
  cursorEl.classList.remove('hidden'); cursorEl.dataset.g = g;
  cursorEl.style.transform = `translate(${x}px,${y}px)`; cursorEl.style.setProperty('--c', GESTURE_COLORS[g]);
  cursorEl.style.setProperty('--p', progress);
  const h = (HINTS[g] || HINTS.other)[browsing ? 'browse' : 'focus']; pill.innerHTML = bi(...h); pill.style.color = GESTURE_COLORS[g];
}
const tracker = new HandTracker({ video: $('#video'), overlay: $('#handOverlay'), onUpdate: onHand, fpsEl: $('#handFps') });
// Hand sensitivity slider (remembered on this device) · 手势灵敏度
function setSensitivity(v) { sensitivity = clamp(Math.round(+v) || 3, 1, 5); tracker.setSensitivity(sensitivity); $('#sensitivity').value = sensitivity; $('#sensVal').textContent = sensitivity; try { localStorage.setItem('orbit-sens', sensitivity); } catch {} }
$('#sensitivity').oninput = e => setSensitivity(e.target.value);
try { setSensitivity(localStorage.getItem('orbit-sens') || 3); } catch { setSensitivity(3); }
let camStarting = false;
$('#cam').onclick = async () => {
  if (tracker.active) { tracker.stop(); document.body.classList.remove('cam-on'); $('#camera').classList.add('hidden'); $('#cam').innerHTML = bi('Enable Gestures', '启用手势'); return; }
  if (camStarting) return; camStarting = true; $('#cam').disabled = true; $('#cam').innerHTML = bi('Loading…', '加载中…');
  try {
    $('#camera').classList.remove('hidden'); document.body.classList.add('cam-on'); pill.innerHTML = bi('Starting camera…', '正在启动摄像头…');
    await tracker.start();
    $('#cam').innerHTML = bi('Disable Gestures', '关闭手势');
    notice('Gestures on: point ☝ at a planet and hold, or pinch 🤏, to open it. ✌ to talk.', '手势已开启：用 ☝ 指向行星并停留，或 🤏 捏合打开，✌ 开始对话。', 'Gestos activados: apunta ☝ a un planeta y espera, o pellizca 🤏, para abrirlo. ✌ para hablar.', 6500);
  } catch (e) {
    tracker.stop(); document.body.classList.remove('cam-on'); $('#camera').classList.add('hidden'); $('#cam').innerHTML = bi('Enable Gestures', '启用手势');
    if (e.name === 'NotAllowedError') notice('Camera permission denied. Mouse and voice still work.', '摄像头权限未开启，仍可使用鼠标和语音。', 'Permiso de cámara denegado. El ratón y la voz siguen funcionando.');
    else if (e.name === 'InsecureContext') notice('Open the page over https or http://localhost to use the camera.', '请通过 https 或 http://localhost 打开页面以使用摄像头。', 'Abre la página con https o http://localhost para usar la cámara.');
    else notice('Could not start hand tracking. Check the camera and the internet connection.', '手势追踪启动失败，请检查摄像头和网络连接。', 'No se pudo iniciar el seguimiento de la mano. Revisa la cámara y la conexión.');
  } finally { camStarting = false; $('#cam').disabled = false; }
};
addEventListener('pagehide', () => tracker.stop());

/* ───────── Ask Stellar (AI + voice) · AI 向导 ───────── */
const chat = initChat({ bi, getContext: () => mode === 'focus' ? focus.p.id : 'solar', actions: { select, home, lineup, pause: () => setPaused(true), resume: () => setPaused(false) } });
$('#talk').onclick = () => chat.startVoice();

/* ───────── Language · 语言 · Idioma ───────── */
// All text is rendered in all three languages; switching only changes which one shows.
$('#language').onchange = e => setLanguage(e.target.value);
onLanguage(l => chat.setVoiceLang(voiceCode(l)));
setLanguage(initialLanguage());

/* ───────── Background texture upgrades · 后台生成高清纹理 ───────── */
const order = ['earth', 'saturn', 'jupiter', 'mars', 'venus', 'neptune', 'uranus', 'mercury'];
function pump() { const b = order.map(id => bodyById[id]).find(b => !b.hiRes); if (!b) return; upgradeTexture(b); setTimeout(pump, 250); }

/* ───────── Real surface maps (team's realistic imagery) · 真实贴图 ───────── */
let maps = {};
loadMaps().then(m => {
  maps = m;
  for (const b of planets) if (applyMaps(b, m)) refreshParticles(b);
  if (focus && !focus.isSun) renderInfo(focus);
}).catch(e => console.warn('Surface maps unavailable, using procedural textures', e))
  .finally(() => setTimeout(pump, 400));   // procedural detail only for planets without a map

/* ───────── Animation loop · 动画循环 ───────── */
const tv = new T.Vector3(), orbitPos = new T.Vector3(), linePos = new T.Vector3();
let lastNear = 0, viewShift = 0, focusFade = 0;
function animate(now) {
  requestAnimationFrame(animate);
  const dt = Math.min((now - last) / 1000, 0.05); last = now;
  const k = 1 - Math.exp(-dt * 4.5);
  sun.surface.material.uniforms.time.value = now / 1000;
  orbitSpeed += ((paused ? 0 : mode === 'focus' ? 0.12 : mode === 'lineup' ? 0 : 1) - orbitSpeed) * k;
  lineBlend += ((mode === 'lineup' ? 1 : 0) - lineBlend) * (1 - Math.exp(-dt * 2.2));

  focusFade += ((mode === 'focus' ? 1 : 0) - focusFade) * k;
  for (const b of planets) {
    b.angle += dt * orbitSpeed * (Math.PI * 2 / 60) * (365.25 / b.p.periodDays);   // Earth: one orbit per minute
    orbitPos.set(Math.cos(b.angle) * b.orbit, 0, Math.sin(b.angle) * b.orbit); linePos.set(lineX[b.p.id], 0, 0);
    b.anchor.position.lerpVectors(orbitPos, linePos, ease(lineBlend));
    b.line.visible = mode !== 'trajectory' && lineBlend < 0.98 && focusFade < 0.97; b.line.material.opacity = (hoverId === b.p.id ? 0.75 : 0.3) * (1 - lineBlend) * (1 - focusFade);
    if (b.spinOn) b.spin.rotation.y += dt * (Math.PI * 2 / 20) * (23.93 / b.p.rotationHours);     // Earth: one spin per 20 s
    if (b.clouds) b.clouds.rotation.y += dt * 0.012;
  }
  sun.spin.rotation.y += dt * 0.02;
  belt.rotation.y += dt * orbitSpeed * 0.02; belt.material.opacity = 0.5 * (1 - lineBlend) * (1 - focusFade * 0.7);

  // Particle spread for the focused planet · 当前行星的粒子扩散
  const target = mode === 'focus' && !focus.isSun ? Math.max(sliderSpread, hand.present ? handSpread : 0) : 0;
  expansion += (target - expansion) * (1 - Math.exp(-dt * 5));
  if (focus && !focus.isSun) {
    const m = focus.surface.material, op = 1 - expansion * 0.85;
    if ((op < 0.999) !== m.transparent) { m.transparent = op < 0.999; m.needsUpdate = true; }
    m.opacity = op; if (focus.clouds) focus.clouds.material.opacity = op;
    for (const pts of [focus.particles, focus.ringParticles]) {
      if (!pts) continue;
      const arr = pts.geometry.attributes.position.array, base = pts.userData.base, seed = pts.userData.seed;
      for (let i = 0, j = 0; i < arr.length; i += 3, j++) { const s = 1 + expansion * (0.25 + 0.65 * seed[j]); arr[i] = base[i] * s; arr[i + 1] = base[i + 1] * s; arr[i + 2] = base[i + 2] * s; }
      pts.geometry.attributes.position.needsUpdate = true;
      pts.material.size = (pts === focus.particles ? 0.011 : 0.01) * focus.r * (1 + expansion * 1.2);
      pts.material.opacity = Math.min(1, focus.glow + expansion * 0.6) * (pts === focus.ringParticles ? 1.6 : 1);
    }
  }
  bodies.forEach(b => { if (b !== focus && b.surface.material.transparent && !b.isSun) { b.surface.material.opacity = 1; b.surface.material.transparent = false; b.surface.material.needsUpdate = true; } });

  // Camera rig · 相机
  trans = Math.min(1, trans + dt / 1.7);
  goalTarget(tv); const gl = Math.log(goalDist());
  if (trans < 1) { const e = ease(trans); rig.target.lerpVectors(from.target, tv, e); rig.logDist = from.logDist + (gl - from.logDist) * e; }
  else { rig.target.copy(tv); rig.logDist += (gl - rig.logDist) * k; }
  rig.yaw += (goal.yaw - rig.yaw) * k; rig.pitch += (goal.pitch - rig.pitch) * k;
  const d = Math.exp(rig.logDist), cp = Math.cos(rig.pitch);
  camera.position.set(rig.target.x + d * cp * Math.sin(rig.yaw), rig.target.y + d * Math.sin(rig.pitch), rig.target.z + d * cp * Math.cos(rig.yaw));
  if(mode==='trajectory') camera.up.set(-Math.sin(rig.yaw)*Math.sin(rig.pitch),Math.cos(rig.pitch),-Math.cos(rig.yaw)*Math.sin(rig.pitch)); else camera.up.set(0,1,0);
  camera.lookAt(rig.target);
  // Keep the focused planet clear of the info panel on wide screens · 让行星避开右侧信息面板
  viewShift += ((mode === 'focus' && innerWidth > 1100 ? 190 : 0) - viewShift) * k;
  if (Math.abs(viewShift) > 0.5) camera.setViewOffset(innerWidth, innerHeight, viewShift, 0, innerWidth, innerHeight); else if (camera.view?.enabled) camera.clearViewOffset();
  const near = clamp(d * 0.008, 0.002, 4);
  if (Math.abs(near - lastNear) / near > 0.05) { camera.near = near; camera.far = Math.max(8000, d * 40); camera.updateProjectionMatrix(); lastNear = near; }

  // Screen labels · 屏幕标签
  const showTags = mode !== 'trajectory' && (mode !== 'focus' || trans < 0.25);
  for (const b of bodies) {
    if (!showTags) { b.tag.style.display = 'none'; continue; }
    const s = screenOf(b), size = Math.max(14, Math.min(s.r * 2 + 10, 400));
    const visible = s.front && s.x > -50 && s.x < innerWidth + 50 && s.y > -50 && s.y < innerHeight + 50;
    b.tag.style.display = visible ? 'block' : 'none'; if (!visible) continue;
    b.tag.style.transform = `translate(${s.x}px,${s.y}px)`;
    b.tag.style.setProperty('--size', size + 'px');
    b.tag.style.setProperty('--off', (b.isSun ? -(s.r + 40) : Math.max(size / 2, s.r) + 6) + 'px');
    b.tag.classList.toggle('big', s.r > 26);
  }
  // Highlights and their labels · 亮点与标签
  for (const b of bodies) if (b.hl) b.hl.update(dt, now / 1000);
  for (const b of bodies) if (b.hl) for (const it of b.hl.items) {
    const on = b === focus && mode === 'focus' && trans > 0.6;
    if (!on) { it.el.style.display = 'none'; continue; }
    it.obj.getWorldPosition(hv); const behind = hv.distanceTo(camera.position) > b.anchor.position.distanceTo(camera.position) + b.r * 0.2 && rayHitsBody(b);
    hv.project(camera);
    const show = hv.z < 1 && !behind && Math.abs(hv.x) < 1.05 && Math.abs(hv.y) < 1.05;
    it.el.style.display = show ? 'block' : 'none';
    if (show) it.el.style.transform = `translate(${(hv.x + 1) / 2 * innerWidth}px,${(1 - hv.y) / 2 * innerHeight}px)`;
  }
  updateFlight(dt);
  renderer.render(scene, camera);
}
const hv = new T.Vector3(), hd = new T.Vector3(), hc = new T.Vector3();
// Is the label's object hidden behind the planet? · 是否被行星挡住
function rayHitsBody(b) {
  hd.copy(hv).sub(camera.position).normalize(); hc.copy(b.anchor.position).sub(camera.position);
  const t = hc.dot(hd); return hc.lengthSq() - t * t < b.r * b.r;
}
requestAnimationFrame(animate);
addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); });

setIntro('overview'); document.body.classList.add('mode-overview');
initHabitability();
// Public hooks for teammates and the console · 供组员调用的接口
// simulateHand({present:true, gesture:'point', cursor:{x:.5,y:.5}, openness:1}) lets you test gestures without a camera.
window.SolarAtlas = { trajectory, PLANETS, selectPlanet: select, home, lineup, bodies: bodyById, scene, camera, simulateHand: onHand, screenOf: id => screenOf(bodyById[id]) };
