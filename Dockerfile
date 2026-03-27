FROM node:current-slim

RUN npm -g i deno bun

USER node
WORKDIR /home/node

COPY --chown=node:node package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --chown=node:node . ./

RUN node --run build

ENTRYPOINT ["/home/node/entrypoint.sh"]