FROM node:16.15.1 as build
COPY . ./app
WORKDIR ./app
RUN npm install -g npm@8.13.0
RUN npm install
RUN npm run build

EXPOSE 80

CMD ["node", "build/index.js"]
