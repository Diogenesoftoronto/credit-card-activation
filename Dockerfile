FROM NODE:17.5.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=1984 AUTHKEY=lol

EXPOSE 1984

CMD ["npm", "start"]