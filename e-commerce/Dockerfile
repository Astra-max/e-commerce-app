FROM node:20-alpine

WORKDIR /app/

COPY package*.json  /app/

RUN npm install --production

COPY . .

EXPOSE 3000

CMD [ "npm", "run" ,"dev" ]