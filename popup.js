// Some video  no show download quality option
document.querySelector('#searchForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const input = document.querySelector('#videoInput').value.trim();
  const isUrl = input.startsWith('http');

  document.querySelector('#results').innerHTML = '';
  document.querySelector('#videoInfo').innerHTML = '<p class="loader">Loading...</p>';

  if (isUrl) {
    await fetchVideoInfo(input, true);
  } else {
    const res = await fetch('http://localhost:3000/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keyword: input })
    });

    const data = await res.json();
    if (data.error) return alert(data.error);

    document.querySelector('#videoInfo').innerHTML = '';
    const results = document.querySelector('#results');

    for (const video of data.videos) {
      const div = document.createElement('div');
      div.className = 'video-block';
      div.innerHTML = `
        <img src="${video.thumbnail}" />
        <p><strong>${video.title}</strong></p>
        <p class="loader">Loading formats...</p>
      `;
      results.appendChild(div);

      // Fetch formats automatically
      try {
        const res = await fetch('http://localhost:3000/get-info', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ videoUrl: video.url })
        });
        const formatData = await res.json();

        const formatHTML = formatData.formats
          .filter(f => (f.height || 0) >= 360)
          .map(f => `
            <a href="${f.url}" download target="_blank">
              ${f.format_id} (${f.ext}) - ${f.quality_label || f.height + 'p'}
            </a><br/>
          `).join('');

        div.querySelector('.loader').outerHTML = `
          <div>
            <h4>Available Formats:</h4>
            ${formatHTML}
          </div>
        `;
      } catch (err) {
        div.querySelector('.loader').textContent = 'Failed to load formats.';
      }
    }
  }
});

async function fetchVideoInfo(videoUrl, showImmediately = false) {
  const res = await fetch('http://localhost:3000/get-info', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ videoUrl })
  });

  const data = await res.json();
  if (data.error) return alert(data.error);

  if (showImmediately) {
    showVideoInfo(data.title, data.thumbnail, data.formats);
  }
}

function showVideoInfo(title, thumbnail, formats) {
  const container = document.querySelector('#videoInfo');
  container.innerHTML = `
    <h3>${title}</h3>
    <img src="${thumbnail}" />
    <h4>Available Formats:</h4>
    ${formats
      .filter(f => (f.height || 0) >= 360)
      .map(f => `
        <a href="${f.url}" download target="_blank">
          ${f.format_id} (${f.ext}) - ${f.quality_label || f.height + 'p'}
        </a><br/>
      `).join('')}
  `;
}

















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








