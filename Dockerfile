FROM node:14.17-alpine3.14

RUN apk add --no-cache bash

RUN npm install -g @nestjs/cli
RUN npm install -g ts-node

USER node

WORKDIR /home/node/app