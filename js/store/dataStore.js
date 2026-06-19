export const b = 1;

function setJump() {
  switch (b) {
    case 1:
      return 1;
    case 2:
      return 1.7;
  }
}

function setG() {
  switch (b) {
    case 1:
      return 1;
    case 2:
      return 1.8;
  }
}
export const playerInfo = {
  size: 50 * b,
  hp: 20,
  jumpLimit: 3,
  speed: [
    {speed : 7 * b, nextTime: 50, renderInterval : 5},
    {speed :10 * b, nextTime: 100, renderInterval : 2},
    {speed : 15 * b, nextTime: 200, renderInterval :0},
  ],
  jump: 20 * setJump(),
  invincibleRemit: 600,
  energy: 5,
  factorInfo:{
    autoRecovery:0.1,
    requiredAmount: 100,
    effectTime: 6000
  }
};

export const worldInfo = {
  gravity: 3 ,
  accel: 1 * setG(),
  slowTime: 10,
  factorLimit: 6000,
};
export const enemyInfo = {
  size: 50 * b,
  frameInterval: 15,
};

export const bulletInfo = {
  size: 10 * b,
  speed: {
    player: 40 * b,
    enemy: 10 * b,
  },
  deadRemit: 300,
  cursorShotDamage: 100,
};

export const enemyInfoList = [
  //id,hp,speed,score,chargeLimit(発生),sizeX,sizeY
  ["enemy1", 10, 3 * b, 100, 20, 50, 50],
  ["enemy2", 15, 2 * b, 200, 10, 100, 50],
  ["enemy3", 50, 5 * b, 500, 4],
];

export const enemySampleImages = {
  enemy1: { src: "images/enemy1_run1.png" },
  enemy2: { src: "images/enemy2_run.png" },
};
export const enemyMoveClass = {
  enemy1: ["walk", "turn"],
  enemy2: ["fly", "turn", "dropShot"],
};

export const enemyShotInfoList = {
  enemy1: {src :"none",ratio:0.02 , size: 10 , speed:7 ,isG : false},
  enemy2: {src :"images/item/enemy2_bullet.png",ratio:0.01 , size: 50 , speed:5 ,isG : false},
};
export const enemyImages = {
  enemy1: [
    "images/enemy1_run1.png",
    "images/enemy1_run2.png",
    "images/enemy1_run3.png",
    "images/enemy1_shot1.png",
    "images/enemy1_shot2.png",
  ],
  enemy2: [
    "images/enemy2_run.png",
    "images/enemy2_run.png",
    "images/enemy2_run.png",
    "images/enemy2_shot.png",
    "images/enemy2_shot.png",
  ],
};

export const playerImages = {
  runCursor: 0,
  run: [
    "images/player_run1.png",
    "images/player_run2.png",
    "images/player_run3.png",
    "images/player_run4.png",
  ],
  jump: "images/player_jump.png",
  stand: ["images/player_stand1.png", "images/player_stand1.png"],
};

export const tileInfo = {
  size: 50 * b,
};

