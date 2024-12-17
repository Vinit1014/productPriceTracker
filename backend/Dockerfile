# # Use Puppeteer's prebuilt image with Chromium
# FROM ghcr.io/puppeteer/puppeteer:19.7.2

# # Set environment variables
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
#     PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# # Set the working directory
# WORKDIR /usr/src/app

# # Use root user to ensure proper permissions
# USER root

# # Copy package.json and package-lock.json for dependencies installation
# COPY package*.json ./

# # Install project dependencies and ts-node
# RUN npm ci && npm install ts-node typescript --save-dev

# # Copy the rest of the application source code
# COPY . .

# # Ensure ts-node is executable
# RUN chmod +x ./node_modules/.bin/ts-node

# # Expose the port your app uses (optional)
# EXPOSE 3000

# # Switch to non-root user for security
# USER pptruser

# # Define the command to start the application
# CMD ["npx", "ts-node", "src/index.ts"]


# Start with a lightweight Node.js image
FROM node:18-slim

# Set the working directory
WORKDIR /app

# Install dependencies for Puppeteer
# The following are required for Puppeteer to run in a Docker environment
RUN apt-get update && apt-get install -y \
  ca-certificates \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libatspi2.0-0 \
  libcups2 \
  libdbus-1-3 \
  libexpat1 \
  libfontconfig1 \
  libgbm1 \
  libgtk-3-0 \
  libnspr4 \
  libnss3 \
  libpango-1.0-0 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  xdg-utils \
  wget \
  --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Install TypeScript globally
RUN npm install -g typescript

# Compile TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Define the command to start the application
CMD ["node", "dist/index.js"]