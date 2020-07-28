FROM node:14-alpine

RUN apk add  --no-cache ffmpeg

# Install app dependencies
COPY package.json .
COPY package-lock.json .
RUN npm ci

# Copy application source
COPY . .

CMD node index.js