
let objectArray = null;

export function istTouchTarget(ob) {
    if(objectArray === null){
        console.error("objectArray is null");
        return;
    }
    const targetArray =  [];
  for (const t in objectArray) {
    const target = objectArray[t];
    if (
      ob.x < target.x + target.size &&
      ob.x + ob.size > target.x &&
      ob.y < target.y + target.size &&
      ob.y + ob.size > target.y
    ) {
      targetArray.push(target);
    }
  }
  return targetArray;
}


export function setObjectArray(array){
objectArray = array
}