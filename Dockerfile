FROM node:lts-alpine

RUN npm install

WORKDIR /home/api

COPY package.json npm. * ./

USER node

COPY . .

EXPOSE 3333

CMD [ "npm", "start" ]

