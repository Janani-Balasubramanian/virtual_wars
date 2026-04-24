# Stage 1: Build the React application
FROM node:20-alpine as build-stage

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine

# Copy the build output to Nginx's html directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80 (Cloud Run will map this to the $PORT environment variable)
EXPOSE 80

# Cloud Run uses the $PORT env var, but Nginx defaults to 80. 
# We'll use a custom nginx config if needed, but for now, we'll just run nginx.
CMD ["nginx", "-g", "daemon off;"]
