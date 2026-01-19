# Use official Node.js image
FROM node:22-slim

# Set working directory
WORKDIR /app

# Copy package.json & tsconfig if using TypeScript
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# Build TS (if needed)
RUN npx tsc || echo "No TypeScript build needed"

# Expose a port if needed (not required here since it's a scraper)
# EXPOSE 3000

# Default command runs the scraper
CMD ["npx", "ts-node", "index.ts"]
