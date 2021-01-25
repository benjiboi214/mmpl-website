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
<<<<<<< HEAD
COPY ./views /views
=======
>>>>>>> 913b78072f4af3c20f897f09f822a38a30bdf730

# Set Directory Permissions
RUN chown -R node:node /app
RUN chown -R node:node /public
<<<<<<< HEAD
RUN chown -R node:node /views
=======
>>>>>>> 913b78072f4af3c20f897f09f822a38a30bdf730

USER node

CMD node server.js
