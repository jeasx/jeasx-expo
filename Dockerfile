FROM node:lts-alpine

RUN echo https://dl-cdn.alpinelinux.org/alpine/edge/community/ >> /etc/apk/repositories
RUN apk --no-cache add shadow inotify-tools

ARG UID=1000
RUN usermod -u $UID node; groupmod -g $UID node

USER node
WORKDIR /home/node

COPY --chown=node:node package.json package-lock.json ./
RUN npm install --omit=dev && npm cache clean --force
COPY --chown=node:node . ./

RUN npx jeasx build
CMD npx jeasx start