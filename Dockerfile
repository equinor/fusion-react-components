FROM node:14-buster
WORKDIR /app 
COPY . .
RUN npm ci
RUN npx lerna bootstrap
RUN npm run build
RUN npx tsc -b
