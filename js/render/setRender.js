import { setTileRender } from "./set/setTileRender.js";
import { setEnemyRender } from "./set/setEnemyRender.js";
import { setPlayerRender } from "./set/setPlayerRender.js";
import { allClear } from "./set/allClear.js";
import { setObjectListRender, } from "./set/setObjectRender.js";
export function setRender (mapInfo, enemiesList,player,otherList){
  allClear();
  setTileRender(mapInfo);
  setEnemyRender(enemiesList);
  setPlayerRender(player);
  setObjectListRender(otherList);
}



