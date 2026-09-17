async function searchYouTube(query) {
  try {
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' malayalam song')}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });
    const html = await res.text();
    const matches = [...html.matchAll(/\/watch\?v=([a-zA-Z0-9_-]{11})/g)].map(m => m[1]);
    const unique = [...new Set(matches)];
    
    for (const vid of unique.slice(0, 8)) {
      const oembedRes = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${vid}&format=json`);
      if (oembedRes.ok) {
        const data = await oembedRes.json();
        // Check title does not contain karaoke or cover
        const lower = data.title.toLowerCase();
        if (!lower.includes('karaoke') && !lower.includes('cover') && !lower.includes('remix') && !lower.includes('slowed') && !lower.includes('status') && !lower.includes('shorts')) {
          return { videoId: vid, title: data.title, author: data.author_name };
        }
      }
    }
    return null;
  } catch (err) {
    return null;
  }
}

async function test() {
  const queries = [
    "Suryakireedam veenurangi Devaasuram",
    "Gopike nin viral thumbiloru Kattathe Kilikkoodu",
    "Aareyum bhavagayakanakkum Nakhakshathangal",
    "Kannirppoovinte kavilil thalodi Kireedam",
    "Poove oru mazhamutham Kakkothikkavile Appooppan Thaadikal"
  ];
  for (const q of queries) {
    const res = await searchYouTube(q);
    console.log(`Query: ${q} =>`, res);
  }
}

test();
