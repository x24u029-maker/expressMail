import { backgroundDom, groundInfoDom } from "../../store/mapTileRender.js";

export function allClear(){
    backgroundDom.innerHTML = "";
    groundInfoDom.innerHTML = "";
}