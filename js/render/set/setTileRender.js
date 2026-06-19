import * as dom from "../../store/mapTileRender.js";
import {
  optionTileImages,
  tileImages,
  tileInfo,
} from "../../store/dataStore.js";

export function setTileRender(mapInfo) {
  const map = mapInfo;
  for (let r = 0; r < map.length; r++) {
    for (let c = 0; c < map[r].length; c++) {
      const cell = map[r][c];

      if (cell === 0 || cell === undefined) continue;
      const worldX = tileInfo.size * c;
      const worldY = tileInfo.size * r;
      const tile = document.createElement("div");
      let tileImage;
      switch (cell.major) {
        case "ground":
          tileImage = tileImages[cell.minor];
          break;
        case "rule":
          tileImage = optionTileImages[cell.minor];
          break;
      }

      tile.style.left = worldX + "px";
      tile.style.top = worldY + "px";
      tile.style.width = tileInfo.size + "px";
      tile.style.height = tileInfo.size + "px";
      tile.classList.add(tileImage.class);
      tile.classList.add("tile");

      tile.style.backgroundImage = `url(${tileImage.src})`;
      dom.groundInfoDom.appendChild(tile);
    }
  }
  console.log("setTileRender設定完了");
}
