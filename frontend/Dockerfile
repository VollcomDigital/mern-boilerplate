FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable

# --- Dependencies ---
FROM base AS deps
COPY package.json package-lock.json ./
COPY shared/package.json shared/
COPY frontend/package.json frontend/
RUN npm ci --workspace=@mern/frontend --workspace=@mern/shared --include-workspace-root

# --- Build ---
FROM deps AS build
COPY tsconfig.base.json ./
COPY shared/ shared/
COPY frontend/ frontend/
RUN npm run build -w shared && npm run build -w frontend

# --- Nginx production stage ---
FROM nginx:1.27-alpine AS production

RUN rm /etc/nginx/conf.d/default.conf

COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/frontend/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
