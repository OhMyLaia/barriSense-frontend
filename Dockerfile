# =========================================================================
# BUILD - Use Node.js to build the project
# =========================================================================
# We use a lightweight Node.js 20 image (LTS - Long Term Support).
FROM node:20-alpine AS builder

# Set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies.
# This leverages Docker’s cache: if they don’t change, dependencies aren’t reinstalled.
COPY package*.json ./

# Install project dependencies.
RUN npm install

# Copy the rest of the source code.
COPY . .

# Create the optimized production build of the application.
RUN npm run build

# =========================================================================
# STAGE 2: PRODUCTION - Use Nginx to serve the files
# =========================================================================
# We use a super lightweight and official Nginx image.
FROM nginx:stable-alpine

# Copy the static files generated in the previous (builder) stage
# into the default directory from which Nginx serves content.
# NOTE: The folder may be 'build' (Create React App) or 'dist' (Vite).
# If it doesn’t work, ask the frontend team what their output folder name is.
# COPY --from=builde
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 (optional, for documentation)
EXPOSE 80

# Nginx starts automatically
