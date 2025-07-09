```dockerfile
# Use official Node.js 22 image as the base
FROM node:22

# Set working directory
WORKDIR /app

# Install Python 3 and dependencies
RUN apt-get update && apt-get install -y python3 python3-pip

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Download and install yt-dlp
RUN mkdir -p yt-dlp-bin && \
    curl -L https://github.com/yt-dlp/yt-dlp/releases/download/2025.03.01/yt-dlp_linux -o yt-dlp-bin/yt-dlp && \
    chmod +x yt-dlp-bin/yt-dlp

# Copy the rest of the application code
COPY . .

# Expose the port (Render will override this with PORT env variable)
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
```