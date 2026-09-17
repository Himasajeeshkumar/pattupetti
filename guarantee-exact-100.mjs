import fs from 'fs';

async function verifyVideo(videoId) {
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

async function findVideoId(query, seenIds) {
  const qList = [
    query + " malayalam song youtube",
    query + " full song",
    query + " official video song"
  ];

  for (const q of qList) {
    try {
      const url = "https://html.duckduckgo.com/html/?q=" + encodeURIComponent(q);
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
        const ids = [...new Set([...m1, ...m2, ...m3, ...m4, ...m5])];

        for (const id of ids) {
          if (seenIds.has(id)) continue;
          const v = await verifyVideo(id);
          if (v) return v;
        }
      }
    } catch (e) {}

    try {
      const ytUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
      const res = await fetch(ytUrl, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
      });
      if (res.ok) {
        const html = await res.text();
        const matches = [...html.matchAll(/\/watch\?v=([a-zA-Z0-9_-]{11})/g)].map(m => m[1]);
        for (const id of [...new Set(matches)].slice(0, 10)) {
          if (seenIds.has(id)) continue;
          const v = await verifyVideo(id);
          if (v) return v;
        }
      }
    } catch (e) {}

    await new Promise(r => setTimeout(r, 60));
  }
  return null;
}

const extraSongsGM = [
  { title: "അനുപമേ അഴകേ", query: "Anupame azhake Pranayam", artist: "K. J. Yesudas", film: "Pranayam", year: 2011, duration: 260 },
  { title: "ഓർമ്മകളിൽ നീയെരിയും", query: "Ormmakalil neeyeriyum theeyalayo", artist: "K. J. Yesudas", film: "Pranayam", year: 2011, duration: 275 },
  { title: "ശ്രീ പത്മനാഭ പ്രഭോ", query: "Sree Padmanabha Prabho Devasuram", artist: "K. J. Yesudas", film: "Devasuram", year: 1993, duration: 270 },
  { title: "മേലേ മേലേ മാനം", query: "Mele mele maanam No 20 Madras Mail", artist: "K. J. Yesudas", film: "No 20 Madras Mail", year: 1990, duration: 280 },
  { title: "ആലിപ്പഴം പെറുക്കാൻ", query: "Aalippazham perukkan My Dear Kuttichathan", artist: "S. Janaki", film: "My Dear Kuttichathan", year: 1984, duration: 240 },
  { title: "പുലർകാല സുന്ദര സ്വപ്നത്തിൽ", query: "Pularkala sundara Oru Maymasa Pulariyil", artist: "K. J. Yesudas", film: "Oru Maymasa Pulariyil", year: 1987, duration: 255 },
  { title: "താനേ പൂവിട്ട മോഹം", query: "Thane poovitta moham Sasneham", artist: "K. J. Yesudas", film: "Sasneham", year: 1990, duration: 260 },
  { title: "ചന്ദ്രികയിൽ അലിയുന്നു ശലഭം", query: "Chandrikayilaliyunnu Kavyamela", artist: "K. J. Yesudas & P. Leela", film: "Kavyamela", year: 1965, duration: 250 },
  { title: "താമസമെന്തേ വരുവാൻ", query: "Thamasamenthe Varuvan Bhargavi Nilayam", artist: "K. J. Yesudas", film: "Bhargavi Nilayam", year: 1964, duration: 260 },
  { title: "അല്ലിയാമ്പൽ കടവിൽ", query: "alliyambal kadavil rosy", artist: "K. J. Yesudas", film: "Rosi", year: 1965, duration: 245 }
];

