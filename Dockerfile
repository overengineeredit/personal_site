# Use Node.js LTS (Hydrogen) slim image
FROM node:18-slim

# Set working directory
WORKDIR /usr/src/app

# Install dependencies first (for better caching)
COPY package*.json ./
RUN npm ci --only=production

# Copy app source
COPY . .

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 --ingroup nodejs nodeuser \
    && chown -R nodeuser:nodejs /usr/src/app

# Switch to non-root user
USER nodeuser

# Expose port
EXPOSE 3000

# Set Node.js to run in production mode
ENV NODE_ENV=production

# Start the app
CMD ["node", "server.js"] 