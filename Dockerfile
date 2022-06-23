FROM node:16 as build
COPY . ./app
WORKDIR ./app
RUN npm install
RUN npm run build

EXPOSE 3000

FROM build

CMD ["npm", "run", "start"]
