
import random

from BobsMap import BobsMap


class Genome:
    def __init__(self, length):
        self.bits = []
        self.fitness = 0.0
        for _ in range(length):
            self.bits.append(random.randint(0, 1))

class GaBob:
    

    # 基因组群体的大小
    _pop_size = 0

    # 杂交率
    _crossover_rate = 0.7

    # 突变概率
    _mutation_rate = 0.001

    # 基因组的长度
    _chromo_length = 0

    # 基因的长度
    _gene_length = 0

    _fittest_genome = 0

    _best_fitness_score = 0.0

    _total_fitness_score = 0.0

    # 记录遗传了多少带
    _generation = 0

    _busy = False

    bobs_map = BobsMap()

    # 记录每一代中最好的基因组走过得路径
    bobs_brain_map = BobsMap()

    def __init__(self, cross_rate, mut_rate, pop_size, num_bits, gene_len):
        # 基因组群体
        self._genomes = []
        self._crossover_rate = cross_rate
        self._mutation_rate = mut_rate
        self._pop_size = pop_size
        self._chromo_length = num_bits
        self._gene_length = gene_len

        self.create_start_population()


    def roulette_wheel_selection(self):
        '''
        大转盘抽奖的形式选一个基因组
        适应度分数越高的基因组被选中的概率越大
        '''
        slice = random.random() * self._total_fitness_score
        total = 0.0

        

        for i in range(self._pop_size):
            total += self._genomes[i].fitness
            if total > slice:
                return self._genomes[i]

    def mutate(self, bits):
        '''
        基因突变
        '''
        for i in range(len(bits)):
            if random.random() < self._mutation_rate:
                if bits[i] == 1:
                    bits[i] = 0
                else:
                    bits[i] = 1

    def crossover(self, mum: [int], dad: [int], baby1: [int], baby2: [int]):
        
        if random.random() > self._crossover_rate or mum == dad:
            baby1.clear()
            baby2.clear()
            baby1.extend(mum)
            baby2.extend(dad)
            return

        cp = random.randint(0, self._chromo_length - 1)

        for i in range(cp):
            baby1[i] = mum[i]
            baby2[i] = dad[i]

        for i in range(cp, self._chromo_length):
            baby1[i] = dad[i]
            baby2[i] = mum[i]

    def create_start_population(self):
        '''创建开始的种群'''
        self._genomes.clear()
        for _ in range(self._pop_size):
            self._genomes.append(Genome(self._chromo_length))
            
        
        
        # 重置所有变量
        self._fittest_genome = 0
        self._best_fitness_score = 0
        self._total_fitness_score = 0
        self._generation = 0

    def run(self):
        '''开始运行'''
        
        self.create_start_population()
        self._busy = True
        

    def decode(self, bits: [int]):
        dirs = []
        for i in range(0, len(bits), self._gene_length):
            dec = 0
            for j in range(self._gene_length):
                dec += bits[i + j] * (2 ** j)
            dirs.append(dec)

        return dirs

    def update_fitness_scores(self):
        '''
        更新所有基因组的适应度分数
        计算适应度分数 找出最高的基因组
        累积所有基因的适应度分数
        '''
        self._fittest_genome = 0
        self._best_fitness_score = 0
        self._total_fitness_score = 0

        temp_mem_map = BobsMap()
        for i in range(self._pop_size):
            dirs = self.decode(self._genomes[i].bits)
            # 计算当前基因组的适应度分数
            self._genomes[i].fitness = self.bobs_map.test_route(
                dirs, temp_mem_map)

            self._total_fitness_score += self._genomes[i].fitness

            # 找出最好的基因组
            if self._genomes[i].fitness > self._best_fitness_score:
                self._best_fitness_score = self._genomes[i].fitness
                self._fittest_genome = i

                self.bobs_brain_map.memory = temp_mem_map.memory

                if self._best_fitness_score == 1.0:
                    self._busy = False

            temp_mem_map.reset_memory()

    def epoch(self):
        '''一代一代的进化'''

        print("开始迭代: ", self._generation)
        
        self.update_fitness_scores()

        
        new_babies = 0
        baby_genomes = []
        while new_babies < self._pop_size:

            # 选择父母
            mum = self.roulette_wheel_selection()
            dady = self.roulette_wheel_selection()

            # 生成孩子，杂交
            baby1 = Genome(self._chromo_length)
            baby2 = Genome(self._chromo_length)
            self.crossover(mum.bits, dady.bits, baby1.bits, baby2.bits)

            # 基因突变
            self.mutate(baby1.bits)
            self.mutate(baby2.bits)

            # 将孩子加入到新的基因组中
            baby_genomes.append(baby1)
            baby_genomes.append(baby2)

            new_babies += 2
        self._genomes = baby_genomes
        # 代数增加
        self._generation += 1

    def started(self):
        return self._busy

    def render(self, screen):
        '''渲染地图和 这一代最好的一条路径'''

        self.bobs_map.render_map(screen)

        self.bobs_brain_map.render_memory(screen)
