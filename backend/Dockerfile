FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable

# --- Dependencies ---
FROM base AS deps
COPY package.json package-lock.json ./
COPY shared/package.json shared/
COPY backend/package.json backend/
RUN npm ci --workspace=@mern/backend --workspace=@mern/shared --include-workspace-root

# --- Build ---
FROM deps AS build
COPY tsconfig.base.json ./
COPY shared/ shared/
COPY backend/ backend/
RUN npm run build -w shared && npm run build -w backend

# --- Production ---
FROM node:22-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 appuser

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/backend/node_modules ./backend/node_modules
COPY --from=deps /app/shared/node_modules ./shared/node_modules 2>/dev/null || true
COPY --from=build /app/shared/dist ./shared/dist
COPY --from=build /app/backend/dist ./backend/dist
COPY --from=build /app/shared/package.json ./shared/package.json
COPY --from=build /app/backend/package.json ./backend/package.json
COPY package.json ./

USER appuser

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4000/health/liveness || exit 1

CMD ["node", "backend/dist/server.js"]
