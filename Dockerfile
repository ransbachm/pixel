FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install -g

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD ["node", "index"]