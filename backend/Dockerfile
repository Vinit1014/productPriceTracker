# Use Puppeteer's prebuilt image with Chromium
FROM ghcr.io/puppeteer/puppeteer:19.7.2

# Set environment variables
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Set the working directory
WORKDIR /usr/src/app

# Use root user to ensure proper permissions
USER root

# Copy package.json and package-lock.json for dependencies installation
COPY package*.json ./

# Install project dependencies and ts-node
RUN npm ci && npm install ts-node typescript --save-dev

# Copy the rest of the application source code
COPY . .

# Ensure ts-node is executable
RUN chmod +x ./node_modules/.bin/ts-node

# Expose the port your app uses (optional)
EXPOSE 3000

# Switch to non-root user for security
USER pptruser

# Define the command to start the application
CMD ["npx", "ts-node", "src/index.ts"]
