const DATA = window.BDO_DATA;
const store = {
  get(k, fallback){ try{return JSON.parse(localStorage.getItem(k)) ?? fallback}catch{return fallback} },
  set(k,v){ localStorage.setItem(k, JSON.stringify(v)) }
};
let done = store.get('bdo_done', {});
let matHave = store.get('bdo_mat_have', {});
let profile = store.get('bdo_profile', {barters:200,crowCoins:1400});

document.getElementById('barterCount').value = profile.barters;
document.getElementById('crowCoins').value = profile.crowCoins;
document.getElementById('barterCount').addEventListener('input', e=>{profile.barters=+e.target.value;store.set('bdo_profile',profile);renderDashboard();renderPlanner();});
document.getElementById('crowCoins').addEventListener('input', e=>{profile.crowCoins=+e.target.value;store.set('bdo_profile',profile);renderDashboard();renderPlanner();});
document.getElementById('resetDone').onclick=()=>{ if(confirm('Clear completed checkboxes?')){done={};store.set('bdo_done',done);renderAll();}};

const titles = {
 dashboard:['Dashboard','Your priority route from Caravel to Carrack Advance.'],
 quests:['Quest Database','Daily and weekly sailing/barter quests with NPC, location, priority, solo tag and best reward.'],
 materials:['Carrack Materials','Track the key materials needed for Carrack Advance.'],
 shipParts:['Ship Parts','Gear stages from Caravel +10 to Carrack green and blue gear.'],
 monsters:['Sea Monsters','What you can solo with Caravel and what to delay until Carrack.'],
 sailors:['Sailors','Simple sailor recommendations for bartering and sea content.'],
 planner:['Smart Planner','What to do next based on your Caravel stage.'],
 settings:['Settings','Export and import your saved progress.']
};

