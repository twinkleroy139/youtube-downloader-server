document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  const queryInput = document.getElementById('query');
  const resultsContainer = document.getElementById('results');

  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = queryInput.value.trim();
    if (!input) return;

    resultsContainer.innerHTML = 'Loading...';

    const isUrl = input.startsWith('http');
    if (isUrl) {
      await fetchVideoFormats(input);
    } else {
      await fetchSearchResults(input);
    }
  });

  async function fetchSearchResults(keyword) {
    try {
      const response = await fetch('https://youtube-downloader-server-m847.onrender.com/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword })
      });

      const data = await response.json();

      if (data.videos?.length) {
        resultsContainer.innerHTML = '';
        data.videos.forEach(video => {
          const item = document.createElement('div');
          item.className = 'video-item';
          item.innerHTML = `
            <img src="${video.thumbnail}" width="120">
            <p>${video.title}</p>
            <button data-url="${video.url}">Download</button>
          `;
          item.querySelector('button').addEventListener('click', () => {
            fetchVideoFormats(video.url);
          });
          resultsContainer.appendChild(item);
        });
      } else {
        resultsContainer.innerHTML = 'No videos found.';
      }
    } catch (err) {
      console.error('[SEARCH ERROR]', err);
      resultsContainer.innerHTML = 'Error fetching search results.';
    }
  }

  async function fetchVideoFormats(videoUrl) {
    try {
      const response = await fetch('https://youtube-downloader-server-m847.onrender.com/get-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl })
      });

      const data = await response.json();

      if (data.formats?.length) {
        resultsContainer.innerHTML = `
          <h3>${data.title}</h3>
          <img src="${data.thumbnail}" width="120">
          <p>Choose a quality to download:</p>
        `;

        data.formats.forEach(format => {
          const btn = document.createElement('a');
          btn.href = format.url;
          btn.textContent = `${format.quality_label || (format.height + 'p')} (${format.ext})`;
          btn.style.display = 'block';
          btn.style.marginBottom = '5px';
          btn.target = '_blank';
          btn.rel = 'noopener noreferrer';
          resultsContainer.appendChild(btn);
        });
      } else {
        resultsContainer.innerHTML = 'No downloadable formats found.';
      }
    } catch (err) {
      console.error('[GET-INFO ERROR]', err);
      resultsContainer.innerHTML = 'Error fetching video formats.';
    }
  }
});














// document.addEventListener('DOMContentLoaded', () => {
//   const searchForm = document.getElementById('search-form');
//   const queryInput = document.getElementById('query');
//   const resultsContainer = document.getElementById('results');

//   searchForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const input = queryInput.value.trim();
//     if (!input) return;

//     resultsContainer.innerHTML = 'Loading...';

//     // Check if input is a YouTube URL
//     const isUrl = input.startsWith('http');

//     if (isUrl) {
//       fetchVideoFormats(input);
//     } else {
//       fetchSearchResults(input);
//     }
//   });

//   async function fetchSearchResults(keyword) {
//     try {
//       const response = await fetch('https://youtube-downloader-server-m847.onrender.com/search', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ keyword })
//       });

//       const data = await response.json();
//       if (data.videos && data.videos.length) {
//         resultsContainer.innerHTML = '';
//         data.videos.forEach(video => {
//           const item = document.createElement('div');
//           item.className = 'video-item';
//           item.innerHTML = `
//             <img src="${video.thumbnail}" width="120">
//             <p>${video.title}</p>
//             <button data-url="${video.url}">Download</button>
//           `;
//           item.querySelector('button').addEventListener('click', () => {
//             fetchVideoFormats(video.url);
//           });
//           resultsContainer.appendChild(item);
//         });
//       } else {
//         resultsContainer.innerHTML = 'No videos found.';
//       }
//     } catch (err) {
//       console.error(err);
//       resultsContainer.innerHTML = 'Error fetching videos.';
//     }
//   }

//   async function fetchVideoFormats(videoUrl) {
//     try {
//       const response = await fetch('https://youtube-downloader-server-m847.onrender.com/get-info', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ videoUrl })
//       });

//       const data = await response.json();

//       if (data.formats && data.formats.length) {
//         resultsContainer.innerHTML = `
//           <h3>${data.title}</h3>
//           <img src="${data.thumbnail}" width="120">
//           <p>Choose Quality:</p>
//         `;

