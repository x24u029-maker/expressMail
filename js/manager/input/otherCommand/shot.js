import { cursorPosition } from "../../../controller/inputHandler.js";
import { setObjectRender } from "../../../render/set/setObjectRender.js";
import { Bullet } from "../../../store/Class.js";
import { playerInfo } from "../../../store/dataStore.js";
import { istTouchTarget } from "../../moveLogic/isTouchTarget.js";
import { lockOnSwitch } from "./cursorShot.js";
import { updateFactor } from "./timeChanger.js";

let bulletList;



export function setBulletList(array) {

  bulletList = array;
}

export function shotSet(type, player) {
  const setY = player.y + player.size / 2;
  const setX = player.x + player.size / 2;
  let bullet;
  switch (type) {
    case "normal":
      bullet = new Bullet("normalBullet", setY, setX, player.direction, player.genre,player.bulletType);

      bullet.dom = setObjectRender(bullet);
      bulletList.push(bullet);
      break;
    case "aim":

      bullet = new Bullet("normalBullet", setY, setX, player.direction, player.genre,player.bulletType)
      const d = player.shotDirection;

      if (d.includes("up") && d.includes("left")) bullet.direction = 7;
      else if (d.includes("up") && d.includes("right")) bullet.direction = 9;
      else if (d.includes("down") && d.includes("left")) bullet.direction = 1;
      else if (d.includes("down") && d.includes("right")) bullet.direction = 3;
      else if (d.includes("up")) bullet.direction = 8;
      else if (d.includes("down")) bullet.direction = 2;
      else if (d.includes("left")) bullet.direction = 4;
      else if (d.includes("right")) bullet.direction = 6;
      bullet.dom = setObjectRender(bullet);
      console.log(bullet);
      bulletList.push(bullet);
      break;
    case "cursor":

  }



}
