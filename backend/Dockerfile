FROM node:18.20.2 AS builder
# RUN apk add --no-cache libc6-compat
RUN npm i -g pnpm

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/
COPY pnpm-lock.yaml ./
RUN pnpm install

COPY . .
RUN npm run build

FROM node:18.20.2
# RUN apk add --no-cache libc6-compat
RUN npm i -g pnpm
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
# COPY --from=builder /app/templates ./templates


EXPOSE 4000
CMD [ "npm", "run", "start:prod" ]