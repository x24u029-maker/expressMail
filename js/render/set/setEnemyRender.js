import * as dom from "../../store/mapTileRender.js";
import {
  enemyImages,
  enemyInfo,
  enemySampleImages,
} from "../../store/dataStore.js";

import { lockOn } from "../../manager/input/otherCommand/cursorShot.js";

export function setEnemyRender(enemiesList) {
  const list = {};
  const setList = enemiesList;
  for (const i in setList) {
    const enemy = setList[i];
    const tile = document.createElement("div");
    enemy.images = enemyImages[enemy.id];
    enemy.image = enemy.images[0];

    tile.classList.add("enemy");
    for (const cls of enemy.moveClass) {
      tile.classList.add(cls);
    }

    tile.style.width = enemyInfo.size + "px";
    tile.style.height = enemyInfo.size + "px";
    tile.style.backgroundImage = `url(${enemy.image})`;
    tile.style.top = enemy.y + "px";
    tile.style.left = enemy.x + "px";
    if (enemy.genre === "enemy") {
      if (enemy.id === "enemy2") {
        tile.style.width = enemyInfo.size * 2 + "px";
      }
    }
    tile.addEventListener("mouseover",function(){
      lockOn(enemy);
    })
    enemy.dom = tile;

    dom.groundInfoDom.appendChild(enemy.dom);
  }
}
