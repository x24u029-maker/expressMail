import { inputHandler, key } from "./inputHandler.js";
export class Controller {
constructor(mode){
    this.set(mode)
}

  set(mode) {
    if (mode !== "play"){
      console.error("the mode is not set to \"play\"");
      return;
    } 
    for(const k in key){
       key[k] = false;
    }
    inputHandler();

  }

}
