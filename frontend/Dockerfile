FROM node:22-alpine AS base

WORKDIR /app

# Install system dependencies required for canvas
RUN apk add --no-cache \
    pixman-dev \
    cairo-dev \
    pango-dev \
    jpeg-dev \
    giflib-dev \
    librsvg-dev \
    python3 \
    make \
    g++ \
    pkgconfig

COPY package.json package-lock.json ./

RUN npm ci --production

COPY . .

RUN npm run build

FROM node:22-alpine as prod

WORKDIR /app

# Install runtime dependencies for canvas
RUN apk add --no-cache \
    pixman \
    cairo \
    pango \
    jpeg \
    giflib \
    librsvg

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=base /app .

RUN adduser -D appuser
USER appuser

EXPOSE 3000

CMD ["npm", "start"]
