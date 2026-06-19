const key = {};

function onKeyDown(e) {
  key[e.key] = true;

}

function onKeyUp(e) {
  key[e.key] = false;
}

function onMouseDown(e) {
  if (e.button === 0) {
    key["mouse"] = true;
  }
}

function onMouseUp(e) {
  if (e.button === 0) {
    key["mouse"] = false;
  }

}



function onWheelDown(e) {
  if (e.button === 1) {   // 0:左 1:中(ホイール) 2:右
    key["Wheel"] = true;
  }
}

function onWheelUp(e) {
  if (e.button === 1) {
    key["Wheel"] = false;
  }
}

let cursorPosition = {
  x: null,
  y: null
}

function setMousePosition(e) {
  cursorPosition = {
    x: e.clientX,
    y: e.clientY
  }
}

function inputHandler() {

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);

  document.addEventListener("mousedown", onMouseDown);
  document.addEventListener("mouseup", onMouseUp);

  document.addEventListener("mousedown", onWheelDown);
  document.addEventListener("mouseup", onWheelUp);

  document.addEventListener("mousemove", setMousePosition);


  document.addEventListener('wheel', e => {
    e.preventDefault();
  }, { passive: false });

  document.addEventListener('mousewheel', e => {
    e.preventDefault();
  }, { passive: false });

  document.addEventListener('DOMMouseScroll', e => {
    e.preventDefault();
  }, { passive: false });


  document.addEventListener('wheel', e => e.preventDefault(), { passive: false });

  // ホイールクリック（中ボタン）押下の無効化
  document.addEventListener('mousedown', e => {
    if (e.button === 1) { // 1 = ホイールクリック
      e.preventDefault();
    }
  });

  // オートスクロール開始自体を防止
  document.addEventListener('auxclick', e => {
    if (e.button === 1) {
      e.preventDefault();
    }
  });



}

export { key, inputHandler, cursorPosition };
