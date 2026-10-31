// ─────────────────────────────────────────────────────────────────────────────
// Highlights: what makes each world stand out · 亮点 · Destacados
//   • moons (true size relative to their planet; tiny ones drawn a little larger)
//   • a living feature (prominences, auroras, city lights, dust storms, plumes…)
//   • a spacecraft moment (Parker, MESSENGER, Magellan, ISS, Perseverance, Juno,
//     Cassini, Voyager 2) on a simplified path
// Shown in close-up only. Orbit distances and spacecraft sizes are not to scale.
// To add a moon or a spacecraft, add a line to HIGHLIGHTS below.
// ─────────────────────────────────────────────────────────────────────────────
import * as T from 'three';
import { makeNoise } from './noise.js';

const DEG = Math.PI / 180, N = makeNoise(314);

// [en, zh, es] for every text. Moon: name, radius km, orbit (planet radii, compressed), seconds per orbit, look, fact
export const HIGHLIGHTS = {
  sun: {
    feature: ['Solar prominences: loops of glowing plasma held up by magnetic fields, often larger than Earth. The solar wind streams out in every direction.', '日珥：被磁场托起的发光等离子体环，常常比地球还大。太阳风向四面八方吹出。', 'Protuberancias solares: bucles de plasma brillante sostenidos por campos magnéticos, a menudo más grandes que la Tierra. El viento solar sale en todas direcciones.'],
    moons: [],
    craft: { kind: 'parker', name: ['Parker Solar Probe', '帕克太阳探测器', 'Sonda solar Parker'], text: ['On 24 December 2024 it passed about 6.1 million km from the Sun’s surface, closer than any spacecraft before.', '2024 年 12 月 24 日，它从距太阳表面约 610 万千米处掠过，比以往任何航天器都近。', 'El 24 de diciembre de 2024 pasó a unos 6,1 millones de km de la superficie del Sol, más cerca que ninguna nave antes.'] },
  },
  mercury: {
    feature: ['A tail of sodium atoms, pushed away by sunlight, stretches millions of kilometres behind Mercury.', '水星身后拖着一条由钠原子组成的尾巴，被阳光推开，长达数百万千米。', 'Una cola de átomos de sodio, empujada por la luz del Sol, se extiende millones de kilómetros detrás de Mercurio.'],
    moons: [],
    craft: { kind: 'messenger', name: ['MESSENGER', '信使号', 'MESSENGER'], text: ['Orbited Mercury from 2011 to 2015 and found water ice in craters that never see sunlight.', '2011 至 2015 年环绕水星运行，在永远见不到阳光的陨石坑里发现了水冰。', 'Orbitó Mercurio de 2011 a 2015 y encontró hielo de agua en cráteres que nunca ven el Sol.'] },
  },
  venus: {
    feature: ['Super-rotation: the cloud tops race around Venus in about 4 days, while the planet itself takes 243 days to turn.', '超级自转：金星云顶约 4 天绕行一圈，而行星本身转一圈要 243 天。', 'Superrotación: las nubes altas dan la vuelta a Venus en unos 4 días, mientras el planeta tarda 243 días en girar.'],
    moons: [],
    craft: { kind: 'magellan', name: ['Magellan', '麦哲伦号', 'Magallanes'], text: ['Mapped 98% of Venus’s surface with radar through the clouds, from 1990 to 1994.', '1990 至 1994 年用雷达穿透云层，测绘了金星 98% 的表面。', 'Cartografió el 98 % de la superficie de Venus con radar a través de las nubes, de 1990 a 1994.'] },
  },
  earth: {
    feature: ['City lights glow on the night side, and auroras ripple around both poles when the solar wind hits our magnetic field.', '夜半球亮起城市灯光；太阳风撞击地球磁场时，两极出现飘动的极光。', 'Las luces de las ciudades brillan en el lado nocturno, y las auroras ondean en ambos polos cuando el viento solar choca con nuestro campo magnético.'],
    moons: [['Moon', '月球', 'Luna', 1737.4, 2.7, 22, 'moon', 'About a quarter of Earth’s width; it always shows us the same face.', '宽度约为地球的四分之一，始终以同一面朝向我们。', 'Mide cerca de un cuarto del ancho de la Tierra y siempre nos muestra la misma cara.']],
    craft: { kind: 'iss', name: ['International Space Station', '国际空间站', 'Estación Espacial Internacional'], text: ['Circles Earth about every 90 minutes, roughly 400 km up, with astronauts on board.', '在约 400 千米高处载着航天员绕地球飞行，大约每 90 分钟一圈。', 'Da la vuelta a la Tierra cada unos 90 minutos, a unos 400 km de altura, con astronautas a bordo.'] },
  },
  mars: {
    feature: ['Dust storms: some grow to cover the whole planet, as in 2018.', '沙尘暴：有些会扩散到覆盖整颗行星，例如 2018 年那一次。', 'Tormentas de polvo: algunas llegan a cubrir todo el planeta, como en 2018.'],
    moons: [
      ['Phobos', '火卫一', 'Fobos', 11.3, 1.7, 7, 'phobos', 'Slowly spiralling inwards; it may break into a ring in tens of millions of years.', '正缓慢向内盘旋，几千万年后可能碎裂成环。', 'Se acerca poco a poco en espiral; podría romperse en un anillo dentro de decenas de millones de años.'],
      ['Deimos', '火卫二', 'Deimos', 6.2, 2.5, 14, 'phobos', 'Only about 12 km across: you could walk around it in a few days.', '直径只有约 12 千米，几天就能绕它走一圈。', 'Mide solo unos 12 km: podrías rodearlo a pie en pocos días.'],
    ],
    craft: { kind: 'rover', name: ['Perseverance rover', '毅力号火星车', 'Rover Perseverance'], text: ['Landed in Jezero Crater in February 2021 to search an ancient lake bed for signs of past life.', '2021 年 2 月降落在耶泽罗陨石坑，在古老湖床中寻找过去生命的迹象。', 'Aterrizó en el cráter Jezero en febrero de 2021 para buscar señales de vida pasada en un antiguo lecho de lago.'] },
  },
  jupiter: {
    feature: ['Auroras larger than Earth glow at both poles, fed partly by volcanic gas from Io, which spreads into a glowing ring around Jupiter.', '两极闪耀着比地球还大的极光，部分能量来自木卫一的火山气体，这些气体在木星周围形成发光的环。', 'Auroras más grandes que la Tierra brillan en ambos polos, alimentadas en parte por el gas volcánico de Ío, que forma un anillo brillante alrededor de Júpiter.'],
    moons: [
      ['Io', '木卫一', 'Ío', 1821.6, 1.75, 6, 'io', 'The most volcanic world in the Solar System.', '太阳系中火山活动最剧烈的天体。', 'El mundo más volcánico del sistema solar.'],
      ['Europa', '木卫二', 'Europa', 1560.8, 2.2, 10, 'europa', 'Hides a salty ocean under its icy crust.', '冰壳下隐藏着一片咸水海洋。', 'Esconde un océano salado bajo su corteza de hielo.'],
      ['Ganymede', '木卫三', 'Ganimedes', 2634.1, 2.7, 16, 'ganymede', 'The largest moon in the Solar System, bigger than Mercury.', '太阳系最大的卫星，比水星还大。', 'La luna más grande del sistema solar, mayor que Mercurio.'],
      ['Callisto', '木卫四', 'Calisto', 2410.3, 3.2, 26, 'callisto', 'One of the most heavily cratered surfaces known.', '已知陨石坑最密集的表面之一。', 'Una de las superficies con más cráteres que se conocen.'],
    ],
    craft: { kind: 'juno', name: ['Juno', '朱诺号', 'Juno'], text: ['Arrived in 2016 and swoops low over Jupiter’s poles on long, looping orbits.', '2016 年抵达，沿着长长的环形轨道低空掠过木星两极。', 'Llegó en 2016 y pasa muy cerca de los polos de Júpiter en órbitas largas y alargadas.'] },
  },
  saturn: {
    feature: ['The hexagon: a six-sided jet stream at the north pole, wider than two Earths. On the moon Enceladus, geysers spray ice into space.', '六边形风暴：北极一股六边形的急流，宽度超过两个地球。卫星恩克拉多斯上的间歇泉把冰喷向太空。', 'El hexágono: una corriente en chorro de seis lados en el polo norte, más ancha que dos Tierras. En la luna Encélado, géiseres lanzan hielo al espacio.'],
    moons: [
      ['Enceladus', '土卫二', 'Encélado', 252.1, 2.65, 8, 'enceladus', 'Shoots jets of water ice from cracks at its south pole.', '从南极的裂缝中喷出水冰。', 'Lanza chorros de hielo de agua desde grietas en su polo sur.'],
      ['Rhea', '土卫五', 'Rea', 763.8, 3.0, 13, 'grey', 'Saturn’s second-largest moon, an icy ball covered in craters.', '土星第二大卫星，布满陨石坑的冰球。', 'La segunda luna más grande de Saturno, una bola de hielo llena de cráteres.'],
      ['Titan', '土卫六', 'Titán', 2574.7, 3.6, 22, 'titan', 'Has a thick hazy atmosphere and lakes of liquid methane.', '拥有浓厚的雾状大气和液态甲烷湖。', 'Tiene una atmósfera densa y brumosa y lagos de metano líquido.'],
    ],
    craft: { kind: 'cassini', name: ['Cassini', '卡西尼号', 'Cassini'], text: ['Studied Saturn for 13 years. In 2017 it made 22 dives between the planet and its rings, then plunged into Saturn.', '研究土星 13 年。2017 年它在行星与光环之间穿行 22 次，最后坠入土星。', 'Estudió Saturno durante 13 años. En 2017 pasó 22 veces entre el planeta y sus anillos y luego se lanzó a Saturno.'] },
  },
  uranus: {
    feature: ['Its magnetic field is tilted about 59° from its spin axis, so its auroras glow far from the poles.', '它的磁场与自转轴相差约 59°，因此极光出现在远离两极的地方。', 'Su campo magnético está inclinado unos 59° respecto a su eje de giro, así que sus auroras brillan lejos de los polos.'],
    moons: [
      ['Miranda', '天卫五', 'Miranda', 235.8, 2.35, 7, 'grey', 'Has cliffs about 20 km high, among the tallest known.', '拥有约 20 千米高的悬崖，是已知最高的悬崖之一。', 'Tiene acantilados de unos 20 km de altura, de los más altos que se conocen.'],
      ['Titania', '天卫三', 'Titania', 788.9, 2.85, 14, 'grey', 'Uranus’s largest moon, crossed by huge canyons.', '天王星最大的卫星，布满巨大的峡谷。', 'La luna más grande de Urano, cruzada por enormes cañones.'],
      ['Oberon', '天卫四', 'Oberón', 761.4, 3.3, 20, 'callisto', 'The outermost of Uranus’s large moons, old and cratered.', '天王星大卫星中最外侧的一颗，古老且多陨石坑。', 'La más exterior de las grandes lunas de Urano, antigua y llena de cráteres.'],
    ],
    craft: { kind: 'voyager', name: ['Voyager 2', '旅行者 2 号', 'Voyager 2'], text: ['The only spacecraft to visit Uranus, flying past in January 1986.', '唯一造访过天王星的航天器，于 1986 年 1 月飞掠。', 'La única nave que ha visitado Urano; pasó junto a él en enero de 1986.'] },
  },
  neptune: {
    feature: ['The fastest winds in the Solar System: clouds race around at up to about 2,000 km/h. On its moon Triton, geysers of nitrogen gas erupt.', '太阳系最快的风：云层以最高约每小时 2,000 千米的速度飞驰。卫星海卫一上有氮气间歇泉喷发。', 'Los vientos más rápidos del sistema solar: las nubes corren a unos 2.000 km/h. En su luna Tritón hay géiseres de nitrógeno.'],
    moons: [['Triton', '海卫一', 'Tritón', 1353.4, 2.7, 16, 'triton', 'Orbits backwards and is probably a captured object from the Kuiper Belt.', '逆向公转，很可能是被捕获的柯伊伯带天体。', 'Gira al revés y probablemente es un objeto capturado del cinturón de Kuiper.', true]],
    craft: { kind: 'voyager', name: ['Voyager 2', '旅行者 2 号', 'Voyager 2'], text: ['The only spacecraft to visit Neptune, flying past in August 1989.', '唯一造访过海王星的航天器，于 1989 年 8 月飞掠。', 'La única nave que ha visitado Neptuno; pasó junto a él en agosto de 1989.'] },
  },
};

