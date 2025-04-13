FROM node:lts-alpine

RUN apk add --no-cache curl bash 

USER node
WORKDIR /home/node

RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/home/node/.bun/bin:$PATH"

COPY --chown=node:node package.json package-lock.json ./
RUN npm install --omit=dev && npm cache clean --force
COPY --chown=node:node . ./

RUN npm run build
CMD ["npm","start"]