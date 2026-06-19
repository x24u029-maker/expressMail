import { worldInfo } from "../../../store/dataStore.js";

let timeFactor = null;


export function setTimeFactor(tf){
timeFactor = tf;
}

export function timeChanger(){
    if(timeFactor === 1){
            timeFactor = worldInfo.slowTime;
            

    }else{
        timeFactor = 1;
    }
}

export function updateFactor(){
    return timeFactor;
}