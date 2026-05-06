# Stage 1: Build Frontend
FROM node:20-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Stage 2: Build Backend
FROM node:18-alpine AS server-builder
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci
COPY server/ ./
RUN npx prisma generate

# Stage 3: Production
FROM node:18-alpine
WORKDIR /app

# Create non-root user
RUN addgroup app && adduser -S app -G app
USER app

# Copy backend files
COPY --from=server-builder /app/server ./

# Copy compiled frontend files to public folder
COPY --from=client-builder /app/client/dist ./public

EXPOSE 3000

HEALTHCHECK CMD wget --spider http://localhost:3000/api/health || exit 1

CMD ["node", "src/index.js"]