import { effectInfo, itemInfo, playerInfo } from "../../store/dataStore.js";
import { effectInfoDom, groundInfoDom } from "../../store/mapTileRender.js";

export function setObjectRender(ob,direction) {
  const tile = document.createElement("div");
  tile.style.backgroundSize = "cover";
  tile.style.position = "absolute";
  tile.style.width = `${ob.size}px`;
  tile.style.height = `${ob.size}px`;
  tile.style.top = `${ob.y}px`;
  tile.style.left = `${ob.x}px`;

  console.error(effectInfo["dashSmoke"].position);
  console.error(direction);
  if (ob.genre === "bullet") {
    if (ob.bulletType.src !== "none") {
      tile.style.backgroundImage = `url(${ob.bulletType.src})`;
    } else {
      tile.style.backgroundColor = "#000";
    }

    if (ob.bulletType.isG) {
    }
  }

  if (ob.genre === "item") {
    tile.style.backgroundImage = `url(${itemInfo[ob.id].src})`;
  }

  if (ob.genre === "effect") {
    let width;
    let height;

    if (!effectInfo[ob.id].size) {
      tile.style.width = `${effectInfo[ob.id].width}px`;
      tile.style.height = `${effectInfo[ob.id].height}px`;
    }
    switch(effectInfo[ob.id].position){
      case "back":
        if(direction === 4){
          tile.style.transform = `translate(${playerInfo.size}px,${playerInfo.size - effectInfo[ob.id].height}px) scaleX(-1)`;
        }else if(direction === 6){
          tile.style.transform = `translate(${effectInfo[ob.id].width * -1}px,${playerInfo.size - effectInfo[ob.id].height}px)`;
        }
    }
    
    effectInfoDom.appendChild(tile);
  } else {
    groundInfoDom.appendChild(tile);
  }
  return tile;
}

export function setObjectListRender(Array) {
  for (const i in Array) {
    const ob = Array[i].value;
    ob.dom = setObjectRender(ob);
    console.log(ob);
  }
}
