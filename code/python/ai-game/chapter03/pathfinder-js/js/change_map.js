/// 这里只是用来实现鼠标能修改地图，不要也行

// 获取Canvas元素和2D上下文
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// 添加鼠标点击事件处理程序
canvas.addEventListener("click", function (event) {
    // 获取鼠标点击位置相对于Canvas的坐标
    var rect = canvas.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;

    // 计算点击的格子索引
    var cellWidth = canvas.width / map[0].length;
    var cellHeight = canvas.height / map.length;
    var clickedCellX = Math.floor(mouseX / cellWidth);
    var clickedCellY = Math.floor(mouseY / cellHeight);

    // 切换格子颜色（黑变白，白变黑）并更新map中的值
    if (map[clickedCellY][clickedCellX] === 0) {
        map[clickedCellY][clickedCellX] = 1;
    } else if (map[clickedCellY][clickedCellX] === 1) {
        map[clickedCellY][clickedCellX] = 0;
    }

    // 重新渲染地图
    ctx.clearRect(0, 0, 500, 500)
    render(ctx, canvas.width, canvas.height);
});

// 重新渲染地图
ctx.clearRect(0, 0, 500, 500)
render(ctx, canvas.width, canvas.height);