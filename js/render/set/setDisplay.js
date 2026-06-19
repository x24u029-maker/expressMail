//ここで引数で分岐するクラス一覧の取得から透明度なり消すなりするやつ
//一気に消すやつも一つ対象にとるもあり

const modeList = ["home", "play", "result"];

export function switchWindow(mode,type,display) {
  //type:"only" ? "else"
  //display: 表示の有無
  let targetDomList = [];
    if(type === "only"){
        targetDomList = document.getElementsByClassName(`${mode}Only`);
    }
}
