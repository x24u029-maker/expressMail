import { name } from "./home.js";
import { score } from "./manager/playerInfoManager.js";
import * as dom from"./store/mapTileRender.js";
let ranking;

export function insertRanking() {
    ranking = JSON.parse(sessionStorage.getItem("ranking")) ?? [];
    ranking.push({ name:name, score:score });
    ranking.sort((a, b) => b.score - a.score);
    sessionStorage.setItem("ranking", JSON.stringify(ranking));
    console.log(ranking);
    updateRanking();
}


export function updateRanking() {
    
    ranking = JSON.parse(sessionStorage.getItem("ranking")) ?? [];
    dom.resultRankingDom.innerHTML = "";
    for(let r  = 0 ; r < 5 ; r++){
        const record = ranking[r];
        const recordDom = document.createElement("div");
        recordDom.classList.add("rankingRecord");
        recordDom.innerHTML = `${Number(r) + 1}. name:${record.name}<br> score:${record.score}`;

        dom.resultRankingDom.appendChild(recordDom);
    }
}