window.BDO_DATA = {
  app: {
    version: '3.4',
    title: "BDO Captain's Companion",
    currentShip: 'Epheria Caravel',
    mainGoal: 'Carrack Advance',
    nextGoal: 'Blue Carrack Gear'
  },
  nav: [
    { id:'dashboard', label:'Dashboard', icon:'🏠', subtitle:'Progress overview' },
    { id:'quests', label:'Quests', icon:'📋', subtitle:'Daily and weekly tasks' },
    { id:'materials', label:'Carrack Advance', icon:'⚓', subtitle:'Main mats and ship parts' },
    { id:'shipGear', label:'Ship Gear', icon:'🛠️', subtitle:'After Carrack' },
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
    {id:'croix-hekaru', type:'Daily', name:'Wanted: Hekaru', npc:'Croix', location:'Velia Wharf', priority:'A', tag:'Solo', time:'10-15 min', difficulty:'Medium', ship:'Caravel+', reward:'Sailing EXP + ship consumables', objective:'Defeat Hekaru for Croix.', why:'Useful sailing EXP if you are near Velia.'},
    {id:'croix-oceanstalker', type:'Daily', name:'Wanted: Ocean Stalker', npc:'Croix', location:'Velia Wharf', priority:'A', tag:'Solo', time:'10-15 min', difficulty:'Medium', ship:'Caravel+', reward:'Sailing EXP + ship consumables', objective:'Defeat Ocean Stalker for Croix.', why:'Do together with Hekaru.'},
    {id:'barter-refresh', type:'Repeatable', name:'Barter Refresh Routine', npc:'Barter UI', location:'Sea Map', priority:'S+', tag:'Solo', time:'Varies', difficulty:'Easy', ship:'Caravel', reward:'Crow Coins + Carrack materials', objective:'Target Crow Coin and Carrack material barter routes every refresh.', why:'Main progression engine.'},
    {id:'candidum-weekly', type:'Weekly', name:"Old Moon Guild's Candidum Hunter", npc:'Ravikel', location:"Oquilla's Eye", priority:'S+', tag:'Solo', time:'20-30 min', difficulty:'Hard', ship:'Caravel+ / Carrack faster', reward:'Crow Coin bundle / rare sea material', objective:'Defeat Candidum and return to Ravikel.', why:'Excellent weekly value.'},
    {id:'nineshark-weekly', type:'Weekly', name:"Old Moon Guild's Nineshark Hunter", npc:'Ravikel', location:"Oquilla's Eye", priority:'S+', tag:'Solo', time:'20-30 min', difficulty:'Hard', ship:'Caravel+ / Carrack faster', reward:'Crow Coin bundle / rare sea material', objective:'Defeat Nineshark and return to Ravikel.', why:'Never skip if you can complete it.'},
    {id:'blackrust-weekly', type:'Weekly', name:"Old Moon Guild's Black Rust Hunter", npc:'Ravikel', location:"Oquilla's Eye", priority:'S+', tag:'Party Optional', time:'25-40 min', difficulty:'Very Hard', ship:'Strong Caravel / Carrack', reward:'Rare bottleneck material / Crow Coins', objective:'Defeat Black Rust and return to Ravikel.', why:'Group if needed until ship is stronger.'}
  ],
  materials: [
    { id:'moon-vein-flax', category:'Main Material', iconUrl:'assets/images/items/moon-vein-flax-fabric.webp', name:'Moon Vein Flax Fabric', need:180, have:0, priority:'S+', source:'Ship Material Refresh barters, Young Nineshark daily, Ravinia shop, Oquilla Coin exchange, Khan Tendon drying', used:'Carrack Advance upgrade', note:'Advance amount: x180.', details:['Ship Material Refresh: swap selected [Level 5] barter items','Daily: Old Moon Guild’s Young Nineshark Hunter','Ravinia Crow Coin Shop: 50 Crow Coins','Exchange Oquilla Coins x50 from sailing dailies','Dry Khan’s Tendon x1 for x10'] },
    { id:'deep-tide-timber', category:'Main Material', iconUrl:'assets/images/items/deep-tide-dyed-standardized-timber-square.webp', name:'Deep Tide-Dyed Standardized Timber Square', need:144, have:0, priority:'S+', source:'Ship Material Refresh barters, Win-win Situation daily, Ravinia shop, Oquilla Coin exchange, Pirate Ship remains', used:'Carrack Advance upgrade', note:'Advance amount: x144.', details:['Ship Material Refresh: swap selected [Level 5] barter items','Daily: Win-win Situation','Ravinia Crow Coin Shop: 100 Crow Coins','Exchange Oquilla Coins x50 from sailing dailies','Chop Usable Pirate Ship’s Remains x1 for x1'] },
    { id:'brilliant-rock-salt', category:'Bottleneck', iconUrl:'assets/images/items/brilliant-rock-salt-ingot.webp', name:'Brilliant Rock Salt Ingot', need:35, have:0, priority:'S+', source:'Level 5 barter swaps, Ravinia shop, rare Black Rust/Candidum drop, Ravinia’s Favor II', used:'Carrack Advance upgrade', note:'Advance amount: x35. Big bottleneck.', details:['Ship Material Refresh unlocks at 1000 total barters','Trade Item Refresh unlocks at 1500 total barters','Ravinia Crow Coin Shop: 500 Crow Coins','Rare drop from Black Rust and Candidum','Ravinia’s Favor II gives x1'] },
    { id:'tear-of-ocean', category:'Bottleneck', iconUrl:'assets/images/items/tear-of-the-ocean.webp', name:'Tear of the Ocean', need:42, have:0, priority:'S+', source:'Ship Material Refresh barters, Young Black Rust daily, Oquilla Coin exchange, Ravinia shop, Otter Merchant exchange, Abyssal Gem alchemy', used:'Carrack Advance upgrade', note:'Advance amount: x42. Very important daily target.', details:['Ship Material Refresh: swap selected [Level 5] barter items','Daily: Old Moon Guild’s Young Black Rust Hunter','Exchange Oquilla Coins x50 from sailing dailies','Ravinia Crow Coin Shop: 500 Crow Coins','Otter Merchant exchange with Iridescent Coral','Simple Alchemy: Abyssal Gem x2'] },
    { id:'brilliant-pearl-shard', category:'Bottleneck', iconUrl:'assets/images/items/brilliant-pearl-shard.webp', name:'Brilliant Pearl Shard', need:35, have:0, priority:'S+', source:'Level 5 barter swaps, Ravinia shop, rare Nineshark/Candidum drop, Ravinia’s Favor I', used:'Carrack Advance upgrade', note:'Advance amount: x35. Big bottleneck.', details:['Ship Material Refresh unlocks at 1000 total barters','Trade Item Refresh unlocks at 1500 total barters','Ravinia Crow Coin Shop: 500 Crow Coins','Rare drop from Nineshark and Candidum','Ravinia’s Favor I gives x1'] }
  ],
  shipParts: [
    {
      id:'black-dragon-prow', name:'+10 Epheria Caravel: Black Dragon Prow', iconUrl:'assets/images/ship-parts/black-dragon-prow.webp', need:1, category:'Ship Part', basePart:{id:'brass-prow', name:'+10 Epheria Caravel: Brass Prow', qty:1, iconUrl:'assets/images/items/brass-prow.webp'},
      workshop:'Craft at the level 4 Ship Part Workshop in Epheria (2nd Floor, 1-4, Epheria), then enhance to +10.',
      materials:[
        {id:'ruddy-manganese-nodule', name:'Ruddy Manganese Nodule', qty:50, iconUrl:'assets/images/items/ruddy-manganese-nodule.webp'},
        {id:'enhanced-island-tree-coated-plywood', name:'Enhanced Island Tree Coated Plywood', qty:300, iconUrl:'assets/images/items/enhanced-island-tree-coated-plywood.webp'},
        {id:'seaweed-stalk', name:'Seaweed Stalk', qty:125, iconUrl:'assets/images/items/seaweed-stalk.webp'},
        {id:'great-ocean-dark-iron', name:'Great Ocean Dark Iron', qty:150, iconUrl:'assets/images/items/great-ocean-dark-iron.webp'}
      ]
    },
    {
      id:'upgraded-plating', name:'+10 Epheria Caravel: Upgraded Plating', iconUrl:'assets/images/ship-parts/upgraded-plating.webp', need:1, category:'Ship Part', basePart:{id:'upgraded-plating-base', name:'+10 Epheria Caravel: Upgraded Plating', qty:1, iconUrl:'assets/images/items/upgraded-plating.webp'},
      workshop:'Craft at the level 4 Ship Part Workshop in Epheria (2nd Floor, 1-4, Epheria), then enhance to +10.',
      materials:[
        {id:'pure-pearl-crystal', name:'Pure Pearl Crystal', qty:45, iconUrl:'assets/images/items/pure-pearl-crystal.webp'},
        {id:'cox-artifact-combat', name:'Cox Pirates’ Artifact (Combat)', qty:60, iconUrl:'assets/images/items/cox-artifact-combat.webp'},
        {id:'moon-scale-plywood', name:'Moon Scale Plywood', qty:200, iconUrl:'assets/images/items/moon-scale-plywood.webp'},
        {id:'cox-artifact-parley-beginner', name:'Cox Pirates’ Artifact (Parley Beginner)', qty:60, iconUrl:'assets/images/items/cox-artifact-parley-beginner.webp'}
      ]
    },
    {
      id:'mayna-cannon', name:'+10 Epheria Caravel: Mayna Cannon', iconUrl:'assets/images/ship-parts/mayna-cannon.webp', need:1, category:'Ship Part', basePart:{id:'verisha-cannon', name:'+10 Epheria Caravel: Verisha Cannon', qty:1, iconUrl:'assets/images/items/verisha-cannon.webp'},
      workshop:'Craft at the level 4 Ship Part Workshop in Epheria (2nd Floor, 1-4, Epheria), then enhance to +10.',
      materials:[
        {id:'tide-dyed-standardized-timber-square', name:'Tide-Dyed Standardized Timber Square', qty:180, iconUrl:'assets/images/items/tide-dyed-standardized-timber-square.webp'},
        {id:'cox-artifact-combat', name:'Cox Pirates’ Artifact (Combat)', qty:60, iconUrl:'assets/images/items/cox-artifact-combat.webp'},
        {id:'moon-scale-plywood', name:'Moon Scale Plywood', qty:200, iconUrl:'assets/images/items/moon-scale-plywood.webp'},
        {id:'bright-reef-piece', name:'Bright Reef Piece', qty:180, iconUrl:'assets/images/items/bright-reef-piece.webp'}
      ]
    },
    {
      id:'stratus-wind-sail', name:'+10 Epheria Caravel: Stratus Wind Sail', iconUrl:'assets/images/ship-parts/stratus-wind-sail.webp', need:1, category:'Ship Part', basePart:{id:'white-wind-sail', name:'+10 Epheria Caravel: White Wind Sail', qty:1, iconUrl:'assets/images/items/white-wind-sail.webp'},
      workshop:'Craft at the level 4 Ship Part Workshop in Epheria (2nd Floor, 1-4, Epheria), then enhance to +10.',
      materials:[
        {id:'ruddy-manganese-nodule', name:'Ruddy Manganese Nodule', qty:40, iconUrl:'assets/images/items/ruddy-manganese-nodule.webp'},
        {id:'cox-artifact-parley-expert', name:'Cox Pirates’ Artifact (Parley Expert)', qty:30, iconUrl:'assets/images/items/cox-artifact-parley-expert.webp'},
        {id:'seaweed-stalk', name:'Seaweed Stalk', qty:80, iconUrl:'assets/images/items/seaweed-stalk.webp'},
        {id:'luminous-cobalt-ingot', name:'Luminous Cobalt Ingot', qty:30, iconUrl:'assets/images/items/luminous-cobalt-ingot.webp'}
      ]
    }
  ],
  gear: [
    {stage:'1. Current Ship', title:'Epheria Caravel', status:'You already have this', items:['Use it for Oquilla dailies and barter loops','Keep repair materials and cannonballs stocked','Do not over-invest if it slows Carrack upgrade']},
    {stage:'2. Main Upgrade', title:'Carrack Advance', status:'Primary goal', items:['Best fit for bartering and storage','Needs the 4 enhanced Caravel parts + 5 Advance materials','Focus on Crow Coins, barter count and Oquilla weeklies']},
    {stage:'3. First Gear', title:'Carrack Green Gear', status:'After Carrack', items:['Use green gear first','Enhance steadily','Prepare blue gear materials while using the ship']},
    {stage:'4. End Goal', title:'Blue Carrack Gear', status:'Long term', items:['Blue Plating','Blue Cannon','Blue Sail','Blue Prow','Keep weekly sea monster routine active']}
  ],
  monsters: [
    {name:'Young Candidum', solo:'Solo', ship:'Caravel+', difficulty:'Medium', drops:'Quest materials', tip:'Good daily target.'},
    {name:'Young Nineshark', solo:'Solo', ship:'Caravel+', difficulty:'Medium', drops:'Quest materials', tip:'Combine with Candidum route.'},
    {name:'Young Black Rust', solo:'Party Optional', ship:'Strong Caravel+', difficulty:'Hard', drops:'Rare material route', tip:'Group if slow.'},
    {name:'Candidum', solo:'Solo', ship:'Caravel+ / Carrack faster', difficulty:'Hard', drops:'Weekly material', tip:'Worth weekly.'},
    {name:'Nineshark', solo:'Solo', ship:'Caravel+ / Carrack faster', difficulty:'Hard', drops:'Weekly material', tip:'Worth weekly.'},
    {name:'Black Rust', solo:'Party Optional', ship:'Strong Caravel / Carrack', difficulty:'Very Hard', drops:'Rare weekly material', tip:'Party recommended until stronger.'}
  ],
  sailors: [
    {name:'Innocent Sailor', rating:'S', role:'Bartering / speed routes', note:'Best general priority for your Advance goal.'},
    {name:'Goblin Sailor', rating:'A', role:'Speed focused routes', note:'Good for quick barter loops.'},
    {name:'Realistic Sailor', rating:'A', role:'Balanced stats', note:'Fine until you find better sailors.'},
    {name:'Giant Sailor', rating:'B', role:'Durability style', note:'Optional, not priority for Carrack rush.'}
  ]
};
