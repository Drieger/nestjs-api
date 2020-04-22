FROM node:12-alpine

WORKDIR /app

# Copy files we need
COPY src /app/src
COPY yarn.lock /app
COPY package.json /app
COPY nodemon.json /app
COPY tsconfig.json /app
COPY nest-cli.json /app
COPY ormconfig.ts /app
COPY migrations /app/migrations

# Install our package
RUN yarn install

# Set timezone
ENV TZ='America/Sao_Paulo'
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Run dev server
CMD  ["yarn", "start:watch"]