import { tileImages, tileInfo } from "../../store/dataStore.js";
import { Enemy,Item } from "../../store/Class.js";

export function mapConversion(mapArray) {
    console.log("mapConversion実行");
    const map = mapArray[1];
    const tiles = [];
    const enemies = [];
    const others = [];
    let enemyNum = 0;
    let otherNum = 0;
    let position = {
        start: {
            x: null,
            y: null
        },

        goal: []
    }
    console.log(mapArray[0]);
    let size = {
        width: mapArray[0][0].width,
        height: mapArray[0][0].height
    }
    console.log(size);
    for (let r = 0; r < map.length; r++) {
        tiles[r] = [];
        for (let c = 0; c < map[r].length; c++) {
            if (map[r][c] === 0) continue;
            const worldX = c * tileInfo.size;
            const worldY = r * tileInfo.size;
            const tile = map[r][c];
            let tI = {
                x: c,
                y: r,
                worldX: worldX,
                worldY: worldY,
                major: tile.major,
                minor: tile.minor,
                class: null
            }

            switch (tile.major) {
                // ① 地形
                case "ground":
                    tI.class = tileImages[tile.minor].class;
                    break;

                case "other":
                    const other = new OtherTile(tile.minor, worldY, worldX, otherNum);
                    otherNum++;
                    others.push(other);

                // ② 敵
                /*
                case "enemy":
                    const enemy = new Enemy(tile.minor, worldY, worldX, enemyNum);
                    enemyNum++;

                    enemies.push(enemy);
                    continue;
                */
                case "rule":
                    if (tile.minor === "start") {
                        position.start.x = worldX;
                        position.start.y = worldY;
                    } else if (tile.minor === "goal") {
                        position.goal.push({ x: worldX, y: worldY });
                    }
                    break; //continue
            }
            tiles[r][c] = tI;
        }
    }
    
    for (const e of mapArray[2]) {
        switch (e.major) {
            case "enemy":
                const enemy = new Enemy(e.minor,e.y * tileInfo.size, e.x * tileInfo.size, enemyNum);
                enemies.push(enemy);
                enemyNum++;
                break;
            case "item":
                const item = new Item(e.minor,e.y * tileInfo.size, e.x * tileInfo.size);
                others.push({genre:e.major,value: item});
                break;
            case "rule":
                if (e.minor === "start") {
                    position.start.x = e.x * tileInfo.size;
                    position.start.y = e.y * tileInfo.size;
                } else if (e.minor === "goal") {
                    position.goal.push({ x: e.x * tileInfo.size, y: e.y * tileInfo.size });
                }
                break;
        }
    }
    console.log("---mapConversionConsole---");
    console.log(`start[x:${position.start.x}][y:${position.start.y}]`);
    console.log(tiles);
    console.log(enemies);
    console.log("map読込完了");
    console.log("--------------------------");
    return [tiles, enemies, position, size,others];
}