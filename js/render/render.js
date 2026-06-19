import * as dom from "../store/mapTileRender.js";
import { renderCoordinate } from "./update/renderCoordinate.js";
import { renderCamera } from "./update/renderCamera.js";
import { bulletInfo } from "../store/dataStore.js";
import { slowFilterSet } from "./update/slowFilterSet.js";
import { updateScoreRender } from "./getScoreRender.js";

export function render(mapInfo,enemiesList,player, bulletList,timeFactor,mapSize,isGameOver){
   slowFilterSet(timeFactor,isGameOver);
   updateScoreRender();
    renderCoordinate(enemiesList,player,bulletList,timeFactor);
    renderCamera(mapSize,enemiesList,player);
}