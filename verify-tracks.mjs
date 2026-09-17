import fs from 'fs';

async function verifyVideo(videoId) {
  try {
    const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
    if (!res.ok) return { valid: false, status: res.status };
    const data = await res.json();
    return { valid: true, title: data.title, author: data.author_name };
  } catch (err) {
    return { valid: false, error: err.message };
  }
}

function parseTracksFile() {
  const content = fs.readFileSync('./lib/tracks.ts', 'utf8');
  // Find start of playlists array
  const startIndex = content.indexOf('export const playlists: Playlist[] = [');
  if (startIndex === -1) {
    throw new Error('Could not find playlists array in lib/tracks.ts');
  }
  const arrayContent = content.slice(startIndex + 'export const playlists: Playlist[] ='.length).trim();
  // Evaluate the TS array content safely in JS
  const playlists = new Function(`return ${arrayContent.replace(/;$/, '')}`)();
  return playlists;
}

async function verifyAll() {
  console.log("=================================================");
  console.log("PAATTUPETTI - TRACK VERIFICATION UTILITY");
  console.log("=================================================");

  const playlists = parseTracksFile();
  let totalSongs = 0;
  let validVideos = 0;
  let errors = 0;
  const seenIds = new Set();
  const seenTitles = new Set();
  let duplicates = 0;

  for (const playlist of playlists) {
    console.log(`\nCategory: ${playlist.name} (${playlist.id}) - ${playlist.tracks.length} tracks`);
    for (const track of playlist.tracks) {
      totalSongs++;
      const titleKey = `${track.title.toLowerCase()}--${track.film.toLowerCase()}`;
      if (seenTitles.has(titleKey)) {
        console.log(`  [DUPLICATE SONG] ${track.title} (${track.film})`);
        duplicates++;
      }
      seenTitles.add(titleKey);

      if (seenIds.has(track.videoId)) {
        console.log(`  [DUPLICATE VIDEO ID] ${track.videoId} on ${track.title}`);
        duplicates++;
      }
      seenIds.add(track.videoId);

      const check = await verifyVideo(track.videoId);
      if (check.valid) {
        validVideos++;
        console.log(`  ✓ [${track.id}] ${track.title} (${track.film}) -> "${check.title.slice(0, 45)}..." by ${check.author}`);
      } else {
        errors++;
        console.log(`  ✗ [${track.id}] ${track.title} (${track.film}) -> FAILED (ID: ${track.videoId})`);
      }
      await new Promise(r => setTimeout(r, 40));
    }
  }

  console.log("\n=================================================");
  console.log("VERIFICATION SUMMARY");
  console.log("=================================================");
  console.log(`Total Songs in Database: ${totalSongs}`);
  console.log(`Songs with Valid YouTube IDs: ${validVideos}`);
  console.log(`Invalid / Dead Video IDs: ${errors}`);
  console.log(`Duplicates Prevented / Found: ${duplicates}`);
  console.log(`Playlists Count: ${playlists.length}`);
  console.log("=================================================");
  if (errors === 0 && duplicates === 0) {
    console.log("RESULT: ALL TRACKS PASSED VERIFICATION WITH 100% ACCURACY! 🎉");
  } else {
    console.log("RESULT: Some tracks need attention.");
  }
}

verifyAll();
