import { Bullet } from "../../store/Class.js";
//import { enemyShotRatioList } from "../../store/dataStore.js";
import { shot } from "../input/command.js";
import { updataScore } from "../playerInfoManager.js";
import { contactJudge } from "./isTouch.js";
import { setRelativeDirection } from "./setRelativeDirection.js";
import { setObjectRender } from "../../render/set/setObjectRender.js";

let enemiesList = null;
let bulletList = null;
let timeFactor = 1;

export function setEnemiesList(list, bList, tF) {
  enemiesList = list;
  bulletList = bList;
  timeFactor = tF;
}

export function enemiesWalk(tF) {
  timeFactor = tF;
  for (let i in enemiesList) {
    const enemy = enemiesList[i];

    switch (enemy.shot) {
      case 0:
        const judge = contactJudge(enemy);
        const leftJudge =
          judge.includes("leftGroundJudge") && !judge.includes("leftWallJudge");
        const rightJudge =
          judge.includes("rightGroundJudge") &&
          !judge.includes("rightWallJudge");
        switch (enemy.bulletType.ratio >= Math.random()) {
          case true: //射撃時
            enemy.shot = 1;
            enemy.shotDirection = setRelativeDirection(enemy);

            break;
          case false: //移動時
            if (enemy.moveClass.includes("walk")) {
              if (!judge.includes("groundJudge")) continue;

              if (!leftJudge && !rightJudge) {
                enemy.direction = 5;
                continue;
              }
              switch (enemy.direction) {
                case 4:
                  if (!leftJudge) {
                    enemy.direction = 6;
                  }
                  break;
                case 6:
                  if (!rightJudge) {
                    enemy.direction = 4;
                    break;
                  }
              }
            } else if (enemy.moveClass.includes("fly")) {
              if (
                judge.includes("leftWallJudge") &&
                judge.includes("rightWallJudge")
              ) {
                //enemy.direction = 5;
                continue;
              }
              switch (enemy.direction) {
                case 4:
                  if (judge.includes("leftWallJudge")) {
                    enemy.direction = 6;
                  }
                  break;
                case 6:
                  if (judge.includes("rightWallJudge")) {
                    enemy.direction = 4;
                    break;
                  }
              }
            }
            switch (enemy.direction) {
              case 4:
                enemy.x -= enemy.speed / timeFactor;
                break;

              case 6:
                enemy.x += enemy.speed / timeFactor;
                break;
            }
        }
        break;
      case 1:
        enemy.index = 3;
        if (enemy.chargeNum >= enemy.chargeLimit / 2) {
          enemy.shot = 2;
          enemy.chargeNum = 0;
        } else {
          enemy.chargeNum += 1 / timeFactor;
        }
        break;
      case 2:
        enemy.index = 4;
        enemy.direction = setRelativeDirection(enemy);
        if (enemy.chargeNum >= enemy.chargeLimit) {
          enemy.shot = 3;
          enemy.chargeNum = 0;
        } else {
          enemy.chargeNum += 1 / timeFactor;
        }
        break;
      case 3:

        const bullet = new Bullet(
          "enemyBullet",
          enemy.y + enemy.size / 2,
          enemy.x + enemy.size / 2,
          enemy.direction,
          enemy.genre,
          enemy.bulletType
        );
  
        if (enemy.moveClass.includes("dropShot")) bullet.direction = 2;
        
        if(enemy.bulletType.speed === 0)bullet.direction = 5;
        bullet.dom = setObjectRender(bullet);
        bulletList.push(bullet);
        enemy.shot = 0;
        enemy.index = 0;

    }
  }
}

export function deadEnemies() {
  for (let i in enemiesList) {
    const enemy = enemiesList[i];
    if (enemy.hp <= 0 && enemy.effectList.length === 0) {
      console.log(`deadEnemy`);
      console.log(enemy);
      updataScore("shotsDown",enemy.score,enemy);
      enemy.dom.remove();
      enemiesList.splice(i, 1);

      i--;
    }
  }
}
