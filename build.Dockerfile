# Test file for building project, emulate GitHub

FROM oven/bun:latest

WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile
RUN bun run build
RUN bun run lint
RUN bun run --cwd storybook build
