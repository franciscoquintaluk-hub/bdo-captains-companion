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

function matIcon(m){
  if(m.iconUrl) return `<img class="matIcon" src="${m.iconUrl}" alt="${m.name} icon" loading="lazy" onerror="this.replaceWith(document.createTextNode('📦'))"/>`;
  return `<span class="matIcon fallback">${m.icon || '📦'}</span>`;
}

function getMatHave(id){ return Number(state.materials[id] || 0); }
function setMatHave(id, value){ state.materials[id] = Number(value || 0); save(); }
function progressFor(items){
  const need = items.reduce((a,i)=>a+Number(i.qty||i.need||0),0);
  const have = items.reduce((a,i)=>a+Math.min(getMatHave(i.id), Number(i.qty||i.need||0)),0);
  return { need, have, percent:pct(have, need) };
}
function iconImg(iconUrl, name, cls='matIcon'){
  if(iconUrl) return `<img class="${cls}" src="${iconUrl}" alt="${name} icon" loading="lazy" onerror="this.replaceWith(document.createTextNode('📦'))"/>`;
  return `<span class="${cls} fallback">📦</span>`;
}

function renderMaterials(){
  const mainItems = DATA.materials.map(m => ({ id:m.id, name:m.name, qty:m.need, iconUrl:m.iconUrl }));
  const mainProgress = progressFor(mainItems);
  const partProgress = { need: DATA.shipParts.length, have: DATA.shipParts.filter(p => getMatHave(p.id) >= 1).length };
  partProgress.percent = pct(partProgress.have, partProgress.need);

  $('#materials').innerHTML = `
    <div class="sourceNote">
      <strong>Carrack Advance from Epheria Caravel.</strong> This page now tracks the exact Advance path: the 5 main Advance materials plus the 4 required +10 Epheria Caravel ship parts and their sub-materials.
    </div>

    <div class="materialSummary">
      <article class="statCard"><span>Main Advance materials</span><strong>${mainProgress.have.toLocaleString()}/${mainProgress.need.toLocaleString()}</strong><div class="bar"><i style="width:${mainProgress.percent}%"></i></div></article>
      <article class="statCard"><span>Enhanced ship parts</span><strong>${partProgress.have}/${partProgress.need}</strong><div class="bar"><i style="width:${partProgress.percent}%"></i></div></article>
      <article class="statCard"><span>Next focus</span><strong>${nextFocusName()}</strong><small>Lowest progress item first</small></article>
    </div>

    <div class="tabs">
      <button class="tabBtn active" data-tab-target="advance-main">Main materials</button>
      <button class="tabBtn" data-tab-target="advance-parts">Ship parts</button>
      <button class="tabBtn" data-tab-target="advance-all">All sub-materials</button>
    </div>

    <section id="advance-main" class="tabPanel active">
      <div class="materialTable">
        ${DATA.materials.map(renderMainMaterialRow).join('')}
      </div>
    </section>

    <section id="advance-parts" class="tabPanel">
      <div class="shipPartList">
        ${DATA.shipParts.map(renderShipPartCard).join('')}
      </div>
    </section>

    <section id="advance-all" class="tabPanel">
      <div class="sourceNote compact"><strong>Tip:</strong> This list combines duplicate sub-materials across all 4 ship parts, so you can track total amounts easily.</div>
      <div class="materialTable">
        ${combinedSubMaterials().map(renderCombinedMaterialRow).join('')}
      </div>
    </section>`;

  $$('[data-mat]').forEach(input => input.addEventListener('input', e => { setMatHave(e.target.dataset.mat, e.target.value); renderAll(); }));
  $$('[data-part-done]').forEach(cb => cb.addEventListener('change', e => { setMatHave(e.target.dataset.partDone, e.target.checked ? 1 : 0); renderAll(); }));
  $$('.tabBtn').forEach(btn => btn.addEventListener('click', () => {
    $$('.tabBtn').forEach(b => b.classList.remove('active'));
    $$('.tabPanel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    $('#' + btn.dataset.tabTarget).classList.add('active');
  }));
}

function nextFocusName(){
  const rows = [
    ...DATA.materials.map(m => ({name:m.name, pct:pct(getMatHave(m.id), m.need)})),
    ...combinedSubMaterials().map(m => ({name:m.name, pct:pct(getMatHave(m.id), m.qty)}))
  ].filter(r => r.pct < 100).sort((a,b)=>a.pct-b.pct);
  return rows[0]?.name || 'Carrack ready';
}

function renderMainMaterialRow(m){
  const have = getMatHave(m.id);
  const remaining = Math.max(0, Number(m.need) - have);
  const done = remaining === 0;
  return `<article class="matRow ${done ? 'done' : ''}">
    <div class="matNameCell">${iconImg(m.iconUrl,m.name)}<div><h4>${m.name}</h4><small>${m.source}</small></div></div>
    <div class="matNeed"><span>Required</span><b>${m.need.toLocaleString()}</b></div>
    <label class="matHave"><span>You have</span><input type="number" min="0" data-mat="${m.id}" value="${have}"/></label>
    <div class="matRemain"><span>Remaining</span><b>${remaining.toLocaleString()}</b></div>
    <div class="matProgress"><span>${pct(have,m.need)}%</span><div class="bar"><i style="width:${pct(have,m.need)}%"></i></div></div>
    <details class="matDetails"><summary>How to get</summary><ul>${(m.details||[m.note]).map(d=>`<li>${d}</li>`).join('')}</ul></details>
  </article>`;
}

function renderShipPartCard(part){
  const partDone = getMatHave(part.id) >= 1;
  const allItems = [part.basePart, ...part.materials];
  const prog = progressFor(allItems);
  return `<article class="shipPartCard ${partDone ? 'done' : ''}">
    <div class="shipPartMain">
      ${iconImg(part.iconUrl, part.name, 'partIcon')}
      <div><h3>${part.name}</h3><p>${part.workshop}</p><label class="doneCheck"><input type="checkbox" data-part-done="${part.id}" ${partDone?'checked':''}/> I have this +10 part ready</label></div>
      <div class="partProgressBox"><span>Sub-material progress</span><strong>${prog.percent}%</strong><div class="bar"><i style="width:${prog.percent}%"></i></div></div>
    </div>
    <div class="subMatTable">
      ${allItems.map(item => renderSubMatRow(item)).join('')}
    </div>
  </article>`;
}

function renderSubMatRow(item){
  const have = getMatHave(item.id);
  const remaining = Math.max(0, Number(item.qty) - have);
  const done = remaining === 0;
  return `<div class="subMatRow ${done ? 'done' : ''}">
    <div class="subMatName">${iconImg(item.iconUrl,item.name,'subMatIcon')}<span>${item.name}</span></div>
    <b>x${Number(item.qty).toLocaleString()}</b>
    <label><span>You have</span><input type="number" min="0" data-mat="${item.id}" value="${have}"/></label>
    <div class="subMatProgress"><span>${pct(have,item.qty)}%</span><div class="bar"><i style="width:${pct(have,item.qty)}%"></i></div></div>
  </div>`;
}

function combinedSubMaterials(){
  const map = new Map();
  DATA.shipParts.forEach(part => [part.basePart, ...part.materials].forEach(item => {
    const current = map.get(item.id) || {...item, qty:0, usedIn:[]};
    current.qty += Number(item.qty);
    current.usedIn.push(part.name.replace('+10 Epheria Caravel: ',''));
    map.set(item.id, current);
  }));
  return [...map.values()].sort((a,b)=>a.name.localeCompare(b.name));
}

function renderCombinedMaterialRow(m){
  const have = getMatHave(m.id);
  const remaining = Math.max(0, Number(m.qty) - have);
  const done = remaining === 0;
  return `<article class="matRow ${done ? 'done' : ''}">
    <div class="matNameCell">${iconImg(m.iconUrl,m.name)}<div><h4>${m.name}</h4><small>Used for: ${m.usedIn.join(', ')}</small></div></div>
    <div class="matNeed"><span>Total required</span><b>${Number(m.qty).toLocaleString()}</b></div>
    <label class="matHave"><span>You have</span><input type="number" min="0" data-mat="${m.id}" value="${have}"/></label>
    <div class="matRemain"><span>Remaining</span><b>${remaining.toLocaleString()}</b></div>
    <div class="matProgress"><span>${pct(have,m.qty)}%</span><div class="bar"><i style="width:${pct(have,m.qty)}%"></i></div></div>
  </article>`;
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
