# Use Puppeteer's prebuilt image with Chromium
FROM ghcr.io/puppeteer/puppeteer:19.7.2

# Set environment variables
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for dependencies installation
COPY package*.json ./

# Change ownership of the working directory to the non-root user (pptruser)
USER root
RUN chown -R pptruser:pptruser /usr/src/app

# Switch to non-root user
USER pptruser

# Install project dependencies, including ts-node and TypeScript locally
RUN npm ci && npm install ts-node typescript --save-dev

# Copy the rest of the application source code
COPY . .

# Expose the port your app uses (optional, adjust if needed)
EXPOSE 3000

# Define the command to start the application using ts-node
CMD ["npx", "ts-node", "index.ts"]
