# Use Bun runtime
FROM oven/bun:1.1.21-slim as base

# Set working directory
WORKDIR /app

# Copy package.json
COPY package.json bun.lock* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production

# Start the server
CMD ["bun", "run", "start"]
