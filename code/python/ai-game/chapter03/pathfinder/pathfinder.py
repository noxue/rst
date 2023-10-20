import pygame
from BobsMap import BobsMap
from GaBob import GaBob
from consts import *

# pygame setup
pygame.init()
screen = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
clock = pygame.time.Clock()
running = True

bob = GaBob(CROSSOVER_RATE, MUTATION_RATE,
            POP_SIZE, CHROMO_LENGTH, GENE_LENGTH)

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        
        # 当按下回车键
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_RETURN:
                bob.run()
                


    screen.fill("white")
    
    if bob.started():
        bob.epoch()
    bob.render(screen)
    

    
        

    # flip() the display to put your work on screen
    pygame.display.flip()

    clock.tick(60)  # limits FPS to 60

pygame.quit()
