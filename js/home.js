const nBtn = document.getElementById("nextBtn");
const homeSlt = document.getElementById("homeSelect");
const setNameDiv = document.getElementById("setName");
const nameSp = document.getElementById("nameSpan");
const reBtn = document.getElementById("renameBtn");
const bBtn = document.getElementById("backBtn"); 
export let name;

nBtn.addEventListener("click", async function () {

    homeSlt.style.display = "none";
    setNameDiv.style.display = "flex";

    await new Promise(r => setTimeout(r, 0));
    setName();
})

reBtn.addEventListener("click", async function () {
    setName();
})
async function setName() {
    const newName = await setNamePrompt("会社名を入力してください(６文字以内)");
    if (newName !== undefined) {
        name = newName + "運送";
        nameSp.innerHTML = name;
    }
}


function setNamePrompt(message) {
    return new Promise(r => {
        const result = prompt(message);
        if (result === null) {
            r(undefined); // ← キャンセルは何もしない
        } else {
            r(result.slice(0, 6));
        }
    });
}

bBtn.addEventListener("click",function(){
    setHomeWindow();
})

export function setHomeWindow(){
    homeSlt.style.display = "flex";
    setNameDiv.style.display = "none";
}