# Stage 1

FROM node:14-alpine as build-step

WORKDIR /app

#COPY package.json /app
COPY . .

RUN npm install

RUN npm run build:prod

# Stage 2

FROM nginx:1.21.6-alpine

COPY --from=build-step /app/dist/timet-web /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]

