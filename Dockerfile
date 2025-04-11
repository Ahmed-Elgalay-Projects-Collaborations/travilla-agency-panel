# Use the official Node.js 22 image as the base
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only package files first to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port Vite runs on
EXPOSE 3500

# Start the Vite dev server
CMD ["npm", "run", "dev"]
