import { key } from "../../controller/inputHandler.js";
import { scopeDom } from "../../store/mapTileRender.js";
import * as command from "./command.js";
import { lockOnSwitch } from "./otherCommand/cursorShot.js";
import { setScope } from "./otherCommand/scope.js";



export function input(player, timeFactor) {

  player.shotDirection = [];

  let shift = false;

  let inputJudge  = false;


console.log(player.prev.direction);

  if (key["]"] || key["Wheel"]) {
    // Shiftが押されている
    shift = true;
    if (timeFactor !== 1) {
      //cursorの座標をスコープ画像とリンクさせる
      player.speedCo = 0;
      

    }
  } else if (player.prev.speedCo !== 1) {
    player.speedCo = 1;
    player.flyTime = 0;
    
  }

  if(timeFactor !== 1){
    setScope(true);
    lockOnSwitch(true);
  }else{
    setScope(false);
    lockOnSwitch(false);
  }

  if (key["s"]) {
    if(player.prev.direction !== 2 )player.speedNum = 0;
    player.shotDirection.push("down");
  }

  if (key["a"]) {
    
    if(player.prev.direction !==  4)player.speedNum = 0;
    player.shotDirection.push("left");
    if (!shift) {
       command.moveSide("left", player, timeFactor);
       inputJudge = true;
    }
  }

  if (key["d"]) {
    
    if(player.prev.direction !== 6 )player.speedNum = 0;
    
    player.shotDirection.push("right");
    if (!shift) {
      command.moveSide("right", player, timeFactor);
      inputJudge = true;
    }
  }

  if (key["w"]) {
    player.shotDirection.push("up");
    if (!shift) {
      command.moveJump("normal", player);
    }
  }



  if (key["Enter"] || key["mouse"]) {
    if (shift) {
      console.log("aimd" + player.shotDirection);
      command.shot("aim", player);
    } else {
      command.shot("normal", player);
    }
  }


  if (key["q"]) {
    if (timeFactor !== 1) {
      player.speedCo = 1;
      player.flyTime = 1;
    }
    command.time();

  }
if(inputJudge){
  player.runNum.speedNum++;
}else{
  player.runNum.speedNum = 0;
  player.runNum.speedGear = 0;
}
  
  player.isMove = inputJudge;

}

