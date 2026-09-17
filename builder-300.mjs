import fs from 'fs';

// Read existing tracks
const content = fs.readFileSync('./lib/tracks.ts', 'utf8');
const startIndex = content.indexOf('export const playlists: Playlist[] = [');
const arrayContent = content.slice(startIndex + 'export const playlists: Playlist[] ='.length).trim();
const playlists = new Function(`return ${arrayContent.replace(/;$/, '')}`)();

const gm = playlists.find(p => p.id === 'golden-memories');
const mm = playlists.find(p => p.id === 'monsoon-memories');
const nr = playlists.find(p => p.id === 'night-radio');

console.log(`Starting counts: GM=${gm.tracks.length}, MM=${mm.tracks.length}, NR=${nr.tracks.length}`);

const seenVideoIds = new Set();
const seenTitles = new Set();

playlists.forEach(p => {
  p.tracks.forEach(t => {
    seenVideoIds.add(t.videoId);
    seenTitles.add(`${t.title.trim().toLowerCase()}--${t.film.trim().toLowerCase()}`);
  });
});

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

async function searchEngine(queries) {
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

    // Fallback: YouTube search
    try {
      const ytUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(q + ' full song')}`;
      const res = await fetch(ytUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
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

// Candidates for Golden Memories (Target: 100)
const gmPool = [
  { title: "സൂര്യകിരീടം വീണുറങ്ങി", queries: ["Suryakireedam Devaasuram", "Sooryakireedam Devasuram"], artist: "M. G. Sreekumar", film: "Devaasuram", year: 1993, duration: 275 },
  { title: "ഗോപികേ നിൻ വിരൽ തുമ്പിലൊരു", queries: ["Gopike Nin Viral Kattathe Kilikkoodu", "Gopike nin viral thumbiloru"], artist: "K. J. Yesudas & S. Janaki", film: "Kattathe Kilikkoodu", year: 1983, duration: 250 },
  { title: "പൂവേ ഒരു മഴമുത്തം", queries: ["Poove Oru Mazhamutham Kaiyethum", "Poove oru mazhamutham Kakkothikkavile"], artist: "K. S. Chithra", film: "Kakkothikkavile Appooppan Thaadikal", year: 1988, duration: 255 },
  { title: "അല്ലിമലർക്കാവിൽ പൂരം കാണാൻ", queries: ["Allimalar Kavil Pooram Midhunam", "Allimalarkkavil pooram kanan"], artist: "M. G. Sreekumar", film: "Midhunam", year: 1993, duration: 280 },
  { title: "പവിഴം പോൽ പവിഴാധരം പോൽ", queries: ["Pavizham pol pavizhadharam Namukku Parkkan", "Pavizham pol Namukku Parkkan Munthiri Thoppukal"], artist: "K. J. Yesudas", film: "Namukku Parkkan Munthiri Thoppukal", year: 1986, duration: 260 },
  { title: "ആകാശമാകെ കണിമലർ താലം", queries: ["Aakashamake kanimalar Namukku Parkkan", "Aakashamake kanimalar thirumudi"], artist: "K. J. Yesudas", film: "Namukku Parkkan Munthiri Thoppukal", year: 1986, duration: 270 },
  { title: "സന്ധ്യേ കണ്ണീരിതെന്തേ സന്ധ്യേ", queries: ["Sandye Kanneerithende Madanolsavam", "Sandhye kanneerithenthe"], artist: "K. J. Yesudas", film: "Madanolsavam", year: 1978, duration: 285 },
  { title: "മാനസ മൈനേ വരൂ", queries: ["Maanasa Maine Varoo Chemmeen", "Manasa maine varoo"], artist: "Manna Dey", film: "Chemmeen", year: 1965, duration: 280 },
  { title: "കടലിനക്കരെ പോണോരേ", queries: ["Kadalinakkare Ponore Chemmeen", "Kadalinakkare ponore"], artist: "K. J. Yesudas", film: "Chemmeen", year: 1965, duration: 250 },
  { title: "പൊൻവെയിൽ മണിക്കച്ചയഴിഞ്ഞു വീണു", queries: ["Ponveyil Manikkacha Nrithasaala", "Ponn veyil manikacha"], artist: "K. J. Yesudas", film: "Nrithasaala", year: 1972, duration: 235 },
  { title: "പ്രമദവനം വീണ്ടും", queries: ["Pramadavanam veendum His Highness Abdullah", "Pramadavanam veendum"], artist: "K. J. Yesudas", film: "His Highness Abdullah", year: 1990, duration: 320 },
  { title: "രാമകഥാഗാനലോയം", queries: ["Raamakadha Gaanalayam Bharatham", "Ramakatha gaanalayam"], artist: "K. J. Yesudas", film: "Bharatham", year: 1991, duration: 310 },
  { title: "ശ്രീലവസന്തം", queries: ["Sreelavasantham Nandanam", "Sreelavasantham Peeliyozhinju"], artist: "K. J. Yesudas", film: "Nandanam", year: 2002, duration: 265 },
  { title: "ഒരു പുഷ്പം മാത്രമെൻ", queries: ["Oru pushpam mathramen Pareeksha", "Oru pushpam mathramen poonkullil"], artist: "K. J. Yesudas", film: "Pareeksha", year: 1967, duration: 245 },
  { title: "ആലിപ്പഴം പെറുക്കാൻ", queries: ["Aalippazham perukkan My Dear Kuttichathan", "Aalippazham perukkan"], artist: "S. Janaki", film: "My Dear Kuttichathan", year: 1984, duration: 240 },
  { title: "ആരെയും ഭാവഗായകനാക്കും", queries: ["Aareyum Bhava Gayakanakkum Nakhakshathangal", "Aareyum bhavagayakanakkum"], artist: "K. J. Yesudas", film: "Nakhakshathangal", year: 1986, duration: 240 },
  { title: "കണ്ണീർപ്പൂവിന്റെ കവിളിൽ തലോടി", queries: ["Kanneer Poovinte Kavilil Thalodi Kireedam", "Kanneer poovinte kavilil"], artist: "M. G. Sreekumar", film: "Kireedam", year: 1989, duration: 260 },
  { title: "ഗോപാംഗനേ", queries: ["Gopangane Aathmavu Neeyalle Bharatham", "Gopangane aathmavu"], artist: "K. J. Yesudas", film: "Bharatham", year: 1991, duration: 290 },
  { title: "മഞ്ഞൾ പ്രസാദവും നെറ്റിയിൽ ചാർത്തി", queries: ["Manjalprasadavum Nakhakshathangal", "Manjal prasadavum nettiyil"], artist: "K. S. Chithra", film: "Nakhakshathangal", year: 1986, duration: 240 },
  { title: "നീർപ്പളുങ്കുകൾ ചിതറി വീഴുമീ", queries: ["Neerppalungukal Chithari Yathra", "Neerpalungukal chithari"], artist: "K. J. Yesudas", film: "Yathra", year: 1985, duration: 245 },
  { title: "കേവല മർത്ത്യഭാഷ കേൾക്കാത്ത", queries: ["Kevala Marthya Bhasha Naran", "Kevala marthya bhasha"], artist: "K. J. Yesudas", film: "Naran", year: 2005, duration: 270 },
  { title: "പുലർകാല സുന്ദര സ്വപ്നത്തിൽ", queries: ["Pularkala Sundara Oru Maymasa Pulariyil", "Pularkala sundara swapnathil"], artist: "K. J. Yesudas", film: "Oru Maymasa Pulariyil", year: 1987, duration: 255 },
  { title: "ചന്ദനമണി വാതിൽ പാതി ചാരി", queries: ["Chandanamani Vaathil Marikkunnilla Njan", "Chandanamani vaathil paathi"], artist: "G. Venugopal", film: "Marikkunnilla Njan", year: 1988, duration: 265 },
  { title: "സ്വർണ്ണമുകിലേ", queries: ["Swarnamukile Ithiri Poove Chuvannapoove", "Swarnnamukile"], artist: "K. S. Chithra", film: "Ithiri Poove Chuvannapoove", year: 1984, duration: 250 },
  { title: "താനേ പൂവിട്ട മോഹം", queries: ["Thane Poovitta Moham Sasneham", "Thane poovitta moham"], artist: "K. J. Yesudas", film: "Sasneham", year: 1990, duration: 260 },
  { title: "ആയിരം കണ്ണുമായ് കാത്തിരുന്നു", queries: ["Aayiram Kannumayi Nokkethadhoorathu", "Aayiram kannumayi kaathirunnu"], artist: "K. J. Yesudas", film: "Nokkethadhoorathu Kannum Nattu", year: 1984, duration: 270 },
  { title: "ദേവാങ്കണങ്ങൾ കയ്യൊഴിഞ്ഞ", queries: ["Devaanganangal Njan Gandharvan", "Devanganangal kayyozhinja"], artist: "K. J. Yesudas", film: "Njan Gandharvan", year: 1991, duration: 285 },
  { title: "പാലപ്പൂവേ നിൻ തിരുമുറ്റത്ത്", queries: ["Palappoove Nin Thacholi Varghese Chekavar", "Palappoove nin thirumuttathu"], artist: "K. S. Chithra", film: "Thacholi Varghese Chekavar", year: 1995, duration: 280 },
  { title: "മാണിക്യവീണയുമായെൻ", queries: ["Manikyaveenayumayen Kattu Pookkal", "Manikyaveenayumayen manassinte"], artist: "K. J. Yesudas", film: "Kattu Pookkal", year: 1965, duration: 240 }
];

// Candidates for Monsoon Memories (Target: 100)
const mmPool = [
  { title: "മഴനീർത്തുള്ളികൾ", queries: ["Mazhaneerthullikal Vettam", "Mazhaneer thullikal vettam song"], artist: "M. G. Sreekumar & Sujatha Mohan", film: "Vettam", year: 2004, duration: 290 },
  { title: "വാർമുകിലേ വാനിൽ നീ", queries: ["Vaarmukile Mazha", "Varmukile vanil nee Mazha"], artist: "K. S. Chithra", film: "Mazha", year: 2000, duration: 270 },
  { title: "പെയ്യാതെ പോയ മഴയോ", queries: ["Peyyathe poya mazhayo Mazha", "Peyyathe poya mazhayude"], artist: "K. J. Yesudas", film: "Mazha", year: 2000, duration: 280 },
  { title: "ഒരു രാത്രി കൂടി വിടവാങ്ങവേ", queries: ["Oru rathri koodi vidavangave Summer in Bethlehem", "Oru rathri koodi Summer in bethlehem"], artist: "K. J. Yesudas", film: "Summer in Bethlehem", year: 1998, duration: 300 },
  { title: "മാരിക്കൂടinnu മാനം", queries: ["Marikkoodinnu manam Pingami", "Marikkoodinnu manam"], artist: "K. J. Yesudas", film: "Pingami", year: 1994, duration: 270 },
  { title: "മഞ്ഞുകാലം നോറ്റ മരം", queries: ["Manjukalam notta maram Engane Nee Marakkum", "Manjukalam notta maram"], artist: "K. J. Yesudas", film: "Engane Nee Marakkum", year: 1983, duration: 260 },
  { title: "ഇന്നലെ എൻ നെഞ്ചിലെ", queries: ["Innale en nenchile Balettan", "Innale en nenjile ponmullayil"], artist: "K. J. Yesudas", film: "Balettan", year: 2003, duration: 275 },
  { title: "എന്തു പറഞ്ഞാലും നീ എന്റേതല്ലേ", queries: ["Enthu paranjalum nee entethalle Kanmadam", "Enthu paranjalum Kanmadam"], artist: "K. J. Yesudas", film: "Kanmadam", year: 1998, duration: 280 },
  { title: "മഞ്ഞക്കിളിയുടെ മൂളിപ്പാട്ടുണ്ടേ", queries: ["Manjakkiliyude moolippattunde Kanmadam", "Manjakkiliyude moolippattu"], artist: "K. J. Yesudas", film: "Kanmadam", year: 1998, duration: 270 },
  { title: "പൂന്തേനരുവി പൊൻമുടിപ്പുഴയുടെ", queries: ["Poonthenaruvi Minnaminunginte Nurunguvettam", "Poonthenaruvi ponmudi"], artist: "K. J. Yesudas", film: "Oru Minnaminunginte Nurunguvettam", year: 1987, duration: 280 },
  { title: "മെല്ലെ മെല്ലെ മുഖപടം", queries: ["Melle melle mukhapadam Minnaminunginte Nurunguvettam", "Melle melle mukhapadam thellodukki"], artist: "K. J. Yesudas", film: "Oru Minnaminunginte Nurunguvettam", year: 1987, duration: 260 },
  { title: "കാറ്റോടു കാതോരം", queries: ["Kaathodu Kaathoram title song", "Kaathodu kaathoram koodukootty"], artist: "K. J. Yesudas & Lathika", film: "Kaathodu Kaathoram", year: 1985, duration: 250 },
  { title: "ദേവദൂതർ പാടി", queries: ["Devadoothar paadi Kaathodu Kaathoram", "Devadoothar padi snehadoothar"], artist: "K. J. Yesudas", film: "Kaathodu Kaathoram", year: 1985, duration: 290 },
  { title: "നിലാവിന്റെ നീലഭസ്മക്കുറിയിട്ടവളേ", queries: ["Nilavinte neelabhasma Agnidevan", "Nilavinte neelabhasmakuriyitta"], artist: "M. G. Sreekumar", film: "Agnidevan", year: 1995, duration: 295 },
  { title: "ഹരിമുരളീരവം", queries: ["Harimuraleeravam Aaram Thampuran", "Harimuraleeravam Aaraam thampuran"], artist: "K. J. Yesudas", film: "Aaraam Thampuran", year: 1997, duration: 340 },
  { title: "പാതിരാപ്പാല പൂത്തു", queries: ["Pathirappala poothu Manivathoorile Aayiram Sivarathrikal", "Pathirappala poothu"], artist: "K. J. Yesudas", film: "Manivathoorile Aayiram Sivarathrikal", year: 1987, duration: 270 },
  { title: "അരികിൽ നീയുണ്ടായിരുന്നെങ്കിൽ", queries: ["Arikil neeyundayirunnengil Nee Ethra Dhanya", "Arikil neeyundayirunnengil"], artist: "K. J. Yesudas", film: "Nee Ethra Dhanya", year: 1987, duration: 265 },
  { title: "ദേവസംഗീതം നീയല്ലേ", queries: ["Devasangeetham neeyalle Guru", "Devasangeetham neeyalle"], artist: "K. J. Yesudas & Radhika Thilak", film: "Guru", year: 1997, duration: 280 },
  { title: "മറന്നിട്ടുമെന്തിനോ മനസ്സിൻ മണിയറയിൽ", queries: ["Marannittumenthino Randam Bhavam", "Marannittumenthino manassin"], artist: "P. Jayachandran & Sujatha Mohan", film: "Randam Bhavam", year: 2001, duration: 285 },
  { title: "കിളിച്ചുണ്ടൻ മാമ്പഴം ചുണ്ടിൽ", queries: ["Kilichundan mambazham Kilichundan Mampazham", "Kilichundan mambazham chundil"], artist: "M. G. Sreekumar & Sujatha Mohan", film: "Kilichundan Mampazham", year: 2003, duration: 290 },
  { title: "കസ്തൂരിമാൻ കുറുമ്പേ", queries: ["Kasthoori maan kurumbae Kilichundan Mampazham", "Kasthoori maan kurumba"], artist: "M. G. Sreekumar", film: "Kilichundan Mampazham", year: 2003, duration: 280 },
  { title: "ഒന്നാം കിളി പൊന്നാൺകിളി", queries: ["Onnam kili ponnankili Kilichundan Mampazham", "Onnam kili ponnan kili"], artist: "M. G. Sreekumar & Sujatha Mohan", film: "Kilichundan Mampazham", year: 2003, duration: 295 },
  { title: "പവിഴമഴയേ", queries: ["Pavizha Mazhaye Athiran", "Pavizha mazhaye nee peyyumo"], artist: "K. S. Harisankar", film: "Athiran", year: 2019, duration: 250 },
  { title: "നീ മണിമുകിലായ്", queries: ["Nee manimukilaayi Kakkakuyil", "Nee manimukilayi mazhayayi"], artist: "M. G. Sreekumar & K. S. Chithra", film: "Kakkakuyil", year: 2001, duration: 290 },
  { title: "മേഘരാഗം നേർത്തൊരു", queries: ["Megharagam nerthoru Kakkakuyil", "Megharagam nerthoru pennin"], artist: "K. S. Chithra", film: "Kakkakuyil", year: 2001, duration: 275 },
  { title: "പൊൻപുലരിയിൽ", queries: ["Ponpulariyil poothalam Unnikale Oru Kadha Parayam", "Ponpulariyil poothalam"], artist: "K. J. Yesudas", film: "Unnikale Oru Kadha Parayam", year: 1987, duration: 260 },
  { title: "ഉണ്ണികളെ ഒരു കഥ പറയാം", queries: ["Unnikale oru kadha parayam title song", "Unnikale oru kadha parayam"], artist: "K. J. Yesudas", film: "Unnikale Oru Kadha Parayam", year: 1987, duration: 270 },
  { title: "ശാന്തമീ രാത്രിയിൽ", queries: ["Santhamee rathriyil Johnny Walker", "Santhamee rathriyil vinnile"], artist: "K. J. Yesudas", film: "Johnny Walker", year: 1992, duration: 280 },
  { title: "ചെമ്പൂവേ പൂവേ", queries: ["Chempoove poove Sneham", "Chempoove poove nirasankalpam"], artist: "K. J. Yesudas & Sujatha Mohan", film: "Sneham", year: 1998, duration: 290 },
  { title: "കൈതപ്പൂവിൻ കന്നിക്കുറുമ്പിൽ", queries: ["Kaithappoovin kannikkurumbil Kannezhuthi Pottum Thottu", "Kaithappoovin kannikkurumbil"], artist: "K. S. Chithra & Manju Warrier", film: "Kannezhuthi Pottum Thottu", year: 1999, duration: 270 },
  { title: "ഹരിചന്ദന മലരുകളായ്", queries: ["Harichandana malarukalaayi Kannezhuthi Pottum Thottu", "Harichandana malarukalayi"], artist: "M. G. Sreekumar", film: "Kannezhuthi Pottum Thottu", year: 1999, duration: 275 },
  { title: "ഓർമ്മകൾ ഓടിക്കളിക്കുവാനെത്തുന്നു", queries: ["Ormmakal odikkalikkana Mukundetta Sumithra Vilikkunnu", "Ormmakal odikkalikkuvan"], artist: "M. G. Sreekumar", film: "Mukundetta Sumithra Vilikkunnu", year: 1988, duration: 265 },
  { title: "എന്റെ ഉള്ളുടുക്കം കൊട്ടി", queries: ["Ente ulludukkam kotti Kannezhuthi Pottum Thottu", "Ente ulludukkam kotti"], artist: "K. J. Yesudas", film: "Kannezhuthi Pottum Thottu", year: 1999, duration: 285 },
  { title: "എത്ര പൂക്കാലം", queries: ["Ethra pookkalam Rakkuyilin Ragasadassil", "Ethra pookkalam ini ethanam"], artist: "M. G. Sreekumar", film: "Rakkuyilin Ragasadassil", year: 1986, duration: 260 },
  { title: "പൂങ്കാറ്റിനോടും കിളികളോടും", queries: ["Poonkattinodum kilikalodum Poomukhappadiyil Ninneyum Kaathu", "Poonkattinodum kilikalodum"], artist: "K. J. Yesudas", film: "Poomukhappadiyil Ninneyum Kaathu", year: 1986, duration: 270 },
  { title: "പെണ്ണാളേ പെണ്ണാളേ", queries: ["Pennale pennale kariminnale Chemmeen", "Pennale pennale Chemmeen"], artist: "P. Leela & K. J. Yesudas", film: "Chemmeen", year: 1965, duration: 240 },
  { title: "പുഴയോരത്തിൽ പൂന്തോണിയിൽ", queries: ["Puzhayorathil poonthoniyil Adaminte Vaariyellu", "Puzhayorathil poonthoniyil"], artist: "S. Janaki", film: "Adaminte Vaariyellu", year: 1983, duration: 260 },
  { title: "നീലക്കുറിഞ്ഞികൾ പൂക്കുന്ന വീഥിയിൽ", queries: ["Neelakkurinjikal pookkunna Neelakkurinji Poothappol", "Neelakkurinjikal pookkunna veethiyil"], artist: "K. J. Yesudas & S. Janaki", film: "Neelakkurinji Poothappol", year: 1987, duration: 275 },
  { title: "ഇന്നുമെന്റെ കണ്ണുനീരിൽ", queries: ["Innumente kannuneeril Yuvajanotsavam", "Innumente kannuneeril oru swapnam"], artist: "K. J. Yesudas", film: "Yuvajanotsavam", year: 1986, duration: 260 },
  { title: "പാതിരാമഴയേതോ", queries: ["Pathiramazhayetho hamsageetham Ulladakkam", "Pathiramazhayetho Ulladakkam"], artist: "K. J. Yesudas & Sujatha Mohan", film: "Ulladakkam", year: 1991, duration: 285 },
  { title: "മായമഞ്ചലിൽ", queries: ["Mayamanchalil ithu vazhiye Ottayal Pattalam", "Mayamanchalil Ottayal Pattalam"], artist: "G. Venugopal & Radhika Thilak", film: "Ottayal Pattalam", year: 1991, duration: 280 },
  { title: "തുള്ളിമഞ്ചാടികൾ", queries: ["Thullimanjadikal Kaazhcha", "Thullimanjadikal kaazhcha song"], artist: "Kalabhavan Mani", film: "Kaazhcha", year: 2004, duration: 265 },
  { title: "കുണുങ്ങി കുണുങ്ങി നടക്കുന്ന കാറ്റേ", queries: ["Kunungi kunungi nadakkunna Varnapakittu", "Kunungi kunungi nadakkunna kaatte"], artist: "M. G. Sreekumar & K. S. Chithra", film: "Varnapakittu", year: 1997, duration: 285 },
  { title: "ആകാശദൂതു പോയോ", queries: ["Aakashadoothu poyo Akashadoothu", "Aakashadoothu poyo vinnile"], artist: "K. S. Chithra", film: "Akashadoothu", year: 1993, duration: 270 },
  { title: "ആലിപ്പഴം ചുരത്തും", queries: ["Aalippazham churathum Kuttisrank", "Aalippazham churathum"], artist: "Rajalakshmy", film: "Kuttisrank", year: 2010, duration: 240 },
  { title: "എൻ പൂവേ പൊൻപൂവേ", queries: ["En poove ponpoove Kattathe Kilikkoodu", "En poove ponpoove"], artist: "S. Janaki", film: "Kattathe Kilikkoodu", year: 1983, duration: 250 },
  { title: "മന്ദാരച്ചെപ്പുണ്ടോ", queries: ["Mandharacheppundo Dasaratham", "Mandharacheppundo manikya kallundo"], artist: "M. G. Sreekumar & K. S. Chithra", film: "Dasaratham", year: 1989, duration: 275 },
  { title: "പൂത്താലം വലംകയ്യിൽ", queries: ["Poothalam valamkayyil Thilakkam", "Poothalam valamkayyil ethi"], artist: "P. Jayachandran", film: "Thilakkam", year: 2003, duration: 280 },
  { title: "മഴവില്ലിൻ തീരങ്ങൾ", queries: ["Mazhavillin theerangal Oru Indian Pranayakadha", "Mazhavillin theerangal"], artist: "Najim Arshad", film: "Oru Indian Pranayakadha", year: 2013, duration: 250 },
  { title: "തിരനുരയും ചുരുൾമുടിയിൽ", queries: ["Thiranurayum churulmudiyil Ananthabhadram", "Thiranurayum churulmudiyil"], artist: "K. J. Yesudas", film: "Ananthabhadram", year: 2005, duration: 280 },
  { title: "പിന്നെയുമൊരു മഴക്കാലം", queries: ["Pinneyumoru mazhakkalam Mazhakkalam", "Pinneyumoru mazhakkalam"], artist: "P. Jayachandran", film: "Mazhakkalam", year: 2004, duration: 260 },
  { title: "കാർമുകിൽ വർണ്ണന്റെ ചുണ്ടിൽ", queries: ["Karmukil varnnante Nandanam", "Karmukil varnnante chundil"], artist: "K. S. Chithra", film: "Nandanam", year: 2002, duration: 290 },
  { title: "മൗനസരോവരമാകെ", queries: ["Mounasarovaramaake Savidham", "Mounasarovaramaake nilavil"], artist: "K. J. Yesudas", film: "Savidham", year: 1992, duration: 275 },
  { title: "വരവായ് തോഴി വാ", queries: ["Varavayi thozhi vaa Chithram", "Varavayi thozhi vaa"], artist: "K. S. Chithra", film: "Chithram", year: 1988, duration: 250 },
  { title: "കിളിയേ കിളിയേ", queries: ["Kiliye kiliye Aakashadoothu", "Kiliye kiliye akashadoothu"], artist: "K. S. Chithra", film: "Akashadoothu", year: 1993, duration: 260 },
  { title: "ഒരു കിളി ഇരുകിളി", queries: ["Oru kili irukili Vasanthiyum Lakshmiyum", "Oru kili irukili mukkili"], artist: "K. J. Yesudas", film: "Vasanthiyum Lakshmiyum Pinne Njanum", year: 1999, duration: 280 },
  { title: "ആലാപനം തേടും തായ്മനം", queries: ["Aalaapanam thedum Kaakkothikkavile", "Aalapanam thedum thaymanam"], artist: "K. J. Yesudas", film: "Kaakkothikkavile Appooppan Thaadikal", year: 1988, duration: 265 },
  { title: "ചഞ്ചലദൃതപദതാളം", queries: ["Chanchaladhrithapada Rajashilpi", "Chanchaladhrithapada thalam"], artist: "K. S. Chithra", film: "Rajashilpi", year: 1992, duration: 270 },
  { title: "കാറ്റിൽ വരും ഗീതം", queries: ["Kaattil varum geetham Kakkakuyil", "Kaattil varum geetham"], artist: "K. J. Yesudas", film: "Kakkakuyil", year: 2001, duration: 280 },
  { title: "മഴ പെയ്തു മാനം", queries: ["Mazha peythu manam The Car", "Mazha peythu manam thelinju"], artist: "M. G. Sreekumar", film: "The Car", year: 1997, duration: 260 },
  { title: "നീലരാവിൽ ഇന്നു നിന്റെ", queries: ["Neelaravil innu Kudumbakodathi", "Neelaravil innu ninte"], artist: "K. J. Yesudas & Sujatha Mohan", film: "Kudumbakodathi", year: 1996, duration: 275 },
  { title: "തൂമഞ്ഞു വീഴുമീ രാവിൽ", queries: ["Thoomanju veezhumee Nokkethadhoorathu", "Thoomanju veezhumee raavil"], artist: "K. J. Yesudas", film: "Nokkethadhoorathu Kannum Nattu", year: 1984, duration: 260 },
  { title: "തളിർവലയോ താമരനൂലോ", queries: ["Thalirvalayo thamaranoolo Cheppu", "Thalirvalayo thamaranoolo"], artist: "K. S. Chithra", film: "Cheppu", year: 1987, duration: 255 },
  { title: "പൊൻമുളന്തണ്ടു മൂളും", queries: ["Ponmulanthandu moolum Vatsalyam", "Ponmulanthandu moolum paattu"], artist: "K. J. Yesudas", film: "Vatsalyam", year: 1993, duration: 265 },
  { title: "ശ്രീരാഗമോ വീണ്ടും", queries: ["Sreeragamo veendum Pavithram", "Sreeragamo veendum hridayathil"], artist: "K. J. Yesudas", film: "Pavithram", year: 1994, duration: 320 },
  { title: "വാൽക്കണ്ണെഴുതി വനപുഷ്പം ചൂടി", queries: ["Valkkannazhuthi vanapushpam Paithrukam", "Valkkannazhuthi vanapushpam"], artist: "K. J. Yesudas", film: "Paithrukam", year: 1993, duration: 290 },
  { title: "പൂങ്കാറ്റിൻ താരാട്ടും", queries: ["Poonkattin tharattum Malootty", "Poonkattin tharattum kilikoodu"], artist: "K. S. Chithra", film: "Malootty", year: 1992, duration: 260 },
  { title: "മഞ്ഞുകാലം പടിയിറങ്ങി", queries: ["Manjukalam padiyirangi Mazha", "Manjukalam padiyirangi Mazha song"], artist: "K. S. Chithra", film: "Mazha", year: 2000, duration: 250 },
  { title: "ആകാശപ്പൂമഴ പെയ്യുന്നു", queries: ["Aakashappoomazha Kalyanaraman", "Aakashappoomazha peyyunnu"], artist: "M. G. Sreekumar", film: "Kalyanaraman", year: 2002, duration: 280 },
  { title: "മഴനിലാ തെന്നലായ്", queries: ["Mazhanila thennalayi Vikramadithyan", "Mazhanila thennalayi"], artist: "Najim Arshad", film: "Vikramadithyan", year: 2014, duration: 260 },
  { title: "ഓർമ്മകളിൽ ഒരു മഴത്തുള്ളി", queries: ["Ormmakalil oru mazhathulli Sasneham", "Ormmakalil oru mazhathulli"], artist: "G. Venugopal", film: "Sasneham", year: 1990, duration: 270 },
  { title: "പൂവേ പൂവേ പാലപ്പൂവേ", queries: ["Poove poove palappoove Devadoothan", "Poove poove palappoove"], artist: "K. S. Chithra & P. Jayachandran", film: "Devadoothan", year: 2000, duration: 295 },
  { title: "കണ്ണാടി ആദ്യമായെൻ", queries: ["Kannadi aadyamayen Paava", "Kannadi aadyamayen manassu"], artist: "K. J. Yesudas", film: "Paava", year: 2016, duration: 260 },
  { title: "തൂവെള്ളത്തൂവൽ വീശുമീ കാറ്റേ", queries: ["Thoovellathooval veeshi Kayal", "Thoovellathooval veeshi"], artist: "K. J. Yesudas", film: "Kayal", year: 1991, duration: 270 },
  { title: "മഴവില്ലു കൊണ്ടുവാ", queries: ["Mazhavillu konduva Ennum Ezhunnollathu", "Mazhavillu konduva"], artist: "K. S. Chithra", film: "Ennum Ezhunnollathu", year: 2000, duration: 260 },
  { title: "പാതിരാക്കാറ്റേ പാടൂ", queries: ["Pathirakkatte padoo Vatsalyam", "Pathirakkatte padoo"], artist: "K. J. Yesudas", film: "Vatsalyam", year: 1993, duration: 270 },
  { title: "ശ്യാമമേഘമേ നീ യദുകുല", queries: ["Shyaamameghame nee Adhipan", "Shyaamameghame nee yadukula"], artist: "K. S. Chithra", film: "Adhipan", year: 1989, duration: 270 },
  { title: "സ്വർഗ്ഗവാതിൽ ഏകാദശി", queries: ["Swargavathil ekadashi Sainyam", "Swargavathil ekadashi"], artist: "K. J. Yesudas", film: "Sainyam", year: 1994, duration: 280 },
  { title: "പുലരിപ്പൂങ്കാറ്റേ", queries: ["Pularippoonkaatte Kakkothikkavile", "Pularippoonkaatte"], artist: "K. S. Chithra", film: "Kakkothikkavile Appooppan Thaadikal", year: 1988, duration: 260 },
  { title: "മാമ്പൂവേ മഞ്ചാടീ", queries: ["Mampoove manjaadi Kakkakuyil", "Mampoove manjaadi"], artist: "K. S. Chithra", film: "Kakkakuyil", year: 2001, duration: 280 }
];

// Candidates for Night Radio (Target: 100)
const nrPool = [
  { title: "ആമ്പല്ലൂർ അമ്പലത്തിൽ", queries: ["Aamballoor ambalathil Midhunam", "Aamballoor ambalathil aalolam"], artist: "M. G. Sreekumar", film: "Midhunam", year: 1993, duration: 275 },
  { title: "ഓ പ്രിയേ പ്രിയേ", queries: ["O priye priye Aniyathipraavu", "O priye priye ninakkoru"], artist: "M. G. Sreekumar & K. S. Chithra", film: "Aniyathipraavu", year: 1997, duration: 290 },
  { title: "എന്നു വരും നീ", queries: ["Ennu varum nee Kannaki", "Ennu varum nee kanmani"], artist: "K. J. Yesudas", film: "Kannaki", year: 2001, duration: 285 },
  { title: "അഴകേ നിൻ മിഴിനീർമണിയായ്", queries: ["Azhake nin mizhineermaniyayi Ammakkilikkoodu", "Azhake nin mizhineermaniyayi"], artist: "K. J. Yesudas", film: "Ammakkilikkoodu", year: 2003, duration: 290 },
  { title: "നീ ഹിമമഴയായ്", queries: ["Nee Himamazhayayi Edakkad Battalion 06", "Nee himamazhayayi peyyuka"], artist: "K. S. Harisankar & Nithya Mammen", film: "Edakkad Battalion 06", year: 2019, duration: 245 },
  { title: "ആരോ വിരൽ മീട്ടി", queries: ["Aaro viral meetti Pranayavarnangal", "Aaro viral meetti manassin"], artist: "K. J. Yesudas", film: "Pranayavarnangal", year: 1998, duration: 290 },
  { title: "വരമഞ്ഞളാടിയ രാവിന്റെ മാറിൽ", queries: ["Varamanjaladiya ravinte maril Pranayavarnangal", "Varamanjaladiya ravinte"], artist: "Sujatha Mohan", film: "Pranayavarnangal", year: 1998, duration: 280 },
  { title: "ചന്ദനത്തിൽ കടഞ്ഞെടുത്തൊരു", queries: ["Chandanathil kadanjeduthoru Sasneham Sumithra", "Chandanathil kadanjeduthoru"], artist: "K. J. Yesudas", film: "Sasneham Sumithra", year: 2004, duration: 285 },
  { title: "അന്തിക്കടപ്പുറത്തു", queries: ["Anthikkadappurathu Chamayam", "Anthikkadappurathu kaattolam"], artist: "M. G. Sreekumar", film: "Chamayam", year: 1993, duration: 290 },
  { title: "ചാഞ്ചാടിയാടി ഉറങ്ങൂ നീ", queries: ["Chanchadiyadi urangoo nee Makante Achan", "Chanchadiyadi urangoo"], artist: "K. J. Yesudas", film: "Makante Achan", year: 2009, duration: 285 },
  { title: "പിന്നെയും പിന്നെയും ആരോ കിനാവിന്റെ", queries: ["Pinneyum pinneyum Krishnagudiyil Oru Pranayakalathu", "Pinneyum pinneyum aaro kinavinte"], artist: "K. J. Yesudas & K. S. Chithra", film: "Krishnagudiyil Oru Pranayakalathu", year: 1997, duration: 310 },
  { title: "ഒരു ചെമ്പനീർ പൂവിറുത്തു", queries: ["Oru chempaneer pooviruthu Sthithi", "Oru chempaneer pooviruthu njan"], artist: "Unni Menon", film: "Sthithi", year: 2003, duration: 300 },
  { title: "മധുരം ജീവാമൃതബിന്ദു", queries: ["Madhuram jeevaamrithabindu Chenkol", "Madhuram jeevaamritha bindu"], artist: "K. J. Yesudas", film: "Chenkol", year: 1993, duration: 290 },
  { title: "രാവിൻ നിലാക്കായലിൽ", queries: ["Raavin nilakkayalil Mazhavillu", "Raavin nilakkayalil thoni"], artist: "K. J. Yesudas", film: "Mazhavillu", year: 1999, duration: 280 },
  { title: "ചന്ദനലേപ സുഗന്ധം", queries: ["Chandanalepa sugandham Vadakkan Veeragatha", "Chandanalepa sugandham pooshiya"], artist: "K. J. Yesudas", film: "Oru Vadakkan Veeragatha", year: 1989, duration: 300 },
  { title: "കളരിവിളക്കു തെളിഞ്ഞതാണോ", queries: ["Kalarivilakku thelinjathano Vadakkan Veeragatha", "Kalarivilakku thelinjathano"], artist: "K. S. Chithra", film: "Oru Vadakkan Veeragatha", year: 1989, duration: 280 },
  { title: "പൂങ്കാറ്റേ പോയി ചൊല്ലാമോ", queries: ["Poonkaatte poyi chollamo Friends", "Poonkaatte poyi chollamo mukilin"], artist: "K. J. Yesudas", film: "Friends", year: 1999, duration: 290 },
  { title: "തങ്കത്തോണി ഏറി വാ", queries: ["Thankathoni yeri vaa Mazhavillu", "Thankathoni yeri vaa pontharakame"], artist: "K. J. Yesudas", film: "Mazhavillu", year: 1999, duration: 280 },
  { title: "താമരപ്പൂവിൽ വാഴും", queries: ["Thamarappoovil vazhum Chandranudikkunna Dikkil", "Thamarappoovil vazhum devi"], artist: "K. J. Yesudas & Sujatha Mohan", film: "Chandranudikkunna Dikkil", year: 1999, duration: 295 },
  { title: "അമ്പാടിപ്പയ്യുകൾ മേയും", queries: ["Ambadippayyukal meyum Chandranudikkunna Dikkil", "Ambadippayyukal meyum kanana"], artist: "K. J. Yesudas", film: "Chandranudikkunna Dikkil", year: 1999, duration: 285 },
  { title: "ഒരുവട്ടം കൂടിയെൻ", queries: ["Oru vattam koodiyen Chillu", "Oru vattam koodiyen ormakal"], artist: "K. J. Yesudas", film: "Chillu", year: 1982, duration: 260 },
  { title: "നീയെൻ കിനാവോ", queries: ["Neeyen kinavo Hello", "Neeyen kinavo priya swapnamo"], artist: "Afsal & Jyotsna", film: "Hello", year: 2007, duration: 270 },
  { title: "മനസ്സിൻ മടിയിലെ", queries: ["Manassin madiyile Manasinakkare", "Manassin madiyile manthara"], artist: "K. J. Yesudas & Sujatha Mohan", film: "Manasinakkare", year: 2003, duration: 280 },
  { title: "ചെണ്ടുമല്ലിക പൂത്തു വിരിഞ്ഞു", queries: ["Chendumallika poothu Manasinakkare", "Chendumallika poothu virinju"], artist: "M. G. Sreekumar", film: "Manasinakkare", year: 2003, duration: 270 },
  { title: "എന്നും നിന്നെ പൂജിക്കാം", queries: ["Ennum ninne poojikkam Aniyathipraavu", "Ennum ninne poojikkam ponnu"], artist: "K. J. Yesudas & Sujatha Mohan", film: "Aniyathipraavu", year: 1997, duration: 285 },
  { title: "കനകമുന്തിരികൾ മണികൾ", queries: ["Kanakamunthirikal Punaradhivasam", "Kanakamunthirikal manikal"], artist: "P. Jayachandran", film: "Punaradhivasam", year: 2000, duration: 280 },
  { title: "മേഘം പൂത്തു തുടങ്ങി", queries: ["Megham poothu thudangi Thoovanathumbikal", "Megham poothu thudangi moham"], artist: "K. J. Yesudas", film: "Thoovanathumbikal", year: 1987, duration: 285 },
  { title: "ഒന്നാം രാഗം പാടി", queries: ["Onnam ragam padi Thoovanathumbikal", "Onnam ragam padi onnana kunnil"], artist: "K. J. Yesudas & K. S. Chithra", film: "Thoovanathumbikal", year: 1987, duration: 290 },
  { title: "രാക്കിളി തൻ പൊൻമകൾ", queries: ["Rakkili than ponmakale Perumazhakkalam", "Rakkili than ponmakal"], artist: "K. S. Chithra", film: "Perumazhakkalam", year: 2004, duration: 295 },
  { title: "മെഹർബാൻ മെഹർബാൻ", queries: ["Meherban Perumazhakkalam", "Meherban meherban oru moham"], artist: "M. G. Sreekumar & Sujatha Mohan", film: "Perumazhakkalam", year: 2004, duration: 290 },
  { title: "ആലോലം താലോലം പാടാം", queries: ["Aalolam thaalolam paadaam Kaliyattam", "Aalolam thaalolam padam"], artist: "K. J. Yesudas", film: "Kaliyattam", year: 1997, duration: 270 },
  { title: "പൂമുഖവാതിൽക്കൽ സ്നേഹം", queries: ["Poomukhavathilkkal sneham Rakkuyilin Ragasadassil", "Poomukhavathilkkal sneham"], artist: "K. J. Yesudas", film: "Rakkuyilin Ragasadassil", year: 1986, duration: 280 },
  { title: "താരിളം പൂവേ താരാട്ടാം", queries: ["Tharilam poove tharattam Sphadikam", "Tharilam poove tharattam"], artist: "K. S. Chithra", film: "Sphadikam", year: 1995, duration: 260 },
  { title: "ഏഴുമല പൂഞ്ചോല", queries: ["Ezhumala poonchola Sphadikam", "Ezhumala poonchola thazhvarayil"], artist: "K. S. Chithra & M. G. Sreekumar", film: "Sphadikam", year: 1995, duration: 280 },
  { title: "മനസ്സിൻ മണിമുറ്റത്ത്", queries: ["Manassin manimuttathu Manichitrathazhu", "Manassin manimuttathu mazhavillu"], artist: "K. J. Yesudas", film: "Manichitrathazhu", year: 1993, duration: 270 },
  { title: "അക്കരെയിക്കരെ നിന്നൊരു പൂങ്കാറ്റ്", queries: ["Akkareyikkare ninnoru poonkaattu Akkare Ninnoru Maran", "Akkareyikkare ninnoru poonkaattu"], artist: "K. J. Yesudas", film: "Akkare Ninnoru Maran", year: 1985, duration: 260 },
  { title: "ഓത്തുപള്ളിയിലന്നു നമ്മൾ", queries: ["Othupalliyilannu Thenmavin Kombath", "Othupalliyilannu nammal poyappol"], artist: "Sujatha Mohan & Sreekumar", film: "Thenmavin Kombath", year: 1994, duration: 290 },
  { title: "മാനത്തെ ചന്ദനക്കീറ്", queries: ["Manathe chandanakkeeru Chandralekha", "Manathe chandanakkeeru minnum"], artist: "M. G. Sreekumar & K. S. Chithra", film: "Chandralekha", year: 1997, duration: 295 },
  { title: "ഇന്നലെ മയങ്ങുമ്പോൾ", queries: ["Innale mayangumbol Anveshichu Kandethiyilla", "Innale mayangumbol oru swapnam"], artist: "K. J. Yesudas", film: "Anveshichu Kandethiyilla", year: 1967, duration: 250 },
  { title: "രാരീ രാരീരം രാരോ", queries: ["Raari rareeram raaro Onnu Muthal Poojyam Vare", "Raari rareeram raaro"], artist: "G. Venugopal", film: "Onnu Muthal Poojyam Vare", year: 1986, duration: 280 },
  { title: "ഒരു ദള വീര്യമായ്", queries: ["Oru dala veeryamayi Arayannangalude Veedu", "Oru dala veeryamayi manassinte"], artist: "K. J. Yesudas", film: "Arayannangalude Veedu", year: 2000, duration: 270 },
  { title: "കണ്മണിയെ താരാട്ടാം", queries: ["Kanmaniye tharattam Thoovalsparsham", "Kanmaniye tharattam ponnumon"], artist: "K. S. Chithra", film: "Thoovalsparsham", year: 1990, duration: 260 },
  { title: "താളവട്ടത്തിൽ തെയ്യം തുള്ളും", queries: ["Thalavattathil theyyam thullum Thalavattam", "Thalavattathil theyyam thullum"], artist: "M. G. Sreekumar", film: "Thalavattam", year: 1986, duration: 265 },
  { title: "പ്രണയവസന്തം പൂത്തു വിരിഞ്ഞു", queries: ["Pranayavasantham poothu Kalyanaraman", "Pranayavasantham poothu"], artist: "K. J. Yesudas", film: "Kalyanaraman", year: 2002, duration: 280 },
  { title: "വാർത്തിങ്കളേ വാ", queries: ["Vaarthinkale vaa Chithram", "Vaarthinkale vaa vinnil"], artist: "K. S. Chithra", film: "Chithram", year: 1988, duration: 255 },
  { title: "അമ്പിളീ മാമനെ പുൽകാൻ", queries: ["Ambeelee maamane Thoovalsparsham", "Ambeelee maamane pulkaan"], artist: "K. J. Yesudas", film: "Thoovalsparsham", year: 1990, duration: 270 },
  { title: "രാപ്പാടി പക്ഷി മൂളും", queries: ["Rappadi pakshi moolum Akashadoothu", "Rappadi pakshi moolum"], artist: "K. S. Chithra", film: "Akashadoothu", year: 1993, duration: 265 },
  { title: "ചഞ്ചല മിഴിയിൽ നിന്റെ", queries: ["Chanchala mizhiyil Aaranyakam", "Chanchala mizhiyil ninte"], artist: "K. J. Yesudas", film: "Aaranyakam", year: 1988, duration: 280 },
  { title: "ഓർമ്മകളിൽ നീയെരിയും", queries: ["Ormmakalil neeyeriyum Pranayam", "Ormmakalil neeyeriyum theeyalayo"], artist: "K. J. Yesudas", film: "Pranayam", year: 2011, duration: 275 },
  { title: "നീല രാവുലഞ്ഞൂ", queries: ["Neela ravulanju Kadathanadan Ambadi", "Neela ravulanju poonkatte"], artist: "K. J. Yesudas", film: "Kadathanadan Ambadi", year: 1990, duration: 270 },
  { title: "മാനേ മധുരക്കരിമ്പേ", queries: ["Mane madhurakkarimbe Thoovalsparsham", "Mane madhurakkarimbe"], artist: "K. J. Yesudas", film: "Thoovalsparsham", year: 1990, duration: 265 },
  { title: "പൂനിലാവു മാഞ്ഞുപോയ്", queries: ["Poonilavu maanjupoy Ente Sooryaputhrikku", "Poonilavu maanjupoy"], artist: "K. J. Yesudas", film: "Ente Sooryaputhrikku", year: 1991, duration: 275 },
  { title: "രാപ്പാടി തൻ പാട്ടിൽ", queries: ["Rappadi than paattil Daisy", "Rappadi than paattil"], artist: "K. S. Chithra", film: "Daisy", year: 1988, duration: 260 },
  { title: "സ്വർണ്ണപ്പക്ഷി പാടുമോ", queries: ["Swarnnapakshi paadumo Thooval kottaram", "Swarnnapakshi paadumo"], artist: "K. J. Yesudas", film: "Thooval kottaram", year: 1996, duration: 280 },
  { title: "പാതിരാ നിലാവിൽ", queries: ["Pathira nilavil Kauravar", "Pathira nilavil thoni"], artist: "K. J. Yesudas", film: "Kauravar", year: 1992, duration: 285 },
  { title: "മാറ്റേറും കാഞ്ചനപ്പൂങ്കാറ്റേ", queries: ["Matterum kanchanappoonkatte Vatsalyam", "Matterum kanchanappoonkatte"], artist: "K. S. Chithra", film: "Vatsalyam", year: 1993, duration: 270 },
  { title: "കണ്ണീർപ്പൂവിലൊരു തുള്ളി", queries: ["Kanneerppooviloru thulli Arayannangalude Veedu", "Kanneerppooviloru thulli"], artist: "K. J. Yesudas", film: "Arayannangalude Veedu", year: 2000, duration: 280 },
  { title: "നീലക്കുയിലേ പാടൂ", queries: ["Neelakkuyile padoo Adhipan", "Neelakkuyile padoo nee"], artist: "K. S. Chithra", film: "Adhipan", year: 1989, duration: 265 },
  { title: "തേൻകിളിയേ മാന്തളിരിൽ", queries: ["Thenkiliye manthaliril Thilakkam", "Thenkiliye manthaliril"], artist: "M. G. Sreekumar", film: "Thilakkam", year: 2003, duration: 275 },
  { title: "മധുരമീ നിലാവിൽ", queries: ["Madhuramee nilavil Nokkethadhoorathu", "Madhuramee nilavil thalirukal"], artist: "K. J. Yesudas", film: "Nokkethadhoorathu", year: 1984, duration: 270 }
];

async function fillPlaylist(playlist, pool, targetCount, prefix) {
  console.log(`\nProcessing ${playlist.name} (Current: ${playlist.tracks.length}, Target: ${targetCount})...`);

  for (const item of pool) {
    if (playlist.tracks.length >= targetCount) break;

    const titleKey = `${item.title.trim().toLowerCase()}--${item.film.trim().toLowerCase()}`;
    if (seenTitles.has(titleKey)) continue;

    const verified = await searchEngine(item.queries);
    if (!verified) {
      console.log(`  ✗ [NOT FOUND] ${item.title} (${item.film})`);
      continue;
    }

    seenVideoIds.add(verified.videoId);
    seenTitles.add(titleKey);

    const newTrack = {
      id: `${prefix}-${playlist.tracks.length + 1}`,
      title: item.title,
      artist: item.artist,
      film: item.film,
      year: item.year,
      duration: item.duration,
      videoId: verified.videoId
    };

    playlist.tracks.push(newTrack);
    console.log(`  ✓ [${newTrack.id}] ${newTrack.title} (${newTrack.film}) -> ${verified.videoId} ("${verified.title.slice(0, 38)}...")`);
    await new Promise(r => setTimeout(r, 120));
  }

  console.log(`Result: ${playlist.name} now has ${playlist.tracks.length} tracks.`);
}

async function run() {
  await fillPlaylist(gm, gmPool, 100, 'gm');
  await fillPlaylist(mm, mmPool, 100, 'mm');
  await fillPlaylist(nr, nrPool, 100, 'nr');

  console.log("\n================================================");
  console.log(`FINAL COUNTS: GM=${gm.tracks.length}, MM=${mm.tracks.length}, NR=${nr.tracks.length}, TOTAL=${gm.tracks.length + mm.tracks.length + nr.tracks.length}`);
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
  console.log("Successfully wrote lib/tracks.ts!");
}

run();
