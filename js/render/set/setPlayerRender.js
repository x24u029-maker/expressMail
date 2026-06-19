import { playerImages, playerInfo } from "../../store/dataStore.js";
import * as dom from "../../store/mapTileRender.js";
export function setPlayerRender(player) {
  console.log(player);
  const tile = dom.playerDom;
  
  player.image = player.images.stand[0];
 tile .style.top = player.y + "px";
  tile.style.left = player.x + "px";
  tile.style.width = playerInfo.size + "px";
  tile.style.height = playerInfo.size + "px";
  tile.style.backgroundImage = `url(${player.image})`;
  player.dom = dom.playerDom;
  console.log(player.dom);
}
