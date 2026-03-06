# ── Etapa 1: dependencias ──────────────────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ── Etapa 2: build ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Las variables de entorno deben estar disponibles en tiempo de build
ARG OWM_API_KEY
ARG OWM_BASE_URL
ARG OWM_CITY

ENV OWM_API_KEY=$OWM_API_KEY
ENV OWM_BASE_URL=$OWM_BASE_URL
ENV OWM_CITY=$OWM_CITY

RUN npm run build

# ── Etapa 3: runtime ───────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copiar solo lo necesario para producción
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
