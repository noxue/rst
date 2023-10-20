
// 当前进化到第几代
var generation = 0

// 保存所有染色体群体
var genomes = []

// 保存每一代最适应的染色体
var bestFitness = 0

// 保存所有染色体的适应度总和，用于做 大转盘抽取父母
var fitnessSum = 0


// 是否运行中
var running = false;

// 生成一个基因
function genome() {
    let bits = []
    let fitness = 0
    for (var i = 0; i < CHROMO_LENGTH; i++) {
        bits.push(Math.random() > 0.5 ? 1 : 0)
    }
    return { bits, fitness }
}

function run() {
    fitnessSum = 0
    generation = 0
    bestFitness = 0
    createGenomes()
    running = true
}

// 随机生成一组染色体
function createGenomes() {
    genomes = []
    for (var i = 0; i < POP_SIZE; i++) {
        genomes.push(genome())
    }
}

// 计算适应度
function updateFitnessScores() {
    fitnessSum = 0
    bestFitness = 0
    for (var i = 0; i < genomes.length; i++) {
        let x = START_X
        let y = START_Y
        let tempMap = []
        for (var j = 0; j < MAP_HEIGHT; j++) {
            tempMap.push(new Array(MAP_WIDTH).fill(0))
        }

        // 整个循环就是根据基因表示的方向去尝试行走，遇到障碍就忽略，直到走到终点或者基因结束
        for (var j = 0; j < genomes[i].bits.length; j += GENO_LENGTH) {
            let direction = genomes[i].bits[j] * 2 + genomes[i].bits[j + 1]


            // 只要不同数字表示不同方向就可以，具体表示哪个方向都无所谓
            if (direction == 0) {// 上

                // 如果是墙或者边界，就跳过
                if (y - 1 < 0 || map[y - 1][x] == 1) {
                    continue
                }

                y--

            } else if (direction == 1) { // 右
                if (x + 1 > 15 - 1 || map[y][x + 1] == 1) {
                    continue
                }

                x++
            } else if (direction == 2) { // 下
                if (y + 1 > 15 - 1 || map[y + 1][x] == 1) {
                    continue
                }
                y++
            } else if (direction == 3) {  // 左
                if (x - 1 < 0 || map[y][x - 1] == 1) {
                    continue
                }
                x--
            }

            tempMap[y][x] = 1
        }

        // 离终点距离的倒数作为适应度，越近数字越大，方便后面选择父母的时候占更多比例
        // 为了防止适应度为0（当到达终点的时候），所以加1，如果不加1，会除0报错
        genomes[i].fitness = 1.0 / ((Math.abs(x - END_X) + Math.abs(y - END_Y)) + 1)

        // 如果到达终点 停止运行
        if (genomes[i].fitness == 1) {
            running = false
        }

        fitnessSum += genomes[i].fitness
        // 选出最好的适应度
        if (genomes[i].fitness > bestFitness) {
            bestFitness = genomes[i].fitness
            // 保存每一代最好的染色体走过的路径数据，用于展示
            memoryMap = tempMap
        }
    }
}

// 幸运大转盘 选择父母
function rouletteWheelSelection() {
    // 从总的适应度中随机选一个点，类似在一个大转盘上随机选一个点
    let slice = Math.random() * fitnessSum
    let fitnessSoFar = 0

    let s = 0
    for (var i = 0; i < genomes.length; i++) {
        s += genomes[i].fitness
    }

    for (var i = 0; i < genomes.length; i++) {
        // 这个累加相当于转动大转盘，当累加的适应度大于随机选的点的时候，就选中了这个染色体
        fitnessSoFar += genomes[i].fitness
        if (fitnessSoFar >= slice) {
            return genomes[i]
        }

    }
}

// 交叉
function crossover(mum, dady, baby1, baby2) {
    // 如果随机数小于交叉概率，就进行交叉
    if (Math.random() > CROSSOVER_RATE || mum == dady) {
        baby1.bits = mum.bits
        baby2.bits = dady.bits
        return
    }

    // 随机生成一个交叉点
    let cp = Math.random() * CHROMO_LENGTH

    // 交叉点之前的基因，来自父亲
    for (var i = 0; i < cp; i++) {
        baby1.bits[i] = dady.bits[i]
        baby2.bits[i] = mum.bits[i]
    }

    // 交叉点之后的基因，来自母亲
    for (var i = cp; i < CHROMO_LENGTH; i++) {
        baby1.bits[i] = mum.bits[i]
        baby2.bits[i] = dady.bits[i]
    }
}


// 基因突变
function mutation(baby) {
    for (var i = 0; i < baby.bits.length; i++) {
        if (Math.random() < MUT_RATE) {
            baby.bits[i] = baby.bits[i] == 1 ? 0 : 1
        }
    }
}


// 开启新时代，包含一代染色体的出生到结束
function epoch() {

    // 保存所有的新生代染色体
    babies = []

    // 更新适应度
    updateFitnessScores();


    // 生成新生代染色体
    while (babies.length < POP_SIZE) {

        // 选择双亲
        let mum = rouletteWheelSelection();
        let dady = rouletteWheelSelection();

        // 交配
        let baby1 = genome()
        let baby2 = genome()

        crossover(mum, dady, baby1, baby2)

        // 变异
        mutation(baby1);
        mutation(baby2)

        // 将孩子加入染色体群
        babies.push(baby1);
        babies.push(baby2);
    }
    genomes = babies
    generation += 1;
}
