import pygame
from consts import *

BLOCK_SIZE_X = (WINDOW_WIDTH - 40) // MAP_WIDTH
BLOCK_SIZE_Y = (WINDOW_HEIGHT - 40) // MAP_HEIGHT

map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
    [8, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1],
    [1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 5],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

# Bob起点
startX = 14
startY = 7

# Bob终点
endX = 0
endY = 2


# 定义颜色
BLACK = (0, 0, 0)
RED = (255, 0, 0)
GREY = (192, 192, 192)


class BobsMap:

    def __init__(self):
        self.memory = []
        self.reset_memory()

    def render_map(self, screen):
        for y in range(MAP_HEIGHT):
            for x in range(MAP_WIDTH):
                left = 20 + (BLOCK_SIZE_X * x) + 1  # 加1像素的空隙
                right = left + BLOCK_SIZE_X - 1  # 减1像素的空隙
                top = 20 + (BLOCK_SIZE_Y * y) + 1  # 加1像素的空隙
                bottom = top + BLOCK_SIZE_Y - 1  # 减1像素的空隙

                if map[y][x] == 1:
                    pygame.draw.rect(
                        screen, BLACK, (left, top, right - left, bottom - top))
                elif map[y][x] == 5 or map[y][x] == 8:
                    pygame.draw.rect(
                        screen, RED, (left, top, right - left, bottom - top))

    def render_memory(self, screen):
        border = 20

        GreyBrush = pygame.Color('lightgray')

        for y in range(MAP_HEIGHT):
            for x in range(MAP_WIDTH):
                left = border + (BLOCK_SIZE_X * x) + 1  # 加1像素的空隙
                right = left + BLOCK_SIZE_X - 1  # 减1像素的空隙
                top = border + (BLOCK_SIZE_Y * y) + 1  # 加1像素的空隙
                bottom = top + BLOCK_SIZE_Y - 1  # 减1像素的空隙

                if self.memory[y][x] == 1:
                    pygame.draw.rect(screen, GreyBrush,
                                     (left, top, right - left, bottom - top))

    def test_route(self, path: [int], bob):
        posX = startX
        posY = startY

        for dir in path:

            # 上
            if dir == 0:
                if not ((posY-1) < 0 or map[posY-1][posX] == 1):
                    posY = posY-1
            # 下
            elif dir == 1:
                if not ((posY+1) >= MAP_HEIGHT or map[posY+1][posX] == 1):
                    posY = posY+1
            # 右
            elif dir == 2:
                if not ((posX+1) >= MAP_WIDTH or map[posY][posX+1] == 1):
                    posX = posX + 1
            # 左
            elif dir == 3:
                if not ((posX-1) < 0 or map[posY][posX-1] == 1):
                    posX = posX - 1

            bob.memory[posY][posX] = 1

        diffX = abs(posX - endX)
        diffY = abs(posY - endY)

        return 1.0/(diffX + diffY + 1)
     

    def reset_memory(self):

        # 全0 填充一个和map一样的地图
        self.memory = [[0 for _ in range(MAP_WIDTH)] for _ in range(MAP_HEIGHT)]
