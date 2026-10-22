FROM --platform=linux/amd64 node:24

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN corepack enable && pnpm install --frozen-lockfile
