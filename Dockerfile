FROM node:20 AS build-stage

WORKDIR /usr/src/app

COPY . .

ENV VITE_API_URL='http://167.172.139.236/api'

RUN npm ci

RUN npm run build

# FROM node:20 AS build-stage

# WORKDIR /usr/src/app

# COPY . .

# ENV VITE_API_URL='http://167.172.139.236/api'

# RUN npm ci

# RUN npm run build

# FROM nginx:1.25-alpine

# COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

FROM node:20 AS build-stage
WORKDIR /usr/src/app
COPY . .
ENV VITE_API_URL='http://167.172.139.236/api'
RUN npm ci
RUN npm run build

FROM nginx:alpine
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]
