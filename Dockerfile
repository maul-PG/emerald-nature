# Dockerfile multi-stage for Next.js production
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
# If using pnpm or yarn, adapt accordingly
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Copy only what we need for production
COPY package*.json ./
RUN npm ci --production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
EXPOSE 3000
CMD ["npm","run","start"]
