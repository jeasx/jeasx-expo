FROM node:lts-alpine

RUN apk add --no-cache curl bash 

USER node
WORKDIR /home/node

COPY --chown=node:node package.json package-lock.json ./
RUN npm install --omit=dev && npm cache clean --force
COPY --chown=node:node . ./

RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/home/node/.bun/bin:$PATH"

RUN npm run build
ENTRYPOINT ["/home/node/entrypoint.sh"]