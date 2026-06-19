import { getScoreRender } from "../render/getScoreRender.js";
import { playerInfo, tileInfo } from "../store/dataStore.js";
import * as dom from "../store/mapTileRender.js";
import { istTouchTarget } from "./moveLogic/isTouchTarget.js";

export let score = null;
export let shotsDownNum = null;
let player = null;
let goalArray = null;
let time = 0;
let timer = null;
const limitHp = playerInfo.hp;
export let isDead = false;
export let isGoal = false;



export function setPlayerInfo(pl, array) {
  score = 0;
  player = pl;
  goalArray = array;
  console.log(goalArray);
  isDead = false;
  isGoal = false;
  shotsDownNum = 0;
  setHp();
}

function setHp() {
  
  dom.scaleDom.style.width = 100 + "%";
  updateRender();
}

export function updateHp(num) {

  if (player.hp + num > limitHp) {
      player.hp = limitHp;
  } else
      if (player.hp + num < 0) {
          hp = 0;
          console.log("dead");
          return;
      } else {

          player.hp += num;

      }
      //scaleDiv.style.transition = `${Math.abs(num) * 0.05}s`;
};



export function updateRender() {
  const limitHp = playerInfo.hp;
  const width = Math.floor((player.hp / limitHp) * 100);
  //const colorNum = Math.floor(255 * ( width / 100));
  //scaleDiv.style.width = width + "%";
  dom.scaleDom.style.transform = `translate(${100 - width}%)`;
  
  //scaleDiv.style.backgroundColor = `rgb(${255 - colorNum},${colorNum},20)`;
  let colorTxt;
  if (width <= 30) {
      colorTxt = "#f22";
  } 
   else {
      colorTxt = "#2f2";
  }
  dom.scaleDom.style.backgroundColor = colorTxt;

  if (player.hp <= 0) {
      hpTxt.innerHTML = "dead";
  } else {
      hpTxt.innerHTML = `${player.hp}/${limitHp}`;
  }

}


export function updataScore(genre, addScore,position) {
  switch (genre) {
    case "shotsDown":
      shotsDownNum++;
      break;
  }
  if(genre !== "rule"){
    getScoreRender(addScore,position);
    dom.scorePointDom.innerHTML = `総合給与：${score} 円`;
  }
  score += addScore;
  
}
let isCoolTime = false;

export function updateLife() {
  if (isCoolTime) return;

  const targetArray = istTouchTarget(player);
  if (targetArray.length > 0) {
    updateHp(-1);
  }
  isCoolTime = true;
  dom.lifePointDom.innerHTML = player.hp;
  if (player.hp <= 0) {
    gameOver();
  }
  setTimeout(function () {
    isCoolTime = false;
  }, playerInfo.invincibleRemit);
}

function gameOver() {
  isDead = true;
}

export function formatTime(ms) {
  const min = Math.floor(ms / 60000);
  const sec = Math.floor((ms - min * 60000) / 1000);
  const milli = Math.floor(ms % 1000);
  if (min <= 0) {
    return `${sec}.${milli.toString().padStart(3, "0")}`
  } else {
    if (sec < 10) {
      return `${min}:0${sec}.${milli.toString().padStart(3, "0")}`
    } else {
      return `${min}:${sec}.${milli.toString().padStart(3, "0")}`;

    }
  }
}

export function goalCheck() {
  for (const goal of goalArray) {
    if (
      player.x < goal.x + tileInfo.size &&
      player.x + player.size > goal.x &&
      player.y < goal.y + tileInfo.size &&
      player.y + player.size > goal.y
    ) {
      isGoal = true;
    }
  }
}

export function updatePlayerHp(num) {
  player.hp += num;
  console.log("ダメージ")
}

