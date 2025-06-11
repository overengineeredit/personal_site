# Use Node.js LTS version
FROM node:22-alpine

# Create app directory
WORKDIR /app

# Install curl for health checks
RUN apk add --no-cache curl

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev --no-audit --no-fund

# Copy application files
COPY . .

# Create a non-root user
RUN addgroup -S appuser && adduser -S -G appuser appuser \
    && chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Set runtime environment variables with defaults
ENV NODE_ENV=production \
    PORT=3000 \
    SITE_NAME="An Over-Engineered Personal Site" \
    SITE_OWNER_NAME="Peenak Inamdar" \
    SITE_TITLE="An Over-Engineered Personal Site" \
    SITE_DESCRIPTION="Personal website of Peenak Inamdar, an engineering leader passionate about building and scaling high-performing teams and platforms." \
    SITE_URL="https://overengineeredit.wtf" \
    SITE_IMAGE="/images/og-image.png" \
    FOOTER_NAME="Peenak Inamdar" \
    GTM_ID="GTM-TEST123" \
    RATE_LIMIT_WINDOW_MS=900000 \
    RATE_LIMIT_MAX_REQUESTS=100 \
    ALLOWED_ORIGINS="https://overengineeredit.wtf"

# Expose port
EXPOSE $PORT

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Start application
CMD ["node", "server.js"] 