const extraSongsMM = [
  { title: "കാറ്റും മഴയും ചേരുമ്പോൾ", query: "Kattum mazhayum cherumbol Mazhakkalam", artist: "K. J. Yesudas", film: "Mazhakkalam", year: 2004, duration: 280 },
  { title: "മഴനൂലു നെയ്യും", query: "Mazhanoolu neyyum Gramaphone", artist: "K. S. Chithra", film: "Gramaphone", year: 2002, duration: 260 },
  { title: "കുളിർമഴയേതോ തൂവും കാറ്റേ", query: "Kulirmazhayetho thoovum Vatsalyam", artist: "K. J. Yesudas", film: "Vatsalyam", year: 1993, duration: 270 },
  { title: "പൂമാനമേ ഒരു രാഗമേഘം", query: "Poomaname oru ragamegham Nirakkoottu", artist: "K. S. Chithra", film: "Nirakkoottu", year: 1985, duration: 280 },
  { title: "ശ്യാമമേഘമേ നീ രാഗമേഘമേ", query: "Shyamameghame nee Adhipan", artist: "K. S. Chithra", film: "Adhipan", year: 1989, duration: 270 },
  { title: "കാറ്റേ നീ വീശരുതിപ്പോൾ കാറ്റേ", query: "Kaatte nee veesaruthippol Kaattu Vannu Vilichappol", artist: "K. S. Chithra", film: "Kattu Vannu Vilichappol", year: 2001, duration: 275 },
  { title: "പ്രണയമണിത്തൂവൽ പൊഴിയും പവിഴ മഴ", query: "Pranayamanithooval pozhiyum Azhakiya Ravanan", artist: "K. J. Yesudas & Sujatha", film: "Azhakiya Ravanan", year: 1996, duration: 290 },
  { title: "വെണ്ണിലാ ചന്ദനക്കിണ്ണം കൊണ്ടുവാ", query: "Vennila chandanakkinnam Azhakiya Ravanan", artist: "K. J. Yesudas & Shabnam", film: "Azhakiya Ravanan", year: 1996, duration: 280 },
  { title: "മഴയേ മഴയേ മഞ്ഞുമഴയേ", query: "Mazhaye mazhaye manjumazhaye Pattam Pole", artist: "K. S. Harisankar", film: "Pattam Pole", year: 2013, duration: 250 },
  { title: "തൂമഞ്ഞു പെയ്യുന്ന രാവിൽ", query: "Thoomanju peyyunna raavil Devadoothan", artist: "K. J. Yesudas", film: "Devadoothan", year: 2000, duration: 280 },
  { title: "മഴത്തുള്ളി മണിമുത്ത്", query: "Mazhathulli manimuthu Vettam", artist: "K. S. Chithra", film: "Vettam", year: 2004, duration: 260 },
  { title: "ഇളവണ്ണൂർ മഠത്തിലെ", query: "Ilavannoor madhathile Kadathanadan Ambadi", artist: "K. J. Yesudas", film: "Kadathanadan Ambadi", year: 1990, duration: 270 },
  { title: "ഓർമ്മകളിൽ ഒരു മഴത്തുള്ളി", query: "Ormmakalil oru mazhathulli Sasneham", artist: "G. Venugopal", film: "Sasneham", year: 1990, duration: 270 },
  { title: "ആലിപ്പഴം ചുരത്തും", query: "Aalippazham churathum Kuttisrank", artist: "Rajalakshmy", film: "Kuttisrank", year: 2010, duration: 240 },
  { title: "തുമ്പീ വാ തുമ്പക്കുടത്തിൻ", query: "Thumbi vaa thumbakkudathin Olangal", artist: "S. Janaki", film: "Olangal", year: 1982, duration: 250 },
  { title: "ആകാശദൂതു പോയോ", query: "Aakashadoothu poyo Akashadoothu", artist: "K. S. Chithra", film: "Akashadoothu", year: 1993, duration: 270 },
  { title: "പവിഴമഴയേ നീ പെയ്യുമോ", query: "Pavizha Mazhaye Athiran song", artist: "K. S. Harisankar", film: "Athiran", year: 2019, duration: 250 },
  { title: "മഴവില്ലിൻ തീരങ്ങൾ", query: "Mazhavillin theerangal Oru Indian Pranayakadha", artist: "Najim Arshad", film: "Oru Indian Pranayakadha", year: 2013, duration: 250 },
  { title: "മാരിക്കൂടinnu മാനം", query: "Vennilaavo Chandanamo Pingami", artist: "K. J. Yesudas", film: "Pingami", year: 1994, duration: 270 },
  { title: "തിരനുരയും ചുരുൾമുടിയിൽ", query: "Thiranurayum churulmudiyil Ananthabhadram", artist: "K. J. Yesudas", film: "Ananthabhadram", year: 2005, duration: 280 }
];

