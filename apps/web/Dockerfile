FROM oven/bun:1 AS base

FROM base AS builder

ENV FORCE_COLOR=1

RUN apt-get update && apt-get install -y --no-install-recommends libc6 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --chmod=444 apps/web/package.json ./apps/web/package.json
COPY --chmod=444 packages/types/package.json ./packages/types/package.json
COPY --chmod=444 packages/constants/package.json ./packages/constants/package.json

COPY --chmod=444 package.json bun.lock bunfig.toml turbo.json ./

RUN --mount=type=cache,target=/root/bun \
	bun install --no-save --ignore-scripts


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

RUN groupadd --system --gid 1001 bunjs

RUN useradd --system --uid 1001 --gid bunjs nextjs

COPY --from=builder --chown=nextjs:bunjs --chmod=755 /app/apps/web/.next/standalone ./

COPY --from=builder --chown=nextjs:bunjs --chmod=755 /app/apps/web/.next/static ./apps/web/.next/static

COPY --from=builder --chown=nextjs:bunjs --chmod=755 /app/apps/web/public ./apps/web/public

COPY --from=builder --chown=nextjs:bunjs --chmod=755 /app/apps/web/.next/static ./apps/web/public/_next/static

RUN mkdir -p /app/apps/web/.next/cache \
	&& chown -R nextjs:bunjs /app/apps/web/.next/cache \
	&& chmod -R 755 /app/apps/web/.next/cache

USER nextjs

EXPOSE 3000

ENV HOSTNAME="0.0.0.0"

ENV PORT=3000

CMD ["node", "./apps/web/server.js"]
