# Use a smaller node image for building
FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy application files and build
COPY . .
RUN npm run build

# Use Nginx to serve static files
FROM nginx:alpine
# Copy built files from the previous stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port (Nginx default is 80)
EXPOSE 80

# Starts nginx
CMD ["nginx", "-g", "daemon off;"]
