import {
  playerInfo,
  enemyInfo,
  enemyImages,
  enemyInfoList,
  tileInfo,
  playerImages,
  enemyMoveClass,
  bulletInfo,
  effectInfo,
  itemInfo,
  enemyShotInfoList,
} from "./dataStore.js";

export class GameObject {
  constructor(id, y, x) {
    if (new.target === GameObject) {
      throw new Error("object「GameObject」は呼び出せません");
    } else {
      this.dom = null;
      this.id = id; //マップ生成時におけるminorClassを参照
      this.y = y;
      this.x = x;
      this.size = null;
      this.genre = null;
      this.image = "images/noImage.png";
      this.effectList = [];
      this.flyTime = 0;
    }
  }
}

//absoluteなどのDivの共通設定はクラス付けしてCSSで制御

//worldX,Yはパラメータではなく変数である。
export class Bullet extends GameObject {
  constructor(id, y, x,direction,owner,bulletType) {
    
    super(id, y, x);
    this.size = bulletType.size;
    this.bulletType = bulletType;
    this.direction = direction;
    this.deadTime = 0;
    this.genre = "bullet";
    this.owner = owner;
    console.log(this);
  }
}

export class Character extends GameObject {
  constructor(id, y, x) {
    super(id, y, x);

    this.hp = null;
    this.speed = null;
    this.prev = {
      x: null,
      y: null,
    };
    this.direction = 5;
    this.isFly = false;
    this.images = null;
    this.flyTime = 0;
    this.score = 0;
    this.genre = "character"
  }
}

export class Player extends Character {
  constructor(id, y, x, bullet) {
    super(id, y, x);
    this.hp = playerInfo.hp;
    this.speed = playerInfo.speed;
    this.size = playerInfo.size;
    this.runNum = {
      speedNum: 0,
      speedGear : 0,
      renderNum : 0
    };
    this.speedGear = 0;
    this.jump = 0;
    this.jumpLimit = playerInfo.jumpLimit;
    this.shotDirection = [];
    this.jumpCount = 0;
    this.isJump = false;
    this.isRun = false;
    this.images = playerImages;
    this.renderInterval = 20;
    this.bullet = bullet;
    this.isInvincible = false;
    this.invincibleTime = 0.0;
    this.currentScore = 0;

   // this.energyNum = 0;

    this.genre = "player";
    this.speedCo = 1;
    this.energy = playerInfo.energy
    this.bulletType = {src:"none",size: 10 , speed:40 ,isG :false}
  }
}

export class Enemy extends Character {
  constructor(id, y, x, uniqueNumber) {
    super(id, y, x);
    this.index = Enemy.setIndex(id);
    this.size = enemyInfo.size;
    this.hp = enemyInfoList[this.index][1];
    this.speed = enemyInfoList[this.index][2];
    this.score = enemyInfoList[this.index][3];
    this.chargeLimit = enemyInfoList[this.index][4];
    this.uniqueNumber = uniqueNumber;
    this.moveClass = enemyMoveClass[id];
    this.chargeNum = 0;
    this.mode = "move";
    this.shot = 0;//0:move 1:shotcharge 2:shot
    this.direction = 4;
    this.genre = "enemy"
    this.frameIntervalNum = enemyInfo.frameInterval;
    this.shotDirection = 4;
    this.isLock  = false;
    this.bulletType = enemyShotInfoList[id];
  }

  static setIndex(id) {
    for (let i = 0; i < enemyInfoList.length; i++) {
      if (enemyInfoList[i][0] === id) {
        return i;
      }
    }
    return -1;
  }
}

export class OtherTile extends GameObject {
  constructor(id, y, x) {
    super(id, y, x);
    this.size = tileInfo.size;
  }
}

export class effect extends GameObject{
  constructor(id,y,x,owner,direction){
    super(id,y,x);
    this.genre = "effect";
    this.size = effectInfo[id]["size"];
    this.owner = owner;
    this.renderNum = 0;
    this.direction = direction;
  }
}

export class Item extends GameObject{
  constructor(id,y,x){
    super(id,y,x);
    this.genre = "item";
    this.size = itemInfo.general.size;
    this.isOb = false;
  }
}