const extraSongsNR = [
  { title: "ഇന്നലെ നീയൊരു സുന്ദര രാഗമായ്", query: "Innale neeyoru sundara ragamayi Sthree", artist: "K. J. Yesudas", film: "Sthree", year: 1970, duration: 250 },
  { title: "സന്ധ്യക്കെന്തിനു സിന്ദൂരം", query: "Sandhyakkenthinu sindhooram Maya", artist: "K. J. Yesudas", film: "Maya", year: 1972, duration: 260 },
  { title: "കണ്മണി അൻപോടു കാതലൻ", query: "Kanmani Anbodu Kadhalan Guna", artist: "S. Janaki & Kamal Haasan", film: "Guna", year: 1991, duration: 310 },
  { title: "ഹൃദയസഖീ സ്നേഹമയീ", query: "Hrudayasakhi snehamayi Oru Painkili Kadha", artist: "K. J. Yesudas", film: "Oru Painkili Kadha", year: 1984, duration: 270 },
  { title: "സുന്ദരി സുന്ദരി ഒന്നു പറയു", query: "Sundari sundari onnu parayu Aye Auto", artist: "M. G. Sreekumar", film: "Aye Auto", year: 1990, duration: 290 },
  { title: "പൊൻകസവു തട്ടമിട്ടു", query: "Ponkasavu thattamittu Kazhcha", artist: "Madhu Balakrishnan", film: "Kazhcha", year: 2004, duration: 280 },
  { title: "രാവിൻ നിലാവിൽ ഒന്നു ചേരാൻ", query: "Raavin nilavil onnu cheran Mazhavillu", artist: "K. J. Yesudas", film: "Mazhavillu", year: 1999, duration: 275 },
  { title: "നീലരാവിൽ ശ്രുതിമീട്ടി", query: "Neelaravil sruthemeetti Gramaphone", artist: "K. J. Yesudas", film: "Gramaphone", year: 2002, duration: 265 },
  { title: "ഓർമ്മകളിൽ പെയ്യും മഞ്ഞേ", query: "Ormmakalil peyyum manje Sasneham", artist: "K. S. Chithra", film: "Sasneham", year: 1990, duration: 270 },
  { title: "അമ്പിളിക്കല ചുണ്ടിൽ പുഞ്ചിരി", query: "Ambilikkala chundil Thoovalsparsham", artist: "K. J. Yesudas", film: "Thoovalsparsham", year: 1990, duration: 260 },
  { title: "മന്ദാര പൂവിതളിൽ", query: "Mandhara poovithalil Dasaratham", artist: "K. S. Chithra", film: "Dasaratham", year: 1989, duration: 270 },
  { title: "ചെമ്പക മലരുകൾ പൂക്കും", query: "Chembaka malarukal pookkum Randam Bhavam", artist: "K. J. Yesudas", film: "Randam Bhavam", year: 2001, duration: 280 },
  { title: "രാക്കാറ്റിൽ പൂത്തുലയും", query: "Raakkattil poothulayum Sainyam", artist: "K. J. Yesudas", film: "Sainyam", year: 1994, duration: 275 },
  { title: "ശ്യാമസുന്ദര പുഷ്പമേ", query: "Shyama sundara pushpame Yavanika", artist: "K. J. Yesudas", film: "Yavanika", year: 1982, duration: 270 },
  { title: "മറക്കുമോ നീയെൻ ഗാനം", query: "Marakkumo neeyen gaanam Daisy", artist: "K. J. Yesudas", film: "Daisy", year: 1988, duration: 260 },
  { title: "ദേവാങ്കണങ്ങൾ കയ്യൊഴിഞ്ഞ", query: "Devaanganangal Njan Gandharvan", artist: "K. J. Yesudas", film: "Njan Gandharvan", year: 1991, duration: 285 },
  { title: "പാലപ്പൂവേ നിൻ തിരുമുറ്റത്ത്", query: "Palappoove nin Thacholi Varghese Chekavar", artist: "K. S. Chithra", film: "Thacholi Varghese Chekavar", year: 1995, duration: 280 },
  { title: "ശ്രീലവസന്തം", query: "Sreelavasantham Nandhanam", artist: "K. J. Yesudas", film: "Nandhanam", year: 2002, duration: 265 },
  { title: "ഗോപാംഗനേ", query: "Gopaangane Aathmavile Bharatham", artist: "K. J. Yesudas", film: "Bharatham", year: 1991, duration: 290 },
  { title: "കണ്ണാന്തളിയും കാട്ടുകുറിഞ്ഞിയും", query: "Kannanthaliyum kattukurinji Kattathe Kilikkoodu", artist: "S. Janaki", film: "Kaattathe Kilikkoodu", year: 1983, duration: 255 },
  { title: "മനസ്സിലൊരു പൂമാല", query: "Manassiloru poomaala Pavithram", artist: "K. J. Yesudas", film: "Pavithram", year: 1994, duration: 270 },
  { title: "വാർത്തിങ്കളേ വാ", query: "Vaarthinkale vaa Chithram", artist: "K. S. Chithra", film: "Chithram", year: 1988, duration: 255 },
  { title: "അമ്പിളീ മാമനെ പുൽകാൻ", query: "Ambeelee maamane Thoovalsparsham", artist: "K. J. Yesudas", film: "Thoovalsparsham", year: 1990, duration: 270 },
  { title: "രാപ്പാടി പക്ഷി മൂളും", query: "Rappadi pakshi moolum Akashadoothu", artist: "K. S. Chithra", film: "Akashadoothu", year: 1993, duration: 265 },
  { title: "ചഞ്ചല മിഴിയിൽ നിന്റെ", query: "Chanchala mizhiyil Aaranyakam", artist: "K. J. Yesudas", film: "Aaranyakam", year: 1988, duration: 280 }
];

