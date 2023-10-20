/// 这里只是用来方便修改初始参数，不要也行


// 获取各个input元素
const crossoverRateInput = document.getElementById("crossoverRate");
const mutationRateInput = document.getElementById("mutationRate");
const chromosomeLengthInput = document.getElementById("chromosomeLength");
const populationSizeInput = document.getElementById("populationSize");

// 设置input的值为对应的变量值
crossoverRateInput.value = CROSSOVER_RATE;
mutationRateInput.value = MUT_RATE;
chromosomeLengthInput.value = CHROMO_LENGTH;
populationSizeInput.value = POP_SIZE;

// 获取"开始"按钮元素
const startButton = document.getElementById("startBtn");

// 添加点击事件处理程序
startButton.addEventListener("click", function() {
    // 将input的值分别设置给对应的变量
    CROSSOVER_RATE = parseFloat(crossoverRateInput.value);
    MUT_RATE = parseFloat(mutationRateInput.value);
    CHROMO_LENGTH = parseFloat(chromosomeLengthInput.value);
    POP_SIZE = parseFloat(populationSizeInput.value);
    start()
    // 把map输出，形成 map=[[],[]]的字符串
    var mapStr = '[\n'
    for (var i = 0; i < map.length; i++) {
        mapStr += '['
        for (var j = 0; j < map[i].length; j++) {
            mapStr += map[i][j] + ','
        }
        mapStr += '],\n'
    }
    mapStr += ']'
    console.log(mapStr)
});