# Use Puppeteer's prebuilt image with Chromium
FROM ghcr.io/puppeteer/puppeteer:19.7.2

# Set environment variables
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Set the working directory
WORKDIR /usr/src/app

# Use root user to set permissions
USER root

# Copy package.json and package-lock.json for dependencies installation
COPY package*.json ./

# Install dependencies, including TypeScript
RUN npm ci && npm install typescript --save-dev

# Copy the rest of the application source code
COPY . .

# Compile TypeScript to JavaScript
RUN npx tsc

# Expose the port your app uses (optional)
EXPOSE 3000

# Switch to non-root user for security
USER pptruser

# Run the compiled JavaScript file
CMD ["node", "dist/index.js"]
