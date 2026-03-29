FROM node

WORKDIR /app/

COPY package*.json  /app/

RUN npm install

COPY . .

EXPOSE 5137

CMD [ "npm", "run" ,"dev" ]