# ─────────────────────────────────────────────────────────────────────────────
# EDS Content Extraction Pipeline
# ─────────────────────────────────────────────────────────────────────────────
#
# Multi-stage Docker build that extracts indexable markdown content from the
# Equinor Design System (equinor/design-system) repository.
#
# Stages:
#   1. build     — clone EDS repo, install deps, build Storybook + tokens
#   2. extractor — extract component docs from Storybook via llms-extractor
#   3. process   — convert token JSON → markdown, trim/patch extracted docs
#   4. export    — collect final markdown files (scratch-based, for artifact upload)
#
# Build args:
#   EDS_REPO — git URL of the design-system repo (default: equinor/design-system)
#   EDS_REF  — git ref to build: tag, branch, or SHA (default: main)
#
# Usage (from repo root):
#   docker build -f eds/docker/Dockerfile -t eds-content ./eds/docker \
#     --build-arg EDS_REF=@equinor/eds-core-react@0.46.0 \
#     --target export --output type=local,dest=eds-content
#
# ─────────────────────────────────────────────────────────────────────────────

# ── Stage 1: Build Storybook ────────────────────────────────────────────────
# Clones equinor/design-system at the requested ref, installs dependencies,
# and builds the full Storybook bundle (tokens → icons → core-react → storybook).
# This is the slowest stage; BuildKit layer caching keeps it fast across reruns
# when the EDS ref hasn't changed.
FROM node:24-alpine AS build

RUN apk add --no-cache git
RUN npm install -g pnpm@10.15.0
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

WORKDIR /app

ARG EDS_REPO=https://github.com/equinor/design-system.git
ARG EDS_REF=main
RUN git clone --depth 1 --branch "${EDS_REF}" "${EDS_REPO}" .

RUN pnpm install --frozen-lockfile

RUN pnpm build:tokens-build \
    && pnpm build:icons \
    && pnpm build:tokens \
    && pnpm build:utils \
    && pnpm build:core-react \
    && pnpm build:storybook

# ── Stage 2: Extract component docs ─────────────────────────────────────────
# Runs storybook-llms-extractor (Playwright-based) against the Storybook build
# to produce one markdown file per component. Tools are installed before
# copying build output so the layer is cached independently.
FROM node:24-bookworm AS extractor

WORKDIR /app
RUN npm install @fluentui/storybook-llms-extractor@0.0.4
RUN npx playwright install --with-deps chromium

COPY --from=build /app/packages/eds-core-react/storybook-build ./storybook-build
RUN npx storybook-llms-extractor --distPath ./storybook-build
RUN cd ./storybook-build/llms && for f in *.txt; do mv "$f" "${f%.txt}.md"; done

# ── Stage 3: Post-process extracted content ──────────────────────────────────
# Runs three Bun scripts (from the build context) that clean up the output:
#   convert-tokens.ts — token JSON → markdown tables with CSS variable refs
#   trim-stories.ts   — remove empty prop sections, beta duplicates, blank runs
#   fix-index-gaps.ts — remove skeleton pages, prepend import lines
FROM oven/bun:slim AS process

WORKDIR /app
COPY . .

COPY --from=build /app/packages/eds-tokens/build/json ./json
COPY --from=extractor /app/storybook-build/llms/ ./stories
COPY --from=build /app/apps/design-system-docs/docs/components ./components

RUN bun run convert-tokens.ts
RUN bun run trim-stories.ts
RUN bun run fix-index-gaps.ts /app

# ── Stage 4: Collect final output ───────────────────────────────────────────
# scratch-based stage that contains only the processed markdown files.
# Use `--target export --output type=local,dest=<dir>` to extract them.
FROM scratch AS export
COPY --from=process /app/components /components
COPY --from=build /app/apps/design-system-docs/docs/foundation /foundation
COPY --from=process /app/stories/ /stories
COPY --from=process /app/tokens/ /tokens
COPY --from=build /app/packages/eds-tokens/README.md /tokens/eds-tokens.md
COPY --from=build /app/packages/eds-icons/README.md /tokens/eds-icons.md
