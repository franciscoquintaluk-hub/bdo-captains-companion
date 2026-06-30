window.BDO_DATA = {
  app: {
    version: '3.3',
    title: "BDO Captain's Companion",
    currentShip: 'Epheria Caravel',
    mainGoal: 'Carrack Advance',
    nextGoal: 'Blue Carrack Gear'
  },
  nav: [
    { id:'dashboard', label:'Dashboard', icon:'🏠', subtitle:'Progress overview' },
    { id:'quests', label:'Quests', icon:'📋', subtitle:'Daily and weekly tasks' },
    { id:'materials', label:'Materials', icon:'📦', subtitle:'Carrack calculator' },
    { id:'shipGear', label:'Ship Gear', icon:'🛠️', subtitle:'Advance and blue gear' },
    { id:'monsters', label:'Sea Monsters', icon:'🐋', subtitle:'Solo or group targets' },
    { id:'sailors', label:'Sailors', icon:'🧭', subtitle:'Crew priorities' },
    { id:'planner', label:'Planner', icon:'⭐', subtitle:'What to do next' },
    { id:'settings', label:'Settings', icon:'⚙️', subtitle:'Save and reset' }
  ],
  quests: [
    {id:'ravikel-test', type:'Daily', name:"Ravikel's Test", npc:'Ravikel', location:"Oquilla's Eye Wharf", priority:'S+', tag:'Solo', time:'10-20 min', difficulty:'Medium', ship:'Caravel+', reward:'Pick ship upgrade material / rare sea material', objective:'Kill the requested young sea monster target and return to Ravikel.', why:'Core daily habit for Carrack Advance progress.'},
    {id:'young-candidum', type:'Daily', name:"Old Moon Guild's Young Candidum Hunter", npc:'Ravikel', location:"Oquilla's Eye", priority:'S+', tag:'Solo', time:'15 min', difficulty:'Medium', ship:'Caravel+', reward:'Carrack material option', objective:'Kill Young Candidum and return to Ravikel.', why:'Fast daily material progress.'},
    {id:'young-nineshark', type:'Daily', name:"Old Moon Guild's Young Nineshark Hunter", npc:'Ravikel', location:"Oquilla's Eye", priority:'S+', tag:'Solo', time:'15 min', difficulty:'Medium', ship:'Caravel+', reward:'Rare sea material option', objective:'Kill Young Nineshark and return to Ravikel.', why:'Good to combine with Young Candidum.'},
    {id:'young-blackrust', type:'Daily', name:"Old Moon Guild's Young Black Rust Hunter", npc:'Ravikel', location:"Oquilla's Eye", priority:'S+', tag:'Party Optional', time:'15-25 min', difficulty:'Hard', ship:'Strong Caravel+', reward:'Tear / rare bottleneck material when offered', objective:'Kill Young Black Rust and return to Ravikel.', why:'High value but slower if your ship gear is weak.'},
    {id:'otter-merchants', type:'Daily', name:'For the Young Otter Merchants', npc:'Curio / Otter Merchants', location:"Oquilla's Eye", priority:'S', tag:'Solo', time:'5 min', difficulty:'Easy', ship:'Any', reward:"Cox Pirates' Artifact / ship material", objective:'Complete the otter merchant request around Oquilla.', why:'Very fast when already at Oquilla.'},
    {id:'precious-coral', type:'Daily', name:'Precious Coral Piece', npc:'Oquilla NPC', location:"Oquilla's Eye", priority:'S', tag:'Solo', time:'5-10 min', difficulty:'Easy', ship:'Any', reward:'Seaweed Stalk / Carrack support material', objective:'Gather or exchange the requested coral-related item.', why:'Low effort daily material filler.'},
    {id:'guild-charity', type:'Daily', name:'Our Guild is not a Charity Group', npc:'Old Moon Guild NPC', location:"Oquilla's Eye", priority:'S', tag:'Solo', time:'5-10 min', difficulty:'Easy', ship:'Caravel+', reward:'Cobalt Ingot / ship material option', objective:'Complete the requested delivery or collection task.', why:'Good reward for little effort.'},
    {id:'croix-hekaru', type:'Daily', name:'Wanted: Hekaru', npc:'Croix', location:'Velia Wharf', priority:'A', tag:'Solo', time:'10-15 min', difficulty:'Medium', ship:'Caravel+', reward:'Sailing EXP + ship consumables', objective:'Defeat Hekaru for Croix.', why:'Useful sailing EXP if you are near Velia.'},
    {id:'croix-oceanstalker', type:'Daily', name:'Wanted: Ocean Stalker', npc:'Croix', location:'Velia Wharf', priority:'A', tag:'Solo', time:'10-15 min', difficulty:'Medium', ship:'Caravel+', reward:'Sailing EXP + ship consumables', objective:'Defeat Ocean Stalker for Croix.', why:'Do together with Hekaru.'},
    {id:'barter-refresh', type:'Repeatable', name:'Barter Refresh Routine', npc:'Barter UI', location:'Sea Map', priority:'S+', tag:'Solo', time:'Varies', difficulty:'Easy', ship:'Caravel', reward:'Crow Coins + Carrack materials', objective:'Target Crow Coin and Carrack material barter routes every refresh.', why:'Main progression engine.'},
    {id:'candidum-weekly', type:'Weekly', name:"Old Moon Guild's Candidum Hunter", npc:'Ravikel', location:"Oquilla's Eye", priority:'S+', tag:'Solo', time:'20-30 min', difficulty:'Hard', ship:'Caravel+ / Carrack faster', reward:'Crow Coin bundle / rare sea material', objective:'Defeat Candidum and return to Ravikel.', why:'Excellent weekly value.'},
    {id:'nineshark-weekly', type:'Weekly', name:"Old Moon Guild's Nineshark Hunter", npc:'Ravikel', location:"Oquilla's Eye", priority:'S+', tag:'Solo', time:'20-30 min', difficulty:'Hard', ship:'Caravel+ / Carrack faster', reward:'Crow Coin bundle / rare sea material', objective:'Defeat Nineshark and return to Ravikel.', why:'Never skip if you can complete it.'},
    {id:'blackrust-weekly', type:'Weekly', name:"Old Moon Guild's Black Rust Hunter", npc:'Ravikel', location:"Oquilla's Eye", priority:'S+', tag:'Party Optional', time:'25-40 min', difficulty:'Very Hard', ship:'Strong Caravel / Carrack', reward:'Rare bottleneck material / Crow Coins', objective:'Defeat Black Rust and return to Ravikel.', why:'Group if needed until ship is stronger.'},
    {id:'croc-weekly', type:'Weekly', name:'Saltwater Crocodile Hunter', npc:'Oquilla / Ocean NPC', location:'Great Ocean', priority:'S', tag:'Party Optional', time:'30+ min', difficulty:'Very Hard', ship:'Strong Caravel+ / Carrack', reward:'Rare sea material', objective:'Defeat Saltwater Crocodiles.', why:'Good reward, but do not waste too much time if weak.'}
  ],
  materials: [
    {
      id:'ship-base', category:'Base', icon:'⛵', name:'Epheria Caravel', need:1, have:1, priority:'Done',
      source:'You already have this ship', used:'Base ship for Carrack Advance', note:'Base ship checked into a wharf manager.',
      details:['Your current ship. Upgrade path: Epheria Caravel → Epheria Carrack: Advance.']
    },
    {
      id:'black-dragon-prow', category:'Ship Part', iconUrl:'https://blackdesertfoundry.com/items/new_icon/03_etc/09_petitem/00049655.png', name:'+10 Epheria Caravel: Black Dragon Prow', need:1, have:0, priority:'S+',
      source:'Craft in Epheria Ship Part Workshop Lv.4, then enhance to +10', used:'Carrack Advance upgrade', note:'Required Advance upgrade part.',
      details:['Needs +10 Epheria Caravel: Brass Prow x1','Ruddy Manganese Nodule x50','Enhanced Island Tree Coated Plywood x300','Seaweed Stalk x125','Great Ocean Dark Iron x150']
    },
    {
      id:'upgraded-plating', category:'Ship Part', iconUrl:'https://blackdesertfoundry.com/items/new_icon/03_etc/09_petitem/00049656.png', name:'+10 Epheria Caravel: Upgraded Plating', need:1, have:0, priority:'S+',
      source:'Craft in Epheria Ship Part Workshop Lv.4, then enhance to +10', used:'Carrack Advance upgrade', note:'Required Advance upgrade part.',
      details:['Needs +10 Epheria Caravel: Upgraded Plating x1','Pure Pearl Crystal x45','Cox Pirates’ Artifact (Combat) x60','Moon Scale Plywood x200','Cox Pirates’ Artifact (Parley Beginner) x60']
    },
    {
      id:'mayna-cannon', category:'Ship Part', iconUrl:'https://blackdesertfoundry.com/items/new_icon/03_etc/09_petitem/00049657.png', name:'+10 Epheria Caravel: Mayna Cannon', need:1, have:0, priority:'S+',
      source:'Craft in Epheria Ship Part Workshop Lv.4, then enhance to +10', used:'Carrack Advance upgrade', note:'Required Advance upgrade part.',
      details:['Needs +10 Epheria Caravel: Verisha Cannon x1','Tide-Dyed Standardized Timber Square x180','Cox Pirates’ Artifact (Combat) x60','Moon Scale Plywood x200','Bright Reef Piece x180']
    },
    {
      id:'stratus-sail', category:'Ship Part', iconUrl:'https://blackdesertfoundry.com/items/new_icon/03_etc/09_petitem/00049658.png', name:'+10 Epheria Caravel: Stratus Wind Sail', need:1, have:0, priority:'S+',
      source:'Craft in Epheria Ship Part Workshop Lv.4, then enhance to +10', used:'Carrack Advance upgrade', note:'Required Advance upgrade part.',
      details:['Needs +10 Epheria Caravel: White Wind Sail x1','Ruddy Manganese Nodule x40','Cox Pirates’ Artifact (Parley Expert) x30','Seaweed Stalk x80','Luminous Cobalt Ingot x30']
    },
    {
      id:'moon-vein-flax', category:'Main Material', iconUrl:'assets/images/items/moon-vein-flax-fabric.webp', name:'Moon Vein Flax Fabric', need:180, have:0, priority:'S+',
      source:'Ship Material Refresh barters, Young Nineshark daily, Ravinia shop, Oquilla Coin exchange, Khan Tendon drying', used:'Carrack Advance upgrade', note:'Advance amount: x180.',
      details:['Swap selected [Level 5] barter items in Ship Material Refresh','Daily: Old Moon Guild’s Young Nineshark Hunter','Buy from Ravinia for Crow Coins','Exchange Oquilla Coins from sailing dailies']
    },
    {
      id:'deep-tide-timber', category:'Main Material', iconUrl:'assets/images/items/deep-tide-dyed-standardized-timber-square.webp', name:'Deep Tide-Dyed Standardized Timber Square', need:144, have:0, priority:'S+',
      source:'Ship Material Refresh barters, Win-win Situation daily, Ravinia shop, Oquilla Coin exchange, Pirate Ship remains', used:'Carrack Advance upgrade', note:'Advance amount: x144.',
      details:['Swap selected [Level 5] barter items in Ship Material Refresh','Daily: Win-win Situation','Buy from Ravinia for Crow Coins','Chop Usable Pirate Ship’s Remains']
    },
    {
      id:'brilliant-rock-salt', category:'Bottleneck', iconUrl:'assets/images/items/brilliant-rock-salt-ingot.webp', name:'Brilliant Rock Salt Ingot', need:35, have:0, priority:'S+',
      source:'Level 5 barter swaps after barter unlock, Ravinia shop, rare Black Rust/Candidum drop, Ravinia’s Favor II', used:'Carrack Advance upgrade', note:'Advance amount: x35. Big bottleneck.',
      details:['Unlocks from refreshes after enough total barters','Buy from Ravinia for 500 Crow Coins','Rare drop from Black Rust and Candidum','Ravinia’s Favor II gives x1']
    },
    {
      id:'tear-of-ocean', category:'Bottleneck', iconUrl:'assets/images/items/tear-of-the-ocean.webp', name:'Tear of the Ocean', need:42, have:0, priority:'S+',
      source:'Ship Material Refresh barters, Young Black Rust daily, Oquilla Coin exchange, Ravinia shop, Otter Merchant exchange, Abyssal Gem alchemy', used:'Carrack Advance upgrade', note:'Advance amount: x42. Very important daily target.',
      details:['Daily: Old Moon Guild’s Young Black Rust Hunter','Exchange Oquilla Coins from sailing dailies','Buy from Ravinia for 500 Crow Coins','Otter Merchant exchange with Iridescent Coral','Simple Alchemy: Abyssal Gem x2']
    },
    {
      id:'brilliant-pearl-shard', category:'Bottleneck', iconUrl:'assets/images/items/brilliant-pearl-shard.webp', name:'Brilliant Pearl Shard', need:35, have:0, priority:'S+',
      source:'Level 5 barter swaps after barter unlock, Ravinia shop, rare Nineshark/Candidum drop, Ravinia’s Favor I', used:'Carrack Advance upgrade', note:'Advance amount: x35. Big bottleneck.',
      details:['Unlocks from refreshes after enough total barters','Buy from Ravinia for 500 Crow Coins','Rare drop from Nineshark and Candidum','Ravinia’s Favor I gives x1']
    }
  ],
  gear: [
    {stage:'1. Current Ship', title:'Epheria Caravel', status:'You already have this', items:['Use it for Oquilla dailies and barter loops','Keep repair materials and cannonballs stocked','Do not over-invest if it slows Carrack upgrade']},
    {stage:'2. Main Upgrade', title:'Carrack Advance', status:'Primary goal', items:['Best fit for bartering and storage','Focus on Crow Coins, barter count and Oquilla weeklies','Group up only for hard sea monsters if solo is too slow']},
    {stage:'3. First Gear', title:'Carrack Green Gear', status:'After Carrack', items:['Use green gear first','Enhance steadily','Prepare blue gear materials while using the ship']},
    {stage:'4. End Goal', title:'Blue Carrack Gear', status:'Long term', items:['Blue Plating','Blue Cannon','Blue Sail','Blue Prow','Keep weekly sea monster routine active']}
  ],
  monsters: [
    {name:'Young Candidum', solo:'Solo', ship:'Caravel+', difficulty:'Medium', drops:'Quest materials', tip:'Good daily target.'},
    {name:'Young Nineshark', solo:'Solo', ship:'Caravel+', difficulty:'Medium', drops:'Quest materials', tip:'Combine with Candidum route.'},
    {name:'Young Black Rust', solo:'Party Optional', ship:'Strong Caravel+', difficulty:'Hard', drops:'Rare material route', tip:'Group if slow.'},
    {name:'Candidum', solo:'Solo', ship:'Caravel+ / Carrack faster', difficulty:'Hard', drops:'Weekly material', tip:'Worth weekly.'},
    {name:'Nineshark', solo:'Solo', ship:'Caravel+ / Carrack faster', difficulty:'Hard', drops:'Weekly material', tip:'Worth weekly.'},
    {name:'Black Rust', solo:'Party Optional', ship:'Strong Caravel / Carrack', difficulty:'Very Hard', drops:'Rare weekly material', tip:'Party recommended until stronger.'},
    {name:'Saltwater Crocodile', solo:'Party Optional', ship:'Strong Caravel+ / Carrack', difficulty:'Very Hard', drops:'Rare sea material', tip:'Do not force if it wastes time.'}
  ],
  sailors: [
    {name:'Innocent Sailor', rating:'S', role:'Bartering / speed routes', note:'Best general priority for your Advance goal.'},
    {name:'Goblin Sailor', rating:'A', role:'Speed focused routes', note:'Good for quick barter loops.'},
    {name:'Realistic Sailor', rating:'A', role:'Balanced stats', note:'Fine until you find better sailors.'},
    {name:'Giant Sailor', rating:'B', role:'Durability style', note:'Optional, not priority for Carrack rush.'}
  ]
};