export const tileImages = {
  normal1: { src: "images/ground_normal1.png", class: "block" },
  normal1_2: { src: "images/ground_normal1_2.png", class: "block" },
  normal1_3: { src: "images/ground_normal1_3.png", class: "block" },
  normal1_4: { src: "images/ground_normal1_4.png", class: "block" },
  normal2: { src: "images/ground_normal2.png", class: "block" },
  normal2_2: { src: "images/ground_normal2_2.png", class: "block" },
  normal2_3: { src: "images/ground_normal2_3.png", class: "block" },
  normal2_4: { src: "images/ground_normal2_4.png", class: "block" },
  normal3: { src: "images/ground_normal3.png", class: "block" },
  normal3_2: { src: "images/ground_normal3_2.png", class: "block" },
  normal3_3: { src: "images/ground_normal3_3.png", class: "block" },
  normal3_4: { src: "images/ground_normal3_4.png", class: "block" },
  normal0: { src: "images/ground_none.png", class: "block" },
  footing1: { src: "images/ground_footing1.png", class: "footing" },
  footing2: { src: "images/ground_footing2.png", class: "footing" },
  footing3: { src: "images/ground_footing3.png", class: "footing" },
  footing4: { src: "images/ground_footing4.png", class: "footing" },
  footing5: { src: "images/ground_footing5.png", class: "back" },
  footing6: { src: "images/ground_footing6.png", class: "back" },
  footing7: { src: "images/ground_footing7.png", class: "back" },
  footing8: { src: "images/ground_footing8.png", class: "back" },
  object1: { src: "images/block_cardboard.png", class: "block" },
  pole1: { src: "images/ground_pole1.png", class: "back" },
  pole2: { src: "images/ground_pole2.png", class: "back" },
  pole3: { src: "images/ground_pole3.png", class: "footing" },
  pole4: { src: "images/ground_pole4.png", class: "footing" },
  cable: { src: "images/ground_footing_cable.png", class: "footing" },
  stoneWall1: { src: "images/background/stoneWall1.png", class: "back" },
  stoneWall2: { src: "images/background/stoneWall2.png", class: "back" },
  stoneWall3: { src: "images/background/stoneWall3.png", class: "back" },
  stoneWall4: { src: "images/background/stoneWall4.png", class: "back" },
  stoneWall5: { src: "images/background/stoneWall_depth1.png", class: "back" },
  stoneWall6: { src: "images/background/stoneWall_depth2.png", class: "back" },
  stoneWall7: { src: "images/background/stoneWall_depth3.png", class: "back" },
  stoneWall8: { src: "images/background/stoneWall_depth4.png", class: "back" },
  stoneWall9: { src: "images/background/stoneWall_depth5.png", class: "back" },
  stoneWall11: { src: "images/background/stoneWall_depth7.png", class: "back" },
  stoneWall12: { src: "images/background/stoneWall_depth8.png", class: "back" },
  stoneWall13: { src: "images/background/stoneWall_depth9.png", class: "back" },
  stoneWall14: {
    src: "images/background/stoneWall_depth2_2.png",
    class: "back",
  },
  stoneWall15: {
    src: "images/background/stoneWall_depth3_3.png",
    class: "back",
  },
  stoneWall16: {
    src: "images/background/stoneWall_depth5_2.png",
    class: "back",
  },
  stoneWall17: {
    src: "images/background/stoneWall_depth5_3.png",
    class: "back",
  },
  stoneWall18: {
    src: "images/background/stoneWall_depth6_2.png",
    class: "back",
  },
  stoneWall19: {
    src: "images/background/stoneWall_depth6_3.png",
    class: "back",
  },
  stoneWall20: {
    src: "images/background/stoneWall_depth8_2.png",
    class: "back",
  },
  stoneWall21: {
    src: "images/background/stoneWall_depth9_3.png",
    class: "back",
  },
  stoneWall22: {
    src: "images/background/stoneWall_depth10_3.png",
    class: "back",
  },
  home1: {
    src: "images/dotpict_20260122_080553.png", class: "back"
  },
  home2: {
    src: "images/dotpict_20260122_080656.png", class: "back"
  },
  home3: {
    src: "images/dotpict_20260122_080805.png", class: "back"
  },
  home4: {
    src: "images/dotpict_20260122_081448.png", class: "block"
  },
  home5: {
    src: "images/dotpict_20260122_081534.png", class: "block"
  },
  home6: {
    src: "images/dotpict_20260122_081637.png", class: "block"
  },
  home7: {
    src: "images/dotpict_20260122_081739.png", class: "block"
  },
  home8: {
    src: "images/dotpict_20260122_081850.png", class: "block"
  },
  home9: {
    src: "images/dotpict_20260122_082018.png", class: "block"
  },
  barrier:{
    src: "",class:"block"
  }
  
};



export const itemInfo = {
  general:{size:50 * b},
  coin10:{src: "images/item/coin10.png", type:"addScore", value:10, count:"once"},
  coin100:{src: "images/item/coin100.png", type:"addScore", value:100, count:"once"},
  energyUp:{src:"images/item/energyItem.png", type:"energyUp", value:100, count: "once" },
  lifeUp:{src:"images/item/lifeUpItem.png", type:"lifeUp", value:1, count: "once" }
}

export const optionTileImages = {
  start: { src: "images/start.png", class: "hidden" },
  goal: { src: "images/goal.png", class: "hidden" },
};

export const effectInfo = {
  reticle: {
    interval: 3,
    type: "remain",
    follow: "true",
    position: "center",
    size: 40 * b,
  },
  dead: {
    interval: 2,
    type: "disappear",
    follow: "true",
    position: "center",
    size: 50 * b,
  },
  jump: {
    interval: 3,
    type: "disappear",
    follow: "false",
    position: "bottom",
    size: 50 * b,
  },
  dashSmoke:{
    interval:2,
    type:"disappear",
    follow: "false",
    position: "back",
    width: 100* b,
    height: 50 * b
  }
};

export const effectImages = {
  reticle: [
    "images/effect/reticle1.png",
    "images/effect/reticle2.png",
    "images/effect/reticle3.png",
  ],
  jump: ["images/effect/jump2.png", "images/effect/jump3.png"],
  dashSmoke:["images/effect/dashSmoke1.png","images/effect/dashSmoke2.png","images/effect/dashSmoke3.png","images/effect/dashSmoke4.png","images/effect/dashSmoke5.png","images/effect/dashSmoke6.png"]
};

export function decodeMap(encodedMap) {
  return encodedMap.map((row) =>
    row.map((cell) => {
      if (cell === 0) return null;

      // --- Enemy ---
      if (cell.major === "enemy") {
        return {
          type: "enemy",
          id: cell.minor,
          // 追加で enemyInfoList から情報を詰めることも可能
        };
      }

      // --- Rule: start / goal 等 ---
      if (cell.major === "rule") {
        return {
          type: "special",
          id: cell.minor,
          icon: `./images/${cell.minor}.png`,
        };
      }

      // --- Tile（地面） ---
      if (cell.major === "ground") {
        return {
          type: "tile",
          base: cell.minor,
          id: cell.minor,
        };
      }

      return null;
    })
  );
}
