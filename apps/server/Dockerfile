FROM node:17

WORKDIR /usr/src/server

# Install packages first. If other files change, it won't have to reinstall.
COPY ./package.json .
# COPY ./yarn.lock .

RUN yarn

# Copy everything
COPY . .

RUN yarn build:production

EXPOSE 431

CMD ["yarn", "serve"]