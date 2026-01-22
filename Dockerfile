FROM node:20-alpine as build
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
COPY prisma/ ./prisma/
RUN yarn install --frozen-lockfile
COPY . ./
RUN yarn build api

FROM node:20-alpine as build-runtime
ARG NODE_ENV=production
WORKDIR /usr/src/app
RUN apk update && apk add --no-cache \
  curl \
  bash \
  && rm -rf /var/cache/apk/*
COPY package.json yarn.lock ./
COPY prisma/ ./prisma/
RUN yarn install --frozen-lockfile --production
COPY --from=build /usr/src/app/dist ./dist

FROM node:20-alpine
ENV NODE_ENV=production
ENV APP_PORT=3333
EXPOSE 3333
WORKDIR /usr/src/app
RUN apk add --no-cache tini
COPY --chown=node:node --from=build-runtime /usr/src/app ./
USER node
ENTRYPOINT ["/sbin/tini", "--", "node"]
CMD ["./dist/apps/api/main.js"]
