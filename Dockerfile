FROM node:16 as build
COPY . ./app
WORKDIR ./app
RUN npm install
RUN npm run build

FROM nginx:1.19-alpine
COPY --from=build /app/.svelte-kit/build/index.js /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
