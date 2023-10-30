FROM node:18

WORKDIR /nc-news-frontend

COPY ./package.json .

RUN npm cache clean --force && npm install

COPY . .

CMD ["npm", "run", "dev"]
