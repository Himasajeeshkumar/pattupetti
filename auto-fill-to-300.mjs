import fs from 'fs';

async function verifyVideo(videoId) {
  try {
    const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`, {
      signal: AbortSignal.timeout(3000)
    });
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
    query + " song youtube",
    query + " malayalam video song"
  ];

  for (const q of qList) {
    try {
      const url = "https://html.duckduckgo.com/html/?q=" + encodeURIComponent(q);
      const res = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9"
        },
        signal: AbortSignal.timeout(3500)
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

    // Fallback YouTube Search
    try {
      const ytUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
      const res = await fetch(ytUrl, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
        signal: AbortSignal.timeout(3500)
      });
      if (res.ok) {
        const html = await res.text();
        const matches = [...html.matchAll(/\/watch\?v=([a-zA-Z0-9_-]{11})/g)].map(m => m[1]);
        for (const id of [...new Set(matches)].slice(0, 8)) {
          if (seenIds.has(id)) continue;
          const v = await verifyVideo(id);
          if (v) return v;
        }
      }
    } catch (e) {}
  }
  return null;
}

const gmSongs = [
  { title: "മഞ്ഞൾ പ്രസാദവും നെറ്റിയിൽ ചാർത്തി", query: "Manjalprasadavum nettiyil Nakhakshathangal", artist: "K. S. Chithra", film: "Nakhakshathangal", year: 1986, duration: 240 },
  { title: "നീർപ്പളുങ്കുകൾ ചിതറി വീഴുമീ", query: "Neerppalunkukal Yathra", artist: "K. J. Yesudas", film: "Yathra", year: 1985, duration: 245 },
  { title: "കേവല മർത്ത്യഭാഷ കേൾക്കാത്ത", query: "Kevala marthya bhasha Naran", artist: "K. J. Yesudas", film: "Naran", year: 2005, duration: 270 },
  { title: "പുലർകാല സുന്ദര സ്വപ്നത്തിൽ", query: "Pularkala sundara Oru Maymasa Pulariyil", artist: "K. J. Yesudas", film: "Oru Maymasa Pulariyil", year: 1987, duration: 255 },
  { title: "ചന്ദനമണി വാതിൽ പാതി ചാരി", query: "Chandana Manivathil Pathi Chari Marikkunnilla Njan", artist: "G. Venugopal", film: "Marikkunnilla Njan", year: 1988, duration: 265 },
  { title: "സ്വർണ്ണമുകിലേ", query: "Ponpularoli Poovithariya Ithiri Poove Chuvannapoove", artist: "K. S. Chithra", film: "Ithiri Poove Chuvannapoove", year: 1984, duration: 250 },
  { title: "താനേ പൂവിട്ട മോഹം", query: "Thane poovitta moham Sasneham", artist: "K. J. Yesudas", film: "Sasneham", year: 1990, duration: 260 },
  { title: "ആയിരം കണ്ണുമായ് കാത്തിരുന്നു", query: "Aayiram kannumayi Nokkethadhoorathu", artist: "K. J. Yesudas", film: "Nokkethadhoorathu Kannum Nattu", year: 1984, duration: 270 },
  { title: "ദേവാങ്കണങ്ങൾ കയ്യൊഴിഞ്ഞ", query: "Devaanganangal Njan Gandharvan", artist: "K. J. Yesudas", film: "Njan Gandharvan", year: 1991, duration: 285 },
  { title: "പാലപ്പൂവേ നിൻ തിരുമുറ്റത്ത്", query: "Palappoove nin Thacholi Varghese Chekavar", artist: "K. S. Chithra", film: "Thacholi Varghese Chekavar", year: 1995, duration: 280 },
  { title: "മാണിക്യവീണയുമായെൻ", query: "Manikyaveenayumayen Kattu Pookkal", artist: "K. J. Yesudas", film: "Kattu Pookkal", year: 1965, duration: 240 },
  { title: "ശ്രീലവസന്തം", query: "Sreelavasantham Nandhanam", artist: "K. J. Yesudas", film: "Nandhanam", year: 2002, duration: 265 },
  { title: "ഗോപാംഗനേ", query: "Gopaangane Aathmavile Bharatham", artist: "K. J. Yesudas", film: "Bharatham", year: 1991, duration: 290 },
  { title: "ചന്ദ്രികയിൽ അലിയുന്നു ശലഭം", query: "Chandrikayilaliyunnu Kavyamela", artist: "K. J. Yesudas & P. Leela", film: "Kavyamela", year: 1965, duration: 250 },
  { title: "താമസമെന്തേ വരുവാൻ", query: "Thamasamenthe Varuvan Bhargavi Nilayam", artist: "K. J. Yesudas", film: "Bhargavi Nilayam", year: 1964, duration: 260 },
  { title: "അല്ലിയാമ്പൽ കടവിൽ", query: "alliyambal kadavil rosy", artist: "K. J. Yesudas", film: "Rosi", year: 1965, duration: 245 },
  { title: "ഏകാന്തതയുടെ അപാരതീരം", query: "Ekanthathayude Apaaratheeram Bhargavi Nilayam", artist: "Kamukara Purushothaman", film: "Bhargavi Nilayam", year: 1964, duration: 240 },
  { title: "അനുപമേ അഴകേ", query: "Anupame azhake Pranayam", artist: "K. J. Yesudas", film: "Pranayam", year: 2011, duration: 260 },
  { title: "മേലേ മേലേ മാനം", query: "Mele mele maanam No 20 Madras Mail", artist: "K. J. Yesudas", film: "No 20 Madras Mail", year: 1990, duration: 280 },
  { title: "ശ്രീ പത്മനാഭ പ്രഭോ", query: "Sree Padmanabha Prabho Devasuram", artist: "K. J. Yesudas", film: "Devasuram", year: 1993, duration: 270 }
];

const mmSongs = [
  { title: "മഴനീർത്തുള്ളികൾ", query: "Mazhathullikal Video Song Vettam", artist: "M. G. Sreekumar & Sujatha", film: "Vettam", year: 2004, duration: 290 },
  { title: "വാർമുകിലേ വാനിൽ നീ", query: "Vaarmukile Mazha", artist: "K. S. Chithra", film: "Mazha", year: 2000, duration: 270 },
  { title: "പെയ്യാതെ പോയ മഴയോ", query: "Peyyaathe Poya Meghame Mazha", artist: "K. J. Yesudas", film: "Mazha", year: 2000, duration: 280 },
  { title: "ഒരു രാത്രി കൂടി വിടവാങ്ങവേ", query: "Oru Rathri Koodi Summer in Bethlehem", artist: "K. J. Yesudas", film: "Summer in Bethlehem", year: 1998, duration: 300 },
  { title: "മാരിക്കൂടinnu മാനം", query: "Vennilaavo Chandanamo Pingami", artist: "K. J. Yesudas", film: "Pingami", year: 1994, duration: 270 },
  { title: "മഞ്ഞുകാലം നോറ്റ മരം", query: "Manjukalam notta maram Engane Nee Marakkum", artist: "K. J. Yesudas", film: "Engane Nee Marakkum", year: 1983, duration: 260 },
  { title: "ഇന്നലെ എൻ നെഞ്ചിലെ", query: "Innale Ente Nenjile Balettan", artist: "K. J. Yesudas", film: "Balettan", year: 2003, duration: 275 },
  { title: "എന്തു പറഞ്ഞാലും നീ എന്റേതല്ലേ", query: "Enthu Paranjalum Nee Entethalle Kanmadam", artist: "K. J. Yesudas", film: "Kanmadam", year: 1998, duration: 280 },
  { title: "പൂന്തേനരുവി പൊൻമുടിപ്പുഴയുടെ", query: "Poonthenaruvi Minnaminunginte Nurunguvettam", artist: "K. J. Yesudas", film: "Oru Minnaminunginte Nurunguvettam", year: 1987, duration: 280 },
  { title: "മെല്ലെ മെല്ലെ മുഖപടം", query: "Melle melle mukhapadam Minnaminunginte Nurunguvettam", artist: "K. J. Yesudas", film: "Oru Minnaminunginte Nurunguvettam", year: 1987, duration: 260 },
  { title: "കാറ്റോടു കാതോരം", query: "Kaathodu Kaathoram title song", artist: "K. J. Yesudas & Lathika", film: "Kaathodu Kaathoram", year: 1985, duration: 250 },
  { title: "ദേവദൂതർ പാടി", query: "Devadoothar paadi Kaathodu Kaathoram", artist: "K. J. Yesudas", film: "Kaathodu Kaathoram", year: 1985, duration: 290 },
  { title: "നിലാവിന്റെ നീലഭസ്മക്കുറിയിട്ടവളേ", query: "Nilavinte neelabhasma Agnidevan", artist: "M. G. Sreekumar", film: "Agnidevan", year: 1995, duration: 295 },
  { title: "പാതിരാപ്പാല പൂത്തു", query: "Pathirappala poothu Manivathoorile", artist: "K. J. Yesudas", film: "Manivathoorile Aayiram Sivarathrikal", year: 1987, duration: 270 },
  { title: "അരികിൽ നീയുണ്ടായിരുന്നെങ്കിൽ", query: "Arikil neeyundayirunnengil Nee Ethra Dhanya", artist: "K. J. Yesudas", film: "Nee Ethra Dhanya", year: 1987, duration: 265 },
  { title: "ദേവസംഗീതം നീയല്ലേ", query: "Devasangeetham neeyalle Guru", artist: "K. J. Yesudas & Radhika Thilak", film: "Guru", year: 1997, duration: 280 },
  { title: "മറന്നിട്ടുമെന്തിനോ മനസ്സിൻ മണിയറയിൽ", query: "Marannittumenthino Randam Bhavam", artist: "P. Jayachandran & Sujatha", film: "Randam Bhavam", year: 2001, duration: 285 },
  { title: "കിളിച്ചുണ്ടൻ മാമ്പഴം ചുണ്ടിൽ", query: "Kilichundan mambazham Kilichundan Mampazham", artist: "M. G. Sreekumar & Sujatha", film: "Kilichundan Mampazham", year: 2003, duration: 290 },
  { title: "കസ്തൂരിമാൻ കുറുമ്പേ", query: "Kasthoori maan kurumbae Kilichundan Mampazham", artist: "M. G. Sreekumar", film: "Kilichundan Mampazham", year: 2003, duration: 280 },
  { title: "ഒന്നാം കിളി പൊന്നാൺകിളി", query: "Onnam kili ponnankili Kilichundan Mampazham", artist: "M. G. Sreekumar & Sujatha", film: "Kilichundan Mampazham", year: 2003, duration: 295 },
  { title: "പവിഴമഴയേ", query: "Pavizha Mazhaye Athiran", artist: "K. S. Harisankar", film: "Athiran", year: 2019, duration: 250 },
  { title: "നീ മണിമുകിലായ്", query: "Nee manimukilaayi Kakkakuyil", artist: "M. G. Sreekumar & K. S. Chithra", film: "Kakkakuyil", year: 2001, duration: 290 },
  { title: "മേഘരാഗം നേർത്തൊരു", query: "Megharagam nerthoru Kakkakuyil", artist: "K. S. Chithra", film: "Kakkakuyil", year: 2001, duration: 275 },
  { title: "പൊൻപുലരിയിൽ", query: "Ponpulariyil poothalam Unnikale Oru Kadha Parayam", artist: "K. J. Yesudas", film: "Unnikale Oru Kadha Parayam", year: 1987, duration: 260 },
  { title: "ഉണ്ണികളെ ഒരു കഥ പറയാം", query: "Unnikale oru kadha parayam title song", artist: "K. J. Yesudas", film: "Unnikale Oru Kadha Parayam", year: 1987, duration: 270 },
  { title: "ശാന്തമീ രാത്രിയിൽ", query: "Santhamee rathriyil Johnny Walker", artist: "K. J. Yesudas", film: "Johnny Walker", year: 1992, duration: 280 },
  { title: "ചെമ്പൂവേ പൂവേ", query: "Chempoove poove Sneham", artist: "K. J. Yesudas & Sujatha", film: "Sneham", year: 1998, duration: 290 },
  { title: "കൈതപ്പൂവിൻ കന്നിക്കുറുമ്പിൽ", query: "Kaithappoovin kannikkurumbil Kannezhuthi Pottum Thottu", artist: "K. S. Chithra & Manju Warrier", film: "Kannezhuthi Pottum Thottu", year: 1999, duration: 270 },
  { title: "ഹരിചന്ദന മലരുകളായ്", query: "Harichandana malarukalaayi Kannezhuthi Pottum Thottu", artist: "M. G. Sreekumar", film: "Kannezhuthi Pottum Thottu", year: 1999, duration: 275 },
  { title: "ഓർമ്മകൾ ഓടിക്കളിക്കുവാനെത്തുന്നു", query: "Ormmakal odikkalikkana Mukundetta Sumithra Vilikkunnu", artist: "M. G. Sreekumar", film: "Mukundetta Sumithra Vilikkunnu", year: 1988, duration: 265 },
  { title: "എന്റെ ഉള്ളുടുക്കം കൊട്ടി", query: "Ente ulludukkam kotti Kannezhuthi Pottum Thottu", artist: "K. J. Yesudas", film: "Kannezhuthi Pottum Thottu", year: 1999, duration: 285 },
  { title: "എത്ര പൂക്കാലം", query: "Ethra pookkalam Rakkuyilin Ragasadassil", artist: "M. G. Sreekumar", film: "Rakkuyilin Ragasadassil", year: 1986, duration: 260 },
  { title: "പൂങ്കാറ്റിനോടും കിളികളോടും", query: "Poonkattinodum kilikalodum Poomukhappadiyil Ninneyum Kaathu", artist: "K. J. Yesudas", film: "Poomukhappadiyil Ninneyum Kaathu", year: 1986, duration: 270 },
  { title: "പെണ്ണാളേ പെണ്ണാളേ", query: "Pennale pennale Chemmeen", artist: "P. Leela & K. J. Yesudas", film: "Chemmeen", year: 1965, duration: 240 },
  { title: "പുഴയോരത്തിൽ പൂന്തോണിയിൽ", query: "Puzhayorathil poonthoniyil Adaminte Vaariyellu", artist: "S. Janaki", film: "Adaminte Vaariyellu", year: 1983, duration: 260 },
  { title: "നീലക്കുറിഞ്ഞികൾ പൂക്കുന്ന വീഥിയിൽ", query: "Neelakkurinjikal pookkunna Neelakkurinji Poothappol", artist: "K. J. Yesudas & S. Janaki", film: "Neelakkurinji Poothappol", year: 1987, duration: 275 },
  { title: "ഇന്നുമെന്റെ കണ്ണുനീരിൽ", query: "Innumente kannuneeril Yuvajanotsavam", artist: "K. J. Yesudas", film: "Yuvajanotsavam", year: 1986, duration: 260 },
  { title: "പാതിരാമഴയേതോ", query: "Pathiramazhayetho Ulladakkam", artist: "K. J. Yesudas & Sujatha", film: "Ulladakkam", year: 1991, duration: 285 },
  { title: "മായമഞ്ചലിൽ", query: "Mayamanchalil Ottayal Pattalam", artist: "G. Venugopal & Radhika Thilak", film: "Ottayal Pattalam", year: 1991, duration: 280 },
  { title: "തുള്ളിമഞ്ചാടികൾ", query: "Thullimanjadikal Kaazhcha", artist: "Kalabhavan Mani", film: "Kaazhcha", year: 2004, duration: 265 },
  { title: "കുണുങ്ങി കുണുങ്ങി നടക്കുന്ന കാറ്റേ", query: "Kunungi kunungi nadakkunna Varnapakittu", artist: "M. G. Sreekumar & K. S. Chithra", film: "Varnapakittu", year: 1997, duration: 285 },
  { title: "ആകാശദൂതു പോയോ", query: "Aakashadoothu poyo Akashadoothu", artist: "K. S. Chithra", film: "Akashadoothu", year: 1993, duration: 270 },
  { title: "ആലിപ്പഴം ചുരത്തും", query: "Aalippazham churathum Kuttisrank", artist: "Rajalakshmy", film: "Kuttisrank", year: 2010, duration: 240 },
  { title: "എൻ പൂവേ പൊൻപൂവേ", query: "En poove ponpoove Kattathe Kilikkoodu", artist: "S. Janaki", film: "Kattathe Kilikkoodu", year: 1983, duration: 250 },
  { title: "മന്ദാരച്ചെപ്പുണ്ടോ", query: "Mandharacheppundo Dasaratham", artist: "M. G. Sreekumar & K. S. Chithra", film: "Dasaratham", year: 1989, duration: 275 },
  { title: "പൂത്താലം വലംകയ്യിൽ", query: "Poothalam valamkayyil Thilakkam", artist: "P. Jayachandran", film: "Thilakkam", year: 2003, duration: 280 },
  { title: "മഴവില്ലിൻ തീരങ്ങൾ", query: "Mazhavillin theerangal Oru Indian Pranayakadha", artist: "Najim Arshad", film: "Oru Indian Pranayakadha", year: 2013, duration: 250 },
  { title: "തിരനുരയും ചുരുൾമുടിയിൽ", query: "Thiranurayum churulmudiyil Ananthabhadram", artist: "K. J. Yesudas", film: "Ananthabhadram", year: 2005, duration: 280 },
  { title: "പിന്നെയുമൊരു മഴക്കാലം", query: "Pinneyumoru mazhakkalam Mazhakkalam", artist: "P. Jayachandran", film: "Mazhakkalam", year: 2004, duration: 260 },
  { title: "കാർമുകിൽ വർണ്ണന്റെ ചുണ്ടിൽ", query: "Karmukil varnnante Nandanam", artist: "K. S. Chithra", film: "Nandanam", year: 2002, duration: 290 },
  { title: "മൗനസരോവരമാകെ", query: "Mounasarovaramaake Savidham", artist: "K. J. Yesudas", film: "Savidham", year: 1992, duration: 275 },
  { title: "വരവായ് തോഴി വാ", query: "Varavayi thozhi vaa Chithram", artist: "K. S. Chithra", film: "Chithram", year: 1988, duration: 250 },
  { title: "കിളിയേ കിളിയേ", query: "Kiliye kiliye Aakashadoothu", artist: "K. S. Chithra", film: "Akashadoothu", year: 1993, duration: 260 },
  { title: "ഒരു കിളി ഇരുകിളി", query: "Oru kili irukili Vasanthiyum Lakshmiyum", artist: "K. J. Yesudas", film: "Vasanthiyum Lakshmiyum Pinne Njanum", year: 1999, duration: 280 },
  { title: "ആലാപനം തേടും തായ്മനം", query: "Aalaapanam thedum Kaakkothikkavile", artist: "K. J. Yesudas", film: "Kaakkothikkavile Appooppan Thaadikal", year: 1988, duration: 265 },
  { title: "ചഞ്ചലദൃതപദതാളം", query: "Chanchaladhrithapada Rajashilpi", artist: "K. S. Chithra", film: "Rajashilpi", year: 1992, duration: 270 },
  { title: "കാറ്റിൽ വരും ഗീതം", query: "Kaattil varum geetham Kakkakuyil", artist: "K. J. Yesudas", film: "Kakkakuyil", year: 2001, duration: 280 },
  { title: "മഴ പെയ്തു മാനം", query: "Mazha peythu manam The Car", artist: "M. G. Sreekumar", film: "The Car", year: 1997, duration: 260 },
  { title: "നീലരാവിൽ ഇന്നു നിന്റെ", query: "Neelaravil innu Kudumbakodathi", artist: "K. J. Yesudas & Sujatha", film: "Kudumbakodathi", year: 1996, duration: 275 },
  { title: "തൂമഞ്ഞു വീഴുമീ രാവിൽ", query: "Thoomanju veezhumee Nokkethadhoorathu", artist: "K. J. Yesudas", film: "Nokkethadhoorathu Kannum Nattu", year: 1984, duration: 260 },
  { title: "തളിർവലയോ താമരനൂലോ", query: "Thalirvalayo thamaranoolo Cheppu", artist: "K. S. Chithra", film: "Cheppu", year: 1987, duration: 255 },
  { title: "പൊൻമുളന്തണ്ടു മൂളും", query: "Ponmulanthandu moolum Vatsalyam", artist: "K. J. Yesudas", film: "Vatsalyam", year: 1993, duration: 265 },
  { title: "ശ്രീരാഗമോ വീണ്ടും", query: "Sreeragamo veendum Pavithram", artist: "K. J. Yesudas", film: "Pavithram", year: 1994, duration: 320 },
  { title: "വാൽക്കണ്ണെഴുതി വനപുഷ്പം ചൂടി", query: "Valkkannazhuthi vanapushpam Paithrukam", artist: "K. J. Yesudas", film: "Paithrukam", year: 1993, duration: 290 },
  { title: "പൂങ്കാറ്റിൻ താരാട്ടും", query: "Poonkattin tharattum Malootty", artist: "K. S. Chithra", film: "Malootty", year: 1992, duration: 260 },
  { title: "മഞ്ഞുകാലം പടിയിറങ്ങി", query: "Manjukalam padiyirangi Mazha", artist: "K. S. Chithra", film: "Mazha", year: 2000, duration: 250 },
  { title: "ആകാശപ്പൂമഴ പെയ്യുന്നു", query: "Aakashappoomazha Kalyanaraman", artist: "M. G. Sreekumar", film: "Kalyanaraman", year: 2002, duration: 280 },
  { title: "മഴനിലാ തെന്നലായ്", query: "Mazhanila thennalayi Vikramadithyan", artist: "Najim Arshad", film: "Vikramadithyan", year: 2014, duration: 260 },
  { title: "ഓർമ്മകളിൽ ഒരു മഴത്തുള്ളി", query: "Ormmakalil oru mazhathulli Sasneham", artist: "G. Venugopal", film: "Sasneham", year: 1990, duration: 270 },
  { title: "പൂവേ പൂവേ പാലപ്പൂവേ", query: "Poove poove palappoove Devadoothan", artist: "K. S. Chithra & P. Jayachandran", film: "Devadoothan", year: 2000, duration: 295 },
  { title: "കണ്ണാടി ആദ്യമായെൻ", query: "Kannadi aadyamayen Paava", artist: "K. J. Yesudas", film: "Paava", year: 2016, duration: 260 },
  { title: "തൂവെള്ളത്തൂവൽ വീശുമീ കാറ്റേ", query: "Thoovellathooval veeshi Kayal", artist: "K. J. Yesudas", film: "Kayal", year: 1991, duration: 270 },
  { title: "മഴവില്ലു കൊണ്ടുവാ", query: "Mazhavillu konduva Ennum Ezhunnollathu", artist: "K. S. Chithra", film: "Ennum Ezhunnollathu", year: 2000, duration: 260 },
  { title: "പാതിരാക്കാറ്റേ പാടൂ", query: "Pathirakkatte padoo Vatsalyam", artist: "K. J. Yesudas", film: "Vatsalyam", year: 1993, duration: 270 },
  { title: "നീയെൻ സർഗ്ഗസൗന്ദര്യമേ", query: "Nee En Sargga Soundaryame Kaathodu Kaathoram", artist: "K. J. Yesudas", film: "Kaathodu Kaathoram", year: 1985, duration: 270 },
  { title: "അനുരാഗിണീ ഇത എൻ കവിതാ", query: "Anuragini itha en kavitha Oru Kudakkeezhil", artist: "K. J. Yesudas", film: "Oru Kudakkeezhil", year: 1985, duration: 280 },
  { title: "താഴ്വാരം മഞ്ഞിൽ മുങ്ങി", query: "Thazhvaram manjil mungumbol Oru Abhibhashakante Case Diary", artist: "K. J. Yesudas", film: "Oru Abhibhashakante Case Diary", year: 1995, duration: 275 },
  { title: "കണ്ണാന്തളിയും കാട്ടുകുറിഞ്ഞിയും", query: "Kannanthaliyum kattukurinji Kattathe Kilikkoodu", artist: "S. Janaki", film: "Kaattathe Kilikkoodu", year: 1983, duration: 255 },
  { title: "മനസ്സിലൊരു പൂമാല", query: "Manassiloru poomaala Pavithram", artist: "K. J. Yesudas", film: "Pavithram", year: 1994, duration: 270 },
  { title: "മഴവിൽക്കൊടിപോലെ", query: "Mazhavilkkodipole Azhakiya Ravanan", artist: "K. S. Chithra", film: "Azhakiya Ravanan", year: 1996, duration: 265 },
  { title: "കാറ്റും മഴയും ചേരുമ്പോൾ", query: "Kattum mazhayum cherumbol Mazhakkalam", artist: "K. J. Yesudas", film: "Mazhakkalam", year: 2004, duration: 280 },
  { title: "മഴനൂലു നെയ്യും", query: "Mazhanoolu neyyum Gramaphone", artist: "K. S. Chithra", film: "Gramaphone", year: 2002, duration: 260 },
  { title: "കുളിർമഴയേതോ തൂവും കാറ്റേ", query: "Kulirmazhayetho thoovum Vatsalyam", artist: "K. J. Yesudas", film: "Vatsalyam", year: 1993, duration: 270 },
  { title: "പൂമാനമേ ഒരു രാഗമേഘം", query: "Poomaname oru ragamegham Nirakkoottu", artist: "K. S. Chithra", film: "Nirakkoottu", year: 1985, duration: 280 },
  { title: "ശ്യാമമേഘമേ നീ രാഗമേഘമേ", query: "Shyamameghame nee Adhipan", artist: "K. S. Chithra", film: "Adhipan", year: 1989, duration: 270 }
];

const nrSongs = [
  { title: "ആമ്പല്ലൂർ അമ്പലത്തിൽ", query: "Aamballoor ambalathil Midhunam", artist: "M. G. Sreekumar", film: "Midhunam", year: 1993, duration: 275 },
  { title: "ഓ പ്രിയേ പ്രിയേ", query: "O priye priye Aniyathipraavu", artist: "M. G. Sreekumar & K. S. Chithra", film: "Aniyathipraavu", year: 1997, duration: 290 },
  { title: "എന്നു വരും നീ", query: "Ennu varum nee Kannaki", artist: "K. J. Yesudas", film: "Kannaki", year: 2001, duration: 285 },
  { title: "അഴകേ നിൻ മിഴിനീർമണിയായ്", query: "Azhake nin mizhineermaniyayi Ammakkilikkoodu", artist: "K. J. Yesudas", film: "Ammakkilikkoodu", year: 2003, duration: 290 },
  { title: "നീ ഹിമമഴയായ്", query: "Nee Himamazhayayi Edakkad Battalion 06", artist: "K. S. Harisankar & Nithya Mammen", film: "Edakkad Battalion 06", year: 2019, duration: 245 },
  { title: "ആരോ വിരൽ മീട്ടി", query: "Aaro viral meetti Pranayavarnangal", artist: "K. J. Yesudas", film: "Pranayavarnangal", year: 1998, duration: 290 },
  { title: "വരമഞ്ഞളാടിയ രാവിന്റെ മാറിൽ", query: "Varamanjaladiya ravinte maril Pranayavarnangal", artist: "Sujatha", film: "Pranayavarnangal", year: 1998, duration: 280 },
  { title: "ചന്ദനത്തിൽ കടഞ്ഞെടുത്തൊരു", query: "Chandanathil kadanjeduthoru Sasneham Sumithra", artist: "K. J. Yesudas", film: "Sasneham Sumithra", year: 2004, duration: 285 },
  { title: "അന്തിക്കടപ്പുറത്തു", query: "Anthikkadappurathu Chamayam", artist: "M. G. Sreekumar", film: "Chamayam", year: 1993, duration: 290 },
  { title: "ചാഞ്ചാടിയാടി ഉറങ്ങൂ നീ", query: "Chanchadiyadi urangoo nee Makante Achan", artist: "K. J. Yesudas", film: "Makante Achan", year: 2009, duration: 285 },
  { title: "പിന്നെയും പിന്നെയും ആരോ കിനാവിന്റെ", query: "Pinneyum pinneyum Krishnagudiyil Oru Pranayakalathu", artist: "K. J. Yesudas & K. S. Chithra", film: "Krishnagudiyil Oru Pranayakalathu", year: 1997, duration: 310 },
  { title: "ഒരു ചെമ്പനീർ പൂവിറുത്തു", query: "Oru chempaneer pooviruthu Sthithi", artist: "Unni Menon", film: "Sthithi", year: 2003, duration: 300 },
  { title: "മധുരം ജീവാമൃതബിന്ദു", query: "Madhuram jeevaamrithabindu Chenkol", artist: "K. J. Yesudas", film: "Chenkol", year: 1993, duration: 290 },
  { title: "രാവിൻ നിലാക്കായലിൽ", query: "Raavin nilakkayalil Mazhavillu", artist: "K. J. Yesudas", film: "Mazhavillu", year: 1999, duration: 280 },
  { title: "ചന്ദനലേപ സുഗന്ധം", query: "Chandanalepa sugandham Vadakkan Veeragatha", artist: "K. J. Yesudas", film: "Oru Vadakkan Veeragatha", year: 1989, duration: 300 },
  { title: "കളരിവിളക്കു തെളിഞ്ഞതാണോ", query: "Kalarivilakku thelinjathano Vadakkan Veeragatha", artist: "K. S. Chithra", film: "Oru Vadakkan Veeragatha", year: 1989, duration: 280 },
  { title: "പൂങ്കാറ്റേ പോയി ചൊല്ലാമോ", query: "Poonkaatte poyi chollamo Friends", artist: "K. J. Yesudas", film: "Friends", year: 1999, duration: 290 },
  { title: "തങ്കത്തോണി ഏറി വാ", query: "Thankathoni yeri vaa Mazhavillu", artist: "K. J. Yesudas", film: "Mazhavillu", year: 1999, duration: 280 },
  { title: "താമരപ്പൂവിൽ വാഴും", query: "Thamarappoovil vazhum Chandranudikkunna Dikkil", artist: "K. J. Yesudas & Sujatha", film: "Chandranudikkunna Dikkil", year: 1999, duration: 295 },
  { title: "അമ്പാടിപ്പയ്യുകൾ മേയും", query: "Ambadippayyukal meyum Chandranudikkunna Dikkil", artist: "K. J. Yesudas", film: "Chandranudikkunna Dikkil", year: 1999, duration: 285 },
  { title: "ഒരുവട്ടം കൂടിയെൻ", query: "Oru vattam koodiyen Chillu", artist: "K. J. Yesudas", film: "Chillu", year: 1982, duration: 260 },
  { title: "നീയെൻ കിനാവോ", query: "Neeyen kinavo Hello", artist: "Afsal & Jyotsna", film: "Hello", year: 2007, duration: 270 },
  { title: "മനസ്സിൻ മടിയിലെ", query: "Manassin madiyile Manasinakkare", artist: "K. J. Yesudas & Sujatha", film: "Manasinakkare", year: 2003, duration: 280 },
  { title: "ചെണ്ടുമല്ലിക പൂത്തു വിരിഞ്ഞു", query: "Chendumallika poothu Manasinakkare", artist: "M. G. Sreekumar", film: "Manasinakkare", year: 2003, duration: 270 },
  { title: "എന്നും നിന്നെ പൂജിക്കാം", query: "Ennum ninne poojikkam Aniyathipraavu", artist: "K. J. Yesudas & Sujatha", film: "Aniyathipraavu", year: 1997, duration: 285 },
  { title: "കനകമുന്തിരികൾ മണികൾ", query: "Kanakamunthirikal Punaradhivasam", artist: "P. Jayachandran", film: "Punaradhivasam", year: 2000, duration: 280 },
  { title: "മേഘം പൂത്തു തുടങ്ങി", query: "Megham poothu thudangi Thoovanathumbikal", artist: "K. J. Yesudas", film: "Thoovanathumbikal", year: 1987, duration: 285 },
  { title: "ഒന്നാം രാഗം പാടി", query: "Onnam ragam padi Thoovanathumbikal", artist: "K. J. Yesudas & K. S. Chithra", film: "Thoovanathumbikal", year: 1987, duration: 290 },
  { title: "രാക്കിളി തൻ പൊൻമകൾ", query: "Rakkili than ponmakale Perumazhakkalam", artist: "K. S. Chithra", film: "Perumazhakkalam", year: 2004, duration: 295 },
  { title: "മെഹർബാൻ മെഹർബാൻ", query: "Meherban Perumazhakkalam", artist: "M. G. Sreekumar & Sujatha", film: "Perumazhakkalam", year: 2004, duration: 290 },
  { title: "ആലോലം താലോലം പാടാം", query: "Aalolam thaalolam paadaam Kaliyattam", artist: "K. J. Yesudas", film: "Kaliyattam", year: 1997, duration: 270 },
  { title: "പൂമുഖവാതിൽക്കൽ സ്നേഹം", query: "Poomukhavathilkkal sneham Rakkuyilin Ragasadassil", artist: "K. J. Yesudas", film: "Rakkuyilin Ragasadassil", year: 1986, duration: 280 },
  { title: "താരിളം പൂവേ താരാട്ടാം", query: "Tharilam poove tharattam Sphadikam", artist: "K. S. Chithra", film: "Sphadikam", year: 1995, duration: 260 },
  { title: "ഏഴുമല പൂഞ്ചോല", query: "Ezhumala poonchola Sphadikam", artist: "K. S. Chithra & M. G. Sreekumar", film: "Sphadikam", year: 1995, duration: 280 },
  { title: "മനസ്സിൻ മണിമുറ്റത്ത്", query: "Manassin manimuttathu Manichitrathazhu", artist: "K. J. Yesudas", film: "Manichitrathazhu", year: 1993, duration: 270 },
  { title: "അക്കരെയിക്കരെ നിന്നൊരു പൂങ്കാറ്റ്", query: "Akkareyikkare ninnoru poonkaattu", artist: "K. J. Yesudas", film: "Akkare Ninnoru Maran", year: 1985, duration: 260 },
  { title: "ഓത്തുപള്ളിയിലന്നു നമ്മൾ", query: "Othupalliyilannu Thenmavin Kombath", artist: "Sujatha & Sreekumar", film: "Thenmavin Kombath", year: 1994, duration: 290 },
  { title: "മാനത്തെ ചന്ദനക്കീറ്", query: "Manathe chandanakkeeru Chandralekha", artist: "M. G. Sreekumar & K. S. Chithra", film: "Chandralekha", year: 1997, duration: 295 },
  { title: "ഇന്നലെ മയങ്ങുമ്പോൾ", query: "Innale mayangumbol Anveshichu Kandethiyilla", artist: "K. J. Yesudas", film: "Anveshichu Kandethiyilla", year: 1967, duration: 250 },
  { title: "രാരീ രാരീരം രാരോ", query: "Raari rareeram raaro Onnu Muthal Poojyam Vare", artist: "G. Venugopal", film: "Onnu Muthal Poojyam Vare", year: 1986, duration: 280 },
  { title: "ഒരു ദള വീര്യമായ്", query: "Oru dala veeryamayi Arayannangalude Veedu", artist: "K. J. Yesudas", film: "Arayannangalude Veedu", year: 2000, duration: 270 },
  { title: "കണ്മണിയെ താരാട്ടാം", query: "Kanmaniye tharattam Thoovalsparsham", artist: "K. S. Chithra", film: "Thoovalsparsham", year: 1990, duration: 260 },
  { title: "താളവട്ടത്തിൽ തെയ്യം തുള്ളും", query: "Thalavattathil theyyam thullum Thalavattam", artist: "M. G. Sreekumar", film: "Thalavattam", year: 1986, duration: 265 },
  { title: "പ്രണയവസന്തം പൂത്തു വിരിഞ്ഞു", query: "Pranayavasantham poothu Kalyanaraman", artist: "K. J. Yesudas", film: "Kalyanaraman", year: 2002, duration: 280 },
  { title: "വാർത്തിങ്കളേ വാ", query: "Vaarthinkale vaa Chithram", artist: "K. S. Chithra", film: "Chithram", year: 1988, duration: 255 },
  { title: "അമ്പിളീ മാമനെ പുൽകാൻ", query: "Ambeelee maamane Thoovalsparsham", artist: "K. J. Yesudas", film: "Thoovalsparsham", year: 1990, duration: 270 },
  { title: "രാപ്പാടി പക്ഷി മൂളും", query: "Rappadi pakshi moolum Akashadoothu", artist: "K. S. Chithra", film: "Akashadoothu", year: 1993, duration: 265 },
  { title: "ചഞ്ചല മിഴിയിൽ നിന്റെ", query: "Chanchala mizhiyil Aaranyakam", artist: "K. J. Yesudas", film: "Aaranyakam", year: 1988, duration: 280 },
  { title: "ഇന്നലെ നീയൊരു സുന്ദര രാഗമായ്", query: "Innale neeyoru sundara ragamayi Sthree", artist: "K. J. Yesudas", film: "Sthree", year: 1970, duration: 250 },
  { title: "സന്ധ്യക്കെന്തിനു സിന്ദൂരം", query: "Sandhyakkenthinu sindhooram Maya", artist: "K. J. Yesudas", film: "Maya", year: 1972, duration: 260 },
  { title: "കണ്മണി അൻപോടു കാതലൻ", query: "Kanmani Anbodu Kadhalan Guna", artist: "S. Janaki & Kamal Haasan", film: "Guna", year: 1991, duration: 310 },
  { title: "ഹൃദയസഖീ സ്നേഹമയീ", query: "Hrudayasakhi snehamayi Oru Painkili Kadha", artist: "K. J. Yesudas", film: "Oru Painkili Kadha", year: 1984, duration: 270 },
  { title: "സുന്ദരി സുന്ദരി ഒന്നു പറയു", query: "Sundari sundari onnu parayu Aye Auto", artist: "M. G. Sreekumar", film: "Aye Auto", year: 1990, duration: 290 },
  { title: "പൊൻകസവു തട്ടമിട്ടു", query: "Ponkasavu thattamittu Kazhcha", artist: "Madhu Balakrishnan", film: "Kazhcha", year: 2004, duration: 280 },
  { title: "നീല രാവുലഞ്ഞൂ", query: "Neela ravulanju Kadathanadan Ambadi", artist: "K. J. Yesudas", film: "Kadathanadan Ambadi", year: 1990, duration: 270 },
  { title: "മാനേ മധുരക്കരിമ്പേ", query: "Mane madhurakkarimbe Thoovalsparsham", artist: "K. J. Yesudas", film: "Thoovalsparsham", year: 1990, duration: 265 },
  { title: "പൂനിലാവു മാഞ്ഞുപോയ്", query: "Poonilavu maanjupoy Ente Sooryaputhrikku", artist: "K. J. Yesudas", film: "Ente Sooryaputhrikku", year: 1991, duration: 275 },
  { title: "രാപ്പാടി തൻ പാട്ടിൽ", query: "Rappadi than paattil Daisy", artist: "K. S. Chithra", film: "Daisy", year: 1988, duration: 260 },
  { title: "സ്വർണ്ണപ്പക്ഷി പാടുമോ", query: "Swarnnapakshi paadumo Thooval kottaram", artist: "K. J. Yesudas", film: "Thooval kottaram", year: 1996, duration: 280 },
  { title: "പാതിരാ നിലാവിൽ", query: "Pathira nilavil Kauravar", artist: "K. J. Yesudas", film: "Kauravar", year: 1992, duration: 285 },
  { title: "മാറ്റേറും കാഞ്ചനപ്പൂങ്കാറ്റേ", query: "Matterum kanchanappoonkatte Vatsalyam", artist: "K. S. Chithra", film: "Vatsalyam", year: 1993, duration: 270 },
  { title: "കണ്ണീർപ്പൂവിലൊരു തുള്ളി", query: "Kanneerppooviloru thulli Arayannangalude Veedu", artist: "K. J. Yesudas", film: "Arayannangalude Veedu", year: 2000, duration: 280 },
  { title: "നീലക്കുയിലേ പാടൂ", query: "Neelakkuyile padoo Adhipan", artist: "K. S. Chithra", film: "Adhipan", year: 1989, duration: 265 },
  { title: "തേൻകിളിയേ മാന്തളിരിൽ", query: "Thenkiliye manthaliril Thilakkam", artist: "M. G. Sreekumar", film: "Thilakkam", year: 2003, duration: 275 },
  { title: "മധുരമീ നിലാവിൽ", query: "Madhuramee nilavil Nokkethadhoorathu", artist: "K. J. Yesudas", film: "Nokkethadhoorathu", year: 1984, duration: 270 },
  { title: "രാവിൻ നിലാവിൽ ഒന്നു ചേരാൻ", query: "Raavin nilavil onnu cheran Mazhavillu", artist: "K. J. Yesudas", film: "Mazhavillu", year: 1999, duration: 275 },
  { title: "നീലരാവിൽ ശ്രുതിമീട്ടി", query: "Neelaravil sruthemeetti Gramaphone", artist: "K. J. Yesudas", film: "Gramaphone", year: 2002, duration: 265 },
  { title: "ഓർമ്മകളിൽ പെയ്യും മഞ്ഞേ", query: "Ormmakalil peyyum manje Sasneham", artist: "K. S. Chithra", film: "Sasneham", year: 1990, duration: 270 },
  { title: "അമ്പിളിക്കല ചുണ്ടിൽ പുഞ്ചിരി", query: "Ambilikkala chundil Thoovalsparsham", artist: "K. J. Yesudas", film: "Thoovalsparsham", year: 1990, duration: 260 },
  { title: "മന്ദാര പൂവിതളിൽ", query: "Mandhara poovithalil Dasaratham", artist: "K. S. Chithra", film: "Dasaratham", year: 1989, duration: 270 },
  { title: "ചെമ്പക മലരുകൾ പൂക്കും", query: "Chembaka malarukal pookkum Randam Bhavam", artist: "K. J. Yesudas", film: "Randam Bhavam", year: 2001, duration: 280 }
];

async function fill(p, pool, target, prefix, seenVideoIds, seenTitles) {
  console.log(`\nChecking ${p.name}: Currently ${p.tracks.length}, Target: ${target}...`);

  for (const item of pool) {
    if (p.tracks.length >= target) break;
    const titleKey = `${item.title.trim().toLowerCase()}--${item.film.trim().toLowerCase()}`;
    if (seenTitles.has(titleKey)) continue;

    const v = await findVideoId(item.query, seenVideoIds);
    if (!v) {
      console.log(`  ✗ Not found: ${item.title} (${item.film})`);
      continue;
    }

    seenVideoIds.add(v.videoId);
    seenTitles.add(titleKey);

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
    console.log(`  ✓ [${newTrack.id}] ${newTrack.title} (${newTrack.film}) -> ${v.videoId} ("${v.title.slice(0, 32)}...")`);
    await new Promise(r => setTimeout(r, 60));
  }

  console.log(`=> Result: ${p.name} now has ${p.tracks.length} tracks.`);
}

async function run() {
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

  await fill(gm, gmSongs, 100, 'gm', seenVideoIds, seenTitles);
  await fill(mm, mmSongs, 100, 'mm', seenVideoIds, seenTitles);
  await fill(nr, nrSongs, 100, 'nr', seenVideoIds, seenTitles);

  console.log(`\n=================================================`);
  console.log(`CURRENT COUNTS: GM=${gm.tracks.length}, MM=${mm.tracks.length}, NR=${nr.tracks.length}, TOTAL=${gm.tracks.length + mm.tracks.length + nr.tracks.length}`);
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

export const playlists: Playlist[] = ${JSON.stringify(playlists, null, 2)};
`;

  fs.writeFileSync('./lib/tracks.ts', outputCode, 'utf8');
  console.log("Updated lib/tracks.ts successfully!");
}

run();
