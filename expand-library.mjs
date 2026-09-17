import fs from 'fs';

// Load existing lib/tracks.ts
const content = fs.readFileSync('./lib/tracks.ts', 'utf8');
const startIndex = content.indexOf('export const playlists: Playlist[] = [');
const arrayContent = content.slice(startIndex + 'export const playlists: Playlist[] ='.length).trim();
const playlists = new Function(`return ${arrayContent.replace(/;$/, '')}`)();

const gm = playlists.find(p => p.id === 'golden-memories');
const mm = playlists.find(p => p.id === 'monsoon-memories');
const nr = playlists.find(p => p.id === 'night-radio');

console.log(`Initial: GM=${gm.tracks.length}, MM=${mm.tracks.length}, NR=${nr.tracks.length}`);

const seenVideoIds = new Set();
const seenTitles = new Set();

playlists.forEach(p => {
  p.tracks.forEach(t => {
    seenVideoIds.add(t.videoId);
    seenTitles.add(`${t.title.trim().toLowerCase()}--${t.film.trim().toLowerCase()}`);
  });
});

async function searchAndVerify(query) {
  try {
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' malayalam song')}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });
    if (!res.ok) return null;
    const html = await res.text();
    const matches = [...html.matchAll(/\/watch\?v=([a-zA-Z0-9_-]{11})/g)].map(m => m[1]);
    const unique = [...new Set(matches)];

    for (const vid of unique.slice(0, 10)) {
      if (seenVideoIds.has(vid)) continue;
      
      const oembedRes = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${vid}&format=json`);
      if (oembedRes.ok) {
        const data = await oembedRes.json();
        const lower = data.title.toLowerCase();
        // Exclude unwanted types
        if (
          lower.includes('karaoke') ||
          lower.includes('cover') ||
          lower.includes('remix') ||
          lower.includes('slowed') ||
          lower.includes('reverb') ||
          lower.includes('status') ||
          lower.includes('shorts') ||
          lower.includes('bgm only') ||
          lower.includes('reaction') ||
          lower.includes('interview') ||
          lower.includes('trailer') ||
          lower.includes('teaser')
        ) {
          continue;
        }
        return { videoId: vid, ytTitle: data.title, author: data.author_name };
      }
    }
    return null;
  } catch (err) {
    console.error("Search error:", err.message);
    return null;
  }
}

// Candidates for Golden Memories (Target: 100)
const gmCandidates = [
  { title: "സൂര്യകിരീടം വീണുറങ്ങി", search: "Suryakireedam veenurangi Devaasuram", artist: "M. G. Sreekumar", film: "Devaasuram", year: 1993, duration: 275 },
  { title: "ഗോപികേ നിൻ വിരൽ തുമ്പിലൊരു", search: "Gopike nin viral thumbiloru Kattathe Kilikkoodu", artist: "K. J. Yesudas & S. Janaki", film: "Kattathe Kilikkoodu", year: 1983, duration: 250 },
  { title: "ആരെയും ഭാവഗായകനാക്കും", search: "Aareyum bhavagayakanakkum Nakhakshathangal", artist: "K. J. Yesudas", film: "Nakhakshathangal", year: 1986, duration: 240 },
  { title: "കണ്ണീർപ്പൂവിന്റെ കവിളിൽ തലോടി", search: "Kannirppoovinte kavilil thalodi Kireedam", artist: "M. G. Sreekumar", film: "Kireedam", year: 1989, duration: 260 },
  { title: "പൂവേ ഒരു മഴമുത്തം", search: "Poove oru mazhamutham Kakkothikkavile Appooppan Thaadikal", artist: "K. S. Chithra", film: "Kakkothikkavile Appooppan Thaadikal", year: 1988, duration: 255 },
  { title: "അല്ലിമലർക്കാവിൽ പൂരം കാണാൻ", search: "Allimalarkkavil pooram kanan Midhunam", artist: "M. G. Sreekumar", film: "Midhunam", year: 1993, duration: 280 },
  { title: "പവിഴം പോൽ പവിഴാധരം പോൽ", search: "Pavizham pol Namukku Parkkan Munthiri Thoppukal", artist: "K. J. Yesudas", film: "Namukku Parkkan Munthiri Thoppukal", year: 1986, duration: 260 },
  { title: "ആകാശമാകെ കണിമലർ താലം", search: "Aakaashamake kanimalar thalam Namukku Parkkan Munthiri Thoppukal", artist: "K. J. Yesudas", film: "Namukku Parkkan Munthiri Thoppukal", year: 1986, duration: 270 },
  { title: "ഒരു പുഷ്പം മാത്രമെൻ", search: "Oru pushpam mathramen Pareeksha", artist: "K. J. Yesudas", film: "Pareeksha", year: 1967, duration: 245 },
  { title: "സന്ധ്യേ കണ്ണീരിതെന്തേ സന്ധ്യേ", search: "Sandhye kanneerithenthe sandhye Madanolsavam", artist: "K. J. Yesudas", film: "Madanolsavam", year: 1978, duration: 285 },
  { title: "മാനസ മൈനേ വരൂ", search: "Manasa maine varoo Chemmeen", artist: "Manna Dey", film: "Chemmeen", year: 1965, duration: 280 },
  { title: "കടലിനക്കരെ പോണോരേ", search: "Kadalinakkare ponore Chemmeen", artist: "K. J. Yesudas", film: "Chemmeen", year: 1965, duration: 250 },
  { title: "പൊൻവെയിൽ മണിക്കച്ചയഴിഞ്ഞു വീണു", search: "Ponveyil manikkacha Nrithasaala", artist: "K. J. Yesudas", film: "Nrithasaala", year: 1972, duration: 235 },
  { title: "ആലിപ്പഴം പെറുക്കാൻ", search: "Aalippazham perukkan My Dear Kuttichathan", artist: "S. Janaki", film: "My Dear Kuttichathan", year: 1984, duration: 240 },
  { title: "ശ്രീലവസന്തം", search: "Sreelavasantham Padheyam", artist: "K. J. Yesudas", film: "Padheyam", year: 1993, duration: 265 },
  { title: "പ്രമദവനം വീണ്ടും", search: "Pramadavanam veendum His Highness Abdullah", artist: "K. J. Yesudas", film: "His Highness Abdullah", year: 1990, duration: 320 },
  { title: "ഗോപാംഗനേ", search: "Gopangane aathmavu neeyalle Bharatham", artist: "K. J. Yesudas", film: "Bharatham", year: 1991, duration: 290 },
  { title: "രാമകഥാഗാനലോയം", search: "Ramakatha gaanalayam Bharatham", artist: "K. J. Yesudas", film: "Bharatham", year: 1991, duration: 310 },
  { title: "മഞ്ഞൾ പ്രസാദവും നെറ്റിയിൽ ചാർത്തി", search: "Manjal prasadavum Nakhakshathangal", artist: "K. S. Chithra", film: "Nakhakshathangal", year: 1986, duration: 240 },
  { title: "നീർപ്പളുങ്കുകൾ ചിതറി വീഴുമീ", search: "Neerpalungukal chithari Yathra", artist: "K. J. Yesudas", film: "Yathra", year: 1985, duration: 245 },
  { title: "കേവല മർത്ത്യഭാഷ കേൾക്കാത്ത", search: "Kevala marthya bhasha Naran", artist: "K. J. Yesudas", film: "Naran", year: 2005, duration: 270 },
  { title: "പുലർകാല സുന്ദര സ്വപ്നത്തിൽ", search: "Pularkala sundara swapnathil Oru Maymasa Pulariyil", artist: "K. J. Yesudas", film: "Oru Maymasa Pulariyil", year: 1987, duration: 255 },
  { title: "എന്തിനീ മിഴിനീർ", search: "Enthinee mizhineer ormakalil Gandharvam", artist: "K. J. Yesudas", film: "Gandharvam", year: 1993, duration: 270 },
  { title: "ചന്ദനമണി വാതിൽ പാതി ചാരി", search: "Chandanamani vaathil paathi chaari Marikkunnilla Njan", artist: "G. Venugopal", film: "Marikkunnilla Njan", year: 1988, duration: 265 },
  { title: "സ്വർണ്ണമുകിലേ", search: "Swarnnamukile Ithiri Poove Chuvannapoove", artist: "K. S. Chithra", film: "Ithiri Poove Chuvannapoove", year: 1984, duration: 250 },
  { title: "താനേ പൂവിട്ട മോഹം", search: "Thane poovitta moham Sasneham", artist: "K. J. Yesudas", film: "Sasneham", year: 1990, duration: 260 }
];

// Candidates for Monsoon Memories (Target: 100)
const mmCandidates = [
  { title: "മഴനീർത്തുള്ളികൾ", search: "Mazhaneerthullikal Vettam", artist: "M. G. Sreekumar & Sujatha Mohan", film: "Vettam", year: 2004, duration: 290 },
  { title: "വാർമുകിലേ വാനിൽ നീ", search: "Vaarmukile Mazha", artist: "K. S. Chithra", film: "Mazha", year: 2000, duration: 270 },
  { title: "പെയ്യാതെ പോയ മഴയോ", search: "Peyyathe poya mazhayo Mazha", artist: "K. J. Yesudas", film: "Mazha", year: 2000, duration: 280 },
  { title: "ഒരു രാത്രി കൂടി വിടവാങ്ങവേ", search: "Oru rathri koodi vidavangave Summer in Bethlehem", artist: "K. J. Yesudas", film: "Summer in Bethlehem", year: 1998, duration: 300 },
  { title: "മാരിക്കൂടinnu മാനം", search: "Marikkoodinnu manam Pingami", artist: "K. J. Yesudas", film: "Pingami", year: 1994, duration: 270 },
  { title: "മഞ്ഞുകാലം നോറ്റ മരം", search: "Manjukalam notta maram Engane Nee Marakkum", artist: "K. J. Yesudas", film: "Engane Nee Marakkum", year: 1983, duration: 260 },
  { title: "ഇന്നലെ എൻ നെഞ്ചിലെ", search: "Innale en nenchile Balettan", artist: "K. J. Yesudas", film: "Balettan", year: 2003, duration: 275 },
  { title: "എന്തു പറഞ്ഞാലും നീ എന്റേതല്ലേ", search: "Enthu paranjalum nee entethalle Kanmadam", artist: "K. J. Yesudas", film: "Kanmadam", year: 1998, duration: 280 },
  { title: "മഞ്ഞക്കിളിയുടെ മൂളിപ്പാട്ടുണ്ടേ", search: "Manjakkiliyude moolippattunde Kanmadam", artist: "K. J. Yesudas", film: "Kanmadam", year: 1998, duration: 270 },
  { title: "പൂന്തേനരുവി പൊൻമുടിപ്പുഴയുടെ", search: "Poonthenaruvi Oru Minnaminunginte Nurunguvettam", artist: "K. J. Yesudas", film: "Oru Minnaminunginte Nurunguvettam", year: 1987, duration: 280 },
  { title: "മെല്ലെ മെല്ലെ മുഖപടം", search: "Melle melle mukhapadam Oru Minnaminunginte Nurunguvettam", artist: "K. J. Yesudas", film: "Oru Minnaminunginte Nurunguvettam", year: 1987, duration: 260 },
  { title: "കാറ്റോടു കാതോരം", search: "Kaathodu Kaathoram title song", artist: "K. J. Yesudas & Lathika", film: "Kaathodu Kaathoram", year: 1985, duration: 250 },
  { title: "ദേവദൂതർ പാടി", search: "Devadoothar paadi Kaathodu Kaathoram", artist: "K. J. Yesudas", film: "Kaathodu Kaathoram", year: 1985, duration: 290 },
  { title: "നിലാവിന്റെ നീലഭസ്മക്കുറിയിട്ടവളേ", search: "Nilavinte neelabhasma kuriyittavale Agnidevan", artist: "M. G. Sreekumar", film: "Agnidevan", year: 1995, duration: 295 },
  { title: "ഹരിമുരളീരവം", search: "Harimuraleeravam Aaraam Thampuran", artist: "K. J. Yesudas", film: "Aaraam Thampuran", year: 1997, duration: 340 },
  { title: "പാതിരാപ്പാല പൂത്തു", search: "Pathirappala poothu Manivathoorile Aayiram Sivarathrikal", artist: "K. J. Yesudas", film: "Manivathoorile Aayiram Sivarathrikal", year: 1987, duration: 270 },
  { title: "അരികിൽ നീയുണ്ടായിരുന്നെങ്കിൽ", search: "Arikil neeyundayirunnengil Nee Ethra Dhanya", artist: "K. J. Yesudas", film: "Nee Ethra Dhanya", year: 1987, duration: 265 },
  { title: "ദേവസംഗീതം നീയല്ലേ", search: "Devasangeetham neeyalle Guru", artist: "K. J. Yesudas & Radhika Thilak", film: "Guru", year: 1997, duration: 280 },
  { title: "മറന്നിട്ടുമെന്തിനോ മനസ്സിൻ മണിയറയിൽ", search: "Marannittumenthino Randam Bhavam", artist: "P. Jayachandran & Sujatha Mohan", film: "Randam Bhavam", year: 2001, duration: 285 },
  { title: "കിളിച്ചുണ്ടൻ മാമ്പഴം ചുണ്ടിൽ", search: "Kilichundan mambazham chundil Kilichundan Mampazham", artist: "M. G. Sreekumar & Sujatha Mohan", film: "Kilichundan Mampazham", year: 2003, duration: 290 },
  { title: "കസ്തൂരിമാൻ കുറുമ്പേ", search: "Kasthoori maan kurumbae Kilichundan Mampazham", artist: "M. G. Sreekumar", film: "Kilichundan Mampazham", year: 2003, duration: 280 },
  { title: "ഒന്നാം കിളി പൊന്നാൺകിളി", search: "Onnam kili ponnankili Kilichundan Mampazham", artist: "M. G. Sreekumar & Sujatha Mohan", film: "Kilichundan Mampazham", year: 2003, duration: 295 },
  { title: "പവിഴമഴയേ", search: "Pavizha Mazhaye Athiran", artist: "K. S. Harisankar", film: "Athiran", year: 2019, duration: 250 },
  { title: "നീ മണിമുകിലായ്", search: "Nee manimukilaayi Kakkakuyil", artist: "M. G. Sreekumar & K. S. Chithra", film: "Kakkakuyil", year: 2001, duration: 290 },
  { title: "മേഘരാഗം നേർത്തൊരു", search: "Megharagam nerthoru Kakkakuyil", artist: "K. S. Chithra", film: "Kakkakuyil", year: 2001, duration: 275 },
  { title: "പൊൻപുലരിയിൽ", search: "Ponpulariyil poothalam Unnikale Oru Kadha Parayam", artist: "K. J. Yesudas", film: "Unnikale Oru Kadha Parayam", year: 1987, duration: 260 },
  { title: "ഉണ്ണികളെ ഒരു കഥ പറയാം", search: "Unnikale oru kadha parayam title song", artist: "K. J. Yesudas", film: "Unnikale Oru Kadha Parayam", year: 1987, duration: 270 },
  { title: "ശാന്തമീ രാത്രിയിൽ", search: "Santhamee rathriyil Johnny Walker", artist: "K. J. Yesudas", film: "Johnny Walker", year: 1992, duration: 280 },
  { title: "ചെമ്പൂവേ പൂവേ", search: "Chempoove poove Sneham", artist: "K. J. Yesudas & Sujatha Mohan", film: "Sneham", year: 1998, duration: 290 },
  { title: "കൈതപ്പൂവിൻ കന്നിക്കുറുമ്പിൽ", search: "Kaithappoovin kannikkurumbil Kannezhuthi Pottum Thottu", artist: "K. S. Chithra & Manju Warrier", film: "Kannezhuthi Pottum Thottu", year: 1999, duration: 270 },
  { title: "ഹരിചന്ദന മലരുകളായ്", search: "Harichandana malarukalaayi Kannezhuthi Pottum Thottu", artist: "M. G. Sreekumar", film: "Kannezhuthi Pottum Thottu", year: 1999, duration: 275 },
  { title: "ഓർമ്മകൾ ഓടിക്കളിക്കുവാനെത്തുന്നു", search: "Ormmakal odikkalikkana Mukundetta Sumithra Vilikkunnu", artist: "M. G. Sreekumar", film: "Mukundetta Sumithra Vilikkunnu", year: 1988, duration: 265 },
  { title: "എന്റെ ഉള്ളുടുക്കം കൊട്ടി", search: "Ente ulludukkam kotti Kannezhuthi Pottum Thottu", artist: "K. J. Yesudas", film: "Kannezhuthi Pottum Thottu", year: 1999, duration: 285 },
  { title: "എത്ര പൂക്കാലം", search: "Ethra pookkalam Rakkuyilin Ragasadassil", artist: "M. G. Sreekumar", film: "Rakkuyilin Ragasadassil", year: 1986, duration: 260 },
  { title: "പൂങ്കാറ്റിനോടും കിളികളോടും", search: "Poonkattinodum kilikalodum Poomukhappadiyil Ninneyum Kaathu", artist: "K. J. Yesudas", film: "Poomukhappadiyil Ninneyum Kaathu", year: 1986, duration: 270 },
  { title: "പെണ്ണാളേ പെണ്ണാളേ", search: "Pennale pennale kariminnale Chemmeen", artist: "P. Leela & K. J. Yesudas", film: "Chemmeen", year: 1965, duration: 240 },
  { title: "പുഴയോരത്തിൽ പൂന്തോണിയിൽ", search: "Puzhayorathil poonthoniyil Adaminte Vaariyellu", artist: "S. Janaki", film: "Adaminte Vaariyellu", year: 1983, duration: 260 },
  { title: "നീലക്കുറിഞ്ഞികൾ പൂക്കുന്ന വീഥിയിൽ", search: "Neelakkurinjikal pookkunna Neelakkurinji Poothappol", artist: "K. J. Yesudas & S. Janaki", film: "Neelakkurinji Poothappol", year: 1987, duration: 275 },
  { title: "ഇന്നുമെന്റെ കണ്ണുനീരിൽ", search: "Innumente kannuneeril Yuvajanotsavam", artist: "K. J. Yesudas", film: "Yuvajanotsavam", year: 1986, duration: 260 },
  { title: "പാതിരാമഴയേതോ", search: "Pathiramazhayetho hamsageetham Ulladakkam", artist: "K. J. Yesudas & Sujatha Mohan", film: "Ulladakkam", year: 1991, duration: 285 },
  { title: "മായമഞ്ചലിൽ", search: "Mayamanchalil ithu vazhiye Ottayal Pattalam", artist: "G. Venugopal & Radhika Thilak", film: "Ottayal Pattalam", year: 1991, duration: 280 },
  { title: "തുള്ളിമഞ്ചാടികൾ", search: "Thullimanjadikal Kaazhcha", artist: "Kalabhavan Mani", film: "Kaazhcha", year: 2004, duration: 265 },
  { title: "കുണുങ്ങി കുണുങ്ങി നടക്കുന്ന കാറ്റേ", search: "Kunungi kunungi nadakkunna kaatte Varnapakittu", artist: "M. G. Sreekumar & K. S. Chithra", film: "Varnapakittu", year: 1997, duration: 285 },
  { title: "ആകാശദൂതു പോയോ", search: "Aakashadoothu poyo Akashadoothu", artist: "K. S. Chithra", film: "Akashadoothu", year: 1993, duration: 270 },
  { title: "ആലിപ്പഴം ചുരത്തും", search: "Aalippazham churathum Kuttisrank", artist: "Rajalakshmy", film: "Kuttisrank", year: 2010, duration: 240 },
  { title: "എൻ പൂവേ പൊൻപൂവേ", search: "En poove ponpoove Kattathe Kilikkoodu", artist: "S. Janaki", film: "Kattathe Kilikkoodu", year: 1983, duration: 250 },
  { title: "മന്ദാരച്ചെപ്പുണ്ടോ", search: "Mandharacheppundo Dasaratham", artist: "M. G. Sreekumar & K. S. Chithra", film: "Dasaratham", year: 1989, duration: 275 },
  { title: "പൂത്താലം വലംകയ്യിൽ", search: "Poothalam valamkayyil Thilakkam", artist: "P. Jayachandran", film: "Thilakkam", year: 2003, duration: 280 },
  { title: "നീ എൻ പാട്ടായ് മാറുമോ", search: "Nee en paattayi maarumo", artist: "K. J. Yesudas", film: "Malaramban", year: 1986, duration: 260 },
  { title: "അമ്പിളിക്കല തിളങ്ങും", search: "Ambilikkala thilangum", artist: "K. J. Yesudas", film: "Kaakkathamburaatti", year: 1970, duration: 245 },
  { title: "മഴവില്ലിൻ തീരങ്ങൾ", search: "Mazhavillin theerangal Oru Indian Pranayakadha", artist: "Najim Arshad", film: "Oru Indian Pranayakadha", year: 2013, duration: 250 },
  { title: "തിരനുരയും ചുരുൾമുടിയിൽ", search: "Thiranurayum churulmudiyil Ananthabhadram", artist: "K. J. Yesudas", film: "Ananthabhadram", year: 2005, duration: 280 },
  { title: "പിന്നെയുമൊരു മഴക്കാലം", search: "Pinneyumoru mazhakkalam", artist: "P. Jayachandran", film: "Mazhakkalam", year: 2004, duration: 260 },
  { title: "കാർമുകിൽ വർണ്ണന്റെ ചുണ്ടിൽ", search: "Karmukil varnnante Nandanam", artist: "K. S. Chithra", film: "Nandanam", year: 2002, duration: 290 },
  { title: "മൗനസരോവരമാകെ", search: "Mounasarovaramaake Savidham", artist: "K. J. Yesudas", film: "Savidham", year: 1992, duration: 275 },
  { title: "വരവായ് തോഴി വാ", search: "Varavayi thozhi vaa Chithram", artist: "K. S. Chithra", film: "Chithram", year: 1988, duration: 250 },
  { title: "ആയിരം കണ്ണുമായ് കാത്തിരുന്നു", search: "Aayiram kannumayi Nokkethadhoorathu Kannum Nattu", artist: "K. J. Yesudas", film: "Nokkethadhoorathu Kannum Nattu", year: 1984, duration: 270 },
  { title: "കിളിയേ കിളിയേ", search: "Kiliye kiliye Aakashadoothu", artist: "K. S. Chithra", film: "Akashadoothu", year: 1993, duration: 260 },
  { title: "ഒരു കിളി ഇരുകിളി", search: "Oru kili irukili Vasanthiyum Lakshmiyum Pinne Njanum", artist: "K. J. Yesudas", film: "Vasanthiyum Lakshmiyum Pinne Njanum", year: 1999, duration: 280 },
  { title: "ആലാപനം തേടും തായ്മനം", search: "Aalaapanam thedum Sangeetham", artist: "K. J. Yesudas", film: "Kaakkothikkavile Appooppan Thaadikal", year: 1988, duration: 265 },
  { title: "ചഞ്ചലദൃതപദതാളം", search: "Chanchaladhrithapada thalam Rajashilpi", artist: "K. S. Chithra", film: "Rajashilpi", year: 1992, duration: 270 },
  { title: "കാറ്റിൽ വരും ഗീതം", search: "Kaattil varum geetham", artist: "K. J. Yesudas", film: "Kakkakuyil", year: 2001, duration: 280 },
  { title: "മഴ പെയ്തു മാനം", search: "Mazha peythu manam The Car", artist: "M. G. Sreekumar", film: "The Car", year: 1997, duration: 260 },
  { title: "നീലരാവിൽ ഇന്നു നിന്റെ", search: "Neelaravil innu ninte Kudumbakodathi", artist: "K. J. Yesudas & Sujatha Mohan", film: "Kudumbakodathi", year: 1996, duration: 275 },
  { title: "തൂമഞ്ഞു വീഴുമീ രാവിൽ", search: "Thoomanju veezhumee raavil", artist: "K. J. Yesudas", film: "Nokkethadhoorathu Kannum Nattu", year: 1984, duration: 260 },
  { title: "തളിർവലയോ താമരനൂലോ", search: "Thalirvalayo thamaranoolo Cheppu", artist: "K. S. Chithra", film: "Cheppu", year: 1987, duration: 255 },
  { title: "പൊൻമുളന്തണ്ടു മൂളും", search: "Ponmulanthandu moolum", artist: "K. J. Yesudas", film: "Vatsalyam", year: 1993, duration: 265 },
  { title: "ശ്യാമമേഘമേ നീ യദുകുല", search: "Shyaamameghame nee yadukula Adhipan", artist: "K. S. Chithra", film: "Adhipan", year: 1989, duration: 270 },
  { title: "ശ്രീരാഗമോ വീണ്ടും", search: "Sreeragamo veendum Pavithram", artist: "K. J. Yesudas", film: "Pavithram", year: 1994, duration: 320 },
  { title: "വാൽക്കണ്ണെഴുതി വനപുഷ്പം ചൂടി", search: "Valkkannazhuthi vanapushpam Paithrukam", artist: "K. J. Yesudas", film: "Paithrukam", year: 1993, duration: 290 },
  { title: "പൂങ്കാറ്റിൻ താരാട്ടും", search: "Poonkattin tharattum Malootty", artist: "K. S. Chithra", film: "Malootty", year: 1992, duration: 260 },
  { title: "മഞ്ഞുകാലം പടിയിറങ്ങി", search: "Manjukalam padiyirangi Mazha", artist: "K. S. Chithra", film: "Mazha", year: 2000, duration: 250 },
  { title: "ആകാശപ്പൂമഴ പെയ്യുന്നു", search: "Aakashappoomazha peyyunnu", artist: "M. G. Sreekumar", film: "Kalyanaraman", year: 2002, duration: 280 },
  { title: "മഴനിലാ തെന്നലായ്", search: "Mazhanila thennalayi Vikramadithyan", artist: "Najim Arshad", film: "Vikramadithyan", year: 2014, duration: 260 },
  { title: "ഓർമ്മകളിൽ ഒരു മഴത്തുള്ളി", search: "Ormmakalil oru mazhathulli", artist: "G. Venugopal", film: "Sasneham", year: 1990, duration: 270 },
  { title: "അരുണകിരണ ദീപം", search: "Arunakirana deepam", artist: "K. J. Yesudas", film: "Guru", year: 1997, duration: 285 },
  { title: "പൂവേ പൂവേ പാലപ്പൂവേ", search: "Poove poove palappoove Devadoothan", artist: "K. S. Chithra & P. Jayachandran", film: "Devadoothan", year: 2000, duration: 295 },
  { title: "കണ്ണാടി ആദ്യമായെൻ", search: "Kannadi aadyamayen Paava", artist: "K. J. Yesudas", film: "Paava", year: 2016, duration: 260 }
];

// Candidates for Night Radio (Target: 100)
const nrCandidates = [
  { title: "ആമ്പല്ലൂർ അമ്പലത്തിൽ", search: "Aamballoor ambalathil Midhunam", artist: "M. G. Sreekumar", film: "Midhunam", year: 1993, duration: 275 },
  { title: "ഓ പ്രിയേ പ്രിയേ", search: "O priye priye Aniyathipraavu", artist: "M. G. Sreekumar & K. S. Chithra", film: "Aniyathipraavu", year: 1997, duration: 290 },
  { title: "എന്നു വരും നീ", search: "Ennu varum nee Kannaki", artist: "K. J. Yesudas", film: "Kannaki", year: 2001, duration: 285 },
  { title: "അഴകേ നിൻ മിഴിനീർമണിയായ്", search: "Azhake nin mizhineermaniyayi Ammakkilikkoodu", artist: "K. J. Yesudas", film: "Ammakkilikkoodu", year: 2003, duration: 290 },
  { title: "നീ ഹിമമഴയായ്", search: "Nee Himamazhayayi Edakkad Battalion 06", artist: "K. S. Harisankar & Nithya Mammen", film: "Edakkad Battalion 06", year: 2019, duration: 245 },
  { title: "ആരോ വിരൽ മീട്ടി", search: "Aaro viral meetti Pranayavarnangal", artist: "K. J. Yesudas", film: "Pranayavarnangal", year: 1998, duration: 290 },
  { title: "വരമഞ്ഞളാടിയ രാവിന്റെ മാറിൽ", search: "Varamanjaladiya ravinte maril Pranayavarnangal", artist: "Sujatha Mohan", film: "Pranayavarnangal", year: 1998, duration: 280 },
  { title: "ചന്ദനത്തിൽ കടഞ്ഞെടുത്തൊരു", search: "Chandanathil kadanjeduthoru Sasneham Sumithra", artist: "K. J. Yesudas", film: "Sasneham Sumithra", year: 2004, duration: 285 },
  { title: "അന്തിക്കടപ്പുറത്തു", search: "Anthikkadappurathu Chamayam", artist: "M. G. Sreekumar", film: "Chamayam", year: 1993, duration: 290 },
  { title: "ചാഞ്ചാടിയാടി ഉറങ്ങൂ നീ", search: "Chanchadiyadi urangoo nee Makante Achan", artist: "K. J. Yesudas", film: "Makante Achan", year: 2009, duration: 285 },
  { title: "പിന്നെയും പിന്നെയും ആരോ കിനാവിന്റെ", search: "Pinneyum pinneyum aaro Krishnagudiyil Oru Pranayakalathu", artist: "K. J. Yesudas & K. S. Chithra", film: "Krishnagudiyil Oru Pranayakalathu", year: 1997, duration: 310 },
  { title: "ഒരു ചെമ്പനീർ പൂവിറുത്തു", search: "Oru chempaneer pooviruthu Sthithi", artist: "Unni Menon", film: "Sthithi", year: 2003, duration: 300 },
  { title: "മധുരം ജീവാമൃതബിന്ദു", search: "Madhuram jeevaamrithabindu Chenkol", artist: "K. J. Yesudas", film: "Chenkol", year: 1993, duration: 290 },
  { title: "രാവിൻ നിലാക്കായലിൽ", search: "Raavin nilakkayalil Mazhavillu", artist: "K. J. Yesudas", film: "Mazhavillu", year: 1999, duration: 280 },
  { title: "ചന്ദനലേപ സുഗന്ധം", search: "Chandanalepa sugandham Oru Vadakkan Veeragatha", artist: "K. J. Yesudas", film: "Oru Vadakkan Veeragatha", year: 1989, duration: 300 },
  { title: "കളരിവിളക്കു തെളിഞ്ഞതാണോ", search: "Kalarivilakku thelinjathano Oru Vadakkan Veeragatha", artist: "K. S. Chithra", film: "Oru Vadakkan Veeragatha", year: 1989, duration: 280 },
  { title: "പൂങ്കാറ്റേ പോയി ചൊല്ലാമോ", search: "Poonkaatte poyi chollamo Friends", artist: "K. J. Yesudas", film: "Friends", year: 1999, duration: 290 },
  { title: "തങ്കത്തോണി ഏറി വാ", search: "Thankathoni yeri vaa Mazhavillu", artist: "K. J. Yesudas", film: "Mazhavillu", year: 1999, duration: 280 },
  { title: "താമരപ്പൂവിൽ വാഴും", search: "Thamarappoovil vazhum Chandranudikkunna Dikkil", artist: "K. J. Yesudas & Sujatha Mohan", film: "Chandranudikkunna Dikkil", year: 1999, duration: 295 },
  { title: "അമ്പാടിപ്പയ്യുകൾ മേയും", search: "Ambadippayyukal meyum Chandranudikkunna Dikkil", artist: "K. J. Yesudas", film: "Chandranudikkunna Dikkil", year: 1999, duration: 285 },
  { title: "ഒരുവട്ടം കൂടിയെൻ", search: "Oru vattam koodiyen Chillu", artist: "K. J. Yesudas", film: "Chillu", year: 1982, duration: 260 },
  { title: "പവിഴക്കല്ലിൽ കൊത്തിയിറക്കിയ", search: "Pavizhakkallil kothiyirakkiya", artist: "K. J. Yesudas", film: "Pranayam", year: 2011, duration: 265 },
  { title: "നീയെൻ കിനാവോ", search: "Neeyen kinavo Hello", artist: "Afsal & Jyotsna", film: "Hello", year: 2007, duration: 270 },
  { title: "മനസ്സിൻ മടിയscreen", search: "Manassin madiyile Manasinakkare", artist: "K. J. Yesudas & Sujatha Mohan", film: "Manasinakkare", year: 2003, duration: 280 },
  { title: "ചെണ്ടുമല്ലിക പൂത്തു വിരിഞ്ഞു", search: "Chendumallika poothu Manasinakkare", artist: "M. G. Sreekumar", film: "Manasinakkare", year: 2003, duration: 270 },
  { title: "എന്നും നിന്നെ പൂജിക്കാം", search: "Ennum ninne poojikkam Aniyathipraavu", artist: "K. J. Yesudas & Sujatha Mohan", film: "Aniyathipraavu", year: 1997, duration: 285 },
  { title: "ആകാശത്താമര പോലെ", search: "Aakashathamara pole", artist: "K. J. Yesudas", film: "Kannezhuthi Pottum Thottu", year: 1999, duration: 270 },
  { title: "താലോലം പൂമ്പൈതലേ", search: "Thalolam poombaythale", artist: "K. S. Chithra", film: "Kudumbapuranam", year: 1988, duration: 260 },
  { title: "കരിമുകിലിൻ ചിറകിലേറി", search: "Karimukilin chirakileri", artist: "K. J. Yesudas", film: "Aparahnam", year: 1991, duration: 275 },
  { title: "കണ്ണിൻ മണியே", search: "Kannin maniye", artist: "K. J. Yesudas", film: "Thanmathra", year: 2005, duration: 280 },
  { title: "ഇതളഴിഞ്ഞ വസന്തം", search: "Ithalazhinja vasantham", artist: "K. J. Yesudas", film: "Oru Minnaminunginte Nurunguvettam", year: 1987, duration: 270 },
  { title: "അനുരാഗമേ നിൻ രൂപം", search: "Anuragame nin roopam", artist: "K. J. Yesudas", film: "Kalyanaraman", year: 2002, duration: 280 },
  { title: "ചെല്ലച്ചെറു വീട്", search: "Chellacheru veedu", artist: "M. G. Sreekumar", film: "Kalyanaraman", year: 2002, duration: 265 },
  { title: "കനകമുന്തിരികൾ മണികൾ", search: "Kanakamunthirikal Punaradhivasam", artist: "P. Jayachandran", film: "Punaradhivasam", year: 2000, duration: 280 },
  { title: "മേഘം പൂത്തു തുടങ്ങി", search: "Megham poothu thudangi Thoovanathumbikal", artist: "K. J. Yesudas", film: "Thoovanathumbikal", year: 1987, duration: 285 },
  { title: "ഒന്നാം രാഗം പാടി", search: "Onnam ragam padi Thoovanathumbikal", artist: "K. J. Yesudas & K. S. Chithra", film: "Thoovanathumbikal", year: 1987, duration: 290 },
  { title: "എന്റെ മാനസപുത്രി", search: "Ente manasaputhri", artist: "K. J. Yesudas", film: "Chalachithram", year: 1990, duration: 270 },
  { title: "രാത്തിങ്കൾ പൂവിരിയും", search: "Raathinkal pooviriyum", artist: "K. J. Yesudas", film: "Nokkethadhoorathu Kannum Nattu", year: 1984, duration: 265 },
  { title: "പാട്ടിന്റെ പാലാഴി", search: "Paattinte paalazhi", artist: "K. S. Chithra", film: "Paattinte Paalazhi", year: 2010, duration: 280 },
  { title: "ആകാശമായ് തീർന്നുവോ", search: "Aakashamayi theernnuvo", artist: "K. J. Yesudas", film: "Pranayam", year: 2011, duration: 275 },
  { title: "മഴയിൽ ഒരു പൂവിതൾ", search: "Mazhayil oru poovithal", artist: "K. S. Chithra", film: "Sneham", year: 1998, duration: 260 },
  { title: "രാക്കിളി തൻ പൊൻമകൾ", search: "Rakkili than ponmakale Perumazhakkalam", artist: "K. S. Chithra", film: "Perumazhakkalam", year: 2004, duration: 295 },
  { title: "മെഹർബാൻ മെഹർബാൻ", search: "Meherban Perumazhakkalam", artist: "M. G. Sreekumar & Sujatha Mohan", film: "Perumazhakkalam", year: 2004, duration: 290 },
  { title: "ആലോലം താലോലം പാടാം", search: "Aalolam thaalolam paadaam", artist: "K. J. Yesudas", film: "Kaliyattam", year: 1997, duration: 270 },
  { title: "കണ്ണീർ മുത്തുകൾ", search: "Kanneer muthukal", artist: "K. J. Yesudas", film: "Devadoothan", year: 2000, duration: 280 },
  { title: "എൻ മന്ദഹാസം ചന്ദ്രികയായ്", search: "En mandahasam chandrikayayi", artist: "K. J. Yesudas", film: "Udayam Padinjaranu", year: 1985, duration: 260 },
  { title: "തിരകൾ തീരം പുൽകും", search: "Thirakal theeram pulkum", artist: "K. J. Yesudas", film: "Aparan", year: 1988, duration: 270 },
  { title: "പൂമുഖവാതിൽക്കൽ സ്നേഹം", search: "Poomukhavathilkkal sneham Rakkuyilin Ragasadassil", artist: "K. J. Yesudas", film: "Rakkuyilin Ragasadassil", year: 1986, duration: 280 },
  { title: "രാവിൻ കുളിർ തെന്നലിൽ", search: "Raavin kulir thennalil", artist: "K. J. Yesudas", film: "Gramaphone", year: 2002, duration: 265 },
  { title: "മണിമുത്തം തുള്ളി തുളുമ്പും", search: "Manimutham thulli", artist: "K. S. Chithra", film: "Dreams", year: 2000, duration: 270 },
  { title: "ഓർമ്മകളിൽ നീയെന്റെ", search: "Ormmakalil neeyente", artist: "K. J. Yesudas", film: "Vatsalyam", year: 1993, duration: 275 },
  { title: "താരിളം പൂവേ താരാട്ടാം", search: "Tharilam poove tharattam", artist: "K. S. Chithra", film: "Sphadikam", year: 1995, duration: 260 },
  { title: "ഏഴുമല പൂഞ്ചോല", search: "Ezhumala poonchola Sphadikam", artist: "K. S. Chithra & M. G. Sreekumar", film: "Sphadikam", year: 1995, duration: 280 },
  { title: "മനസ്സിൻ മണിമുറ്റത്ത്", search: "Manassin manimuttathu", artist: "K. J. Yesudas", film: "Manichitrathazhu", year: 1993, duration: 270 },
  { title: "അക്കരെയിക്കരെ നിന്നൊരു പൂങ്കാറ്റ്", search: "Akkareyikkare ninnoru poonkaattu", artist: "K. J. Yesudas", film: "Akkare Ninnoru Maran", year: 1985, duration: 260 },
  { title: "ഓത്തുപള്ളിയിലന്നു നമ്മൾ", search: "Othupalliyilannu nammal Thenmavin Kombath", artist: "Sujatha Mohan & Sreekumar", film: "Thenmavin Kombath", year: 1994, duration: 290 },
  { title: "മാനത്തെ ചന്ദനക്കീറ്", search: "Manathe chandanakkeeru Chandralekha", artist: "M. G. Sreekumar & K. S. Chithra", film: "Chandralekha", year: 1997, duration: 295 },
  { title: "ഇന്നലെ മയങ്ങുമ്പോൾ", search: "Innale mayangumbol Anveshichu Kandethiyilla", artist: "K. J. Yesudas", film: "Anveshichu Kandethiyilla", year: 1967, duration: 250 },
  { title: "കണ്ണീരിൽ കുതിർന്നൊരു", search: "Kanneeril kuthirnnoru", artist: "K. J. Yesudas", film: "Azhakiya Ravanan", year: 1996, duration: 270 },
  { title: "രാരീ രാരീരം രാരോ", search: "Raari rareeram raaro Onnu Muthal Poojyam Vare", artist: "G. Venugopal", film: "Onnu Muthal Poojyam Vare", year: 1986, duration: 280 },
  { title: "ഒരു ദള വീര്യമായ്", search: "Oru dala veeryamayi", artist: "K. J. Yesudas", film: "Arayannangalude Veedu", year: 2000, duration: 270 },
  { title: "കണ്മണിയെ താരാട്ടാം", search: "Kanmaniye tharattam", artist: "K. S. Chithra", film: "Thoovalsparsham", year: 1990, duration: 260 },
  { title: "താളവട്ടത്തിൽ തെയ്യം തുള്ളും", search: "Thalavattathil theyyam thullum Thalavattam", artist: "M. G. Sreekumar", film: "Thalavattam", year: 1986, duration: 265 },
  { title: "നീല രാവുലഞ്ഞൂ", search: "Neela ravulanju", artist: "K. J. Yesudas", film: "Kadathanadan Ambadi", year: 1990, duration: 270 },
  { title: "പ്രണയവസന്തം പൂത്തു വിരിഞ്ഞു", search: "Pranayavasantham poothu", artist: "K. J. Yesudas", film: "Kalyanaraman", year: 2002, duration: 280 },
  { title: "വാർത്തിങ്കളേ വാ", search: "Vaarthinkale vaa", artist: "K. S. Chithra", film: "Chithram", year: 1988, duration: 255 },
  { title: "അമ്പിളീ മാമനെ പുൽകാൻ", search: "Ambeelee maamane pulkaan", artist: "K. J. Yesudas", film: "Thoovalsparsham", year: 1990, duration: 270 },
  { title: "രാപ്പാടി പക്ഷി മൂളും", search: "Rappadi pakshi moolum", artist: "K. S. Chithra", film: "Akashadoothu", year: 1993, duration: 265 },
  { title: "ചഞ്ചല മിഴിയിൽ നിന്റെ", search: "Chanchala mizhiyil ninte", artist: "K. J. Yesudas", film: "Aaranyakam", year: 1988, duration: 280 },
  { title: "ഓർമ്മകളിൽ നീയെരിയും", search: "Ormmakalil neeyeriyum", artist: "K. J. Yesudas", film: "Pranayam", year: 2011, duration: 275 }
];

async function fillPlaylist(playlist, candidates, targetCount, prefix) {
  let count = playlist.tracks.length;
  console.log(`\nProcessing ${playlist.name} (Current: ${count}, Target: ${targetCount})...`);

  for (const item of candidates) {
    if (playlist.tracks.length >= targetCount) break;

    const titleKey = `${item.title.trim().toLowerCase()}--${item.film.trim().toLowerCase()}`;
    if (seenTitles.has(titleKey)) {
      continue;
    }

    const verified = await searchAndVerify(item.search);
    if (!verified) {
      console.log(`  ✗ Could not verify: ${item.title} (${item.film})`);
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
    console.log(`  ✓ [${newTrack.id}] ${newTrack.title} (${newTrack.film}) -> ${verified.videoId} ("${verified.ytTitle.slice(0, 40)}...")`);
    await new Promise(r => setTimeout(r, 60));
  }

  console.log(`Finished ${playlist.name}: Now has ${playlist.tracks.length} tracks.`);
}

async function run() {
  await fillPlaylist(gm, gmCandidates, 100, 'gm');
  await fillPlaylist(mm, mmCandidates, 100, 'mm');
  await fillPlaylist(nr, nrCandidates, 100, 'nr');

  console.log("\n=================================================");
  console.log(`SUMMARY: GM=${gm.tracks.length}, MM=${mm.tracks.length}, NR=${nr.tracks.length}, TOTAL=${gm.tracks.length + mm.tracks.length + nr.tracks.length}`);
  console.log("=================================================");

  // Output new tracks.ts content
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
  console.log("Updated lib/tracks.ts successfully!");
}

run();