//         data.formats.forEach(format => {
//           const btn = document.createElement('a');
//           btn.href = format.url;
//           btn.textContent = `${format.quality_label || format.height + 'p'} (${format.ext})`;
//           btn.style.display = 'block';
//           btn.style.marginBottom = '5px';
//           btn.target = '_blank';
//           resultsContainer.appendChild(btn);
//         });
//       } else {
//         resultsContainer.innerHTML = 'No downloadable formats found.';
//       }
//     } catch (err) {
//       console.error(err);
//       resultsContainer.innerHTML = 'Error fetching formats.';
//     }
//   }
// });

















// // Run for Global key item search working only
// document.addEventListener('DOMContentLoaded', () => {
//   const searchForm = document.getElementById('search-form');
//   const queryInput = document.getElementById('query');
//   const resultsContainer = document.getElementById('results');

//   searchForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const keyword = queryInput.value.trim();
//     if (!keyword) return;

//     resultsContainer.innerHTML = 'Loading...';

//     try {
//       const response = await fetch('https://youtube-downloader-server-m847.onrender.com/search', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ keyword })
//       });

//       const data = await response.json();

//       if (data.videos && data.videos.length) {
//         resultsContainer.innerHTML = '';
//         data.videos.forEach(video => {
//           const item = document.createElement('div');
//           item.className = 'video-item';
//           item.innerHTML = `
//             <img src="${video.thumbnail}" width="120">
//             <p>${video.title}</p>
//             <a href="${video.url}" target="_blank">Watch</a>
//           `;
//           resultsContainer.appendChild(item);
//         });
//       } else {
//         resultsContainer.innerHTML = 'No videos found.';
//       }
//     } catch (err) {
//       resultsContainer.innerHTML = 'Error fetching videos.';
//       console.error(err);
//     }
//   });
// });


























// run local server good !
// // Some video  no show download quality option
// document.querySelector('#searchForm').addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const input = document.querySelector('#videoInput').value.trim();
//   const isUrl = input.startsWith('http');

//   document.querySelector('#results').innerHTML = '';
//   document.querySelector('#videoInfo').innerHTML = '<p class="loader">Loading...</p>';

//   if (isUrl) {
//     await fetchVideoInfo(input, true);
//   } else {
//     const res = await fetch('http://localhost:3000/search', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ keyword: input })
//     });

//     const data = await res.json();
//     if (data.error) return alert(data.error);

//     document.querySelector('#videoInfo').innerHTML = '';
//     const results = document.querySelector('#results');

//     for (const video of data.videos) {
//       const div = document.createElement('div');
//       div.className = 'video-block';
//       div.innerHTML = `
//         <img src="${video.thumbnail}" />
//         <p><strong>${video.title}</strong></p>
//         <p class="loader">Loading formats...</p>
//       `;
//       results.appendChild(div);

//       // Fetch formats automatically
//       try {
//         const res = await fetch('http://localhost:3000/get-info', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ videoUrl: video.url })
//         });
//         const formatData = await res.json();

//         const formatHTML = formatData.formats
//           .filter(f => (f.height || 0) >= 360)
//           .map(f => `
//             <a href="${f.url}" download target="_blank">
//               ${f.format_id} (${f.ext}) - ${f.quality_label || f.height + 'p'}
//             </a><br/>
//           `).join('');

//         div.querySelector('.loader').outerHTML = `
//           <div>
//             <h4>Available Formats:</h4>
//             ${formatHTML}
//           </div>
//         `;
//       } catch (err) {
//         div.querySelector('.loader').textContent = 'Failed to load formats.';
//       }
//     }
//   }
// });

// async function fetchVideoInfo(videoUrl, showImmediately = false) {
//   const res = await fetch('http://localhost:3000/get-info', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ videoUrl })
//   });

//   const data = await res.json();
//   if (data.error) return alert(data.error);

//   if (showImmediately) {
//     showVideoInfo(data.title, data.thumbnail, data.formats);
//   }
// }

// function showVideoInfo(title, thumbnail, formats) {
//   const container = document.querySelector('#videoInfo');
//   container.innerHTML = `
//     <h3>${title}</h3>
//     <img src="${thumbnail}" />
//     <h4>Available Formats:</h4>
//     ${formats
//       .filter(f => (f.height || 0) >= 360)
//       .map(f => `
//         <a href="${f.url}" download target="_blank">
//           ${f.format_id} (${f.ext}) - ${f.quality_label || f.height + 'p'}
//         </a><br/>
//       `).join('')}
//   `;
// }

















// some key item just download
// document.querySelector('#searchForm').addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const input = document.querySelector('#videoInput').value.trim();
//   const isUrl = input.startsWith('http');

//   document.querySelector('#results').innerHTML = '';
//   document.querySelector('#videoInfo').innerHTML = '<p class="loader">Loading...</p>';

