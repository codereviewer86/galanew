# ----------- Build Stage -----------
FROM node:20-bookworm-slim AS build

# Install required system libraries for Prisma/OpenSSL
RUN apt-get update -y && \
    apt-get install -y openssl libssl-dev ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies including Prisma CLI
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Ensure Prisma schema uses correct binary targets
# Make sure your prisma/schema.prisma has:
# generator client {
#   provider      = "prisma-client-js"
#   engineType    = "library"
#   binaryTargets = ["native", "debian-openssl-3.0.x"]
# }
RUN npx prisma generate --schema=prisma/schema.prisma

# Build TypeScript into dist/
RUN npm run build

# ----------- Production Stage -----------
FROM node:20-bookworm-slim AS prod

WORKDIR /app

# Install required system libraries for Prisma/OpenSSL at runtime
RUN apt-get update -y && \
    apt-get install -y openssl libssl-dev ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Copy production dependencies & built code
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package*.json ./

# Prisma environment settings
ENV NODE_ENV=production
ENV PRISMA_CLIENT_ENGINE_TYPE=library
ENV PRISMA_CLI_QUERY_ENGINE_TYPE=binary
ENV PRISMA_QUERY_ENGINE_BINARY=/app/node_modules/.prisma/client/query-engine-debian-openssl-3.0.x

EXPOSE 5000

# Run migrations then start the server
CMD ["sh", "-c", "npx prisma migrate deploy --schema=prisma/schema.prisma && node dist/server.js"]