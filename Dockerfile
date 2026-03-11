FROM imbios/bun-node:latest-current-alpine

USER node
WORKDIR /home/node

COPY --chown=node:node package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --chown=node:node . ./

RUN node --run build

ENTRYPOINT ["/home/node/entrypoint.sh"]