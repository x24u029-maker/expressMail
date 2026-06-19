import { Player } from "../../store/Class.js";
import { enemyInfoList } from "../../store/dataStore.js";
import { updateLife } from "../playerInfoManager.js";
import { bulletsUpdate } from "./bulletMove.js";
import { deadEnemies, enemiesWalk } from "./enemiesMoveLogic.js";
import { objectsFall, playerFall} from "./fall.js";
import { contactJudge} from "./isTouch.js";
import { objectUpdate } from "./objectUpdate.js";

export function moveLogicManagement(player,timeFactor,enemiesList,bulletsList,otherList,isGameOver){
        objectUpdate(otherList);
       playerFall(player,isGameOver);
        objectsFall(enemiesList,timeFactor);
        
        objectsFall(bulletsList,timeFactor);
        enemiesWalk(timeFactor);
        deadEnemies();
        bulletsUpdate(bulletsList,timeFactor);
        updateLife();
}