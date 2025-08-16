FROM oven/bun:1-alpine AS base

FROM base AS builder

ENV APK_CACHE_DIR="/app/.cache/apk" \
    APK_SYMLINK_DIR="/etc/apk/cache" \
    FORCE_COLOR=1

RUN mkdir -p ${APK_CACHE_DIR} && \
    ln -fns ${APK_CACHE_DIR} ${APK_SYMLINK_DIR}

RUN --mount=type=cache,target=${APK_CACHE_DIR} \
    apk update && apk upgrade && apk add libc6-compat

WORKDIR /app

COPY --chmod=444 package.json bun.lock bunfig.toml turbo.json ./

COPY --chmod=444 apps/web/package.json ./apps/web/package.json
COPY --chmod=444 packages/types/package.json ./packages/types/package.json
COPY --chmod=444 packages/constants/package.json ./packages/constants/package.json

RUN --mount=type=cache,target=/root/bun \
    bun install


COPY --chmod=444 packages/types ./packages/types
COPY --chmod=444 packages/constants ./packages/constants

COPY --chmod=444 apps/web/.env* apps/web/next.config.ts apps/web/tsconfig.json ./apps/web/
COPY --chmod=555 apps/web/public ./apps/web/public
COPY --chmod=555 apps/web/src ./apps/web/src

ENV NEXT_TELEMETRY_DISABLED=1

RUN bun run build --filter=web

FROM base AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 bunjs && \
    adduser --system --uid 1001 -G bunjs nextjs

COPY --from=builder --chown=root:root --chmod=555 /app/apps/web/public /app/apps/web/public

COPY --from=builder --chown=root:root --chmod=555 /app/apps/web/.next/standalone /app/

RUN mkdir -p /app/apps/web/.next/cache \
    && chown -R nextjs:bunjs /app/apps/web/.next/cache \
    && chmod -R 755 /app/apps/web/.next/cache

COPY --from=builder --chown=root:root --chmod=555 /app/apps/web/.next/static /app/apps/web/.next/static

USER nextjs

EXPOSE 3000

ENV HOSTNAME="0.0.0.0"

ENV PORT=3000

CMD ["node", "./apps/web/server.js"]