async function guaranteeExact() {
  const content = fs.readFileSync('./lib/tracks.ts', 'utf8');
  const startIndex = content.indexOf('export const playlists: Playlist[] = [');
  const arrayContent = content.slice(startIndex + 'export const playlists: Playlist[] ='.length).trim();
  const playlists = new Function(`return ${arrayContent.replace(/;$/, '')}`)();

  const gm = playlists.find(p => p.id === 'golden-memories');
  const mm = playlists.find(p => p.id === 'monsoon-memories');
  const nr = playlists.find(p => p.id === 'night-radio');

  const seenVideoIds = new Set();
  const seenTitles = new Set();

  playlists.forEach(p => {
    p.tracks.forEach(t => {
      seenVideoIds.add(t.videoId);
      seenTitles.add(`${t.title.trim().toLowerCase()}--${t.film.trim().toLowerCase()}`);
    });
  });

  async function topUp(p, pool, prefix) {
    if (p.tracks.length >= 100) return;
    console.log(`Top-up needed for ${p.name}: currently ${p.tracks.length}/100`);
    for (const item of pool) {
      if (p.tracks.length >= 100) break;
      const key = `${item.title.trim().toLowerCase()}--${item.film.trim().toLowerCase()}`;
      if (seenTitles.has(key)) continue;

      const v = await findVideoId(item.query, seenVideoIds);
      if (!v) continue;

      seenVideoIds.add(v.videoId);
      seenTitles.add(key);

      const newTrack = {
        id: `${prefix}-${p.tracks.length + 1}`,
        title: item.title,
        artist: item.artist,
        film: item.film,
        year: item.year,
        duration: item.duration,
        videoId: v.videoId
      };

      p.tracks.push(newTrack);
      console.log(`  ✓ [${newTrack.id}] ${newTrack.title} (${newTrack.film}) -> ${v.videoId}`);
    }
  }

  await topUp(gm, extraSongsGM, 'gm');
  await topUp(mm, extraSongsMM, 'mm');
  await topUp(nr, extraSongsNR, 'nr');

  console.log("\n================================================");
  console.log(`FINAL TALLY: GM=${gm.tracks.length}, MM=${mm.tracks.length}, NR=${nr.tracks.length}, TOTAL=${gm.tracks.length + mm.tracks.length + nr.tracks.length}`);
  console.log("================================================");

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

export const playlists: Playlist[] = ${JSON.stringify(playlists, null, 2)};
`;

  fs.writeFileSync('./lib/tracks.ts', outputCode, 'utf8');
}

if (process.argv[1] && process.argv[1].endsWith('guarantee-exact-100.mjs')) {
  guaranteeExact();
}
