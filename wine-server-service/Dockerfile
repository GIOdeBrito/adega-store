FROM node:20.10.0

WORKDIR /usr/src/app

COPY package*.json .
RUN npm install

# Install SQLite3 dependency
RUN npm install sqlite3

EXPOSE ${SERVER_PORT}