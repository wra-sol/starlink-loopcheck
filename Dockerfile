FROM node:alpine

WORKDIR /app

RUN apk add --update figlet && \
    rm -rf /var/cache/apk/*

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD figlet -f slant 'Nathaniel Arfin presents Starlink loopcheck...' && npm start
