FROM node:11.4

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

RUN npm run tsc

COPY .env ./build

WORKDIR ./build

CMD ["npm", "start"]