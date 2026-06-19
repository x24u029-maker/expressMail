import { setHomeWindow } from "./home.js";
import { Game } from "./manager/gameManager.js";

async function gameStart(mode) {
  console.log("gameStart実行");
  const game = new Game();
  game.set();

  if (mode === "start") {
    await showHomeWindow(); // ← ここで待つ
    game.update(); // ← クリック後に進む
  } else {
    game.update();
  }
}

gameStart("start");

function showHomeWindow() {
  return new Promise((resolve) => {
    // 例：ボタン押下・アニメーション完了など
    
    document.getElementById("startBtn").onclick = () => {
      document.getElementById("homeWindow").style.display = "none";
      resolve(); // ← ここで「終了」
    };
  });
}

document.getElementById("end").addEventListener("click", function () {
  document.getElementById("resultWindow").style.display = "none";
  document.getElementById("homeWindow").style.display = "flex";
  gameStart("start");
  setHomeWindow();
});

document.getElementById("retry").addEventListener("click", function () {
  document.getElementById("resultWindow").style.display = "none";
  const playOnlyDoms = document.getElementsByClassName("playOnly");
  console.log(playOnlyDoms);
  for (const d of playOnlyDoms) {
    d.style.display = "block";
  }
  gameStart();
});