// Plain-English summary for the AI guide.
export function highlightsText(id) {
  const h = HIGHLIGHTS[id]; if (!h) return '';
  return ['Highlights shown in the app:', h.feature[0], ...h.moons.map(m => `Moon ${m[0]}: ${m[7]}`), `Spacecraft ${h.craft.name[0]}: ${h.craft.text[0]}`].join('\n');
}

/* ───────── Small helpers ───────── */
const sphere = new T.SphereGeometry(1, 40, 24);
const tex = c => { const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; return t; };
const hex = h => new T.Color(h);

// Moon surfaces, painted from noise · 卫星表面
const LOOKS = {
  moon: ['#8f8b86', '#c9c5bd', 'maria'], phobos: ['#4f463e', '#7a6d60', 'craters'], io: ['#d8b84a', '#f0e08a', 'io'],
  europa: ['#cdbfa8', '#efe8da', 'lines'], ganymede: ['#776a5d', '#bdb2a3', 'patches'], callisto: ['#4c443c', '#80766a', 'speckle'],
  titan: ['#c9883e', '#e6ad62', 'haze'], enceladus: ['#e6ecf0', '#ffffff', 'smooth'], grey: ['#86817b', '#c0bbb4', 'craters'], triton: ['#c9b1a6', '#efe2da', 'cap'],
};
function moonTexture(look) {
  const [a, b, kind] = LOOKS[look] || LOOKS.grey, A = hex(a), B = hex(b);
  const w = 256, h = 128, c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d'), img = g.createImageData(w, h), col = new T.Color();
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const lat = (0.5 - (y + 0.5) / h) * Math.PI, lon = (x + 0.5) / w * Math.PI * 2, cl = Math.cos(lat);
    const px = -Math.cos(lon) * cl, py = Math.sin(lat), pz = Math.sin(lon) * cl;
    let v = N.fbm(px * 3 + 7, py * 3, pz * 3, 5);
    if (kind === 'maria') v = v > 0.53 ? 0.15 + v * 0.3 : 0.55 + v * 0.5;
    if (kind === 'lines') v = 0.7 + 0.3 * v - 0.5 * Math.max(0, 1 - Math.abs(Math.sin(N.fbm(px * 2, py * 2, pz * 2, 3) * 40)) * 8);
    if (kind === 'speckle') v = v * 0.7 + (N.noise(px * 60, py * 60, pz * 60) > 0.85 ? 0.6 : 0);
    if (kind === 'haze') v = 0.6 + 0.4 * (0.5 + 0.5 * Math.sin(lat * 6)) * 0.4 + v * 0.2;
    if (kind === 'smooth') v = 0.85 + v * 0.15;
    if (kind === 'cap') v = lat < -0.4 ? 0.95 : 0.4 + v * 0.5;
    col.copy(A).lerp(B, Math.max(0, Math.min(1, v)));
    if (kind === 'io') { const s = N.noise(px * 9 + 3, py * 9, pz * 9); if (s > 0.8) col.set('#3a2a1a'); else if (s > 0.68) col.set('#c2552b'); }
    const i = (y * w + x) * 4; img.data[i] = col.r * 255; img.data[i + 1] = col.g * 255; img.data[i + 2] = col.b * 255; img.data[i + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  if (kind === 'craters' || kind === 'speckle' || kind === 'maria') for (let k = 0; k < 60; k++) { const x = Math.random() * w, y = 10 + Math.random() * (h - 20), r = 1 + Math.random() ** 2 * 7; g.fillStyle = 'rgba(0,0,0,0.18)'; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.strokeStyle = 'rgba(255,255,255,0.15)'; g.stroke(); }
  return tex(c);
}

// Generic particle cloud with per-frame CPU update · 粒子
function cloud(n, color, size, opacity) {
  const pos = new Float32Array(n * 3), col = new Float32Array(n * 3), c = hex(color);
  for (let i = 0; i < n; i++) col.set([c.r, c.g, c.b], i * 3);
  const geo = new T.BufferGeometry(); geo.setAttribute('position', new T.BufferAttribute(pos, 3).setUsage(T.DynamicDrawUsage)); geo.setAttribute('color', new T.BufferAttribute(col, 3).setUsage(T.DynamicDrawUsage));
  const p = new T.Points(geo, new T.PointsMaterial({ size, map: GLOW(), vertexColors: true, transparent: true, opacity, blending: T.AdditiveBlending, depthWrite: false }));
  p.frustumCulled = false; p.userData = { pos, col, base: c, n }; return p;
}

// Aurora: a glowing, rippling curtain around a magnetic pole · 极光
function aurora(r, colatDeg, height, c1, c2, strength = 1) {
  const ro = r * Math.sin(colatDeg * DEG), y0 = r * Math.cos(colatDeg * DEG);
  const geo = new T.CylinderGeometry(ro * 1.12, ro, height, 96, 1, true);
  const mat = new T.ShaderMaterial({
    uniforms: { time: { value: 0 }, c1: { value: hex(c1) }, c2: { value: hex(c2) }, H: { value: height }, strength: { value: strength } },
    vertexShader: 'uniform float H;varying float vH;varying vec3 vP;void main(){vH=position.y/H+.5;vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader: 'uniform float time;uniform vec3 c1;uniform vec3 c2;uniform float strength;varying float vH;varying vec3 vP;void main(){float a=atan(vP.z,vP.x);float w=.55+.45*sin(a*7.+time*1.3+sin(a*3.-time*.7)*2.);w*=.7+.3*sin(a*23.-time*2.1);float f=pow(1.-vH,1.5)*smoothstep(0.,.12,vH);gl_FragColor=vec4(mix(c1,c2,vH),f*w*strength);}',
    transparent: true, depthWrite: false, blending: T.AdditiveBlending, side: T.DoubleSide,
  });
  const north = new T.Mesh(geo, mat); north.position.y = y0 + height / 2 - height * 0.15;
  const south = new T.Mesh(geo, mat); south.rotation.x = Math.PI; south.position.y = -(y0 + height / 2 - height * 0.15);
  const g = new T.Group(); g.add(north, south); g.userData.mat = mat; return g;
}

// City lights painted where the Earth map shows land · 城市灯光
function cityLights(texCanvas) {
  const w = 1024, h = 512, c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d'); g.drawImage(texCanvas, 0, 0, w, h);
  const src = g.getImageData(0, 0, w, h).data, out = g.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    const lat = (0.5 - (y + 0.5) / h) * 180; if (Math.abs(lat) > 64) continue;
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4, r = src[i], gg = src[i + 1], b = src[i + 2], bright = (r + gg + b) / 765;
      if (!((r + gg) / 2 > b * 1.08 && bright < 0.75 && bright > 0.08)) continue;
      const lon = x / w * Math.PI * 2, la = lat * DEG, cl = Math.cos(la);
      const dens = N.fbm(-Math.cos(lon) * cl * 6, Math.sin(la) * 6, Math.sin(lon) * cl * 6, 4);
      if (dens < 0.5 || Math.random() > (dens - 0.45) * 1.6) continue;
      const k = Math.min(1, (dens - 0.45) * 3) * (0.5 + Math.random() * 0.5);
      out.data[i] = 255 * k; out.data[i + 1] = 196 * k; out.data[i + 2] = 120 * k; out.data[i + 3] = 255;
    }
  }
  g.putImageData(out, 0, 0); g.filter = 'blur(0.6px)'; g.drawImage(c, 0, 0);
  const t = tex(c);
  const mat = new T.ShaderMaterial({
    uniforms: { map: { value: t }, sunPos: { value: new T.Vector3() } },
    vertexShader: 'varying vec2 vUv;varying vec3 vN;varying vec3 vW;void main(){vUv=uv;vec4 w=modelMatrix*vec4(position,1.);vW=w.xyz;vN=normalize(mat3(modelMatrix)*normal);gl_Position=projectionMatrix*viewMatrix*w;}',
    fragmentShader: 'uniform sampler2D map;uniform vec3 sunPos;varying vec2 vUv;varying vec3 vN;varying vec3 vW;void main(){float night=1.-smoothstep(-.12,.15,dot(normalize(vN),normalize(sunPos-vW)));vec3 c=texture2D(map,vUv).rgb;gl_FragColor=vec4(c*night*1.6,1.);}',
    transparent: true, depthWrite: false, blending: T.AdditiveBlending,
  });
  return new T.Mesh(sphere, mat);
}

