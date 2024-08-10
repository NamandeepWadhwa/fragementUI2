# Stage 1: Build the Next.js application
FROM node AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Setup Nginx to serve the Next.js static files
FROM nginx:alpine
# Copy the build output to replace the default nginx contents.
COPY --from=builder /app/out /usr/share/nginx/html
# Copy the nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port 80 to the Docker host, so we can access it from the outside.
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]