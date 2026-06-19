import { contactJudge } from "../../manager/moveLogic/isTouch.js";
import { effectImages, effectInfo, enemyInfo } from "../../store/dataStore.js";
import { effectInfoDom, resultTimeDom } from "../../store/mapTileRender.js";

export function renderCoordinate(enemiesList, player, bulletsList, timeFactor) {
  for (let i in enemiesList) {
    const enemy = enemiesList[i];
    setCoordinate(enemy);
  }

  for (let i in bulletsList) {
    const bullet = bulletsList[i];
    setCoordinate(bullet);
  }

  setCoordinate(player, timeFactor);
}

function setCoordinate(ob, timeFactor) {
  const tile = ob.dom;
  switch (ob.direction) {
    case 4:
      tile.style.transform = "scaleX(-1)";
      break;
    case 6:
      tile.style.transform = "scaleX(1)";
      break;
  }

  switch (ob.genre) {
    case "player":
      if (ob.isFly) {
        tile.style.backgroundImage = `url(${ob.images.jump})`;
        ob.images.runCursor = 0;
      } else if (!ob.isMove) {
        tile.style.backgroundImage = `url(${ob.images.stand[0]})`;
      } else if (ob.isMove) {


        if (ob.renderInterval >= ob.speed[ob.speedGear].renderInterval) {
          ob.renderInterval = 0;
          tile.style.backgroundImage = `url(${ob.images.run[ob.images.runCursor]})`
          ob.images.runCursor = (ob.images.runCursor + 1) % (ob.images.run.length);
        } else {
          ob.renderInterval++;
        }
      }
      break;
    case "enemy":
      if (ob.frameIntervalNum >= enemyInfo.frameInterval) {
        if (ob.shot === 0) {
          if (ob.direction === 5) return;
          ob.index = (ob.index + 1) % 3;
        }
        ob.frameIntervalNum = 0;
      } else {
        ob.frameIntervalNum++;
      }
      tile.style.backgroundImage = `url(${ob.images[ob.index]})`;
  }

  if (ob.effectList) {

    const removeList = [];

    if (ob.effectList.length !== 0) {
      if (ob.hp < 0) {
        for (const effect of ob.effectList) {
          effect.dom.remove();
        }
        ob.effectList = [];
        return;
      }
      console.log(`${ob.genre}`);
      console.log(ob.effectList);



      for (const effect of ob.effectList) {
        const limit = (effectImages[effect.key].length - 1);

        let top;
        let left;
        if (effectInfo[effect.key]["follow"] === "true") {
          switch (effectInfo[effect.key]["position"]) {
            case "center":
              top = ob.y;
              left = ob.x;

              break;
            case "bottom":
              top = ob.y + ob.size;
              left = ob.x;
              break;
          }

          effect.dom.style.top = top + "px";
          effect.dom.style.left = left + "px";

        }

        switch (effectInfo[effect.key]["position"]) {
          case "center":
            effect.dom.style.transform = `translate(${(ob.size - effectInfo[effect.key]["size"]) / 2}px ,${(ob.size - effectInfo[effect.key]["size"]) / 2}px )`;
            break;
          case "bottom":
            effect.dom.style.transform = `translate(${(ob.size - effectInfo[effect.key]["size"]) / 2}px ,${(ob.size - effectInfo[effect.key]["size"])}px )`;
            break;
        }

        console.log(ob.genre, Math.trunc(effect.num / effectInfo[effect.key]["interval"]));

        if (effect.frame >= limit && effect.num >= effectInfo[effect.key]["interval"]) {
          if (effectInfo[effect.key]["type"] === "disappear") {
            effect.dom.remove();
            removeList.push(effect);
            continue;
          }

          effect.frame = limit;

        } else if (effect.num >= effectInfo[effect.key]["interval"]) {
          effect.frame++;
          effect.num = 0;
        } else {
          effect.num++;
        }

        effect.dom.style.backgroundImage = `url(${effectImages[effect.key][effect.frame]})`;


      }


    }
    ob.effectList = ob.effectList.filter(
      effect => !removeList.includes(effect)
    );
  }



  tile.style.top = ob.y + "px";
  tile.style.left = ob.x + "px";
}
