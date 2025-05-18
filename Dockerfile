FROM --platform=linux/amd64 node:20

RUN apt-get update && apt-get install -y \
  graphicsmagick \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npx browserslist@latest --update-db --yes