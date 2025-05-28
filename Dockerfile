# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

# Install dependencies needed for native modules
RUN apk add --no-cache libc6-compat python3 make g++

# Copy package files and install dependencies
COPY package.json package-lock.json* ./

# Install lightningcss explicitly
RUN npm install lightningcss

# Install necessary build dependencies
RUN npm ci --force
RUN npm rebuild --platform=linux --arch=x64

# Copy project files
COPY . .

# Accept build-time environment variables
ARG NEXT_PUBLIC_USDA_API_KEY
ENV NEXT_PUBLIC_USDA_API_KEY=$NEXT_PUBLIC_USDA_API_KEY

# Build the Next.js application
RUN npm run build

# Production stage
FROM node:22-alpine AS runner
WORKDIR /app

# Set environment to production
ENV NODE_ENV production

# Install necessary runtime dependencies
RUN apk add --no-cache libc6-compat

# Create a non-root user for running the application
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from build stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set proper ownership
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set the hostname for proper binding
ENV HOSTNAME "0.0.0.0"

# Start the application
CMD ["node", "server.js"]