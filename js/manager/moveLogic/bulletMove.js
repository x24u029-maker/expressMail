import { bulletInfo } from "../../store/dataStore.js";
import { contactJudge } from "./isTouch.js";
import { istTouchTarget } from "./isTouchTarget.js";
import { updatePlayerHp } from "../playerInfoManager.js";

export function bulletsUpdate(bulletArray, timeFactor) {
  for (let b in bulletArray) {
    const bullet = bulletArray[b];
    const judge = contactJudge(bullet);

    const directionList = [];
    switch (bullet.direction) {
      case 1:
        directionList.push("left", "down")
        break;
      case 2:
        directionList.push("down");
        break;
      case 3:
        directionList.push("right", "down");
        break;
      case 4:
        directionList.push("left")
        break;

      case 5:
        break;
      case 6:
        directionList.push("right");
        break;
      case 7:
        directionList.push("left", "up")
        break;
      case 8:
        directionList.push("up");
        break;
      case 9:
        directionList.push("right", "up");
        break;
    }

    if (bullet.deadTime >= bulletInfo.deadRemit) {
      bullet.dom.remove();
      bulletArray.splice(b, 1);
      b--;
      continue;
    }

    if (judge.length !== 0) {
      let judgeTarget;
      switch (bullet.owner) {
        case "player":
          judgeTarget = judge.includes("enemyJudge");
          break;
        case "enemy":
          judgeTarget = judge.includes("playerJudge");
      }

      if (judgeTarget) {
        const targetArray = istTouchTarget(bullet);
        switch (bullet.owner) {
          case "player":
            for (const t in targetArray) {
              const target = targetArray[t];
              target.hp -= 2;
            }
            break;
          case "enemy":
            updatePlayerHp(-1);
        }

        bullet.dom.remove();
        bulletArray.splice(b, 1); // 要素の削除

        b--;
        continue;
      }
      if (
        directionList.includes("left") ||
        directionList.includes("right")
      ) {
        if (judge.includes("wallJudge")) {
          bullet.dom.remove();
          bulletArray.splice(b, 1);
          b--;
          continue;
        }
      }
      if (
        directionList.includes("down") 
      ) {
        if (judge.includes("groundJudge")) {
          bullet.dom.remove();
          bulletArray.splice(b, 1);
          b--;
          continue;
        }
      }
      if (
        directionList.includes("up")
      ) {
        if (judge.includes("topJudge")) {
          bullet.dom.remove();
          bulletArray.splice(b, 1);
          b--;
          continue;
        }
      }
    }
    if (directionList.includes("left")) {
      bullet.x += -1 * bullet.bulletType.speed / timeFactor;
    } else if (directionList.includes("right")) {
      bullet.x += bullet.bulletType.speed / timeFactor;
    }

    if (directionList.includes("down")) {
      bullet.y += bullet.bulletType.speed / timeFactor;
    } else if (directionList.includes("up")) {
      bullet.y -= bullet.bulletType.speed / timeFactor;
    }

    bullet.deadTime++;
  }

}
