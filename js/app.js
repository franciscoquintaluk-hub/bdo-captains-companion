const DATA = window.BDO_DATA;
const STORE_KEY = 'bdo-captains-companion-v3';
const state = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
state.done = state.done || {};
state.materials = state.materials || Object.fromEntries(DATA.materials.map(m => [m.id, m.have || 0]));
state.stats = state.stats || { barterCount: 200, crowCoins: 1400 };

const $ = (q, root = document) => root.querySelector(q);
const $$ = (q, root = document) => [...root.querySelectorAll(q)];
function save(){ localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
function pct(have, need){ return Math.min(100, Math.round((Number(have||0) / Number(need||1)) * 100)); }
function priorityClass(p){ return String(p).replace('+','plus').toLowerCase(); }

function init(){
  renderNav();
  renderAll();
  bindTopbar();
  navigate(location.hash?.replace('#','') || 'dashboard');
}

function renderNav(){
  const navHtml = DATA.nav.map(n => `<button class="navBtn" data-page="${n.id}"><span>${n.icon}</span><b>${n.label}</b></button>`).join('');
  $('#desktopNav').innerHTML = navHtml;
  $('#mobileNav').innerHTML = DATA.nav.slice(0,5).map(n => `<button class="navBtn" data-page="${n.id}"><span>${n.icon}</span><small>${n.label}</small></button>`).join('');
  $$('.navBtn').forEach(btn => btn.addEventListener('click', () => navigate(btn.dataset.page)));
}

function navigate(page){
  if(!DATA.nav.some(n => n.id === page)) page = 'dashboard';
  $$('.page').forEach(p => p.classList.toggle('active', p.id === page));
  $$('.navBtn').forEach(b => b.classList.toggle('active', b.dataset.page === page));
  const info = DATA.nav.find(n => n.id === page);
  $('#pageTitle').textContent = info.label;
  $('#pageSubtitle').textContent = info.subtitle;
  history.replaceState(null, '', `#${page}`);
  window.scrollTo({top:0, behavior:'smooth'});
}

function bindTopbar(){
  const barter = $('#barterCount');
  const coins = $('#crowCoins');
  barter.value = state.stats.barterCount || 0;
  coins.value = state.stats.crowCoins || 0;
  barter.addEventListener('input', e => { state.stats.barterCount = Number(e.target.value || 0); save(); renderDashboard(); });
  coins.addEventListener('input', e => { state.stats.crowCoins = Number(e.target.value || 0); state.materials.crowcoins = Number(e.target.value || 0); save(); renderAll(); });
  $('#resetDaily').addEventListener('click', () => {
    DATA.quests.filter(q => q.type === 'Daily').forEach(q => delete state.done[q.id]);
    save(); renderAll();
  });
}

function renderAll(){ renderDashboard(); renderQuests(); renderMaterials(); renderGear(); renderMonsters(); renderSailors(); renderPlanner(); renderSettings(); }

function renderDashboard(){
  const daily = DATA.quests.filter(q => q.type === 'Daily');
  const weekly = DATA.quests.filter(q => q.type === 'Weekly');
  const dDone = daily.filter(q => state.done[q.id]).length;
  const wDone = weekly.filter(q => state.done[q.id]).length;
  const matAvg = Math.round(DATA.materials.reduce((a,m) => a + pct(state.materials[m.id], m.need), 0) / DATA.materials.length);
  $('#dashboard').innerHTML = `
    <div class="hero">
      <div><span class="eyebrow">Captain route</span><h3>Caravel → Carrack Advance → Blue Gear</h3><p>Focus only on ocean progression. Your highest value loop is Oquilla dailies, weekly sea monsters, Crow Coin barters, then blue gear preparation.</p></div>
      <div class="heroStats"><strong>${matAvg}%</strong><span>Material progress average</span></div>
    </div>
    <div class="statGrid">
      ${statCard('Daily quests', `${dDone}/${daily.length}`, pct(dDone,daily.length))}
      ${statCard('Weekly quests', `${wDone}/${weekly.length}`, pct(wDone,weekly.length))}
      ${statCard('Crow Coins', `${state.materials.crowcoins || 0}/30000`, pct(state.materials.crowcoins,30000))}
      ${statCard('Barters', `${state.stats.barterCount || 0}`, Math.min(100, Math.round((state.stats.barterCount || 0)/30)))}
    </div>
    <div class="gridTwo">
      <div class="panel"><h3>Do first today</h3>${DATA.quests.filter(q => ['S+','S'].includes(q.priority)).slice(0,6).map(questRow).join('')}</div>
      <div class="panel"><h3>Biggest material bottlenecks</h3>${DATA.materials.sort((a,b)=>pct(state.materials[a.id],a.need)-pct(state.materials[b.id],b.need)).slice(0,5).map(materialMini).join('')}</div>
    </div>`;
  bindChecks($('#dashboard'));
}

function statCard(label, value, percent){ return `<article class="statCard"><span>${label}</span><strong>${value}</strong><div class="bar"><i style="width:${percent}%"></i></div></article>`; }
function questRow(q){ return `<label class="questRow"><input type="checkbox" data-done="${q.id}" ${state.done[q.id]?'checked':''}/><span><b>${q.name}</b><small>${q.npc} • ${q.location}</small></span><em class="pill ${priorityClass(q.priority)}">${q.priority}</em></label>`; }
function materialMini(m){ const have = state.materials[m.id] || 0; return `<div class="miniMat"><div><b>${m.name}</b><small>${have}/${m.need} • ${m.source}</small></div><div class="bar"><i style="width:${pct(have,m.need)}%"></i></div></div>`; }

function renderQuests(){
  $('#quests').innerHTML = `<div class="toolbar"><input id="questSearch" placeholder="Search quest, NPC or location..."/><select id="questFilter"><option>All</option><option>Daily</option><option>Weekly</option><option>Repeatable</option></select></div><div id="questList" class="cardGrid"></div>`;
  const draw = () => {
    const term = $('#questSearch').value.toLowerCase();
    const filter = $('#questFilter').value;
    const list = DATA.quests.filter(q => (filter==='All'||q.type===filter) && JSON.stringify(q).toLowerCase().includes(term));
    $('#questList').innerHTML = list.map(q => `<article class="card questCard"><div class="cardTop"><span class="pill ${priorityClass(q.priority)}">${q.priority}</span><span class="pill muted">${q.type}</span><span class="pill">${q.tag}</span></div><h3>${q.name}</h3><p><b>NPC:</b> ${q.npc}</p><p><b>Location:</b> ${q.location}</p><p>${q.objective}</p><div class="cardFooter"><label><input type="checkbox" data-done="${q.id}" ${state.done[q.id]?'checked':''}/> Done</label><button class="ghostBtn" data-detail="quest:${q.id}">Details</button></div></article>`).join('');
    bindChecks($('#quests')); bindDetails($('#quests'));
  };
  $('#questSearch').addEventListener('input', draw); $('#questFilter').addEventListener('change', draw); draw();
}

function renderMaterials(){
  $('#materials').innerHTML = `<div class="materialList">${DATA.materials.map(m => { const have=state.materials[m.id]||0; return `<article class="materialCard"><div><span class="pill ${priorityClass(m.priority)}">${m.priority}</span><h3>${m.name}</h3><p>${m.note}</p><small><b>Source:</b> ${m.source}</small><small><b>Used for:</b> ${m.used}</small></div><div class="materialControl"><input type="number" min="0" data-mat="${m.id}" value="${have}"/><strong>${have}/${m.need}</strong><div class="bar"><i style="width:${pct(have,m.need)}%"></i></div></div></article>`}).join('')}</div>`;
  $$('[data-mat]').forEach(input => input.addEventListener('input', e => { state.materials[e.target.dataset.mat] = Number(e.target.value||0); if(e.target.dataset.mat === 'crowcoins') $('#crowCoins').value = e.target.value; save(); renderAll(); }));
}

function renderGear(){ $('#shipGear').innerHTML = `<div class="timeline">${DATA.gear.map(g => `<article class="timelineItem"><span>${g.stage}</span><h3>${g.title}</h3><em>${g.status}</em><ul>${g.items.map(i=>`<li>${i}</li>`).join('')}</ul></article>`).join('')}</div>`; }
function renderMonsters(){ $('#monsters').innerHTML = `<div class="cardGrid">${DATA.monsters.map(m => `<article class="card"><div class="cardTop"><span class="pill">${m.solo}</span><span class="pill muted">${m.difficulty}</span></div><h3>${m.name}</h3><p><b>Ship:</b> ${m.ship}</p><p><b>Drops:</b> ${m.drops}</p><p>${m.tip}</p></article>`).join('')}</div>`; }
function renderSailors(){ $('#sailors').innerHTML = `<div class="cardGrid">${DATA.sailors.map(s => `<article class="card"><span class="pill ${s.rating==='S'?'splus':'a'}">${s.rating}</span><h3>${s.name}</h3><p><b>Best for:</b> ${s.role}</p><p>${s.note}</p></article>`).join('')}</div>`; }
function renderPlanner(){ $('#planner').innerHTML = `<div class="panel planner"><h3>Your next best actions</h3><ol><li>Finish S+ Oquilla daily quests first.</li><li>Check weekly sea monster quests before reset.</li><li>Use barter refreshes for Crow Coins and Carrack materials.</li><li>Update material numbers after every session.</li><li>Only group Black Rust / Crocodiles if solo takes too long.</li></ol></div>`; }
function renderSettings(){ $('#settings').innerHTML = `<div class="panel"><h3>Local Save</h3><p>Your quest checks and materials save in this browser only.</p><button id="exportData" class="primaryBtn">Export Save</button> <button id="wipeData" class="dangerBtn">Wipe Save</button><pre id="saveOutput"></pre></div>`; $('#exportData').onclick=()=>$('#saveOutput').textContent=JSON.stringify(state,null,2); $('#wipeData').onclick=()=>{ if(confirm('Delete all saved progress?')){ localStorage.removeItem(STORE_KEY); location.reload(); } }; }

function bindChecks(root){ $$('[data-done]', root).forEach(cb => cb.addEventListener('change', e => { state.done[e.target.dataset.done] = e.target.checked; save(); renderAll(); })); }
function bindDetails(root){ $$('[data-detail]', root).forEach(btn => btn.addEventListener('click', () => showDetail(btn.dataset.detail))); }
function showDetail(key){ const [type,id]=key.split(':'); const q=DATA.quests.find(x=>x.id===id); if(!q) return; $('#modalContent').innerHTML = `<button class="close" onclick="detailModal.close()">×</button><span class="pill ${priorityClass(q.priority)}">${q.priority}</span><h2>${q.name}</h2><p><b>NPC:</b> ${q.npc}</p><p><b>Location:</b> ${q.location}</p><p><b>How to do:</b> ${q.objective}</p><p><b>Best reward:</b> ${q.reward}</p><p><b>Why:</b> ${q.why}</p><p><b>Solo/Group:</b> ${q.tag}</p><p><b>Time:</b> ${q.time}</p>`; detailModal.showModal(); }

document.addEventListener('DOMContentLoaded', init);
