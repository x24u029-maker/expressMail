import { groundInfoDom } from "../store/mapTileRender.js";

export let scoreDomList = [];

export function getScoreRender(num , ob){
    const scoreDom = document.createElement("div");
    scoreDom.innerHTML = `+${num}`;
    scoreDom.style.top = ob.y + "px";
    scoreDom.style.left = ob.x + "px";
    scoreDom.classList.add("scoreDom");
    groundInfoDom.appendChild(scoreDom);
    scoreDomList.push({dom:scoreDom,y:ob.y,num:0});
    
}

export function updateScoreRender(){
    for (let i = scoreDomList.length - 1; i >= 0; i--) {
      const record = scoreDomList[i];
      const dom = record.dom;
  
      if (record.num >= 30) {
        dom.remove();
        scoreDomList.splice(i, 1);
        continue;
      }
  
      dom.style.transform = `translate(0, ${- (30/record.num) * 50}px)`;
      record.num++;
    }
  }
  