document.querySelectorAll('.navBtn').forEach(btn=>btn.onclick=()=>showPage(btn.dataset.page));
function showPage(id){
 document.querySelectorAll('.navBtn').forEach(b=>b.classList.toggle('active', b.dataset.page===id));
 document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active', p.id===id));
 document.getElementById('pageTitle').textContent=titles[id][0];
 document.getElementById('pageSubtitle').textContent=titles[id][1];
}
function badge(text, cls=''){ return `<span class="badge ${cls || clean(text)}">${text}</span>`; }
function clean(s){return String(s).replace(/[^a-zA-Z0-9]/g,'')}
function questCard(q){
 return `<article class="card quest" data-priority="${q.priority}" data-reset="${q.reset}" data-solo="${q.solo}" data-stage="${q.stage}">
   <input class="doneBox" type="checkbox" ${done[q.id]?'checked':''} data-id="${q.id}" title="Mark complete">
   <h3>${q.name}</h3>
   <div>${badge(q.priority,q.priority)} ${badge(q.reset,q.reset)} ${badge(q.solo)} ${badge(q.ship)} ${badge(q.stage)}</div>
   <div class="kv"><b>NPC</b><span>${q.npc}</span><b>Location</b><span>${q.location}</span><b>How</b><span>${q.objective}</span><b>Best reward</b><span>⭐ ${q.bestReward}</span><b>Why</b><span>${q.why}</span></div>
   <p class="muted">Difficulty: ${q.difficulty} · Time: ${q.time} · Region: ${q.region}</p>
 </article>`;
}
function attachDone(){document.querySelectorAll('.doneBox').forEach(cb=>cb.onchange=e=>{done[e.target.dataset.id]=e.target.checked;store.set('bdo_done',done);renderDashboard();renderPlanner();});}
function renderDashboard(){
 const core = DATA.quests.filter(q=>['S+','S'].includes(q.priority) && ['Do now with Caravel','Do weekly','Do weekly if able','Do every session'].includes(q.stage));
 const completed = core.filter(q=>done[q.id]).length;
 const daily = DATA.quests.filter(q=>q.reset==='Daily');
 const weekly = DATA.quests.filter(q=>q.reset==='Weekly');
 document.getElementById('dashboard').innerHTML = `
   <div class="notice"><b>Profile:</b> You already have a <b>Caravel</b>. The app prioritizes Carrack Advance materials, Crow Coins, barter count, and weekly sea monster quests.</div>
   <div class="grid">
    <div class="card"><h3>Today's Focus</h3><ol class="priorityList"><li>Complete S+ Oquilla/Ravikel dailies.</li><li>Use barter refreshes for Carrack materials and Crow Coins.</li><li>Do weekly Candidum, Nineshark, Black Rust before reset.</li><li>Skip Carrack-only hunts unless joining a group.</li></ol></div>
    <div class="card"><h3>Core Progress</h3><p>${completed}/${core.length} high-priority tasks checked.</p><div class="progress"><div class="bar" style="width:${Math.round(completed/core.length*100)}%"></div></div><p class="muted">Barters: ${profile.barters} · Crow Coins: ${profile.crowCoins}</p></div>
    <div class="card"><h3>Quest Counts</h3><p>${daily.length} daily/repeatable entries</p><p>${weekly.length} weekly entries</p><p class="muted">This database is built for Caravel → Carrack Advance.</p></div>
   </div>
   <h2>S+ / S Tasks</h2><div class="grid">${core.map(questCard).join('')}</div>`;
 attachDone();
}
function renderQuests(){
 const el=document.getElementById('quests');
 el.innerHTML=`<div class="controls"><input id="qSearch" placeholder="Search quest, NPC, location..." style="max-width:260px"><select id="qPriority"><option value="">All priorities</option><option>S+</option><option>S</option><option>A</option><option>B</option></select><select id="qReset"><option value="">All resets</option><option>Daily</option><option>Weekly</option><option>Repeatable</option></select><select id="qSolo"><option value="">All content types</option><option>Solo</option><option>Solo Recommended</option><option>Party Optional</option><option>Guild Required</option></select></div><div id="questGrid" class="grid"></div>`;
 const draw=()=>{
  const s=document.getElementById('qSearch').value.toLowerCase(), p=document.getElementById('qPriority').value, r=document.getElementById('qReset').value, so=document.getElementById('qSolo').value;
  const qs=DATA.quests.filter(q=>(!p||q.priority===p)&&(!r||q.reset===r)&&(!so||q.solo===so)&&JSON.stringify(q).toLowerCase().includes(s));
  document.getElementById('questGrid').innerHTML=qs.map(questCard).join('') || '<div class="card">No quests found.</div>'; attachDone();
 };
 ['qSearch','qPriority','qReset','qSolo'].forEach(id=>document.getElementById(id).oninput=draw); draw();
}
function renderMaterials(){
 document.getElementById('materials').innerHTML=`<div class="notice">Enter what you own. Progress saves automatically in your browser.</div><div class="grid">${DATA.materials.map(m=>{const have=matHave[m.id]??m.have; const pct=Math.min(100,Math.round(have/m.need*100)); return `<div class="card"><h3>${m.name}</h3>${badge(m.priority,m.priority)}<p><b>Need:</b> ${m.need} · <b>Have:</b> <input class="materialInput" data-id="${m.id}" type="number" min="0" value="${have}"></p><div class="progress"><div class="bar" style="width:${pct}%"></div></div><p><b>Best source:</b> ${m.source}</p><p class="muted">${m.note}</p></div>`}).join('')}</div>`;
 document.querySelectorAll('.materialInput').forEach(inp=>inp.oninput=e=>{matHave[e.target.dataset.id]=+e.target.value;store.set('bdo_mat_have',matHave);renderMaterials();renderPlanner();});
}
function renderShipParts(){document.getElementById('shipParts').innerHTML=`<div class="grid">${DATA.shipParts.map(p=>`<div class="card"><h3>${p.part}</h3><ul>${p.items.map(i=>`<li>${i}</li>`).join('')}</ul><p class="muted">${p.note}</p></div>`).join('')}</div>`}
function renderMonsters(){document.getElementById('monsters').innerHTML=`<div class="grid">${DATA.monsters.map(m=>`<div class="card"><h3>${m.name}</h3>${badge(m.solo)} ${badge(m.ship)} ${badge(m.difficulty)}<p><b>Drops/Use:</b> ${m.drops}</p><p><b>Tip:</b> ${m.tip}</p></div>`).join('')}</div>`}
function renderSailors(){document.getElementById('sailors').innerHTML=`<div class="grid">${DATA.sailors.map(s=>`<div class="card"><h3>${s.name}</h3>${badge('Rating '+s.rating)}<p><b>Best for:</b> ${s.best}</p><p class="muted">${s.note}</p></div>`).join('')}</div>`}
function renderPlanner(){
 const missing = DATA.materials.filter(m=>(matHave[m.id]??0)<m.need).sort((a,b)=>({ 'S+':0,S:1,A:2,B:3}[a.priority]-{'S+':0,S:1,A:2,B:3}[b.priority])).slice(0,5);
 const tasks = DATA.quests.filter(q=>!done[q.id] && ['S+','S'].includes(q.priority) && q.stage!=='Skip until Carrack unless carried').slice(0,8);
 document.getElementById('planner').innerHTML=`<div class="grid"><div class="card"><h3>Next Tasks</h3><ol>${tasks.map(q=>`<li><b>${q.name}</b><br><span class="muted">${q.npc} · ${q.location} · ${q.solo}</span></li>`).join('')}</ol></div><div class="card"><h3>Biggest Missing Materials</h3><ol>${missing.map(m=>`<li><b>${m.name}</b> — ${(matHave[m.id]??0)}/${m.need}<br><span class="muted">${m.source}</span></li>`).join('')}</ol></div><div class="card"><h3>Caravel Advice</h3><p>Do all S+ content now. For Very Hard content marked Party Optional, try it only if your Caravel gear feels comfortable, otherwise group up or wait for Carrack.</p></div></div>`;
}
function renderSettings(){document.getElementById('settings').innerHTML=`<div class="grid"><div class="card"><h3>Export Progress</h3><button id="exportBtn">Copy save data</button><textarea id="exportBox" rows="8" style="width:100%;margin-top:10px;background:#02070b;color:#f4ead4"></textarea></div><div class="card"><h3>Import Progress</h3><textarea id="importBox" rows="8" style="width:100%;background:#02070b;color:#f4ead4"></textarea><button id="importBtn">Import</button></div></div><p class="footerNote">All progress is saved locally in your browser. Opening the app on another device needs an export/import.</p>`;document.getElementById('exportBtn').onclick=()=>{document.getElementById('exportBox').value=JSON.stringify({done,matHave,profile},null,2)};document.getElementById('importBtn').onclick=()=>{try{const v=JSON.parse(document.getElementById('importBox').value);done=v.done||{};matHave=v.matHave||{};profile=v.profile||profile;store.set('bdo_done',done);store.set('bdo_mat_have',matHave);store.set('bdo_profile',profile);location.reload()}catch(e){alert('Invalid save data')}}}
function renderAll(){renderDashboard();renderQuests();renderMaterials();renderShipParts();renderMonsters();renderSailors();renderPlanner();renderSettings()}
renderAll();
