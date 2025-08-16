FROM oven/bun:1 AS base

WORKDIR /usr/src/app

FROM base AS deps

# Copy workspace configuration files
COPY package.json bun.lock bunfig.toml turbo.json ./
COPY apps/server/package.json ./apps/server/package.json
COPY packages/types/package.json ./packages/types/package.json
COPY packages/constants/package.json ./packages/constants/package.json

# Install all dependencies (needed for workspace resolution)
RUN bun install --frozen-lockfile --no-save --ignore-scripts

FROM base AS builder

# Copy dependencies from deps stage
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/package.json ./package.json
COPY --from=deps /usr/src/app/turbo.json ./turbo.json
COPY --from=deps /usr/src/app/bun.lock ./bun.lock
COPY --from=deps /usr/src/app/bunfig.toml ./bunfig.toml

# Copy all source code
COPY apps/server ./apps/server
COPY packages ./packages

# Build the server
ENV NODE_ENV=production
RUN bun run build --filter=server

FROM base AS runner

# Copy workspace files needed for runtime
COPY --from=deps /usr/src/app/package.json ./package.json
COPY --from=deps /usr/src/app/turbo.json ./turbo.json
COPY --from=deps /usr/src/app/bun.lock ./bun.lock
COPY --from=deps /usr/src/app/bunfig.toml ./bunfig.toml

# Copy built packages (needed by server)
COPY --from=builder /usr/src/app/packages ./packages

# Copy built server
COPY --from=builder /usr/src/app/apps/server/dist ./apps/server/dist
COPY --from=builder /usr/src/app/apps/server/package.json ./apps/server/package.json

# Install only production dependencies for the final image
RUN bun install --production --no-save --ignore-scripts

# run the app
USER bun
EXPOSE 3000
ENTRYPOINT [ "bun", "run", "--cwd", "apps/server", "dist/index.js" ]
