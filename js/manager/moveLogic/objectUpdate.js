import { itemInfo } from "../../store/dataStore.js";
import { updataScore, updateHp } from "../playerInfoManager.js";
import { contactJudge } from "./isTouch.js";

export function objectUpdate (otherList){
    for(const i in otherList){
        const record = otherList[i];
        const ob = record.value; 
        if(ob.isOb === true)continue;
        switch(record.genre){
            case "item":
                if(contactJudge(ob).includes("playerJudge")){
                    if(itemInfo[ob.id].count === "once"){
                        ob.isOb = true;
                        ob.dom.style.display = "none";
                    }
                    switch(itemInfo[ob.id].type){
                        case "addScore":
                            const se =new Audio("sounds/コインのような音.wav");
                            se.volume = 0.03;
                            se.play();
                         updataScore("item",itemInfo[ob.id].value,ob);
                         break;
                         case "lifeUp":
                         updateHp(5);
                    }
                }
        }
    }
}