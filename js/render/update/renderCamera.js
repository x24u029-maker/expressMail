import { playerInfo, tileInfo } from "../../store/dataStore.js";
import * as dom from "../../store/mapTileRender.js";


export function renderCamera(mapSize, enemiesList, player) {

  const cameraWidth = dom.windowDom.getBoundingClientRect().width;
  const mapWidth = mapSize.width * tileInfo.size;


  const cameraHeight = dom.windowDom.getBoundingClientRect().height;
  const mapHeight = mapSize.height * tileInfo.size;


  let left = -1 * (player.x - (cameraWidth / 2 - playerInfo.size / 2));

  let top = -1 * (player.y - (cameraHeight / 2 - playerInfo.size / 2));



  // 右端
  const maxLeft = cameraWidth - mapWidth;
  if (left < maxLeft) {
    left = maxLeft;
  }

  // 左端
  if (left > 0) {
    left = 0;
  }



// 上端
// 縦方向
if (mapHeight <= cameraHeight && top <= 0) {
  // マップが小さい → 下が映らないよう固定
  top = cameraHeight - mapHeight; // または (cameraHeight - mapHeight) / 2 で中央寄せ
} else {
  const maxTop = cameraHeight - mapHeight;

//if (top > 0) top = 0;
if (top < maxTop) top = maxTop;
}





  dom.mapDom.style.left = left + "px";
  dom.mapDom.style.top = top + "px";

}


