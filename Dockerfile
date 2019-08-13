FROM node:11.4

WORKDIR /usr/board

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

RUN npm run tsc


ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.1/wait /wait
RUN chmod +x /wait


CMD npm start
