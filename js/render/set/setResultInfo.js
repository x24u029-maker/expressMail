import { formatTime } from "../../manager/playerInfoManager.js";
import * as dom from "../../store/mapTileRender.js";
import { score } from "../../manager/playerInfoManager.js"
export function setResultInfo(flag, stageName, t, player) {
  const playOnlyDoms = document.getElementsByClassName("playOnly");
  console.log(playOnlyDoms);
  for(const d of playOnlyDoms){
    d.style.display = "none";
  }
  const time = formatTime(t);
  let h1Text;
  switch (flag) {
    case "clear":
      h1Text = "Game Clear!!";
      break;
    case "dead":
      h1Text = "Game Over";
      break;
  }
  dom.gameClearH1Dom.innerHTML = h1Text;
  dom.resultMapNameDom.innerHTML = `コース：${stageName}`;
  dom.resultTimeDom.innerHTML = `郵送時間：${time}`;
  dom.resultHpDom.innerHTML = `残り体力：${player.hp}`;
  dom.resultScoreDom.innerHTML = `総スコア：${score}`;
  dom.resultRankDom.innerHTML = setResultRank(score);
  dom.resultWindowDom.style.display = "grid";
}


function setResultRank(score) {
  let rank
  switch (true) {
    case score >= 10000:
      rank = "S";
      break;
    case score >= 8000:
      rank = "A";
      break;
    case score >= 6000:
      rank = "B";
      break;
    default:
      rank = "C";
  }
  return rank;
}