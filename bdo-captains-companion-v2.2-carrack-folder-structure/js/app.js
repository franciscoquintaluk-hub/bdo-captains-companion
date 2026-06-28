const DATA = window.BDO_DATA;

const store = {
  get(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

let done = store.get('bdo_done_v21', {});
let matHave = store.get('bdo_mat_have_v21', {});
let profile = store.get('bdo_profile_v21', { barters: 200, crowCoins: 1400 });

const titles = {
  dashboard: ['Dashboard', 'Your priority route from Caravel to Carrack Advance.'],
  quests: ['Quest Database', 'Daily and weekly sailing/barter quests with NPC, location, priority, solo/group tag and best reward.'],
  materials: ['Carrack Materials', 'Track the key materials needed for Carrack Advance and later blue Carrack gear.'],
  shipParts: ['Ship Parts', 'Gear stages from Caravel to Carrack Advance and blue gear.'],
  monsters: ['Sea Monsters', 'What you can solo with Caravel and what to group for.'],
  sailors: ['Sailors', 'Simple sailor recommendations for bartering and sea content.'],
  planner: ['Smart Planner', 'What to do next based on your Caravel stage.'],
  settings: ['Settings', 'Export and import your saved progress.']
};

function priorityClass(value) {
  if (value === 'S+') return 'Splus';
  return String(value).replace(/\s+/g, '');
}

function badge(text, cls = text) {
  return `<span class="badge ${priorityClass(cls)}">${text}</span>`;
}

function saveProfile() {
  store.set('bdo_profile_v21', profile);
}

function showPage(id) {
  document.querySelectorAll('.navBtn').forEach(btn => btn.classList.toggle('active', btn.dataset.page === id));
  document.querySelectorAll('.page').forEach(page => page.classList.toggle('active', page.id === id));
  document.getElementById('pageTitle').textContent = titles[id][0];
  document.getElementById('pageSubtitle').textContent = titles[id][1];
}

function questCard(q) {
  return `
    <article class="card quest">
      <input class="doneBox" type="checkbox" data-id="${q.id}" ${done[q.id] ? 'checked' : ''} aria-label="Mark ${q.name} complete" />
      <h3>${q.name}</h3>
      <div class="pillRow">
        ${badge(q.priority)} ${badge(q.reset)} ${badge(q.solo)} ${badge(q.ship)}
      </div>
      <div class="kv">
        <b>NPC</b><span>${q.npc}</span>
        <b>Location</b><span>${q.location}</span>
        <b>How</b><span>${q.objective}</span>
        <b>Best reward</b><span>⭐ ${q.bestReward}</span>
        <b>Why</b><span>${q.why}</span>
        <b>Info</b><span>${q.difficulty} · ${q.time} · ${q.region}</span>
      </div>
      <p class="muted"><b>Priority note:</b> ${q.stage}</p>
    </article>`;
}

function attachDone() {
  document.querySelectorAll('.doneBox').forEach(cb => {
    cb.onchange = event => {
      done[event.target.dataset.id] = event.target.checked;
      store.set('bdo_done_v21', done);
      renderDashboard();
      renderPlanner();
    };
  });
}

function renderDashboard() {
  const core = DATA.quests.filter(q => ['S+', 'S'].includes(q.priority));
  const completed = core.filter(q => done[q.id]).length;
  const dailies = DATA.quests.filter(q => q.reset === 'Daily').length;
  const weeklies = DATA.quests.filter(q => q.reset === 'Weekly').length;

  document.getElementById('dashboard').innerHTML = `
    <div class="notice">
      <b>Account setup:</b> You already have an <b>Epheria Caravel</b>. This app skips Sailboat advice and focuses on <b>Carrack Advance</b>, then <b>blue Carrack gear</b>.
    </div>
    <div class="grid">
      <article class="card">
        <h3>Today's Focus</h3>
        <ol class="priorityList">
          <li>Do S+ Oquilla / Ravikel dailies.</li>
          <li>Use barter refreshes for Crow Coins and Carrack materials.</li>
          <li>Complete weekly Candidum, Nineshark and Black Rust before reset.</li>
          <li>Group for Very Hard content if Caravel solo feels too slow.</li>
        </ol>
      </article>
      <article class="card">
        <h3>Core Progress</h3>
        <p>${completed}/${core.length} S+/S tasks checked.</p>
        <div class="progress"><div class="bar" style="width:${core.length ? Math.round(completed / core.length * 100) : 0}%"></div></div>
        <p>Barters: <b>${profile.barters}</b> · Crow Coins: <b>${profile.crowCoins}</b></p>
        <p>Dailies: <b>${dailies}</b> · Weeklies: <b>${weeklies}</b></p>
      </article>
      <article class="card">
        <h3>Carrack Structure v2.2</h3>
        <p>This version uses a proper folder structure for PC upload while staying focused only on Carrack progression.</p>
        <p class="muted">Current structure: <code>/data</code> for Carrack data, <code>/js</code> for app logic, <code>/css</code> for design, and <code>/assets</code> for future NPC/item/ship images.</p>
      </article>
    </div>
    <h2>S+ / S Priority Tasks</h2>
    <div class="grid">${core.map(questCard).join('')}</div>`;
  attachDone();
}

function renderQuests() {
  document.getElementById('quests').innerHTML = `
    <div class="controls">
      <input id="qSearch" placeholder="Search quest, NPC, reward..." />
      <select id="qPriority"><option value="">All priorities</option><option>S+</option><option>S</option><option>A</option><option>B</option></select>
      <select id="qReset"><option value="">All resets</option><option>Daily</option><option>Weekly</option><option>Repeatable</option></select>
      <select id="qSolo"><option value="">All content types</option><option>Solo</option><option>Solo Recommended</option><option>Party Optional</option></select>
    </div>
    <div id="questGrid" class="grid"></div>`;

  const draw = () => {
    const search = document.getElementById('qSearch').value.toLowerCase();
    const priority = document.getElementById('qPriority').value;
    const reset = document.getElementById('qReset').value;
    const solo = document.getElementById('qSolo').value;
    const quests = DATA.quests.filter(q =>
      (!priority || q.priority === priority) &&
      (!reset || q.reset === reset) &&
      (!solo || q.solo === solo) &&
      JSON.stringify(q).toLowerCase().includes(search)
    );
    document.getElementById('questGrid').innerHTML = quests.length ? quests.map(questCard).join('') : '<p>No quests found.</p>';
    attachDone();
  };

  ['qSearch', 'qPriority', 'qReset', 'qSolo'].forEach(id => document.getElementById(id).addEventListener('input', draw));
  draw();
}

function renderMaterials() {
  document.getElementById('materials').innerHTML = `
    <div class="notice">Enter what you own. Progress saves automatically in this browser.</div>
    <div class="grid">
      ${DATA.materials.map(m => {
        const have = Number(matHave[m.id] ?? m.have ?? 0);
        const pct = Math.min(100, Math.round((have / m.need) * 100));
        return `<article class="card">
          <h3>${m.name}</h3>
          ${badge(m.priority)}
          <p>Need: <b>${m.need}</b> · Have: <input class="materialInput" data-id="${m.id}" type="number" min="0" value="${have}" /></p>
          <div class="progress"><div class="bar" style="width:${pct}%"></div></div>
          <p><b>Best source:</b> ${m.source}</p>
          <p class="muted">${m.note}</p>
        </article>`;
      }).join('')}
    </div>`;

  document.querySelectorAll('.materialInput').forEach(input => {
    input.oninput = event => {
      matHave[event.target.dataset.id] = Number(event.target.value);
      store.set('bdo_mat_have_v21', matHave);
      renderPlanner();
    };
  });
}

function renderShipParts() {
  document.getElementById('shipParts').innerHTML = `<div class="grid">${DATA.shipParts.map(p => `
    <article class="card">
      <h3>${p.part}</h3>
      <ul>${p.items.map(item => `<li>${item}</li>`).join('')}</ul>
      <p class="muted">${p.note}</p>
    </article>`).join('')}</div>`;
}

function renderMonsters() {
  document.getElementById('monsters').innerHTML = `<div class="grid">${DATA.monsters.map(m => `
    <article class="card">
      <h3>${m.name}</h3>
      ${badge(m.solo)} ${badge(m.ship)} ${badge(m.difficulty)}
      <p><b>Drops / use:</b> ${m.drops}</p>
      <p class="muted"><b>Tip:</b> ${m.tip}</p>
    </article>`).join('')}</div>`;
}

function renderSailors() {
  document.getElementById('sailors').innerHTML = `<div class="grid">${DATA.sailors.map(s => `
    <article class="card">
      <h3>${s.name}</h3>
      ${badge('Rating ' + s.rating, s.rating)}
      <p><b>Best for:</b> ${s.best}</p>
      <p class="muted">${s.note}</p>
    </article>`).join('')}</div>`;
}

function renderPlanner() {
  const missing = DATA.materials
    .map(m => ({ ...m, haveNow: Number(matHave[m.id] ?? m.have ?? 0) }))
    .filter(m => m.haveNow < m.need)
    .sort((a, b) => (a.haveNow / a.need) - (b.haveNow / b.need))
    .slice(0, 5);
  const tasks = DATA.quests.filter(q => !done[q.id] && ['S+', 'S'].includes(q.priority)).slice(0, 8);

  document.getElementById('planner').innerHTML = `
    <div class="grid">
      <article class="card">
        <h3>Next Tasks</h3>
        ${tasks.map(q => `<div class="routeStep"><b>${q.name}</b><br><span class="muted">${q.npc} · ${q.location} · ${q.solo}</span></div>`).join('') || '<p>All core tasks checked.</p>'}
      </article>
      <article class="card">
        <h3>Biggest Missing Materials</h3>
        ${missing.map(m => `<div class="routeStep"><b>${m.name}</b> — ${m.haveNow}/${m.need}<br><span class="muted">${m.source}</span></div>`).join('') || '<p>All tracked materials complete.</p>'}
      </article>
      <article class="card">
        <h3>Caravel Advice</h3>
        <p>Do all S+ content now. For Very Hard content marked Party Optional, try solo once, then group if it wastes time.</p>
        <p class="muted">Main path: Caravel → Carrack Advance → Carrack green gear → blue Carrack gear.</p>
      </article>
    </div>`;
}

function renderSettings() {
  document.getElementById('settings').innerHTML = `
    <div class="grid">
      <article class="card">
        <h3>Export Progress</h3>
        <button id="exportBtn" type="button">Copy save data</button>
        <textarea id="exportBox" placeholder="Your save data will appear here"></textarea>
      </article>
      <article class="card">
        <h3>Import Progress</h3>
        <textarea id="importBox" placeholder="Paste save data here"></textarea>
        <button id="importBtn" type="button">Import</button>
        <p class="muted">Progress is saved locally in your browser. Export/import is needed for another device.</p>
      </article>
    </div>`;

  document.getElementById('exportBtn').onclick = async () => {
    const data = JSON.stringify({ done, matHave, profile }, null, 2);
    document.getElementById('exportBox').value = data;
    try { await navigator.clipboard.writeText(data); } catch {}
  };

  document.getElementById('importBtn').onclick = () => {
    try {
      const value = JSON.parse(document.getElementById('importBox').value);
      done = value.done || {};
      matHave = value.matHave || {};
      profile = value.profile || profile;
      store.set('bdo_done_v21', done);
      store.set('bdo_mat_have_v21', matHave);
      store.set('bdo_profile_v21', profile);
      location.reload();
    } catch {
      alert('Invalid save data');
    }
  };
}

function renderAll() {
  renderDashboard();
  renderQuests();
  renderMaterials();
  renderShipParts();
  renderMonsters();
  renderSailors();
  renderPlanner();
  renderSettings();
}

document.querySelectorAll('.navBtn').forEach(btn => btn.onclick = () => showPage(btn.dataset.page));
document.getElementById('barterCount').value = profile.barters;
document.getElementById('crowCoins').value = profile.crowCoins;
document.getElementById('barterCount').addEventListener('input', e => { profile.barters = Number(e.target.value); saveProfile(); renderDashboard(); renderPlanner(); });
document.getElementById('crowCoins').addEventListener('input', e => { profile.crowCoins = Number(e.target.value); saveProfile(); renderDashboard(); renderPlanner(); });
document.getElementById('resetDone').onclick = () => {
  if (confirm('Clear completed checkboxes?')) {
    done = {};
    store.set('bdo_done_v21', done);
    renderAll();
  }
};

renderAll();
