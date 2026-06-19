import * as dom from "../../../store/mapTileRender.js"
import { cursorPosition } from "../../../controller/inputHandler.js";
const scope = dom.scopeDom;

export function setScope(shift) {//flag : bool
    if (shift) {
        scope.style.display = "block";

        scope.style.top = `${cursorPosition.y - 50}px`;
        scope.style.left = cursorPosition.x - 50 + "px";
    } else {
    
        scope.style.display = "none";
    }
}

