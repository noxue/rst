
var map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,],
    [8,0,0,0,0,0,0,1,0,0,0,0,0,0,1,],
    [1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,],
    [1,0,0,1,1,1,0,1,0,1,1,1,0,0,1,],
    [1,0,0,0,1,0,0,1,0,0,1,0,0,0,1,],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,],
    [1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,],
    [1,0,0,0,1,0,0,1,0,0,1,0,1,1,1,],
    [1,0,0,1,1,1,0,0,0,1,1,1,0,0,5,],
    [1,0,0,0,1,0,0,1,0,0,1,0,0,0,1,],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
    ]

initMap()

function initMap(){
    map[START_Y][START_X] = 5
    map[END_Y][END_X] = 8
}

var memoryMap = new Array(15);
for (var i = 0; i < 15; i++) {
    memoryMap[i] = new Array(15).fill(0);
}


function render(ctx, mapWidth, mapHeight) {
    var width = mapWidth / map[0].length;
    var height = mapHeight / map.length;

    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            if (map[i][j] == 1) {
                ctx.fillStyle = "#000000";
                ctx.fillRect(j * width, i * height, width - 1, height - 1);
            } else if (map[i][j] == 0) {
                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(j * width, i * height, width - 1, height - 1);
            } else if (map[i][j] == 8) {
                ctx.fillStyle = "#FF0000";
                ctx.fillRect(j * width, i * height, width - 1, height - 1);
            } else if (map[i][j] == 5) {
                ctx.fillStyle = "#00FF00";
                ctx.fillRect(j * width, i * height, width - 1, height - 1);
            }
        }
    }

    showInfo()
}

function renderMemory(ctx, mapWidth, mapHeight) {
    var width = mapWidth / map[0].length;
    var height = mapHeight / map.length;

    for (var i = 0; i < memoryMap.length; i++) {
        for (var j = 0; j < memoryMap[i].length; j++) {
            if (memoryMap[i][j] == 1) {
                ctx.fillStyle = "#ddd";
                ctx.beginPath();
                ctx.arc(j * width + width / 2, i * height + height / 2, width/3, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.fill();
            }
        }
    }
}

function showInfo(){
    let infoEle = document.getElementById("info");

    infoEle.innerHTML = `当前第 ${generation} 代`

}

