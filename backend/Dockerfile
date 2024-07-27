FROM node:18.18.2-alpine

WORKDIR /clay-backend

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "docker" ]