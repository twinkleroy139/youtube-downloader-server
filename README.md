# YouTube Downloader Server

This is a Node.js-based backend server that works with a Chrome extension to search for YouTube videos by URL or keyword and download them in various formats using `yt-dlp`.

## Features

- 🔍 Search YouTube videos by URL or keyword
- 📥 Download videos in available formats (360p, 480p, etc.)
- 📷 Displays video thumbnail and title
- ⌛ Shows a loading indicator during download processing
- 🌐 Works locally with `http://localhost:3000`

## Tech Stack

- Node.js
- Express
- yt-dlp (via `yt-dlp-exec`)
- yt-search
- Chrome Extension (frontend)

## Installation

1. **Clone the repo:**
   ```bash
   git clone https://github.com/twinkleroy139/youtube-downloader-server.git
   cd youtube-downloader-server
