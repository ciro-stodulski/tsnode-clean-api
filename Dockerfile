FROM node:16-alpine

COPY ./dist /home/application
COPY ./package.json /home/application/package.json
COPY ./package-lock.json /home/application/package-lock.json
COPY ./knexfile.js /home/application/knexfile.js
COPY ./migrations /home/application/migrations

RUN cd /home/application && npm ci

WORKDIR /home/application

EXPOSE 3000

CMD npm start 
