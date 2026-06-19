
let player = null;

export function setRelativeDirection(ob){
    if(player === null){
        console.error("havent set origin");
        return;
    }
    let setDirection = ob.direction;

    if(ob.x >= player.x){
        setDirection = 4;
    }else{
        setDirection = 6;
    }

    return setDirection;
}


export function setPlayerAsOrigin(pl){
    player = pl;
}