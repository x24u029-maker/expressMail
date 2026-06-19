import { playerInfo } from "../../store/dataStore.js";
import { contactJudge } from "../moveLogic/isTouch.js";
import { shotSet } from "./otherCommand/shot.js";
import { timeChanger, updateFactor } from "./otherCommand/timeChanger.js";
import { effect } from "../../store/Class.js";
import { setObjectRender } from "../../render/set/setObjectRender.js";
export function moveSide(direction, player, timeFactor) {
  console.log(direction);
  let isMove = true;
  let num;
  switch (direction) {
    case "left":
      player.direction = 4;
      num = -1;
      break;
    case "right":
      player.direction = 6;
      num = 1;
      break;
  }
  if (!contactJudge(player).includes("wallJudge")) {
    let speed;
    let gear = 0;
    let setRecord;
    const prev = { gear: player.runNum.speedGear };
    console.log(player.speed);
    
    for (const r of player.speed) {
      console.log(`record${r.nextTime},speed${r.speed},num:${player.speedNum}`);
      speed = r.speed;
      setRecord = r;
      if (player.runNum.speedNum < r.nextTime) break;
      if(gear < player.speed.length - 1){
        gear ++;
      }
      
    }
    player.runNum.speedGear = gear;
    console.log(setRecord);
    console.log(`gear:${gear},prevGear${prev.gear}`);
    player.x += num * speed;
    player.speedGear = gear;

    if (gear !== prev.gear) {
      const ef = new effect("dashSmoke",player.y,player.x,player.genre,player.direction);
      ef.dom =setObjectRender(ef,player.direction);
      ef.dom.classList.add("effect");
      ef.dom.style.zIndex = 10;
      player.effectList.push({ key: "dashSmoke", frame: 0, num: 0, dom: ef.dom });
      console.error(ef);
      player.runNum.renderNum = 0;
      
    } else {
      player.runNum.renderNum++;
    }
  }
  if (contactJudge(player).includes("wallJudge")) {
    switch (direction) {
      case "right":
        player.x = Math.floor(player.x / playerInfo.size) * playerInfo.size;

        break;
      case "left":
        /*
        if (contactJudge(player).includes("groundJudge")) {
          player.x =
            Math.floor(player.x / playerInfo.size + 1) * playerInfo.size;
          isMove = false;
        } else {
          */
         if(!player.isFly)player.x  = Math.floor((player.x  + playerInfo.size)/ playerInfo.size) * playerInfo.size;
        //}

        break;
    }
    //player.x = player.prev.x;
  }
}

let jumpInput = false;

export function moveJump(type, player) {
  if (
    player.jumpCount >= player.jumpLimit ||
    contactJudge(player).includes("topJudge") ||
    jumpInput
  )
    return;
  jumpInput = true;
  switch (type) {
    case "normal":
      player.isJump = true;
      player.jump = playerInfo.jump;
      player.jumpCount++;

      if (player.isFly) {
        let ef = new effect("jump", player.y, player.x, player);
        ef.dom = setObjectRender(ef);
        console.log(ef);
        ef.dom.classList.add("effect");
        player.effectList.push({ key: "jump", frame: 0, num: 0, dom: ef.dom });
        const se = new Audio("sounds/パンチ素振り.mp3");
        se.volume = 0.3;
        se.playbackRate = 1.5;
        se.play();
      }
  }



  setTimeout(function () {
    jumpInput = false;
  }, 300);
}

let isShot = false;
let shotTimer = null;
export function shot(type, player) {
  //if(isShot)return;
  console.log(player.shotDirection);
  shotSet(type, player);
  isShot = true;
  shotTimer = setTimeout(function(){
    isShot = false;
    shotTimer = null;    
  },75 * updateFactor());
  
}

let timeCommandTimer = null;

export function time() {
  if (timeCommandTimer !== null) return;
  isShot = false;
  timeChanger();

  timeCommandTimer = setTimeout(function () {
    timeCommandTimer = null;
  }, 1000);
}
