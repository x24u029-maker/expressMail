import { setObjectRender } from "../../../render/set/setObjectRender.js";
import { effect } from "../../../store/Class.js";
import { bulletInfo, effectImages } from "../../../store/dataStore.js";

let targetArray = [];
let modeSwitch = false;
export function lockOnSwitch(b) {//b:bool
    modeSwitch = b;

    if (!modeSwitch && targetArray.length !== 0) {
        volleyFire();
    }
}

export function lockOn(ob) {
    if (ob.isLock || !modeSwitch) return;
    ob.isLock = true;
    targetArray.push(ob);
    const reticle = new effect("reticle", ob.y, ob.x, ob);
    reticle.dom = setObjectRender(reticle);
    console.log(reticle);
    reticle.dom.classList.add("effect");
    ob.effectList.push({ key: "reticle", frame:0,num: 0, dom: reticle.dom });
    const se = new Audio("sounds/カーソル移動5.mp3");
    se.volume = 0.5;
    se.play();

    console.log(reticle.dom);
}

export function volleyFire() {
    for (const target of targetArray) {
        if (target.genre === "enemy") {
            target.hp -= bulletInfo.cursorShotDamage;
        }
        target.isLock = false;
        const record = target.effectList.find(e => e.key === "reticle");

        if (record) {
            record.dom.remove(); // DOM要素取得
        }

        const idx = target.effectList.findIndex(e => e.key === "reticle");
        if (idx !== -1) {
            target.effectList.splice(idx, 1);
        }
    }
    const se = new Audio("sounds/一斉射撃.wav");
    se.play();
    targetArray = [];
}



