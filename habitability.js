// Habitability Lab · 宜居条件实验室 · Laboratorio de habitabilidad (team feature)
import { PLANETS } from './data.js';
const $=s=>document.querySelector(s), bi=window.bi;
const name=p=>bi(p.en, p.zh, p.es);
const factorNames={temperature:['Temperature match','温度相似度','Temperatura'],sunlight:['Sunlight match','阳光相似度','Luz solar'],pressure:['Surface pressure match','表面气压相似度','Presión superficial'],water:['Liquid-water conditions','液态水条件','Agua líquida']};
const CONDITIONS={
  mercury:{temp:167,pressure:0,water:0,atmosphere:'Trace exosphere',waterNote:'No stable surface liquid water'},
  venus:{temp:464,pressure:92,water:0,atmosphere:'Dense CO₂',waterNote:'No stable surface liquid water'},
  earth:{temp:15,pressure:1,water:100,atmosphere:'N₂–O₂',waterNote:'Stable surface oceans'},
  mars:{temp:-65,pressure:.006,water:15,atmosphere:'Thin CO₂',waterNote:'Past water evidence; liquid water is not stable at the surface'},
  jupiter:{temp:-110,pressure:null,water:0,atmosphere:'H₂–He · no solid surface',waterNote:'No solid surface'},
  saturn:{temp:-140,pressure:null,water:0,atmosphere:'H₂–He · no solid surface',waterNote:'No solid surface'},
  uranus:{temp:-195,pressure:null,water:0,atmosphere:'H₂–He · no solid surface',waterNote:'No solid surface'},
  neptune:{temp:-200,pressure:null,water:0,atmosphere:'H₂–He · no solid surface',waterNote:'No solid surface'},
};
const FACTORS=[['temperature',35],['sunlight',20],['pressure',25],['water',20]];
const clamp=x=>Math.max(0,Math.min(100,x));
const formatTemp=n=>`${n>0?'+':''}${n} °C`;
function measure(p){
  const c={...CONDITIONS[p.id],temp:p.temp??CONDITIONS[p.id].temp};
  const temperature=100*Math.exp(-Math.abs(c.temp-15)/70);
  const flux=1/(p.au*p.au), sunlight=100*Math.exp(-Math.abs(Math.log2(flux))/2);
  const pressure=c.pressure===null?0:c.pressure===0?0:100*Math.exp(-Math.abs(Math.log10(c.pressure))*1.4);
  const factors={temperature:clamp(temperature),sunlight:clamp(sunlight),pressure:clamp(pressure),water:c.water};
  const score=Math.round(FACTORS.reduce((sum,[key,weight])=>sum+factors[key]*weight/100,0));
  return{planet:p,data:c,factors,score,flux};
}

export function initHabitability(){
  const panel=$('#habitPanel'),selected=new Set(['earth','mars','venus']);
  const toggle=force=>panel.classList.toggle('hidden',force===undefined?!panel.classList.contains('hidden'):!force);
  $('#habitability').onclick=()=>toggle(true);$('#habitClose').onclick=()=>toggle(false);
  function render(){
    $('#habitChoices').innerHTML=PLANETS.map(p=>`<button type="button" class="habit-chip ${selected.has(p.id)?'selected':''}" data-planet="${p.id}" aria-pressed="${selected.has(p.id)}" ${selected.size>=4&&!selected.has(p.id)?'disabled':''}><i style="--planet:${p.color}"></i>${name(p)}</button>`).join('');
    document.querySelectorAll('.habit-chip').forEach(btn=>btn.onclick=()=>{
      const id=btn.dataset.planet;
      if(selected.has(id)) {if(selected.size>1)selected.delete(id);}
      else if(selected.size<4)selected.add(id);
      render();
    });
    const results=[...selected].map(id=>measure(PLANETS.find(p=>p.id===id))).sort((a,b)=>b.score-a.score);
    const leader=results[0];
    $('#habitSummary').innerHTML=`<div><small>${bi('HIGHEST MATCH IN THIS SELECTION','本次选择中最相似','MAYOR SIMILITUD EN ESTA SELECCIÓN')}</small><b>${name(leader.planet)}</b><span>${leader.score}/100 ${bi('Earth similarity','地球相似度','similitud con la Tierra')}</span></div><div><small>${bi('HOW THE SCORE WORKS','评分方式','CÓMO SE CALCULA')}</small><span>${bi('Weighted comparison of four environmental factors. Earth is the 100-point reference.','对四项环境因素进行加权比较，地球为 100 分基准。','Comparación ponderada de cuatro factores ambientales. La Tierra es la referencia de 100 puntos.')}</span></div>`;
    $('#habitCompare').innerHTML=results.map(r=>`<article class="habit-card" style="--planet:${r.planet.color}"><header><div><span class="habit-dot"></span><h3>${name(r.planet)}</h3><small>${bi(r.planet.type[0],r.planet.type[1],r.planet.type[0]==='Terrestrial'?'Planeta rocoso':r.planet.type[0]==='Gas giant'?'Gigante gaseoso':'Gigante de hielo')}</small></div><div class="habit-score"><b>${r.score}</b><small>/100</small></div></header><div class="habit-facts"><div><span>${bi('Mean temperature','平均温度','Temperatura media')}</span><b>${formatTemp(r.data.temp)}</b></div><div><span>${bi('Sunlight vs Earth','相对地球的日照','Luz solar frente a la Tierra')}</span><b>${r.flux.toFixed(2)}×</b></div><div><span>${bi('Surface pressure','表面气压','Presión superficial')}</span><b>${r.data.pressure===null?bi('No solid surface','无固体表面','Sin superficie sólida'):r.data.pressure===0?bi('Near vacuum','近真空','Casi vacío'):`${r.data.pressure} bar`}</b></div><div><span>${bi('Atmosphere','大气','Atmósfera')}</span><b>${bi(r.data.atmosphere,({ 'Trace exosphere':'稀薄外逸层','Dense CO₂':'浓厚二氧化碳','N₂–O₂':'氮氧大气','Thin CO₂':'稀薄二氧化碳','H₂–He · no solid surface':'氢氦 · 无固体表面' })[r.data.atmosphere],({ 'Trace exosphere':'Exosfera tenue','Dense CO₂':'CO₂ denso','N₂–O₂':'N₂–O₂','Thin CO₂':'CO₂ tenue','H₂–He · no solid surface':'H₂–He · sin superficie sólida' })[r.data.atmosphere])}</b></div></div><div class="habit-factors">${FACTORS.map(([key,weight])=>`<div class="habit-factor"><div><span>${bi(...factorNames[key])} <small>${weight}%</small></span><b>${Math.round(r.factors[key])}</b></div><div class="habit-track"><i style="width:${r.factors[key]}%"></i></div></div>`).join('')}</div><p>${bi(r.data.waterNote,({ 'No stable surface liquid water':'表面无法稳定存在液态水','Stable surface oceans':'稳定的表面海洋','Past water evidence; liquid water is not stable at the surface':'有古水证据；液态水无法在表面稳定存在','No solid surface':'没有固体表面' })[r.data.waterNote],({ 'No stable surface liquid water':'No hay agua líquida estable en la superficie','Stable surface oceans':'Océanos superficiales estables','Past water evidence; liquid water is not stable at the surface':'Hay indicios de agua antigua; el agua líquida no es estable en la superficie','No solid surface':'No tiene superficie sólida' })[r.data.waterNote])}</p></article>`).join('');
  }
  render();return{toggle};
}


