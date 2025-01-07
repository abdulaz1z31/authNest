FROM node:22

WORKDIR /docker-auth
RUN npm install -g pnpm

COPY package*.json ./


RUN pnpm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]