/* ───────── Spacecraft models (simple, not to scale) · 航天器模型 ───────── */
const GOLD = new T.MeshStandardMaterial({ color: '#d4a94a', metalness: 0.7, roughness: 0.35 });
const PANEL = new T.MeshStandardMaterial({ color: '#1f3d78', metalness: 0.4, roughness: 0.4, emissive: '#0a1a3a' });
const WHITE = new T.MeshStandardMaterial({ color: '#e8e8e8', metalness: 0.2, roughness: 0.6 });
const DARK = new T.MeshStandardMaterial({ color: '#555', metalness: 0.5, roughness: 0.5 });
let glowTex = null;
const GLOW = () => glowTex || (glowTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, '#fff'); gr.addColorStop(0.25, 'rgba(255,255,255,.35)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return new T.CanvasTexture(c); })());
const box = (w, h, d, m) => new T.Mesh(new T.BoxGeometry(w, h, d), m);
function craftModel(kind) {
  const g = new T.Group();
  if (kind === 'iss') {
    g.add(box(2.4, 0.08, 0.08, WHITE));
    for (const x of [-1.05, -0.75, 0.75, 1.05]) for (const z of [-0.45, 0.45]) { const p = box(0.24, 0.02, 0.7, PANEL); p.position.set(x, 0, z); g.add(p); }
    const m = box(0.18, 0.18, 0.7, WHITE); g.add(m);
  } else if (kind === 'rover') {
    const b = box(0.6, 0.22, 0.4, WHITE); b.position.y = 0.25; g.add(b);
    for (const x of [-0.25, 0, 0.25]) for (const z of [-0.24, 0.24]) { const w = new T.Mesh(new T.CylinderGeometry(0.08, 0.08, 0.06, 12), DARK); w.rotation.x = Math.PI / 2; w.position.set(x, 0.08, z); g.add(w); }
    const mast = box(0.04, 0.4, 0.04, WHITE); mast.position.set(0.22, 0.55, 0.1); g.add(mast);
    const head = box(0.14, 0.08, 0.1, WHITE); head.position.set(0.22, 0.78, 0.1); g.add(head);
  } else if (kind === 'parker') {
    const shield = new T.Mesh(new T.CylinderGeometry(0.55, 0.55, 0.06, 32), WHITE); shield.rotation.z = Math.PI / 2; shield.position.x = -0.35; g.add(shield);
    g.add(box(0.5, 0.3, 0.3, GOLD));
    for (const s of [-1, 1]) { const p = box(0.3, 0.02, 0.22, PANEL); p.position.set(0.05, 0, s * 0.35); g.add(p); }
  } else if (kind === 'voyager') {
    const dish = new T.Mesh(new T.CylinderGeometry(0.5, 0.15, 0.12, 24), WHITE); g.add(dish);
    const bus = box(0.35, 0.18, 0.35, GOLD); bus.position.y = -0.15; g.add(bus);
    const boom = box(1.6, 0.03, 0.03, DARK); boom.position.set(0.6, -0.15, 0); g.add(boom);
    const rtg = box(0.03, 0.03, 0.9, DARK); rtg.position.set(-0.1, -0.2, 0.55); g.add(rtg);
  } else { // orbiters: Messenger, Magellan, Juno, Cassini
    const bus = box(0.4, 0.4, 0.4, GOLD); g.add(bus);
    if (kind === 'cassini') { const b = new T.Mesh(new T.CylinderGeometry(0.22, 0.22, 0.9, 16), GOLD); g.add(b); const d = new T.Mesh(new T.CylinderGeometry(0.45, 0.1, 0.1, 24), WHITE); d.position.y = 0.5; g.add(d); }
    else { const d = new T.Mesh(new T.CylinderGeometry(0.32, 0.08, 0.08, 24), WHITE); d.position.y = 0.26; g.add(d); }
    const span = kind === 'juno' ? 1.6 : kind === 'magellan' ? 0.9 : 0.7;
    if (kind !== 'cassini') for (const s of [-1, 1]) { const p = box(span, 0.02, 0.36, PANEL); p.position.x = s * (0.2 + span / 2); g.add(p); }
    if (kind === 'juno') { const p = box(0.36, 0.02, span, PANEL); p.position.z = 0.2 + span / 2; g.add(p); }
  }
  const glow = new T.Sprite(new T.SpriteMaterial({ map: GLOW(), color: '#cfe8ff', transparent: true, opacity: 0.5, blending: T.AdditiveBlending, depthWrite: false })); glow.scale.setScalar(2.2); g.add(glow);
  return g;
}

// Keplerian ellipse position (planet at a focus) · 椭圆轨道
function ellipse(out, t, peri, apo, incl, node) {
  const a = (peri + apo) / 2, e = (apo - peri) / (apo + peri), M = t * Math.PI * 2;
  let E = M; for (let k = 0; k < 6; k++) E = M + e * Math.sin(E);
  const nu = 2 * Math.atan(Math.sqrt((1 + e) / (1 - e)) * Math.tan(E / 2)), rr = a * (1 - e * e) / (1 + e * Math.cos(nu));
  out.set(Math.cos(nu) * rr, 0, Math.sin(nu) * rr);
  out.applyAxisAngle(new T.Vector3(1, 0, 0), incl).applyAxisAngle(new T.Vector3(0, 1, 0), node);
  return out;
}
function pathLine(fn, n = 240, color = '#9fd8ff', opacity = 0.22) {
  const pts = [], v = new T.Vector3(); for (let i = 0; i <= n; i++) pts.push(fn(v, i / n).clone());
  return new T.Line(new T.BufferGeometry().setFromPoints(pts), new T.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false }));
}

