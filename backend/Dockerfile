FROM ghcr.io/puppeteer/puppeteer:23.6.0

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# RUN chmod -R 755 /app/node_modules
RUN if [ -d /app/node_modules ]; then chmod -R 755 /app/node_modules; fi

CMD ["npm", "run", "start"]
