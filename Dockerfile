FROM node:10.15.3

WORKDIR /app

COPY . /app

ENV NODE_ENV=production
ENV HOST 0.0.0.0

RUN npm i -g pm2
RUN npm install
RUN npm run build

EXPOSE 7000
CMD ["pm2-runtime", "server/index.js"]
