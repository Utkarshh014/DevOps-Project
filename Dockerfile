# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY server/package*.json ./
RUN npm install
COPY server/ .
RUN npx prisma generate
RUN npm run build || echo "No build step"

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app

# Create non-root user
RUN addgroup app && adduser -S app -G app
USER app

COPY --from=builder /app ./

EXPOSE 3000

HEALTHCHECK CMD wget --spider http://localhost:3000 || exit 1

CMD ["node", "src/index.js"]