FROM node:17.5.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=1984 AUTHKEY=A123JDKn12l123@11saazdeop102

EXPOSE 1984

CMD ["npm", "start"]