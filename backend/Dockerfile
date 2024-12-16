# Use Puppeteer's prebuilt image with Chromium
FROM ghcr.io/puppeteer/puppeteer:19.7.2

# Set environment variables
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for dependencies installation
COPY package*.json ./

# Install project dependencies
RUN npm ci

# Install TypeScript globally
RUN npm install -g typescript

# Copy the rest of the application source code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Expose the port your app uses (optional, adjust if needed)
EXPOSE 3000

# Define the command to start the application
CMD ["node", "dist/index.js"]
