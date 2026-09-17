async function searchDDG(query) {
  try {
    const res = await fetch("https://html.duckduckgo.com/html/?q=" + encodeURIComponent(query + " official song youtube watch"), {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
    const html = await res.text();
    const ids1 = [...html.matchAll(/v%3D([a-zA-Z0-9_-]{11})/g)].map(m => m[1]);
    const ids2 = [...html.matchAll(/watch\?v=([a-zA-Z0-9_-]{11})/g)].map(m => m[1]);
    const ids = [...new Set([...ids1, ...ids2])];

    for (const id of ids) {
      const oembed = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`);
      if (oembed.ok) {
        const data = await oembed.json();
        const lower = data.title.toLowerCase();
        if (
          !lower.includes('karaoke') &&
          !lower.includes('cover') &&
          !lower.includes('remix') &&
          !lower.includes('slowed') &&
          !lower.includes('reverb') &&
          !lower.includes('status') &&
          !lower.includes('shorts')
        ) {
          return { videoId: id, title: data.title, author: data.author_name };
        }
      }
    }
    return null;
  } catch (err) {
    return null;
  }
}

async function test() {
  const songs = [
    "Pramadavanam veendum His Highness Abdullah",
    "Ramakatha gaanalayam Bharatham",
    "Gopangane aathmavu neeyalle Bharatham",
    "Manjal prasadavum Nakhakshathangal",
    "Sreeragamo veendum Pavithram"
  ];
  for (const s of songs) {
    const res = await searchDDG(s);
    console.log(s, "=>", res);
  }
}

test();
