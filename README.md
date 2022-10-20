# Brendon Van SEI-Project-1 2048

## Game Description - 2048
2048 is played on a plain 4×4 grid, with numbered tiles that slide when a player moves them using the four arrow keys. Every turn, a new tile randomly appears in an empty spot on the board with a value of either 2 or 4. Tiles slide as far as possible in the chosen direction until they are stopped by either another tile or the edge of the grid. If two tiles of the same number collide while moving, they will merge into a tile with the total value of the two tiles that collided. The resulting tile cannot merge with another tile again in the same move.

2048 was intended to be an improved version of two other games, both of which were clones of the iOS game Threes released a month earlier. TThe game creator Gabrielle Cirulli himself described 2048 as being "conceptually similar" to Threes. The release of 2048 resulted in the rapid appearance of many similar games, akin to the flood of Flappy Bird variations from 2013. The game received generally positive reviews from critics, with it being described as "viral" and "addictive".

Quick tutorial on how to play: https://levelskip.com/puzzle/How-to-play-2048

## Getting Started with Gameplay
![2048 - Intro](https://github.com/brendonvan/Project-1-Browser-Game/blob/main/images/2048-intro.jpg?raw=true)

When the game first loads, two tiles will be presented on the grid. 
90% of the time the game will generate a "2", 10% of the time it will generate a "4".

![2048 - Gameplay](https://github.com/brendonvan/Project-1-Browser-Game/blob/main/images/2048-gameplay.jpg?raw=true)

Use your "Up", "Down", "Left", "Right" keys to move all tiles on the grid.
If you move in a direction where two tiles are overlapping eachother, they will merge.

![2048 - Gameover](https://github.com/brendonvan/Project-1-Browser-Game/blob/main/images/2048-gameover.jpg?raw=true)

After every move a new tile will appear.
Don't let the grid fill up or else you will run out of moves.

![2048 - Win](https://github.com/brendonvan/Project-1-Browser-Game/blob/main/images/2048-win.png?raw=true)

Once you merge a block to the value of 2048, you win!
Select "New Game" to try again.
## Link to Game
https://van.digital

## Technologies Used

- HTML
- CSS
- Javascript

## Wireframe

![Figma Wireframe](https://github.com/brendonvan/Project-1-Browser-Game/blob/main/images/wireframe.png?raw=true)
## Challenging Code Parts

![Move Blocks Function](https://github.com/brendonvan/Project-1-Browser-Game/blob/main/images/code-move-function.png?raw=true)
![Game Over Function](https://github.com/brendonvan/Project-1-Browser-Game/blob/main/images/code-gameover-function.png?raw=true)

Next time I will create more functions to simplify other functions.

## Next Steps
I was in the middle of creating a helper that would predict the chance of survival on your next move.
Once I was done with that I was going to animate the tiles moving.
