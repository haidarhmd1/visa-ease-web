FROM node:18.12.1-slim

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json tsconfig.json yarn.lock ./

COPY prisma ./prisma
COPY src ./src

RUN yarn install --frozen-lockfile

CMD yarn migrate-dev
