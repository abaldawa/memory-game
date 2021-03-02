# memory-game
## Author: Abhijit Baldawa

## Tech Stack
1. Backend: Node.js (14.x)/Typescript and express.js
2. Front end: React.js/Typescript
3. Docker

## How to run:
1. git clone https://github.com/abaldawa/memory-game.git
2. cd memory-game
3. docker-compose up
4. go to http://localhost:3000 to see the UI

## Server REST API:
1. `GET /numbers/random?start=<number>&end=<number>&size=<number>` -> Responds with array of unique random numbers based on query params
