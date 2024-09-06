# Use the official Node.js 20 image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install build tools and then dependencies
# This ensures any native modules are compiled correctly
RUN apt-get update && apt-get install -y build-essential \
    && npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Install a simple HTTP server to serve the React app
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 5702

# Command to serve the app using serve
CMD ["serve", "-s", "dist", "-l", "5702"]
