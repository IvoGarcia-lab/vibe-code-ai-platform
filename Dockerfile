# Build stage for client
FROM node:18-alpine AS client-builder

WORKDIR /app/client

# Copy package files
COPY client/package*.json ./
RUN npm ci --only=production

# Copy client source code
COPY client/ ./
RUN npm run build

# Build stage for server
FROM node:18-alpine AS server-builder

WORKDIR /app/server

# Copy package files
COPY server/package*.json ./
RUN npm ci

# Copy server source code
COPY server/ ./
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Install PostgreSQL client for database operations
RUN apk add --no-cache postgresql-client

WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Copy built client files
COPY --from=client-builder --chown=nodejs:nodejs /app/client/dist ./client/dist

# Copy server files
COPY --from=server-builder --chown=nodejs:nodejs /app/server/dist ./server/dist
COPY --from=server-builder --chown=nodejs:nodejs /app/server/package*.json ./server/

# Install production dependencies only
WORKDIR /app/server
RUN npm ci --only=production && npm cache clean --force

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) }).on('error', () => process.exit(1))"

# Start the application
CMD ["node", "dist/index.js"]