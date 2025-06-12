// for global
// ✅ Updated server.js (clean and final for deployment)
// Replace your current server.js file with the following:
const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const ytSearch = require('yt-search');

const app = express();
app.use(cors());
app.use(express.json());

// Fetch download formats by video URL
app.post('/get-info', (req, res) => {
  const { videoUrl } = req.body;
  if (!videoUrl) return res.status(400).json({ error: 'No video URL provided' });

  const cmd = `yt-dlp -J "${videoUrl}"`;
  exec(cmd, (error, stdout) => {
    if (error) {
      return res.status(500).json({ error: 'Failed to fetch video info' });
    }
    try {
      const json = JSON.parse(stdout);
      const formats = json.formats
        .filter(f => f.vcodec !== 'none' && f.acodec !== 'none' && !f.format_note?.includes('DASH'))
        .map(f => ({
          url: f.url,
          ext: f.ext,
          format_id: f.format_id,
          quality_label: f.quality,
          height: f.height
        }));
      res.json({
        title: json.title,
        thumbnail: json.thumbnail,
        formats
      });
    } catch (err) {
      res.status(500).json({ error: 'Invalid video info format' });
    }
  });
});

// Keyword-based video search (for extension UI)
// app.post('/search', async (req, res) => {
//   const { keyword } = req.body;
//   if (!keyword) return res.status(400).json({ error: 'No keyword provided' });

//   try {
//     const result = await ytSearch(keyword);
//     const videos = result.videos.slice(0, 5).map(v => ({
//       title: v.title,
//       thumbnail: v.thumbnail,
//       url: v.url
//     }));
//     res.json({ videos });
//   } catch (err) {
//     res.status(500).json({ error: 'Search failed' });
//   }
// });


app.post('/search', async (req, res) => {
  const { keyword } = req.body;
  if (!keyword) {
    console.error("No keyword provided in request body.");
    return res.status(400).json({ error: 'No keyword provided' });
  }

  try {
    const result = await ytSearch(keyword);
    const videos = result.videos.slice(0, 5).map(v => ({
      title: v.title,
      thumbnail: v.thumbnail,
      url: v.url
    }));
    res.json({ videos });
  } catch (err) {
    console.error("Search error:", err);  // 🔥 This line will log the actual error
    res.status(500).json({ error: 'Search failed' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


















//run good working Global
// // Some video  no show download quality option for popup.js file
// // Global YouTube video url and key search download info server
// const express = require('express');
// const cors = require('cors');
// const { exec } = require('child_process');
// const ytSearch = require('yt-search');

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post('/get-info', (req, res) => {
//   const { videoUrl } = req.body;
//   if (!videoUrl) return res.status(400).json({ error: 'No video URL provided' });

//   const cmd = `yt-dlp -J "${videoUrl}"`;

//   exec(cmd, (error, stdout) => {
//     if (error) {
//       return res.status(500).json({ error: 'Failed to fetch video info' });
//     }
//     try {
//       const json = JSON.parse(stdout);
//       const formats = json.formats
//         .filter(f => f.vcodec !== 'none' && f.acodec !== 'none' && !f.format_note?.includes('DASH'))
//         .map(f => ({
//           url: f.url,
//           ext: f.ext,
//           format_id: f.format_id,
//           quality_label: f.quality,
//           height: f.height
//         }));
//       res.json({
//         title: json.title,
//         thumbnail: json.thumbnail,
//         formats
//       });
//     } catch (err) {
//       res.status(500).json({ error: 'Invalid video info format' });
//     }
//   });
// });

// app.post('/search', async (req, res) => {
//   const { keyword } = req.body;
//   if (!keyword) return res.status(400).json({ error: 'No keyword provided' });

//   try {
//     const result = await ytSearch(keyword);
//     const videos = result.videos.slice(0, 5).map(v => ({
//       title: v.title,
//       thumbnail: v.thumbnail,
//       url: v.url
//     }));
//     res.json({ videos });
//   } catch (err) {
//     res.status(500).json({ error: 'Search failed' });
//   }
// });

// app.listen(3000, () => {
//   console.log('Server running on port 3000');
// });











//This is just Golbal youtube video url search
// const express = require('express');
// const cors = require('cors');
// const { exec } = require('child_process');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors());
// app.use(express.json());

// app.post('/get-info', (req, res) => {
//   const { videoUrl } = req.body;

//   if (!videoUrl) return res.status(400).json({ error: 'Missing videoUrl' });

//   const command = `yt-dlp -J "${videoUrl}"`;

//   exec(command, (error, stdout) => {
//     if (error) {
//       return res.status(500).json({ error: 'yt-dlp failed' });
//     }

//     try {
//       const info = JSON.parse(stdout);
//       // Only return muxed formats (audio+video)
//       const muxedFormats = info.formats.filter(f => f.vcodec !== 'none' && f.acodec !== 'none');
//       res.json({ title: info.title, formats: muxedFormats });
//     } catch (err) {
//       res.status(500).json({ error: 'Failed to parse yt-dlp output' });
//     }
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
