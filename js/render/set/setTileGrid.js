export function setTileGrid(mapInfo) {
  const w = mapInfo[0].length;
  const h = mapInfo.length;
  dom.groundInfoDom.style.gridTemplateColumns = `repeat(${w}, 50px)`;
  dom.groundInfoDom.style.gridTemplateRows = `repeat(${h},50px)`;
}