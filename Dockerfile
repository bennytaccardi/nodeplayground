FROM node:19-alpine

WORKDIR /app

ADD package.json .

RUN npm i

ENTRYPOINT ["npm", "run"]

CMD ["start:dev"]