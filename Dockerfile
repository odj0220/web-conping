FROM node:16.15.1 as build
COPY . ./app
WORKDIR ./app
RUN npm install -g npm@8.13.0
RUN npm install
RUN npm run build

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/.svelte-kit/build/index.js /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
