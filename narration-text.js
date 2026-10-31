// Spoken introductions for each body (2–3 sentences) · 天体语音介绍 · Presentaciones habladas
// Used by the browser (captions + fallback voice) and by api/voice.js (ElevenLabs).
// Edit the text here; online audio refreshes on the next deployment.
export const NARRATION = {
  sun: [
    'Welcome to the Sun, the star at the heart of our Solar System. It is so big that about a million Earths could fit inside it, and its light takes just over eight minutes to reach us.',
    '欢迎来到太阳，我们太阳系的中心恒星。它大到可以装下大约一百万个地球，它的光只需八分多钟就能到达我们这里。',
    'Bienvenido al Sol, la estrella en el corazón de nuestro sistema solar. Es tan grande que cabrían dentro alrededor de un millón de Tierras, y su luz tarda poco más de ocho minutos en llegar hasta nosotros.',
  ],
  mercury: [
    'This is Mercury, the smallest planet and the closest to the Sun. A year here lasts only 88 days, and with almost no air to hold heat, days reach about 430 degrees Celsius while nights fall to minus 180.',
    '这是水星，最小的行星，也是离太阳最近的行星。这里的一年只有 88 天；由于几乎没有大气保温，白天高达约 430 摄氏度，夜晚却降到零下 180 度。',
    'Este es Mercurio, el planeta más pequeño y el más cercano al Sol. Aquí un año dura solo 88 días y, casi sin aire que guarde el calor, los días llegan a unos 430 grados y las noches bajan a menos 180.',
  ],
  venus: [
    'Venus is almost Earth’s twin in size, but it is the hottest planet of all. Thick clouds of carbon dioxide trap the heat, so the surface stays around 460 degrees Celsius, hot enough to melt lead. And strangely, it spins backwards.',
    '金星的大小几乎和地球一样，却是所有行星中最热的。厚厚的二氧化碳云层锁住热量，让地表保持在约 460 摄氏度，足以熔化铅。奇妙的是，它还是倒着自转的。',
    'Venus es casi gemela de la Tierra en tamaño, pero es el planeta más caliente de todos. Sus densas nubes de dióxido de carbono atrapan el calor y la superficie ronda los 460 grados, suficiente para fundir plomo. Y, curiosamente, gira al revés.',
  ],
  earth: [
    'Welcome home. Earth is the only world we know that has life, with liquid oceans covering about seventy-one percent of its surface. The Moon keeps us company, and a thin blue atmosphere protects everything that lives here.',
    '欢迎回家。地球是我们所知唯一有生命的世界，液态海洋覆盖了约百分之七十一的表面。月球与我们相伴，薄薄的蓝色大气守护着这里的一切生命。',
    'Bienvenido a casa. La Tierra es el único mundo conocido con vida, y sus océanos cubren cerca del setenta y uno por ciento de su superficie. La Luna nos acompaña y una fina atmósfera azul protege todo lo que vive aquí.',
  ],
  mars: [
    'Mars, the red planet, gets its colour from rusty iron dust. It is home to Olympus Mons, the tallest volcano in the Solar System, and rovers like Perseverance are exploring an ancient lake bed for signs of past life.',
    '火星，这颗红色星球的颜色来自生锈的含铁尘土。这里有太阳系最高的火山——奥林帕斯山，毅力号等火星车正在古老的湖床上寻找过去生命的迹象。',
    'Marte, el planeta rojo, debe su color al polvo de hierro oxidado. Allí está el monte Olimpo, el volcán más alto del sistema solar, y rovers como Perseverance exploran un antiguo lecho de lago en busca de señales de vida pasada.',
  ],
  jupiter: [
    'Jupiter is the giant of our Solar System: more than thirteen hundred Earths could fit inside it. Its Great Red Spot is a storm wider than our whole planet, and its moon Europa hides a salty ocean beneath its ice.',
    '木星是太阳系的巨人，里面能装下一千三百多个地球。它的大红斑是一场比整个地球还宽的风暴，而它的卫星欧罗巴在冰层下藏着一片咸水海洋。',
    'Júpiter es el gigante del sistema solar: dentro cabrían más de mil trescientas Tierras. Su Gran Mancha Roja es una tormenta más ancha que todo nuestro planeta, y su luna Europa esconde un océano salado bajo el hielo.',
  ],
  saturn: [
    'Saturn is famous for its rings, made of countless pieces of ice and rock. It is so light for its size that it would float in water, if you could find a bathtub big enough. Its moon Titan even has lakes of liquid methane.',
    '土星以光环闻名，光环由无数冰块和岩石组成。按体积来说它非常轻，如果有足够大的浴缸，它甚至能浮在水上。它的卫星泰坦上还有液态甲烷湖。',
    'Saturno es famoso por sus anillos, hechos de innumerables trozos de hielo y roca. Es tan ligero para su tamaño que flotaría en el agua, si existiera una bañera lo bastante grande. Su luna Titán tiene incluso lagos de metano líquido.',
  ],
  uranus: [
    'Uranus is an ice giant that rolls around the Sun on its side, tilted almost ninety-eight degrees. Each pole gets about forty-two years of sunlight followed by forty-two years of darkness. Voyager 2 is the only spacecraft that has ever visited it.',
    '天王星是一颗冰巨星，几乎侧躺着绕太阳滚动，倾斜接近 98 度。它的每个极点都会经历大约 42 年的白昼和 42 年的黑夜。旅行者 2 号是唯一造访过它的航天器。',
    'Urano es un gigante de hielo que rueda alrededor del Sol de lado, inclinado casi noventa y ocho grados. Cada polo vive unos cuarenta y dos años de luz y otros cuarenta y dos de oscuridad. Voyager 2 es la única nave que lo ha visitado.',
  ],
  neptune: [
    'Neptune is the farthest planet, about thirty times farther from the Sun than Earth. It has the fastest winds in the Solar System, around two thousand kilometres per hour, and it was found with mathematics before anyone saw it through a telescope.',
    '海王星是最远的行星，与太阳的距离约为地球的三十倍。它拥有太阳系最快的风，时速约两千公里；而且人们先用数学算出了它，之后才在望远镜里看到它。',
    'Neptuno es el planeta más lejano, unas treinta veces más lejos del Sol que la Tierra. Tiene los vientos más rápidos del sistema solar, de unos dos mil kilómetros por hora, y se descubrió con matemáticas antes de verlo por un telescopio.',
  ],
};

// Transition sound effects, generated once with ElevenLabs Sound Effects · 转场音效 · Efectos
export const SFX = {
  'whoosh-in': { prompt: 'Smooth cinematic whoosh of a small spacecraft swooping in and gently slowing down, airy, soft low rumble, clean, no music, no voice', seconds: 1.6 },
  'whoosh-out': { prompt: 'Soft airy cinematic whoosh pulling quickly away into deep space, gentle fade out, clean, no music, no voice', seconds: 1.3 },
  'warp': { prompt: 'Gentle sci-fi warp transition, rising shimmering swell with soft sparkles, smooth and calm, no music, no voice', seconds: 2.2 },
  'chime': { prompt: 'Soft futuristic user interface chime, glassy and bright, single short tone, clean', seconds: 0.8 },
};
