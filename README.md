# memory-game
## Author: Abhijit Baldawa

### Description
This web application is a memory game where user can select between 4, 8 or 12 cards with random numbers, memorise the cards with random numbers in ascending order and click start to play. Once start button is clicked the cards are hidden and the user can click cards in ascending order to test memory.

### Tech Stack
1. Backend: Node.js (14.x)/Typescript and express.js
2. Front end: React.js/Typescript
3. Docker

### How to run:
1. git clone https://github.com/abaldawa/memory-game.git
2. cd memory-game
3. docker-compose up
4. go to http://localhost:3000 to see the UI

### Server REST API:
1. `GET /numbers/random?start=<number>&end=<number>&size=<number>` -> Responds with array of unique random numbers based on query params

## Game user interface
Below gif shows how the game looks and how it can be played.

![memory-game_large](https://user-images.githubusercontent.com/5449692/110313599-f5630b00-8006-11eb-89a3-0236a5e92788.gif)
