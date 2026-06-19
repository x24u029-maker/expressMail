import { Player } from "../../store/Class.js";
import { enemyInfo } from "../../store/dataStore.js";
import { importMapArray } from "./importMapArray.js";
import {mapConversion} from "./mapConversion.js"

export function createWorldInfo(mapNum) {
    
    const mapArray = importMapArray(mapNum);
    console.log(mapArray);
    const mapInfoList = mapConversion(mapArray);
    const mapInfo = mapInfoList[0];
    const enemiesList = mapInfoList[1];
    const position = mapInfoList[2];
    const mapSize = mapInfoList[3];
    const otherList = mapInfoList[4];

    const player = new Player("P01",position.start.y,position.start.x,"normal");
    console.log("---createWorldInfo---");
    console.log("mapInfo:");
    console.log(mapInfo);
    console.log("enemiesList:");
    console.log(enemiesList);
    console.log(`position:\nstart(${position.start.y},${position.start.x})`);
    for(const p of position.goal){
        console.log(p.x ,p.y)
    }
    console.log(player);
    console.log("---------------------");
    return [mapInfo,enemiesList,position,player,mapSize,otherList];
}