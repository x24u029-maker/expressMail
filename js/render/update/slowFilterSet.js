import * as dom from "../../store/mapTileRender.js";

export function slowFilterSet(timeFactor,isGameOver) {
  if(isGameOver)return;
  if (timeFactor !== 1) {
    dom.backgroundDom.style.filter = "grayscale(100%)";
    dom.cameraBackGroundDom.style.filter = "grayscale(100%)";
    dom.groundInfoDom.style.filter = "grayscale(100%)";

  } else {
    dom.backgroundDom.style.filter = "none";
    dom.groundInfoDom.style.filter = "none";
    dom.cameraBackGroundDom.style.filter = "none";
  }
}
