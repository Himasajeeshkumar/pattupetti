async function testExtract(query) {
  const url = "https://html.duckduckgo.com/html/?q=" + encodeURIComponent(query + " malayalam song youtube");
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
  });
  const html = await res.text();
  const m1 = [...html.matchAll(/v%3D([a-zA-Z0-9_-]{11})/g)].map(m => m[1]);
  const m2 = [...html.matchAll(/watch%3Fv%3D([a-zA-Z0-9_-]{11})/g)].map(m => m[1]);
  const m3 = [...html.matchAll(/youtu\.be%2F([a-zA-Z0-9_-]{11})/g)].map(m => m[1]);
  const m4 = [...html.matchAll(/watch\?v=([a-zA-Z0-9_-]{11})/g)].map(m => m[1]);
  const m5 = [...html.matchAll(/youtu\.be\/([a-zA-Z0-9_-]{11})/g)].map(m => m[1]);
  const all = [...new Set([...m1, ...m2, ...m3, ...m4, ...m5])];
  console.log(`Query: ${query} => Found ${all.length} IDs:`, all);

  for (const id of all) {
    const oembed = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`);
    if (oembed.ok) {
      const data = await oembed.json();
      console.log(`  ✓ ${id} -> "${data.title}" by ${data.author_name}`);
    }
  }
}

async function run() {
  await testExtract("Manjal prasadavum Nakhakshathangal");
  await testExtract("Ramakatha gaanalayam Bharatham");
  await testExtract("Sreelavasantham Padheyam");
  await testExtract("Harimuraleeravam Aaram Thampuran");
}

run();
