import { playerInfo, tileInfo, worldInfo } from "../../store/dataStore.js";
import { contactJudge } from "./isTouch.js";

let gA = 0;
let fallObjectList = [];
function fall(ob, timeFactor,isGameOver) {
  if (ob.genre === "enemy") {
    if (ob.moveClass.includes("fly")) return;
  }

  if(ob.genre === "bullet"){
   // console.log(ob);
    if(!ob.bulletType.isG)return;
    
    console.log(ob.y);
  }

  if (contactJudge(ob).includes("groundJudge") ) {
    ob.isFly = false;

    ob.y = Math.floor(ob.y / ob.size) * playerInfo.size;
    ob.flyTime = 0;
    ob.jumpCount = 0;
  } else {
    ob.isFly = true;
  }

  if (ob.isFly) {
    let ac = (worldInfo.gravity + ob.flyTime * worldInfo.accel) / timeFactor;
    if (ob.genre === "player") {
      if (ob.speedCo !== 1) {
        ac *= ob.speedCo;
      }

    }
    ob.y += ac;
    ob.flyTime++;
    deadObject(ob);
  }
}

export function playerFall(player,isGameOver) {
  if (!contactJudge(player).includes("topJudge")) {
    if (player.isJump || player.isFly) {
      player.y -= player.jump;
      if (player.jump > 0) {
        player.flyTime = 0;
        player.jump -= worldInfo.accel;
      } else {
        player.jump = 0;
        player.isJump = false;
      }
    }
  } else {
    player.jump = 0;
  }
  if(isGameOver){
    fall(player, 50);
  }else{
    fall(player, 1);
  }
  
}

export function objectsFall(array, timeFactor) {
  for (let ob in array) {
    array[ob].prev = { x: array[ob].x, y: array[ob].y };

    fall(array[ob], timeFactor);
  }
};

let mapHeight = null;
let mapWidth = null;

export function setMapBorder(mapInfo){
  mapHeight = mapInfo.length * tileInfo.size;
}

export function deadObject(ob){
  if(ob.y  <= mapHeight + 100)return;
    ob.hp = 0;
}