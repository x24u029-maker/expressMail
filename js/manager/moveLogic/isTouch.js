import { playerInfo } from "../../store/dataStore.js";

let mapInfo = null;
let enemiesList = null;
let player = null;

export function isTouchSetMap(grinfo, enList,p) {
  mapInfo = grinfo;
  enemiesList = enList;
  player = p;
}

export function contactJudge(ob) {
  const judge = [];

  // 判定定義
  const checks = [
    {
      point: { x: ob.x, y: ob.y + ob.size },
      genre: "ground",
      move: (p) => p.x++,
    },
    {
      point: getWallPoint(ob),
      genre: "wall",
      move: (p) => p.y++,
    },
    {
      point: { x: ob.x + ob.size, y: ob.y },
      genre: "rightWall",
      move: (p) => p.y++,
    },
    {
      point: { x: ob.x, y: ob.y },
      genre: "leftWall",
      move: (p) => p.y++,
    },
    {
      point: { x: ob.x, y: ob.y },
      genre: "top",
      move: (p) => p.x++,
    },
    {
      point: { x: ob.x - ob.size, y: ob.y + ob.size },
      genre: "leftGround",
      move: (p) => p.x++,
    },
    {
      point: { x: ob.x + ob.size, y: ob.y + ob.size },
      genre: "rightGround",
      move: (p) => p.x++,
    },
  ];

  for (const check of checks) {
    if (scanTouch(check.point, check.genre, check.move, ob.size)) {
      judge.push(check.genre + "Judge");
    }
  }

  for (const enemy of enemiesList) {
    if (
      ob.x < enemy.x + enemy.size &&
      ob.x + ob.size > enemy.x &&
      ob.y < enemy.y + enemy.size &&
      ob.y + ob.size > enemy.y
    ) {
      judge.push("enemyJudge");
      break;
    }
  }

      if (
      ob.x < player.x + player.size &&
      ob.x + ob.size > player.x &&
      ob.y < player.y + player.size &&
      ob.y + ob.size > player.y
    ) {
      judge.push("playerJudge");
      
    }

  return  judge;
}

// 壁の開始点
function getWallPoint(ob) {
  switch (ob.direction) {
    case 6:
      return { x: ob.x + ob.size, y: ob.y };
    case 4:
      return { x: ob.x, y: ob.y };
    default:
      return { x: null, y: null };
  }
}

// 汎用スキャン
function scanTouch(point, genre, move, size) {
  for (let i = 0; i < size; i++) {
    if (isTouch(point, genre)) return true;
    move(point);
  }
  return false;
}

function isTouch(point, genre) {
  const y = Math.floor(point.y / playerInfo.size);
  const x = Math.floor(point.x / playerInfo.size);

  const judgeMap = {
    ground: ["block", "footing"],
    leftGround: ["block", "footing"],
    rightGround: ["block", "footing"],
    wall: ["block"],
    rightWall : ["block"],
    leftWall : ["block"],
    top: ["block"],
    enemy: ["enemy"],
  };

  if (!mapInfo?.[y]?.[x]) return false;
  return judgeMap[genre].includes(mapInfo[y][x].class);
}