/* ───────── Build the highlights for one body · 构建 ───────── */
// body: { p, r, anchor, tilt, spin, isSun, texCanvas } from bodies.js
export function buildHighlights(body) {
  const id = body.p.id, H = HIGHLIGHTS[id], r = body.r, items = [], updaters = [];
  const root = new T.Group(), tiltRoot = new T.Group(), spinRoot = new T.Group();
  body.anchor.add(root); body.tilt.add(tiltRoot); body.spin.add(spinRoot);
  const v = new T.Vector3(), v2 = new T.Vector3();

  // Moons · 卫星
  for (const m of H.moons) {
    const [en, zh, es, km, orbit, period, look] = m, retro = m[10] === true;
    const size = Math.max(km / body.p.radiusKm, 0.02) * r;
    const pivot = new T.Group(); pivot.rotation.y = Math.random() * Math.PI * 2;
    const mesh = new T.Mesh(sphere, new T.MeshStandardMaterial({ map: moonTexture(look), roughness: 1 })); mesh.scale.setScalar(size); mesh.position.x = orbit * r;
    pivot.add(mesh); tiltRoot.add(pivot);
    const ring = pathLine((o, t) => o.set(Math.cos(t * Math.PI * 2) * orbit * r, 0, Math.sin(t * Math.PI * 2) * orbit * r), 160, '#ffffff', 0.08); tiltRoot.add(ring);
    updaters.push(dt => { pivot.rotation.y += dt * (Math.PI * 2 / period) * (retro ? -1 : 1); mesh.rotation.y += dt * 0.2; });
    items.push({ obj: mesh, type: 'moon', label: [en, zh, es] });
    // Plumes on moons that have them · 卫星喷流
    if (look === 'io' || look === 'enceladus' || look === 'triton') {
      const n = 160, pl = cloud(n, look === 'io' ? '#bcd6ff' : look === 'triton' ? '#b9aea8' : '#ffffff', Math.max(size * 0.15, r * 0.006), 0.85);
      const life = new Float32Array(n).map(() => Math.random()), dir = [];
      for (let i = 0; i < n; i++) { const a = Math.random() * Math.PI * 2, s = Math.random() * 0.35; dir.push([Math.cos(a) * s, look === 'enceladus' ? -1 : 1, Math.sin(a) * s]); }
      mesh.add(pl); pl.scale.setScalar(1 / size);
      updaters.push(dt => {
        const P = pl.userData.pos;
        for (let i = 0; i < n; i++) {
          life[i] += dt * 0.6; if (life[i] > 1) life[i] -= 1;
          const t = life[i], d = dir[i], hgt = look === 'io' ? 4 * t * (1 - t) * 0.9 : t * 1.4, spread = t * (look === 'io' ? 1.2 : 0.5);
          P[i * 3] = d[0] * spread * size; P[i * 3 + 1] = d[1] * (1 + hgt) * size; P[i * 3 + 2] = d[2] * spread * size;
          const k = 1 - t; const c = pl.userData.base; pl.userData.col.set([c.r * k, c.g * k, c.b * k], i * 3);
        }
        pl.geometry.attributes.position.needsUpdate = true; pl.geometry.attributes.color.needsUpdate = true;
      });
    }
  }

  // Living features · 动态特征
  if (id === 'sun') {
    // Prominences: arcs that slowly rise and fall · 日珥
    const arcs = 9, per = 90, pr = cloud(arcs * per, '#ff7a2a', r * 0.05, 1), A = [];
    for (let k = 0; k < arcs; k++) {
      const n = v.set(Math.random() - 0.5, (Math.random() - 0.5) * 0.9, Math.random() - 0.5).normalize().clone();
      const t = new T.Vector3().crossVectors(n, new T.Vector3(0, 1, 0)).normalize();
      A.push({ n, t, w: 0.12 + Math.random() * 0.12, h: 0.08 + Math.random() * 0.12, ph: Math.random() * 6 });
    }
    root.add(pr);
    updaters.push((dt, time) => {
      const P = pr.userData.pos, C = pr.userData.col;
      A.forEach((a, k) => {
        const hh = a.h * (0.75 + 0.35 * Math.sin(time * 0.6 + a.ph));
        for (let i = 0; i < per; i++) {
          const s = i / (per - 1), j = (k * per + i) * 3;
          v2.copy(a.n).addScaledVector(a.t, (s - 0.5) * a.w * 2).normalize().multiplyScalar(r * (1 + hh * Math.sin(Math.PI * s)) + (Math.random() - 0.5) * r * 0.01);
          P[j] = v2.x; P[j + 1] = v2.y; P[j + 2] = v2.z;
          const glow = 0.6 + 0.4 * Math.sin(time * 3 + i * 0.4 + a.ph); C[j] = 1 * glow; C[j + 1] = 0.45 * glow; C[j + 2] = 0.12 * glow;
        }
      });
      pr.geometry.attributes.position.needsUpdate = true; pr.geometry.attributes.color.needsUpdate = true;
    });
    // Solar wind · 太阳风
    const n = 1400, sw = cloud(n, '#ffe6a8', r * 0.025, 0.5), d = [], life = new Float32Array(n).map(() => Math.random());
    for (let i = 0; i < n; i++) d.push(v.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize().clone());
    root.add(sw);
    updaters.push(dt => {
      const P = sw.userData.pos, C = sw.userData.col, c = sw.userData.base;
      for (let i = 0; i < n; i++) { life[i] += dt * 0.12; if (life[i] > 1) { life[i] = 0; d[i].set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize(); } const rr = r * (1.05 + life[i] * 1.8), k = Math.sin(Math.PI * life[i]); P[i * 3] = d[i].x * rr; P[i * 3 + 1] = d[i].y * rr; P[i * 3 + 2] = d[i].z * rr; C[i * 3] = c.r * k; C[i * 3 + 1] = c.g * k; C[i * 3 + 2] = c.b * k; }
      sw.geometry.attributes.position.needsUpdate = true; sw.geometry.attributes.color.needsUpdate = true;
    });
  }
  if (id === 'mercury') {
    // Sodium tail pointing away from the Sun · 钠尾
    const n = 1200, tail = cloud(n, '#ffc35a', r * 0.07, 0.55), life = new Float32Array(n).map(() => Math.random()), off = [];
    for (let i = 0; i < n; i++) off.push([(Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2]);
    root.add(tail);
    updaters.push(dt => {
      const away = v.copy(body.anchor.position).normalize(), side = v2.set(-away.z, 0, away.x), up = new T.Vector3(0, 1, 0);
      const P = tail.userData.pos, C = tail.userData.col, c = tail.userData.base;
      for (let i = 0; i < n; i++) {
        life[i] += dt * 0.18; if (life[i] > 1) life[i] -= 1; const t = life[i], spread = r * (0.6 + t * 1.6);
        const x = away.x * r * (1 + t * 9) + side.x * off[i][0] * spread + up.x * off[i][1] * spread * 0.6;
        const y = up.y * off[i][1] * spread * 0.6, z = away.z * r * (1 + t * 9) + side.z * off[i][0] * spread;
        P[i * 3] = x; P[i * 3 + 1] = y; P[i * 3 + 2] = z; const k = (1 - t) * 0.9; C[i * 3] = c.r * k; C[i * 3 + 1] = c.g * k; C[i * 3 + 2] = c.b * k;
      }
      tail.geometry.attributes.position.needsUpdate = true; tail.geometry.attributes.color.needsUpdate = true;
    });
  }
  if (id === 'venus') {
    // Fast cloud layer racing around the planet · 超级自转云层
    const w = 512, h = 256, c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d'), img = g.createImageData(w, h);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const la = (0.5 - (y + 0.5) / h) * Math.PI, lo = x / w * Math.PI * 2, cl = Math.cos(la); const n2 = N.fbm(-Math.cos(lo) * cl * 2.5, Math.sin(la) * 9, Math.sin(lo) * cl * 2.5, 5); const a = Math.max(0, Math.min(1, (n2 - 0.45) * 3)) * (1 - Math.abs(Math.sin(la)) * 0.4); const i = (y * w + x) * 4; img.data[i] = 255; img.data[i + 1] = 240; img.data[i + 2] = 205; img.data[i + 3] = a * 170; }
    g.putImageData(img, 0, 0);
    const shell = new T.Mesh(sphere, new T.MeshStandardMaterial({ map: tex(c), transparent: true, depthWrite: false, roughness: 1 })); shell.scale.setScalar(r * 1.012); tiltRoot.add(shell);
    updaters.push(dt => { shell.rotation.y -= dt * 0.35; });
  }
  if (id === 'earth') {
    if (body.texCanvas) { const lights = cityLights(body.texCanvas); lights.scale.setScalar(r * 1.002); spinRoot.add(lights); }
    const au = aurora(r, 20, r * 0.12, '#3dff8a', '#ff4a8a', 0.9); tiltRoot.add(au);
    updaters.push((dt, time) => { au.userData.mat.uniforms.time.value = time; });
  }
  if (id === 'mars') {
    // A dust storm drifting across the southern hemisphere · 沙尘暴
    const n = 2200, dust = cloud(n, '#d98f58', r * 0.035, 0.35), P = dust.userData.pos;
    for (let i = 0; i < n; i++) { const la = (-30 + (Math.random() - 0.5) * 34) * DEG, lo = Math.random() * Math.PI * 2 * 0.45 + 1.0, rr = r * (1.006 + Math.random() * 0.03); P[i * 3] = -Math.cos(lo) * Math.cos(la) * rr; P[i * 3 + 1] = Math.sin(la) * rr; P[i * 3 + 2] = Math.sin(lo) * Math.cos(la) * rr; }
    dust.geometry.attributes.position.needsUpdate = true; spinRoot.add(dust);
    updaters.push((dt, time) => { dust.rotation.y += dt * 0.05; dust.material.opacity = 0.28 + 0.08 * Math.sin(time * 0.8); });
  }
  if (id === 'jupiter') {
    const au = aurora(r * 0.97, 14, r * 0.1, '#a46bff', '#4ad6ff', 1); tiltRoot.add(au);
    // Io plasma torus · 木卫一等离子环
    const io = H.moons[0], n = 1600, torus = cloud(n, '#ff8f72', r * 0.03, 0.3), P = torus.userData.pos;
    for (let i = 0; i < n; i++) { const a = Math.random() * Math.PI * 2, rr = io[4] * r * (1 + (Math.random() - 0.5) * 0.12), yy = (Math.random() - 0.5) * r * 0.12; P[i * 3] = Math.cos(a) * rr; P[i * 3 + 1] = yy; P[i * 3 + 2] = Math.sin(a) * rr; }
    torus.geometry.attributes.position.needsUpdate = true; tiltRoot.add(torus);
    updaters.push((dt, time) => { au.userData.mat.uniforms.time.value = time; torus.rotation.y += dt * 0.15; });
  }
  if (id === 'saturn') {
    const au = aurora(r * 0.9, 15, r * 0.08, '#7a8cff', '#c87dff', 0.7); tiltRoot.add(au);
    updaters.push((dt, time) => { au.userData.mat.uniforms.time.value = time; });
  }
  if (id === 'uranus') {
    // Aurora around a magnetic pole tilted 59° from the spin axis · 倾斜的磁极
    const au = aurora(r * 1.0, 16, r * 0.1, '#6dfcff', '#8a7dff', 0.8); au.rotation.z = 59 * DEG; tiltRoot.add(au);
    updaters.push((dt, time) => { au.userData.mat.uniforms.time.value = time; au.rotation.y += dt * 0.6; });
  }
  if (id === 'neptune') {
    // Bright clouds racing in the fastest winds · 高速风中的云
    const n = 900, wind = cloud(n, '#f4f8ff', r * 0.03, 0.55), P = wind.userData.pos;
    for (let i = 0; i < n; i++) { const band = Math.random() < 0.55 ? -30 : 24, la = (band + (Math.random() - 0.5) * 6) * DEG, lo = Math.random() * Math.PI * 2, rr = r * 1.01; P[i * 3] = -Math.cos(lo) * Math.cos(la) * rr; P[i * 3 + 1] = Math.sin(la) * rr; P[i * 3 + 2] = Math.sin(lo) * Math.cos(la) * rr; }
    wind.geometry.attributes.position.needsUpdate = true; tiltRoot.add(wind);
    updaters.push(dt => { wind.rotation.y += dt * 1.1; });
  }

  // Spacecraft moment · 航天器时刻
  const C = H.craft, craft = craftModel(C.kind), cs = r * (id === 'sun' ? 0.035 : C.kind === 'rover' ? 0.06 : 0.07);
  craft.scale.setScalar(cs);
  if (C.kind === 'rover') {
    // On the surface of Mars at Jezero Crater (18.4°N, 77.5°E), with a beacon so it can be found · 耶泽罗陨石坑
    const la = 18.4 * DEG, lo = (77.5 + 180) / 360 * Math.PI * 2;
    const n = v.set(-Math.cos(lo) * Math.cos(la), Math.sin(la), Math.sin(lo) * Math.cos(la)).clone();
    craft.position.copy(n).multiplyScalar(r * 1.001); craft.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), n); spinRoot.add(craft);
    const beam = new T.Mesh(new T.CylinderGeometry(r * 0.004, r * 0.004, r * 0.35, 8, 1, true), new T.MeshBasicMaterial({ color: '#7fe4ff', transparent: true, opacity: 0.6, blending: T.AdditiveBlending, depthWrite: false }));
    beam.position.copy(n).multiplyScalar(r * 1.18); beam.quaternion.copy(craft.quaternion); spinRoot.add(beam);
    updaters.push((dt, time) => { beam.material.opacity = 0.35 + 0.3 * Math.sin(time * 3); });
  } else {
    const holder = C.kind === 'voyager' ? root : (id === 'sun' ? root : tiltRoot);
    const R = r;
    const path = {
      parker: (o, t) => ellipse(o, t, R * 1.15, R * 3.2, 0.35, 0.6),
      messenger: (o, t) => ellipse(o, t, R * 1.25, R * 2.7, 82 * DEG, 0.3),
      magellan: (o, t) => ellipse(o, t, R * 1.15, R * 2.1, 86 * DEG, 1.1),
      iss: (o, t) => ellipse(o, t, R * 1.07, R * 1.07, 51.6 * DEG, 0.4),
      juno: (o, t) => ellipse(o, t, R * 1.08, R * 3.6, 90 * DEG, 0.9),
      cassini: (o, t) => ellipse(o, t, R * 1.08, R * 3.4, 90 * DEG, 2.2),
      voyager: (o, t) => o.set(-7 * R, 2 * R, 5 * R).lerp(new T.Vector3(7 * R, -1.2 * R, -5 * R), t),
    }[C.kind];
    const period = { parker: 18, messenger: 12, magellan: 10, iss: 9, juno: 16, cassini: 14, voyager: 16 }[C.kind];
    holder.add(craft, pathLine(path)); let t = Math.random();
    updaters.push(dt => {
      t = (t + dt / period) % 1; path(craft.position, t); const ahead = path(new T.Vector3(), (t + 0.004) % 1);
      if (C.kind === 'parker') craft.lookAt(holder.localToWorld(new T.Vector3())); else craft.lookAt(holder.localToWorld(ahead.clone()));
      if (C.kind === 'voyager') craft.scale.setScalar(cs * Math.min(1, Math.sin(Math.PI * t) * 3));
    });
  }
  items.push({ obj: craft, type: 'craft', label: C.name });

  const groups = [root, tiltRoot, spinRoot];
  return {
    items,
    setVisible(on) { groups.forEach(g => g.visible = on); },
    update(dt, time) { if (root.visible) updaters.forEach(f => f(dt, time)); },
  };
}
