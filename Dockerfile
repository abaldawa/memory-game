FROM node:14-alpine
WORKDIR /usr/src/memory-game/server
COPY ./server/package*.json ./
RUN npm i
WORKDIR /usr/src/memory-game/client
COPY ./client/package*.json ./
RUN npm i
WORKDIR /usr/src/memory-game
COPY . .
WORKDIR /usr/src/memory-game/client
RUN npm run build
WORKDIR /usr/src/memory-game/server
EXPOSE 3000
CMD ["npm", "start"]