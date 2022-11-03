FROM node:18-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

ENV NODE_ENV=production

RUN npm ci --ignore-scripts


FROM node:18-alpine AS openapi-generate

RUN apk add openjdk11-jre-headless

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm i -g @openapitools/openapi-generator-cli

RUN npm run openapi-gen


FROM node:18-alpine AS build

WORKDIR /app

COPY --from=openapi-generate /app ./

RUN npm i -D @angular/cli@14.1.0 @angular-devkit/build-angular@14.1.0 @angular/compiler-cli@14.1.0

ARG BASE_HREF="/"

ARG DEMO

RUN if [[ -z $DEMO ]]; then \
        npm run build -- --base-href $BASE_HREF; \
    else \
        npm run build -- --base-href $BASE_HREF --configuration demo; \
    fi


FROM nginx:1.23.2-alpine AS run

COPY --from=build /app/dist/ecommerce-platform-angular-admin-panel /app

COPY src/nginx.conf /etc/nginx/nginx.conf
