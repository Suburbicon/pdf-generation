FROM node:20.7.0

WORKDIR /app
RUN chown node /app
USER node

COPY --chown=node:node ./package.json ./package.json
COPY --chown=node:node ./package-lock.json ./package-lock.json
COPY --chown=node:node ./.npmrc  ./.npmrc

ARG NPM_TOKEN

RUN npm ci --omit=dev --ignore-scripts

COPY --chown=node:node ./dist /app/

EXPOSE 8000

ENV NODE_ENV=production
ENV APP_HOST=0.0.0.0

CMD ["node", "app.js"] 
