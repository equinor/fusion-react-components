# Test file for building project, emulate GitHub

FROM ubuntu:20.04

ARG NODE_VERSION=14

WORKDIR /app 

RUN apt-get update \
  && apt-get install -y curl \
  && curl -sL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash - \
  && apt-get install -y nodejs

COPY . .

RUN npm ci
RUN npm run bootstrap
RUN npm run build
RUN npm run --prefix storybook --silent build
