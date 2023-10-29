FROM node:18

WORKDIR /nc-news-frontend

COPY ./package.json .

RUN npm cache clean --force && npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
