# Use official Node.js 22 image as the base
FROM node:22

# Set working directory
WORKDIR /app

# Install Python 3, pip, and ffmpeg, and create a python alias
RUN apt-get update && apt-get install -y python3 python3-pip ffmpeg && \
    ln -s /usr/bin/python3 /usr/bin/python

# Install yt-dlp via pip, bypassing PEP 668
RUN pip3 install --no-cache-dir yt-dlp --break-system-packages

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port (Render will override this with PORT env variable)
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]