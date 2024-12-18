# Use Puppeteer's prebuilt image with Chromium
FROM ghcr.io/puppeteer/puppeteer:19.7.2

# Set environment variables
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable \
    NODE_ENV=production

# Set the working directory
WORKDIR /usr/src/app

# Use root user to ensure proper permissions
USER root

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && \
    npm install -g ts-node typescript

# Copy the rest of the application source code
COPY . .

# Build TypeScript
RUN npm run build

# Ensure correct permissions
RUN chmod +x ./node_modules/.bin/ts-node

# Expose the port (use Render's default)
EXPOSE 10000

# Switch to non-root user for security
USER pptruser

# Use the built files for production
CMD ["node", "dist/index.js"]