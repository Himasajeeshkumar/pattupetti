import fs from 'fs';

async function verifyOembed(videoId) {
  try {
    const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
    if (!res.ok) return null;
    const data = await res.json();
    const lower = data.title.toLowerCase();
    if (
      lower.includes('karaoke') ||
      lower.includes('cover') ||
      lower.includes('remix') ||
      lower.includes('slowed') ||
      lower.includes('reverb') ||
      lower.includes('status') ||
      lower.includes('shorts') ||
      lower.includes('trailer') ||
      lower.includes('teaser')
    ) {
      return null;
    }
    return { videoId, title: data.title, author: data.author_name };
  } catch (e) {
    return null;
  }
}

async function searchEngine(queries, seenVideoIds) {
  for (const q of queries) {
    try {
      const url = "https://html.duckduckgo.com/html/?q=" + encodeURIComponent(q + " malayalam song youtube");
      const res = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9"
        }
      });
      if (res.ok) {
        const html = await res.text();
        const m1 = [...html.matchAll(/v%3D([a-zA-Z0-9_-]{11})/g)].map(m => m[1]);
        const m2 = [...html.matchAll(/watch%3Fv%3D([a-zA-Z0-9_-]{11})/g)].map(m => m[1]);
        const m3 = [...html.matchAll(/youtu\.be%2F([a-zA-Z0-9_-]{11})/g)].map(m => m[1]);
        const m4 = [...html.matchAll(/watch\?v=([a-zA-Z0-9_-]{11})/g)].map(m => m[1]);
        const m5 = [...html.matchAll(/youtu\.be\/([a-zA-Z0-9_-]{11})/g)].map(m => m[1]);
        const all = [...new Set([...m1, ...m2, ...m3, ...m4, ...m5])];

        for (const id of all) {
          if (seenVideoIds.has(id)) continue;
          const check = await verifyOembed(id);
          if (check) return check;
        }
      }
    } catch (e) {}

    try {
      const ytUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(q + ' full song')}`;
      const res = await fetch(ytUrl, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
      });
      if (res.ok) {
        const html = await res.text();
        const matches = [...html.matchAll(/\/watch\?v=([a-zA-Z0-9_-]{11})/g)].map(m => m[1]);
        const unique = [...new Set(matches)];
        for (const id of unique.slice(0, 10)) {
          if (seenVideoIds.has(id)) continue;
          const check = await verifyOembed(id);
          if (check) return check;
        }
      }
    } catch (e) {}
  }
  return null;
}

const extraGM = [
  { title: "അനുപമേ അഴകേ", queries: ["Anupame azhake Pranayam", "Anupame azhake"], artist: "K. J. Yesudas", film: "Pranayam", year: 2011, duration: 260 },
  { title: "ഓർമ്മകളിൽ നീയെരിയും", queries: ["Ormmakalil neeyeriyum theeyalayo", "Ormmakalil neeyeriyum Pranayam"], artist: "K. J. Yesudas", film: "Pranayam", year: 2011, duration: 275 },
  { title: "ചന്ദ്രികയിൽ അലിയുന്നു ശലഭം", queries: ["Chandrikayil aliyunnu shalabham Kavyamela", "Chandrikayil aliyunnu"], artist: "K. J. Yesudas & P. Leela", film: "Kavyamela", year: 1965, duration: 250 },
  { title: "താമസമെന്തേ വരുവാൻ", queries: ["Thamasamenthe varuvan Bhargavi Nilayam", "Thamasamenthe varuvan"], artist: "K. J. Yesudas", film: "Bhargavi Nilayam", year: 1964, duration: 260 },
  { title: "അല്ലിയാമ്പൽ കടവിൽ", queries: ["Alliyambal kadavil Rosi", "Alliyambal kadavil annarakku"], artist: "K. J. Yesudas", film: "Rosi", year: 1965, duration: 245 },
  { title: "ഏകാന്തതയുടെ അപാരതീരം", queries: ["Ekanthathayude apara theeram Bhargavi Nilayam", "Ekanthathayude apara"], artist: "Kamukara Purushothaman", film: "Bhargavi Nilayam", year: 1964, duration: 240 }
];

const extraMM = [
  { title: "നീയെൻ സർഗ്ഗസൗന്ദര്യമേ", queries: ["Nee En Sargga Soundaryame Kaathodu Kaathoram", "Nee en sargga soundaryame"], artist: "K. J. Yesudas", film: "Kaathodu Kaathoram", year: 1985, duration: 270 },
  { title: "അനുരാഗിണീ ഇത എൻ കവിതാ", queries: ["Anuragini itha en kavitha Oru Kudakkeezhil", "Anuragini itha en kavitha"], artist: "K. J. Yesudas", film: "Oru Kudakkeezhil", year: 1985, duration: 280 },
  { title: "താഴ്വാരം മഞ്ഞിൽ മുങ്ങി", queries: ["Thazhvaram manjil mungumbol Oru Abhibhashakante Case Diary", "Thazhvaram manjil"], artist: "K. J. Yesudas", film: "Oru Abhibhashakante Case Diary", year: 1995, duration: 275 },
  { title: "കണ്ണാന്തളിയും കാട്ടുകുറിഞ്ഞിയും", queries: ["Kannanthaliyum kattukurinji Kattathe Kilikkoodu", "Kannanthaliyum kattukurinji"], artist: "S. Janaki", film: "Kaattathe Kilikkoodu", year: 1983, duration: 255 },
  { title: "മനസ്സിലൊരു പൂമാല", queries: ["Manassiloru poomaala Pavithram", "Manassiloru poomala"], artist: "K. J. Yesudas", film: "Pavithram", year: 1994, duration: 270 },
  { title: "മഴവിൽക്കൊടിപോലെ", queries: ["Mazhavilkkodipole Azhakiya Ravanan", "Mazhavilkkodi pole"], artist: "K. S. Chithra", film: "Azhakiya Ravanan", year: 1996, duration: 265 },
  { title: "കാറ്റും മഴയും ചേരുമ്പോൾ", queries: ["Kattum mazhayum cherumbol", "Kattum mazhayum cherumbol song"], artist: "K. J. Yesudas", film: "Mazhakkalam", year: 2004, duration: 280 },
  { title: "മഴനൂലു നെയ്യും", queries: ["Mazhanoolu neyyum vazhikal", "Mazhanoolu neyyum"], artist: "K. S. Chithra", film: "Gramaphone", year: 2002, duration: 260 },
  { title: "കുളിർമഴയേതോ തൂവും കാറ്റേ", queries: ["Kulirmazhayetho thoovum kaatte", "Kulirmazhayetho thoovum"], artist: "K. J. Yesudas", film: "Vatsalyam", year: 1993, duration: 270 },
  { title: "പൂമാനമേ ഒരു രാഗമേഘം", queries: ["Poomaname oru ragamegham Nirakkoottu", "Poomaname oru ragamegham"], artist: "K. S. Chithra", film: "Nirakkoottu", year: 1985, duration: 280 },
  { title: "ശ്യാമമേഘമേ നീ രാഗമേഘമേ", queries: ["Shyamameghame nee Adhipan", "Shyamameghame nee"], artist: "K. S. Chithra", film: "Adhipan", year: 1989, duration: 270 },
  { title: "കാറ്റേ നീ വീശരുതിപ്പോൾ കാറ്റേ", queries: ["Kaatte nee veesaruthippol Kaattu Vannu Vilichappol", "Kaatte nee veesaruthippol"], artist: "K. S. Chithra", film: "Kattu Vannu Vilichappol", year: 2001, duration: 275 },
  { title: "പ്രണയമണിത്തൂവൽ പൊഴിയും പവിഴ മഴ", queries: ["Pranayamanithooval pozhiyum Azhakiya Ravanan", "Pranayamanithooval pozhiyum"], artist: "K. J. Yesudas & Sujatha Mohan", film: "Azhakiya Ravanan", year: 1996, duration: 290 },
  { title: "വെണ്ണിലാ ചന്ദനക്കിണ്ണം കൊണ്ടുവാ", queries: ["Vennila chandanakkinnam Azhakiya Ravanan", "Vennila chandanakkinnam"], artist: "K. J. Yesudas & Shabnam", film: "Azhakiya Ravanan", year: 1996, duration: 280 }
];

const extraNR = [
  { title: "ഇന്നലെ നീയൊരു സുന്ദര രാഗമായ്", queries: ["Innale neeyoru sundara ragamayi Sthree", "Innale neeyoru sundara ragamayi"], artist: "K. J. Yesudas", film: "Sthree", year: 1970, duration: 250 },
  { title: "സന്ധ്യക്കെന്തിനു സിന്ദൂരം", queries: ["Sandhyakkenthinu sindhooram Maya", "Sandhyakkenthinu sindhooram"], artist: "K. J. Yesudas", film: "Maya", year: 1972, duration: 260 },
  { title: "കണ്മണി അൻപോടു കാതലൻ", queries: ["Kanmani Anbodu Kadhalan Guna Malayalam", "Kanmani anbodu kadhalan"], artist: "S. Janaki & Kamal Haasan", film: "Guna", year: 1991, duration: 310 },
  { title: "ഹൃദയസഖീ സ്നേഹമയീ", queries: ["Hrudayasakhi snehamayi Oru Painkili Kadha", "Hrudayasakhi snehamayi"], artist: "K. J. Yesudas", film: "Oru Painkili Kadha", year: 1984, duration: 270 },
  { title: "സുന്ദരി സുന്ദരി ഒന്നു പറയു", queries: ["Sundari sundari onnu parayu Aye Auto", "Sundari sundari onnu parayoo"], artist: "M. G. Sreekumar", film: "Aye Auto", year: 1990, duration: 290 },
  { title: "പൊൻകസവു തട്ടമിട്ടു", queries: ["Ponkasavu thattamittu Kazhcha", "Ponkasavu thattamittu"], artist: "Madhu Balakrishnan", film: "Kazhcha", year: 2004, duration: 280 },
  { title: "എന്റെ എല്ലായ്പോഴും", queries: ["Ente ellayppozhum priyathame", "Ente ellayppozhum"], artist: "K. J. Yesudas", film: "Snehaseema", year: 1990, duration: 260 },
  { title: "രാവിൻ നിലാവിൽ ഒന്നു ചേരാൻ", queries: ["Raavin nilavil onnu cheran", "Raavin nilavil onnu cheran song"], artist: "K. J. Yesudas", film: "Mazhavillu", year: 1999, duration: 275 },
  { title: "നീലരാവിൽ ശ്രുതിമീട്ടി", queries: ["Neelaravil sruthemeetti", "Neelaravil sruthi meetti"], artist: "K. J. Yesudas", film: "Gramaphone", year: 2002, duration: 265 },
  { title: "ഓർമ്മകളിൽ പെയ്യും മഞ്ഞേ", queries: ["Ormmakalil peyyum manje", "Ormmakalil peyyum manje song"], artist: "K. S. Chithra", film: "Sasneham", year: 1990, duration: 270 },
  { title: "അമ്പിളിക്കല ചുണ്ടിൽ പുഞ്ചിരി", queries: ["Ambilikkala chundil punchiri", "Ambilikkala chundil"], artist: "K. J. Yesudas", film: "Thoovalsparsham", year: 1990, duration: 260 },
  { title: "മന്ദാര പൂവിതളിൽ", queries: ["Mandhara poovithalil mazhathulli", "Mandhara poovithalil"], artist: "K. S. Chithra", film: "Dasaratham", year: 1989, duration: 270 },
  { title: "ചെമ്പക മലരുകൾ പൂക്കും", queries: ["Chembaka malarukal pookkum raavu", "Chembaka malarukal pookkum"], artist: "K. J. Yesudas", film: "Randam Bhavam", year: 2001, duration: 280 },
  { title: "രാക്കാറ്റിൽ പൂത്തുലയും", queries: ["Raakkattil poothulayum", "Raakkattil poothulayum song"], artist: "K. J. Yesudas", film: "Sainyam", year: 1994, duration: 275 }
];

async function runTopup() {
  const content = fs.readFileSync('./lib/tracks.ts', 'utf8');
  const startIndex = content.indexOf('export const playlists: Playlist[] = [');
  const arrayContent = content.slice(startIndex + 'export const playlists: Playlist[] ='.length).trim();
  const currentPlaylists = new Function(`return ${arrayContent.replace(/;$/, '')}`)();

  const gmP = currentPlaylists.find(p => p.id === 'golden-memories');
  const mmP = currentPlaylists.find(p => p.id === 'monsoon-memories');
  const nrP = currentPlaylists.find(p => p.id === 'night-radio');

  console.log(`\nCurrent status: GM=${gmP.tracks.length}, MM=${mmP.tracks.length}, NR=${nrP.tracks.length}`);

  const seenVideoIds = new Set();
  const seenTitles = new Set();

  currentPlaylists.forEach(p => {
    p.tracks.forEach(t => {
      seenVideoIds.add(t.videoId);
      seenTitles.add(`${t.title.trim().toLowerCase()}--${t.film.trim().toLowerCase()}`);
    });
  });

  async function fill(p, pool, target, prefix) {
    if (p.tracks.length >= target) {
      console.log(`✓ ${p.name} already at ${p.tracks.length} tracks.`);
      return;
    }
    console.log(`Topping up ${p.name}: Currently ${p.tracks.length}, needing ${target - p.tracks.length}...`);
    for (const item of pool) {
      if (p.tracks.length >= target) break;
      const titleKey = `${item.title.trim().toLowerCase()}--${item.film.trim().toLowerCase()}`;
      if (seenTitles.has(titleKey)) continue;

      const verified = await searchEngine(item.queries, seenVideoIds);
      if (!verified) continue;

      seenVideoIds.add(verified.videoId);
      seenTitles.add(titleKey);

      const newTrack = {
        id: `${prefix}-${p.tracks.length + 1}`,
        title: item.title,
        artist: item.artist,
        film: item.film,
        year: item.year,
        duration: item.duration,
        videoId: verified.videoId
      };

      p.tracks.push(newTrack);
      console.log(`  ✓ [${newTrack.id}] ${newTrack.title} (${newTrack.film}) -> ${verified.videoId} ("${verified.title.slice(0, 35)}...")`);
      await new Promise(r => setTimeout(r, 150));
    }
  }

  await fill(gmP, extraGM, 100, 'gm');
  await fill(mmP, extraMM, 100, 'mm');
  await fill(nrP, extraNR, 100, 'nr');

  console.log(`\n=================================================`);
  console.log(`TOPUP RESULTS: GM=${gmP.tracks.length}, MM=${mmP.tracks.length}, NR=${nrP.tracks.length}, TOTAL=${gmP.tracks.length + mmP.tracks.length + nrP.tracks.length}`);
  console.log(`=================================================`);

  const outputCode = `export type Track = {
  id: string;
  title: string;
  artist: string;
  film: string;
  year: number;
  duration: number;
  videoId: string;
};

export type Playlist = {
  id: string;
  name: string;
  tracks: Track[];
};

export const playlists: Playlist[] = ${JSON.stringify(currentPlaylists, null, 2)};
`;

  fs.writeFileSync('./lib/tracks.ts', outputCode, 'utf8');
}

export { runTopup };

if (process.argv[1] && process.argv[1].endsWith('topup-300.mjs')) {
  runTopup();
}