//   if (isUrl) {
//     await fetchVideoInfo(input);
//   } else {
//     const res = await fetch('http://localhost:3000/search', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ keyword: input })
//     });

//     const data = await res.json();
//     if (data.error) return alert(data.error);

//     const results = document.querySelector('#results');
//     document.querySelector('#videoInfo').innerHTML = '';

//     data.videos.forEach((video, index) => {
//       const div = document.createElement('div');
//       div.className = 'video-block';
//       div.innerHTML = `
//         <img src="${video.thumbnail}" />
//         <p><strong>${video.title}</strong></p>
//         <button data-url="${video.url}" class="fetch-btn">Get Quality Options</button>
//       `;
//       results.appendChild(div);
//     });

//     document.querySelectorAll('.fetch-btn').forEach(btn => {
//       btn.addEventListener('click', () => {
//         document.querySelector('#videoInfo').innerHTML = '<p class="loader">Loading...</p>';
//         fetchVideoInfo(btn.getAttribute('data-url'));
//       });
//     });
//   }
// });

// async function fetchVideoInfo(videoUrl) {
//   const res = await fetch('http://localhost:3000/get-info', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ videoUrl })
//   });

//   const data = await res.json();
//   if (data.error) return alert(data.error);

//   showVideoInfo(data.title, data.thumbnail, data.formats);
// }

// function showVideoInfo(title, thumbnail, formats) {
//   const container = document.querySelector('#videoInfo');
//   container.innerHTML = `
//     <h3>${title}</h3>
//     <img src="${thumbnail}" />
//     <h4>Available Formats:</h4>
//     ${formats.map(f => `
//       <a href="${f.url}" download target="_blank">
//         ${f.format_id} (${f.ext}) - ${f.quality_label || f.height + 'p'}
//       </a><br/>
//     `).join('')}
//   `;
// }
























// key item search option added but not download option
// document.querySelector('#searchForm').addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const input = document.querySelector('#videoInput').value.trim();
//   const isUrl = input.startsWith('http');

//   if (isUrl) {
//     const res = await fetch('http://localhost:3000/get-info', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ videoUrl: input })
//     });

//     const data = await res.json();
//     if (data.error) return alert(data.error);
//     showVideoInfo(data.title, data.thumbnail, data.formats);
//   } else {
//     const res = await fetch('http://localhost:3000/search', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ keyword: input })
//     });

//     const data = await res.json();
//     if (data.error) return alert(data.error);

//     const results = document.querySelector('#results');
//     results.innerHTML = '';
//     document.querySelector('#videoInfo').innerHTML = '';

//     data.videos.forEach(video => {
//       const div = document.createElement('div');
//       div.className = 'video-block';
//       div.innerHTML = `
//         <img src="${video.thumbnail}" />
//         <p><strong>${video.title}</strong></p>
//         <button onclick="fetchVideoInfo('${video.url}')">Get Quality Options</button>
//       `;
//       results.appendChild(div);
//     });
//   }
// });

// async function fetchVideoInfo(videoUrl) {
//   const res = await fetch('http://localhost:3000/get-info', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ videoUrl })
//   });

//   const data = await res.json();
//   if (data.error) return alert(data.error);
//   showVideoInfo(data.title, data.thumbnail, data.formats);
// }

// function showVideoInfo(title, thumbnail, formats) {
//   const container = document.querySelector('#videoInfo');
//   container.innerHTML = `
//     <h3>${title}</h3>
//     <img src="${thumbnail}" />
//     <h4>Available Formats:</h4>
//     ${formats.map(f => `
//       <a href="${f.url}" download>
//         ${f.format_id} (${f.ext}) - ${f.quality_label || f.height + 'p'}
//       </a><br/>
//     `).join('')}
//   `;
// }




















//Global url key search only 
// document.getElementById('fetch').addEventListener('click', async () => {
//   const videoUrl = document.getElementById('url').value;

//   const res = await fetch('http://localhost:3000/get-info', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ videoUrl })
//   });

//   const data = await res.json();
//   const resultsDiv = document.getElementById('results');
//   resultsDiv.innerHTML = '';

//   if (data.formats) {
//     data.formats.forEach(f => {
//       const link = document.createElement('a');
//       link.href = f.url;
//       link.textContent = `${f.format_id} - ${f.resolution || f.height + 'p'}`;
//       link.target = '_blank';
//       resultsDiv.appendChild(link);
//       resultsDiv.appendChild(document.createElement('br'));
//     });
//   } else {
//     resultsDiv.textContent = 'Error fetching download links.';
//   }
// });








