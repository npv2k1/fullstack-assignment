# Use official Node.js Alpine image as base for smaller image size
FROM node:18.20.2-alpine AS dependencies

# Install pnpm globally
RUN npm i -g pnpm

# Set working directory
WORKDIR /app

# Copy only package files first to leverage Docker cache
COPY package*.json pnpm-lock.yaml* ./

# Install dependencies with pnpm
RUN pnpm install --frozen-lockfile

# Builder stage
FROM dependencies AS builder
WORKDIR /app

# Copy all project files
COPY . .

# Create .env file
RUN cp .env.example .env

# Build the application
RUN pnpm run build

# Production stage
FROM node:18.20.2-alpine AS runner

# Install pnpm
RUN npm i -g pnpm

# Set working directory
WORKDIR /app

# Set non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy necessary files from builder
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/next.config.js ./next.config.js
# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]