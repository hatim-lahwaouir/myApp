# Dockerfile

# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the container
COPY --chmod=666 app/package.json .
RUN npm install
WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
# COPY package*.json ./

# Install dependencies

# Copy the rest of the application code


# Expose the Next.js development server port
EXPOSE 3000

# Start the Next.js app in development mode
CMD ["npm", "run", "dev"]

