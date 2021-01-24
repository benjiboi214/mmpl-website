FROM node:14-alpine 

ENV NODE_ENV production

# Prep Application Directory
RUN mkdir /app
WORKDIR /app
COPY ./package.json /app
COPY ./yarn.lock /app

# Install Dependencies
RUN yarn && \
    yarn install && \
    yarn cache clean

# Copy Application Files
COPY ./dist /app
COPY ./public /public

# Set Directory Permissions
RUN chown -R node:node /app
RUN chown -R node:node /public

USER node

CMD node server.js
