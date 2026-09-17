import fs from 'fs';

const content = fs.readFileSync('./lib/tracks.ts', 'utf8');
const startIndex = content.indexOf('export const playlists: Playlist[] = [');
const arrayContent = content.slice(startIndex + 'export const playlists: Playlist[] ='.length).trim();
const playlists = new Function(`return ${arrayContent.replace(/;$/, '')}`)();

console.log("Current counts:");
playlists.forEach(p => console.log(`${p.name} (${p.id}): ${p.tracks.length} tracks`));

const existingVideoIds = new Set();
const existingTitles = new Set();

playlists.forEach(p => {
  p.tracks.forEach(t => {
    existingVideoIds.add(t.videoId);
    existingTitles.add(`${t.title.toLowerCase()}--${t.film.toLowerCase()}`);
  });
});

console.log(`Total existing unique video IDs: ${existingVideoIds.size}`);
