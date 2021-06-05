FROM mongo-express:latest

WORKDIR /home/ubuntu/app

COPY src/* ./
COPY package*.json ./

RUN npm ci --only=prod

ENV key=value

EXPOSE 4223
CMD [ "npm", "start" ]
