import { Controller } from "../controller/controllerManager.js";
import { setRender } from "../render/setRender.js";
import { createWorldInfo } from "./setWorld/createWorldInfo.js";
import { input } from "./input/input.js";
import { hpGageName, playerDom, resultWindowDom, timeDom } from "../store/mapTileRender.js";
import { render } from "../render/render.js";
import { moveLogicManagement } from "./moveLogic/moveLogicManager.js";
import { isTouchSetMap } from "./moveLogic/isTouch.js";
import { setBulletList } from "./input/otherCommand/shot.js";
import { setObjectArray } from "./moveLogic/isTouchTarget.js";
import { setEnemiesList } from "./moveLogic/enemiesMoveLogic.js";
import {
  goalCheck,
  isDead,
  isGoal,
  setPlayerInfo,
  updataScore,
} from "./playerInfoManager.js";
import { setResultInfo } from "../render/set/setResultInfo.js";
import { formatTime, updateRender } from "./playerInfoManager.js";
import { setPlayerAsOrigin } from "./moveLogic/setRelativeDirection.js";
import {
  setTimeFactor,
  timeChanger,
  updateFactor,
} from "./input/otherCommand/timeChanger.js";
import { setMapBorder } from "./moveLogic/fall.js";
import { insertRanking } from "../ranking.js";
import { renderCamera } from "../render/update/renderCamera.js";
import { name } from "../home.js";

export class Game {
  constructor() {
    this.isSet = false;
    this.gameClock = null;
    this.timer = null;
    this.timeFactor = 1;
    this.timeFactorCursor = 0;
    this.intervalNum = 16;
    this.isGameOver = false;

  }
  set() {
    console.log("Game.Setインスタンス実行");
    const worldInfoList = createWorldInfo(15
      
    );
    this.mapInfo = worldInfoList[0];
    this.enemiesList = worldInfoList[1];
    this.position = worldInfoList[2];
    this.player = worldInfoList[3];
    this.bulletList = [];
    this.time = 0;
    this.mapSize = worldInfoList[4];
    this.otherList = worldInfoList[5];

    console.log(this.otherList);
    //setTileGrid(mapInfo);
    setRender(this.mapInfo, this.enemiesList, this.player, this.otherList);

    isTouchSetMap(this.mapInfo, this.enemiesList, this.player);
    this.isSet = true;
    setBulletList(this.bulletList);
    setObjectArray(this.enemiesList);
    setEnemiesList(this.enemiesList, this.bulletList, this.timeFactor);
    setPlayerInfo(this.player, this.position.goal);
    setPlayerAsOrigin(this.player);
    setTimeFactor(this.timeFactor);
    setMapBorder(this.mapInfo);
    this.player.direction = 6;

    const targetDom = document.getElementsByClassName("playOnly");
    console.log(targetDom);
    for (const dom of targetDom) {
      dom.style.display = "none";
    }
    renderCamera(this.mapSize, this.enemiesList, this.player);
  }


  update() {

    const mode = "play";

    this.controller = new Controller(mode);

    hpGageName.innerHTML = name;

    const targetDom = document.getElementsByClassName("playOnly");
    console.log(targetDom);
    for (const dom of targetDom) {
      dom.style.display = "block";
    }
    console.log(this.enemiesList);
    if (!this.isSet) {
      console.error("Set is not running at GameClass");
      return;
    }
    console.log(this.player);
    //input機能によるイベントハンドラーの実装
    //落下判定の座標更新
    //敵の行動ロジックの反映
    //弾などを合わせた全オブジェクトの座標更新
    //renderによる描画更新

    this.startTime = performance.now();

    this.gameClock = setInterval(() => {
      this.player.prev = {y:this.player.y, x:this.player.x, speedCo:this.player.speedCo ,direction: this.player.direction};
       
      if(!this.isGameOver)input(this.player, this.timeFactor);
      updateRender();
      const now = performance.now();
      this.time = now - this.startTime; // ms
      timeDom.textContent = `time：${formatTime(this.time)}`;

      this.timeFactor = updateFactor();

      moveLogicManagement(
        this.player,
        this.timeFactor,
        this.enemiesList,
        this.bulletList,
        this.otherList,
        this.isGameOver
      );

      render(this.mapInfo, this.enemiesList, this.player, this.bulletList, this.timeFactor, this.mapSize,this.isGameOver);

      goalCheck();
      if (isDead || isGoal) this.gameOver();
    }, this.intervalNum);
  }

  gameOver() {
    /*if(this.isGameOver)return;
    this.isGameOver = true;
    timeChanger();
    setTimeout(() => {
   */   clearInterval(this.gameClock);
      clearInterval(this.timer);
      if (!isDead) {
        console.log("gameClear");
        updataScore("rule",5000,"none");
        this.showResult("clear");
      } else {
        console.log("dead");
        this.showResult("dead");
      }
 //   }, 1500);


  }
  showResult(flag) {
    setResultInfo(flag, "sampleStage", this.time, this.player);

    insertRanking();
  }
}
