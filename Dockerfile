FROM node:22-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --production=false

COPY . .
RUN npm run build

EXPOSE 5000
CMD ["node", "dist/index.cjs"]
