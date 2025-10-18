# Dockerfile for Resume System backend
# - Uses official Node.js LTS image
# - Installs dependencies
# - Copies app code
# - Exposes port 5000
# - Runs in development mode via `npm run dev`

FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies first (better layer caching)
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev=false || npm install

# Copy application files
COPY . .

# Expose backend port
EXPOSE 5000

# Default environment (can be overridden by compose/.env)
ENV NODE_ENV=development

# Run the development server
CMD ["npm", "run", "dev"]




