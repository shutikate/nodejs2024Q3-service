FROM node:20-alpine AS base

WORKDIR /usr/src/app
COPY package*.json /usr/src/app
RUN npm ci && npm cache clean --force
COPY . .
RUN npx prisma generate

FROM base AS prisma-migrate

CMD ["npx", "prisma", "migrate", "dev"]

FROM base AS development

EXPOSE 4000

CMD ["npm", "run", "start:dev"]