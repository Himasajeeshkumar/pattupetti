export type Track = {
  id: string;
  title: string;
  artist: string;
  film: string;
  year: number;
  duration: number;
  videoId: string;
  audioSrc?: string;
};

export type Playlist = {
  id: string;
  name: string;
  tracks: Track[];
};

export const playlists: Playlist[] = [
  {
    "id": "golden-memories",
    "name": "Golden Memories",
    "tracks": [
      {
        "id": "gm-1",
        "title": "ഉണരുമീ ഗാനം",
        "artist": "G. Venugopal",
        "film": "Moonnam Pakkam",
        "year": 1988,
        "duration": 240,
        "videoId": "n5Eo9uCMijM",
        "audioSrc": "/audio/001-unarumee-gaanam.mp3"
      },
      {
        "id": "gm-2",
        "title": "വൈശാഖ സന്ധ്യേ",
        "artist": "K. J. Yesudas",
        "film": "Nadodikkattu",
        "year": 1987,
        "duration": 240,
        "videoId": "tmTOUM5t1a4",
        "audioSrc": "/audio/002-vaishaakha-sandhye.mp3"
      },
      {
        "id": "gm-3",
        "title": "തുമ്പി വാ തുമ്പക്കുടത്തിൻ",
        "artist": "S. Janaki",
        "film": "Olangal",
        "year": 1982,
        "duration": 240,
        "videoId": "8XBp0Jzssjg",
        "audioSrc": "/audio/003-thumpi-vaa-thumpakkutaththin.mp3"
      },
      {
        "id": "gm-4",
        "title": "കണ്ണാംതുമ്പി പോരാമോ",
        "artist": "K. S. Chithra",
        "film": "Kakkothikkavile Appooppan Thaadikal",
        "year": 1988,
        "duration": 228,
        "videoId": "4if__kf5GY8",
        "audioSrc": "/audio/004-kannaamthumpi-poraamo.mp3"
      },
      {
        "id": "gm-5",
        "title": "മൗനം സ്വരമായ്",
        "artist": "K. J. Yesudas",
        "film": "Aayushkaalam",
        "year": 1992,
        "duration": 240,
        "videoId": "YG6AAEzu0d0",
        "audioSrc": "/audio/005-maunam-svaramaay.mp3"
      },
      {
        "id": "gm-6",
        "title": "സ്നേഹത്തിൻ പൂഞ്ചോല",
        "artist": "K. J. Yesudas",
        "film": "Pappayude Swantham Appoos",
        "year": 1992,
        "duration": 301,
        "videoId": "QUdhrGLHP7w",
        "audioSrc": "/audio/006-snehaththin-poonjchola.mp3"
      },
      {
        "id": "gm-7",
        "title": "ഓളത്തുമ്പത്തിരുന്നൂയലാടും",
        "artist": "S. Janaki",
        "film": "Pappayude Swantham Appoos",
        "year": 1992,
        "duration": 304,
        "videoId": "ELEaxpW1JPM",
        "audioSrc": "/audio/007-olaththumpaththirunnooyalaatum.mp3"
      },
      {
        "id": "gm-8",
        "title": "മയിലായ് പറന്നുവാ",
        "artist": "K. J. Yesudas & K. S. Chithra",
        "film": "Mayilpeelikkaavu",
        "year": 1998,
        "duration": 282,
        "videoId": "yshVjybqRLA",
        "audioSrc": "/audio/008-mayilaay-parannuvaa.mp3"
      },
      {
        "id": "gm-9",
        "title": "കണ്ണാടിക്കൂടും കൂട്ടി",
        "artist": "K. J. Yesudas & K. S. Chithra",
        "film": "Pranayavarnangal",
        "year": 1998,
        "duration": 300,
        "videoId": "NlPhhHfrBKE",
        "audioSrc": "/audio/009-kannaatikkootum-kootti.mp3"
      },
      {
        "id": "gm-10",
        "title": "വരമഞ്ഞളാടിയ",
        "artist": "Sujatha Mohan",
        "film": "Pranayavarnangal",
        "year": 1998,
        "duration": 290,
        "videoId": "ml4NsxByxFU",
        "audioSrc": "/audio/010-varamanjalaatiya.mp3"
      },
      {
        "id": "gm-11",
        "title": "ഒരു രാത്രി കൂടി",
        "artist": "K. J. Yesudas & K. S. Chithra",
        "film": "Summer in Bethlehem",
        "year": 1998,
        "duration": 321,
        "videoId": "O3ViBd5hQj4"
      },
      {
        "id": "gm-12",
        "title": "ആവണിപ്പൊന്നൂഞ്ഞാൽ",
        "artist": "M. G. Sreekumar",
        "film": "Kottaram Veettile Apputtan",
        "year": 1998,
        "duration": 265,
        "videoId": "GYEIurfHXVk"
      },
      {
        "id": "gm-13",
        "title": "അമ്പാടി പയ്യുകൾ മേയും",
        "artist": "K. J. Yesudas & Sujatha Mohan",
        "film": "Chandranudikkunnadhikkil",
        "year": 1999,
        "duration": 300,
        "videoId": "-Uk4vPog1vs"
      },
      {
        "id": "gm-14",
        "title": "നാടോടി പൂന്തിങ്കൾ",
        "artist": "M. G. Sreekumar & Sujatha Mohan",
        "film": "Oru Maravathoor Kanavu",
        "year": 1998,
        "duration": 300,
        "videoId": "PbMTpWsa8A8"
      },
      {
        "id": "gm-15",
        "title": "പൂക്കാലം വന്നു പൂക്കാലം",
        "artist": "K. S. Chithra & Unni Menon",
        "film": "Godfather",
        "year": 1991,
        "duration": 301,
        "videoId": "NO7N6ZrvgkM"
      },
      {
        "id": "gm-16",
        "title": "ചിങ്കാരക്കിന്നാരം",
        "artist": "M. G. Sreekumar & K. S. Chithra",
        "film": "Minnaram",
        "year": 1994,
        "duration": 250,
        "videoId": "xKT7JwBLi74"
      },
      {
        "id": "gm-17",
        "title": "തെച്ചിപ്പൂവേ",
        "artist": "K. J. Yesudas & K. S. Chithra",
        "film": "Pookkalam Varavayi",
        "year": 1991,
        "duration": 300,
        "videoId": "kU0Ie38VMB4"
      },
      {
        "id": "gm-18",
        "title": "കന്നിപ്പീലി തൂവലൊതുക്കും",
        "artist": "K. J. Yesudas & K. S. Chithra",
        "film": "Thoovalsparsham",
        "year": 1990,
        "duration": 300,
        "videoId": "IkhKZzuHLMM"
      },
      {
        "id": "gm-19",
        "title": "തങ്കത്തിങ്കൾ",
        "artist": "M. G. Sreekumar & K. S. Chithra",
        "film": "Indraprastham",
        "year": 1996,
        "duration": 300,
        "videoId": "oLVEQLfhM2I"
      },
      {
        "id": "gm-20",
        "title": "വെള്ളിനിലാ തുള്ളികളോ",
        "artist": "K. S. Chithra & M. G. Sreekumar",
        "film": "Varnappakittu",
        "year": 1997,
        "duration": 300,
        "videoId": "tQ19dswa-vk"
      },
      {
        "id": "gm-21",
        "title": "മാണിക്യക്കല്ലാൽ",
        "artist": "M. G. Sreekumar & Swarnalatha",
        "film": "Varnappakittu",
        "year": 1997,
        "duration": 300,
        "videoId": "wcNh7dkZ3XU"
      },
      {
        "id": "gm-22",
        "title": "എന്നും നിന്നെ പൂജിക്കാം",
        "artist": "K. J. Yesudas & Sujatha Mohan",
        "film": "Aniyathipraavu",
        "year": 1997,
        "duration": 300,
        "videoId": "G8_hWm71Fow"
      },
      {
        "id": "gm-23",
        "title": "തത്തമ്മപ്പേരു",
        "artist": "K. J. Yesudas & Sujatha Mohan",
        "film": "Dosth",
        "year": 2001,
        "duration": 272,
        "videoId": "J27NwQ2RXw8"
      },
      {
        "id": "gm-24",
        "title": "ശിശിരകാല മേഘ മിഥുന",
        "artist": "P. Jayachandran & K. S. Chithra",
        "film": "Devaragam",
        "year": 1996,
        "duration": 300,
        "videoId": "crYC9aOuP24"
      },
      {
        "id": "gm-25",
        "title": "കുനു കുനെ",
        "artist": "K. J. Yesudas & Sujatha Mohan",
        "film": "Yodha",
        "year": 1992,
        "duration": 231,
        "videoId": "ijskdMbThmo"
      },
      {
        "id": "gm-26",
        "title": "മന്ദാരച്ചെപ്പുണ്ടോ",
        "artist": "M. G. Sreekumar & K. S. Chithra",
        "film": "Dasharatham",
        "year": 1989,
        "duration": 240,
        "videoId": "cEP6oU0Qug4"
      },
      {
        "id": "gm-27",
        "title": "കിലുകിൽ പമ്പരം",
        "artist": "M. G. Sreekumar",
        "film": "Kilukkam",
        "year": 1991,
        "duration": 283,
        "videoId": "5ktGuZPeF60"
      },
      {
        "id": "gm-28",
        "title": "കറുത്തപെണ്ണേ",
        "artist": "K. J. Yesudas",
        "film": "Thenmavin Kombathu",
        "year": 1994,
        "duration": 300,
        "videoId": "JuUAh-02V4A"
      },
      {
        "id": "gm-29",
        "title": "അല്ലിമലർ കാവിൽ",
        "artist": "M. G. Sreekumar",
        "film": "Mithunam",
        "year": 1993,
        "duration": 240,
        "videoId": "43GUshLSEXY"
      },
      {
        "id": "gm-30",
        "title": "ഗോപികാ വസന്തം",
        "artist": "K. J. Yesudas & K. S. Chithra",
        "film": "His Highness Abdullah",
        "year": 1990,
        "duration": 300,
        "videoId": "KE0YE530BLs"
      },
      {
        "id": "gm-31",
        "title": "പഴംതമിഴ് പാട്ടിഴയും",
        "artist": "K. J. Yesudas",
        "film": "Manichitrathazhu",
        "year": 1993,
        "duration": 300,
        "videoId": "c30kl6okEaY"
      },
      {
        "id": "gm-32",
        "title": "വണ്ണാത്തിപ്പുഴയുടെ",
        "artist": "K. J. Yesudas",
        "film": "Kaliyattam",
        "year": 1997,
        "duration": 300,
        "videoId": "HF-0SRzkRL0"
      },
      {
        "id": "gm-33",
        "title": "ചെമ്പൂവേ പൂവേ",
        "artist": "K. J. Yesudas",
        "film": "Kaalapani",
        "year": 1996,
        "duration": 300,
        "videoId": "9xjAefn0QWc"
      },
      {
        "id": "gm-34",
        "title": "സൂര്യകിരീടം",
        "artist": "M. G. Sreekumar",
        "film": "Devasuram",
        "year": 1993,
        "duration": 300,
        "videoId": "APHnXa-f8yA"
      },
      {
        "id": "gm-35",
        "title": "മേഘം പൂത്തുതുടങ്ങി",
        "artist": "K. J. Yesudas",
        "film": "Thoovanathumbikal",
        "year": 1987,
        "duration": 300,
        "videoId": "JJP5b3s-LRM"
      },
      {
        "id": "gm-36",
        "title": "ഈറൻ മേഘം",
        "artist": "M. G. Sreekumar",
        "film": "Chithram",
        "year": 1988,
        "duration": 300,
        "videoId": "8-o2_5Iz0ik"
      },
      {
        "id": "gm-37",
        "title": "മാലേയം മാറോടലിഞ്ഞു",
        "artist": "M. G. Sreekumar",
        "film": "Thacholi Varghese Chekavar",
        "year": 1995,
        "duration": 300,
        "videoId": "_c4DrC3yJiw"
      },
      {
        "id": "gm-38",
        "title": "പൊന്നിൽ കുളിച്ചു നിന്നു",
        "artist": "K. J. Yesudas & K. S. Chithra",
        "film": "Sallapam",
        "year": 1996,
        "duration": 300,
        "videoId": "c6iI03rViOI"
      },
      {
        "id": "gm-39",
        "title": "തുമ്പയും തുളസിയും",
        "artist": "K. S. Chithra",
        "film": "Megham",
        "year": 1999,
        "duration": 300,
        "videoId": "Imb92SceKNE"
      },
      {
        "id": "gm-40",
        "title": "നിലാപ്പൈതലേ",
        "artist": "K. J. Yesudas & K. S. Chithra",
        "film": "Olympian Anthony Adam",
        "year": 1999,
        "duration": 300,
        "videoId": "lbHSnw-6hbI"
      },
      {
        "id": "gm-41",
        "title": "എന്റെ മനസ്സിലൊരു നാണം",
        "artist": "K. J. Yesudas & K. S. Chithra",
        "film": "Thenmavin Kombathu",
        "year": 1994,
        "duration": 300,
        "videoId": "yNrat8pIckg"
      },
      {
        "id": "gm-42",
        "title": "ചെല്ലക്കാറ്റേ",
        "artist": "K. J. Yesudas & K. S. Chithra",
        "film": "Kochu Kochu Santhoshangal",
        "year": 2000,
        "duration": 300,
        "videoId": "hRm4Zp6BJVY"
      },
      {
        "id": "gm-43",
        "title": "അമ്പലപ്പുഴെ ഉണ്ണിക്കണ്ണനോട്",
        "artist": "M. G. Sreekumar & K. S. Chithra",
        "film": "Adwaitham",
        "year": 1991,
        "duration": 311,
        "videoId": "LQK5cnQGMaE"
      },
      {
        "id": "gm-44",
        "title": "ശ്യാമമേഘമേ",
        "artist": "K. S. Chithra",
        "film": "Adhipan",
        "year": 1989,
        "duration": 300,
        "videoId": "QLVwGG1TZHk"
      },
      {
        "id": "gm-45",
        "title": "സുഖമോ ദേവീ",
        "artist": "K. J. Yesudas",
        "film": "Sukhamo Devi",
        "year": 1986,
        "duration": 300,
        "videoId": "QPI9-Xt7VCk"
      },
      {
        "id": "gm-46",
        "title": "നീ എൻ സ്വർഗ സംഗീതമേ",
        "artist": "K. J. Yesudas",
        "film": "Kaathodu Kaathoram",
        "year": 1985,
        "duration": 300,
        "videoId": "lnHWeOa0trA"
      },
      {
        "id": "gm-47",
        "title": "കണ്ടു ഞാൻ മിഴികളിൽ",
        "artist": "M. G. Sreekumar",
        "film": "Abhimanyu",
        "year": 1991,
        "duration": 300,
        "videoId": "zQ32wZ4jx-U"
      },
      {
        "id": "gm-48",
        "title": "പൊൻവീണേ എൻ ഉള്ളിൽ",
        "artist": "M. G. Sreekumar & K. S. Chithra",
        "film": "Thalavattam",
        "year": 1986,
        "duration": 300,
        "videoId": "3vp4ddZ-bCI"
      },
      {
        "id": "gm-49",
        "title": "പാതിരാമഴയേതോ",
        "artist": "K. J. Yesudas & K. S. Chithra",
        "film": "Ulladakkam",
        "year": 1991,
        "duration": 300,
        "videoId": "7rQPiE588u0"
      },
      {
        "id": "gm-50",
        "title": "നിലാവിന്റെ നീലഭസ്മം",
        "artist": "M. G. Sreekumar",
        "film": "Agnidevan",
        "year": 1995,
        "duration": 300,
        "videoId": "Vgm4pt1CFZQ"
      },
      {
        "id": "gm-51",
        "title": "താമരപ്പൂവിൽ വാഴും",
        "artist": "K. J. Yesudas & K. S. Chithra",
        "film": "Chandralekha",
        "year": 1997,
        "duration": 300,
        "videoId": "OVoPnym73jg"
      },
      {
        "id": "gm-52",
        "title": "ശ്രീരാഗമോ തേടുന്നു നീ",
        "artist": "K. J. Yesudas",
        "film": "Pavithram",
        "year": 1994,
        "duration": 320,
        "videoId": "aD9lDmwt9rk"
      },
      {
        "id": "gm-53",
        "title": "ദേവാംഗനകൾ കയ്യൊഴിഞ്ഞൊരീണം",
        "artist": "K. J. Yesudas",
        "film": "Njan Gandharvan",
        "year": 1991,
        "duration": 275,
        "videoId": "XPuhnjneejU"
      },
      {
        "id": "gm-54",
        "title": "മഞ്ഞൾ പ്രസാദവും",
        "artist": "K. S. Chithra",
        "film": "Nakhakshathangal",
        "year": 1986,
        "duration": 250,
        "videoId": "bCIzXbvtdYg"
      },
      {
        "id": "gm-55",
        "title": "ആരെയും ഭാവഗായകനാക്കും",
        "artist": "K. J. Yesudas",
        "film": "Nakhakshathangal",
        "year": 1986,
        "duration": 255,
        "videoId": "NtAsTxKcWBo"
      },
      {
        "id": "gm-56",
        "title": "ഹരിമുരളീരവം",
        "artist": "K. J. Yesudas",
        "film": "Aaraam Thampuran",
        "year": 1997,
        "duration": 350,
        "videoId": "94tDeXtnHYA"
      },
      {
        "id": "gm-57",
        "title": "ദേവസഭാതലം",
        "artist": "K. J. Yesudas & Raveendran",
        "film": "His Highness Abdullah",
        "year": 1990,
        "duration": 335,
        "videoId": "soyx2Ynuaz8"
      },
      {
        "id": "gm-58",
        "title": "രാമകഥാ ഗാനലയം",
        "artist": "K. J. Yesudas",
        "film": "Bharatham",
        "year": 1991,
        "duration": 340,
        "videoId": "s3qEViqJoog"
      },
      {
        "id": "gm-59",
        "title": "ഗോപാംഗനേ ആത്മാവിലെന്തോ",
        "artist": "K. J. Yesudas",
        "film": "Bharatham",
        "year": 1991,
        "duration": 290,
        "videoId": "wCQYL-DK88w"
      },
      {
        "id": "gm-60",
        "title": "ചന്ദനമണിവാതിൽ പാതിചാരി",
        "artist": "G. Venugopal",
        "film": "Marikkunnilla Njan",
        "year": 1988,
        "duration": 250,
        "videoId": "kOoKAc7PLgo"
      },
      {
        "id": "gm-61",
        "title": "ആയിരം കണ്ണുമായ്",
        "artist": "K. J. Yesudas",
        "film": "Nokkethadhoorathu Kannum Nattu",
        "year": 1984,
        "duration": 275,
        "videoId": "Aa5xpCttmgk"
      },
      {
        "id": "gm-62",
        "title": "താമരക്കണ്ണനാ ഉറങ്ങേണം",
        "artist": "K. J. Yesudas",
        "film": "Vatsalyam",
        "year": 1993,
        "duration": 295,
        "videoId": "pH4rCGhxB5U"
      },
      {
        "id": "gm-63",
        "title": "അഴകേ നിൻ മിഴിനീർക്കണ്ണിൽ",
        "artist": "K. J. Yesudas & K. S. Chithra",
        "film": "Amaram",
        "year": 1991,
        "duration": 310,
        "videoId": "-xHw8M7Uvjs"
      },
      {
        "id": "gm-64",
        "title": "വികാരനൗകയുമായ്",
        "artist": "K. J. Yesudas",
        "film": "Amaram",
        "year": 1991,
        "duration": 285,
        "videoId": "qboVkft8TtI"
      },
      {
        "id": "gm-65",
        "title": "കണ്ണോടു കണ്ണോരം",
        "artist": "K. J. Yesudas & K. S. Chithra",
        "film": "Veendum Chila Veettukaryangal",
        "year": 1999,
        "duration": 290,
        "videoId": "qbZu79f7GGA"
      },
      {
        "id": "gm-66",
        "title": "മാനത്തെ വെള്ളിത്തേരിൽ",
        "artist": "K. J. Yesudas",
        "film": "Kizhakkunarum Pakshi",
        "year": 1991,
        "duration": 290,
        "videoId": "75-FbesBBNg"
      },
      {
        "id": "gm-67",
        "title": "പൂവേ ഒരു മഴമുത്തം",
        "artist": "K. J. Yesudas & Sujatha Mohan",
        "film": "Chithram",
        "year": 1988,
        "duration": 270,
        "videoId": "C0sMtQ5uiT4"
      },
      {
        "id": "gm-68",
        "title": "നീരാടുവാൻ നിളയിൽ",
        "artist": "K. J. Yesudas",
        "film": "Nakhakshathangal",
        "year": 1986,
        "duration": 270,
        "videoId": "pfOJPZHz228"
      },
      {
        "id": "gm-69",
        "title": "ആലിപ്പഴം പെറുക്കാൻ",
        "artist": "S. Janaki",
        "film": "My Dear Kuttichathan",
        "year": 1984,
        "duration": 250,
        "videoId": "kkeP7d0zO9s"
      },
      {
        "id": "gm-70",
        "title": "കൈതപ്പൂവിൻ കന്നിക്കുറുമ്പിൽ",
        "artist": "K. S. Chithra",
        "film": "Kannezhuthi Pottum Thottu",
        "year": 1999,
        "duration": 270,
        "videoId": "UD_1Tg3GPhA"
      },
      {
        "id": "gm-71",
        "title": "മൗനസരോവരമാകെ",
        "artist": "K. J. Yesudas",
        "film": "Savidham",
        "year": 1992,
        "duration": 300,
        "videoId": "-OteUERVHIs"
      },
      {
        "id": "gm-72",
        "title": "ദേവദൂതർ പാടി",
        "artist": "K. J. Yesudas",
        "film": "Kaathodu Kaathoram",
        "year": 1985,
        "duration": 290,
        "videoId": "xnsEYfZieJo"
      },
      {
        "id": "gm-73",
        "title": "കാതോടു കാതോരം",
        "artist": "K. J. Yesudas & Lathika",
        "film": "Kaathodu Kaathoram",
        "year": 1985,
        "duration": 280,
        "videoId": "Obb-T1BWCQ8"
      },
      {
        "id": "gm-74",
        "title": "ഒരു പുഷ്പം മാത്രമെൻ",
        "artist": "K. J. Yesudas",
        "film": "Pareeksha",
        "year": 1967,
        "duration": 240,
        "videoId": "DqKkDRFD8c0"
      },
      {
        "id": "gm-75",
        "title": "അനുരാഗിണീ ഇതാ എൻ",
        "artist": "K. J. Yesudas",
        "film": "Oru Kudakkeezhil",
        "year": 1985,
        "duration": 285,
        "videoId": "KGe0FEa8X_Q"
      },
      {
        "id": "gm-76",
        "title": "എന്തിനു വേറൊരു സൂര്യോദയം",
        "artist": "K. J. Yesudas & K. S. Chithra",
        "film": "Mazhayethum Munpe",
        "year": 1995,
        "duration": 305,
        "videoId": "ZcuCM8faExQ"
      },
      {
        "id": "gm-77",
        "title": "താനേ പൂവിട്ട മോഹം",
        "artist": "G. Venugopal",
        "film": "Sasneham",
        "year": 1990,
        "duration": 275,
        "videoId": "rkIxt3aE-UA"
      },
      {
        "id": "gm-78",
        "title": "സൗപർണ്ണികാമൃത വീചികൾ",
        "artist": "K. J. Yesudas",
        "film": "Kizhakkunarum Pakshi",
        "year": 1991,
        "duration": 310,
        "videoId": "KY1JnXnoA-Y"
      },
      {
        "id": "gm-79",
        "title": "ഒന്നാം രാഗം പാടി",
        "artist": "K. J. Yesudas & K. S. Chithra",
        "film": "Thoovanathumbikal",
        "year": 1987,
        "duration": 290,
        "videoId": "pBbHUxjiKd8"
      },
      {
        "id": "gm-80",
        "title": "ചന്ദനച്ചോലയിൽ",
        "artist": "K. J. Yesudas",
        "film": "Sallapam",
        "year": 1996,
        "duration": 270,
        "videoId": "68HKPqIaEkw"
      },
      {
        "id": "gm-81",
        "title": "മധുരം ജീവാമൃത ബിന്ദു",
        "artist": "K. J. Yesudas",
        "film": "Chenkol",
        "year": 1993,
        "duration": 295,
        "videoId": "tXkEdpAXpD8"
      },
      {
        "id": "gm-82",
        "title": "തങ്കത്തോണി തെന്മലയോരം",
        "artist": "K. S. Chithra",
        "film": "Mazhavilkavadi",
        "year": 1989,
        "duration": 260,
        "videoId": "NPeHV7AKBIg"
      },
      {
        "id": "gm-83",
        "title": "മഞ്ഞൾ പ്രസാദവും നെറ്റിയിൽ ചാർത്തി",
        "artist": "K. S. Chithra",
        "film": "Nakhakshathangal",
        "year": 1986,
        "duration": 240,
        "videoId": "wv5KsCGHqwI"
      },
      {
        "id": "gm-84",
        "title": "നീർപ്പളുങ്കുകൾ ചിതറി വീഴുമീ",
        "artist": "K. J. Yesudas",
        "film": "Yathra",
        "year": 1985,
        "duration": 245,
        "videoId": "bBXASBIGluw"
      },
      {
        "id": "gm-85",
        "title": "കേവല മർത്ത്യഭാഷ കേൾക്കാത്ത",
        "artist": "K. J. Yesudas",
        "film": "Naran",
        "year": 2005,
        "duration": 270,
        "videoId": "12n5b0EjPhI"
      },
      {
        "id": "gm-86",
        "title": "പുലർകാല സുന്ദര സ്വപ്നത്തിൽ",
        "artist": "K. J. Yesudas",
        "film": "Oru Maymasa Pulariyil",
        "year": 1987,
        "duration": 255,
        "videoId": "faAk-j58AzE"
      },
      {
        "id": "gm-87",
        "title": "ചന്ദനമണി വാതിൽ പാതി ചാരി",
        "artist": "G. Venugopal",
        "film": "Marikkunnilla Njan",
        "year": 1988,
        "duration": 265,
        "videoId": "Dc49GNr4ZVo"
      },
      {
        "id": "gm-88",
        "title": "സ്വർണ്ണമുകിലേ",
        "artist": "K. S. Chithra",
        "film": "Ithiri Poove Chuvannapoove",
        "year": 1984,
        "duration": 250,
        "videoId": "UUh-AjJULio"
      },
      {
        "id": "gm-89",
        "title": "ആയിരം കണ്ണുമായ് കാത്തിരുന്നു",
        "artist": "K. J. Yesudas",
        "film": "Nokkethadhoorathu Kannum Nattu",
        "year": 1984,
        "duration": 270,
        "videoId": "alpdLWpdbpY"
      },
      {
        "id": "gm-90",
        "title": "ദേവാങ്കണങ്ങൾ കയ്യൊഴിഞ്ഞ",
        "artist": "K. J. Yesudas",
        "film": "Njan Gandharvan",
        "year": 1991,
        "duration": 285,
        "videoId": "NWnFk-_cl38"
      },
      {
        "id": "gm-91",
        "title": "പാലപ്പൂവേ നിൻ തിരുമുറ്റത്ത്",
        "artist": "K. S. Chithra",
        "film": "Thacholi Varghese Chekavar",
        "year": 1995,
        "duration": 280,
        "videoId": "3LXqXulKHes"
      },
      {
        "id": "gm-92",
        "title": "മാണിക്യവീണയുമായെൻ",
        "artist": "K. J. Yesudas",
        "film": "Kattu Pookkal",
        "year": 1965,
        "duration": 240,
        "videoId": "B8KS43OevKA"
      },
      {
        "id": "gm-93",
        "title": "ശ്രീലവസന്തം",
        "artist": "K. J. Yesudas",
        "film": "Nandhanam",
        "year": 2002,
        "duration": 265,
        "videoId": "ZYvd85PoXQc"
      },
      {
        "id": "gm-94",
        "title": "ഗോപാംഗനേ",
        "artist": "K. J. Yesudas",
        "film": "Bharatham",
        "year": 1991,
        "duration": 290,
        "videoId": "dlklnBcWPBo"
      },
      {
        "id": "gm-95",
        "title": "ചന്ദ്രികയിൽ അലിയുന്നു ശലഭം",
        "artist": "K. J. Yesudas & P. Leela",
        "film": "Kavyamela",
        "year": 1965,
        "duration": 250,
        "videoId": "Dbhmm0vLDEY"
      },
      {
        "id": "gm-96",
        "title": "താമസമെന്തേ വരുവാൻ",
        "artist": "K. J. Yesudas",
        "film": "Bhargavi Nilayam",
        "year": 1964,
        "duration": 260,
        "videoId": "vUIJWOHyUPI"
      },
      {
        "id": "gm-97",
        "title": "അല്ലിയാമ്പൽ കടവിൽ",
        "artist": "K. J. Yesudas",
        "film": "Rosi",
        "year": 1965,
        "duration": 245,
        "videoId": "5b7tP-tQGis"
      },
      {
        "id": "gm-98",
        "title": "ഏകാന്തതയുടെ അപാരതീരം",
        "artist": "Kamukara Purushothaman",
        "film": "Bhargavi Nilayam",
        "year": 1964,
        "duration": 240,
        "videoId": "Dgu4wv_xEzc"
      },
      {
        "id": "gm-99",
        "title": "അനുപമേ അഴകേ",
        "artist": "K. J. Yesudas",
        "film": "Pranayam",
        "year": 2011,
        "duration": 260,
        "videoId": "Cq3BfhB-n5M"
      },
      {
        "id": "gm-100",
        "title": "മേലേ മേലേ മാനം",
        "artist": "K. J. Yesudas",
        "film": "No 20 Madras Mail",
        "year": 1990,
        "duration": 280,
        "videoId": "-K8cQ2YytKI"
      }
    ]
  },
  {
    "id": "monsoon-memories",
    "name": "Monsoon Memories",
    "tracks": [
      {
        "id": "mm-1",
        "title": "കരിമിഴി കുരുവിയെ",
        "artist": "V. Devanand & Sujatha Mohan",
        "film": "Meesamadhavan",
        "year": 2002,
        "duration": 303,
        "videoId": "hraTNj9Au-A"
      },
      {
        "id": "mm-2",
        "title": "എന്റെ എല്ലാം എല്ലാം അല്ലേ",
        "artist": "K. J. Yesudas & Sujatha Mohan",
        "film": "Meesamadhavan",
        "year": 2002,
        "duration": 333,
        "videoId": "srwF8C1wOZU"
      },
      {
        "id": "mm-3",
        "title": "കസവിന്റെ തട്ടമിട്ട്",
        "artist": "Vineeth Sreenivasan",
        "film": "Kilichundan Mampazham",
        "year": 2003,
        "duration": 300,
        "videoId": "pixeuHwj9t4"
      },
      {
        "id": "mm-4",
        "title": "ഒന്നാംകിളി പൊന്നാംകിളി",
        "artist": "K. J. Yesudas & K. S. Chithra",
        "film": "Kilichundan Mampazham",
        "year": 2003,
        "duration": 300,
        "videoId": "o858vJHqKMo"
      },
      {
        "id": "mm-5",
        "title": "ജൂണിലെ നിലാമഴയിൽ",
        "artist": "K. J. Yesudas & Sujatha Mohan",
        "film": "Nammal",
        "year": 2002,
        "duration": 300,
        "videoId": "whN-ER-lbfE"
      },
      {
        "id": "mm-6",
        "title": "ഈ മഴ മേഘം",
        "artist": "Remya Nambeesan",
        "film": "Ohm Shanthi Oshaana",
        "year": 2014,
        "duration": 246,
        "videoId": "Dg9-eni9zWk"
      },
      {
        "id": "mm-7",
        "title": "ഒരു കരിമുകിലിനു",
        "artist": "Vijay Prakash",
        "film": "Charlie",
        "year": 2015,
        "duration": 283,
        "videoId": "ArYW9uI-_LI"
      },
      {
        "id": "mm-8",
        "title": "കല്ലായി കടവത്തെ",
        "artist": "P. Jayachandran & Sujatha Mohan",
        "film": "Perumazhakkalam",
        "year": 2004,
        "duration": 260,
        "videoId": "a8EQ37-HbOk"
      },
      {
        "id": "mm-9",
        "title": "നീ മണിമുകിലാടകൾ",
        "artist": "P. Jayachandran & K. S. Chithra",
        "film": "Vellithira",
        "year": 2003,
        "duration": 377,
        "videoId": "uMk6Y1YLzVc"
      },
      {
        "id": "mm-10",
        "title": "പച്ചപ്പനം തത്തേ",
        "artist": "K. J. Yesudas",
        "film": "Nottam",
        "year": 2006,
        "duration": 300,
        "videoId": "kzJ9wh3PHw0"
      },
      {
        "id": "mm-11",
        "title": "മഴയേ തൂമഴയേ",
        "artist": "Haricharan & Mridula Warrier",
        "film": "Pattam Pole",
        "year": 2013,
        "duration": 298,
        "videoId": "oCPxqe8RWuA"
      },
      {
        "id": "mm-12",
        "title": "ശാരദാംബരം ചാരിതൂവിയോ",
        "artist": "K. J. Yesudas & K. S. Chithra",
        "film": "Ennu Ninte Moideen",
        "year": 2015,
        "duration": 250,
        "videoId": "FVY0j54J8g8"
      },
      {
        "id": "mm-13",
        "title": "മഴനീർത്തുള്ളികൾ",
        "artist": "Unni Menon",
        "film": "Beautiful",
        "year": 2011,
        "duration": 260,
        "videoId": "OzvQFsYFkYo"
      },
      {
        "id": "mm-14",
        "title": "ആരോ വിരൽ മീട്ടി",
        "artist": "K. J. Yesudas",
        "film": "Pranayavarnangal",
        "year": 1998,
        "duration": 285,
        "videoId": "Lxx91VXI2Co"
      },
      {
        "id": "mm-15",
        "title": "ഓ പ്രിയേ പ്രിയേ",
        "artist": "K. J. Yesudas & K. S. Chithra",
        "film": "Aniyathipraavu",
        "year": 1997,
        "duration": 300,
        "videoId": "OZV7bIRfpNg"
      },
      {
        "id": "mm-16",
        "title": "കണ്ണീർപ്പൂവിന്റെ കവിളിൽ തലോടി",
        "artist": "M. G. Sreekumar",
        "film": "Kireedam",
        "year": 1989,
        "duration": 280,
        "videoId": "JeQFOr-JqsI"
      },
      {
        "id": "mm-17",
        "title": "ചന്ദനലേപ സുഗന്ധം",
        "artist": "K. J. Yesudas",
        "film": "Oru Vadakkan Veeragatha",
        "year": 1989,
        "duration": 290,
        "videoId": "Td4JPIf5t-g"
      },
      {
        "id": "mm-18",
        "title": "ഹിമശൈല സൈകത",
        "artist": "K. S. Chithra",
        "film": "Sallapam",
        "year": 1996,
        "duration": 280,
        "videoId": "5i3FC5-Hb5A"
      },
      {
        "id": "mm-19",
        "title": "ആഷാഢം പാടുമ്പോൾ",
        "artist": "K. J. Yesudas & K. S. Chithra",
        "film": "Mazha",
        "year": 2000,
        "duration": 290,
        "videoId": "DW2bAoEeJBw"
      },
      {
        "id": "mm-20",
        "title": "മനസ്സിൻ മണിച്ചിമിഴിൽ",
        "artist": "K. J. Yesudas",
        "film": "Arayannangalude Veedu",
        "year": 2000,
        "duration": 295,
        "videoId": "YBx0maXkPKA"
      },
      {
        "id": "mm-21",
        "title": "കണ്ണീർ മഴയത്തു",
        "artist": "K. J. Yesudas",
        "film": "Joker",
        "year": 2000,
        "duration": 300,
        "videoId": "nJXS4MozrBY"
      },
      {
        "id": "mm-22",
        "title": "പൂമാനമേ",
        "artist": "K. S. Chithra",
        "film": "Nirakkoottu",
        "year": 1985,
        "duration": 270,
        "videoId": "SoGrvztHyu0"
      },
      {
        "id": "mm-23",
        "title": "ഉണ്ണീ വാവാവോ",
        "artist": "K. S. Chithra",
        "film": "Santhwanam",
        "year": 1991,
        "duration": 275,
        "videoId": "VBrEXIrvm8I"
      },
      {
        "id": "mm-24",
        "title": "പ്രണയമണിത്തൂവൽ പൊഴിയും",
        "artist": "Sujatha Mohan",
        "film": "Azhakiya Ravanan",
        "year": 1996,
        "duration": 285,
        "videoId": "7MxAfgqXz_M"
      },
      {
        "id": "mm-25",
        "title": "വെണ്ണിലാ ചന്ദനക്കിണ്ണം",
        "artist": "K. J. Yesudas & Shabnam",
        "film": "Azhakiya Ravanan",
        "year": 1996,
        "duration": 290,
        "videoId": "UUHUWxoSPGw"
      },
      {
        "id": "mm-26",
        "title": "കാറ്റേ നീ വീശരുതിപ്പോൾ",
        "artist": "K. S. Chithra",
        "film": "Kattu Vannu Vilichappol",
        "year": 2001,
        "duration": 290,
        "videoId": "ZJOWKWUsnBo"
      },
      {
        "id": "mm-27",
        "title": "മുക്കത്തേ പെണ്ണേ",
        "artist": "Mohammed Maqbool Mansoor & Gopi Sundar",
        "film": "Ennu Ninte Moideen",
        "year": 2015,
        "duration": 230,
        "videoId": "graP-a1MxN4"
      },
      {
        "id": "mm-28",
        "title": "മഴവില്ലിൻ അജ്ഞാത വാസസ്ഥലം",
        "artist": "K. J. Yesudas",
        "film": "Pattalam",
        "year": 2003,
        "duration": 280,
        "videoId": "eNzwVO_ZX-c"
      },
      {
        "id": "mm-29",
        "title": "ആത്മാവിൽ മുട്ടിവിളിച്ചതുപോലെ",
        "artist": "K. J. Yesudas",
        "film": "Aaranyakam",
        "year": 1988,
        "duration": 295,
        "videoId": "9n2kgzyWPLc"
      },
      {
        "id": "mm-30",
        "title": "മഴനീർത്തുള്ളികൾ",
        "artist": "M. G. Sreekumar & Sujatha",
        "film": "Vettam",
        "year": 2004,
        "duration": 290,
        "videoId": "S-MY1mf_1pc"
      },
      {
        "id": "mm-31",
        "title": "വാർമുകിലേ വാനിൽ നീ",
        "artist": "K. S. Chithra",
        "film": "Mazha",
        "year": 2000,
        "duration": 270,
        "videoId": "iwdTC8oI8k0"
      },
      {
        "id": "mm-32",
        "title": "പെയ്യാതെ പോയ മഴയോ",
        "artist": "K. J. Yesudas",
        "film": "Mazha",
        "year": 2000,
        "duration": 280,
        "videoId": "xdrf2bYb1J4"
      },
      {
        "id": "mm-33",
        "title": "ഒരു രാത്രി കൂടി വിടവാങ്ങവേ",
        "artist": "K. J. Yesudas",
        "film": "Summer in Bethlehem",
        "year": 1998,
        "duration": 300,
        "videoId": "LqGEOufEdFc"
      },
      {
        "id": "mm-34",
        "title": "മാരിക്കൂടinnu മാനം",
        "artist": "K. J. Yesudas",
        "film": "Pingami",
        "year": 1994,
        "duration": 270,
        "videoId": "WDtb_n7V_lA"
      },
      {
        "id": "mm-35",
        "title": "മഞ്ഞുകാലം നോറ്റ മരം",
        "artist": "K. J. Yesudas",
        "film": "Engane Nee Marakkum",
        "year": 1983,
        "duration": 260,
        "videoId": "bTHwCxudqCE"
      },
      {
        "id": "mm-36",
        "title": "ഇന്നലെ എൻ നെഞ്ചിലെ",
        "artist": "K. J. Yesudas",
        "film": "Balettan",
        "year": 2003,
        "duration": 275,
        "videoId": "YscTBtENaF0"
      },
      {
        "id": "mm-37",
        "title": "എന്തു പറഞ്ഞാലും നീ എന്റേതല്ലേ",
        "artist": "K. J. Yesudas",
        "film": "Kanmadam",
        "year": 1998,
        "duration": 280,
        "videoId": "9arkzalx4Js"
      },
      {
        "id": "mm-38",
        "title": "പൂന്തേനരുവി പൊൻമുടിപ്പുഴയുടെ",
        "artist": "K. J. Yesudas",
        "film": "Oru Minnaminunginte Nurunguvettam",
        "year": 1987,
        "duration": 280,
        "videoId": "YenpclW-fXw"
      },
      {
        "id": "mm-39",
        "title": "മെല്ലെ മെല്ലെ മുഖപടം",
        "artist": "K. J. Yesudas",
        "film": "Oru Minnaminunginte Nurunguvettam",
        "year": 1987,
        "duration": 260,
        "videoId": "uQaHAo45nnM"
      },
      {
        "id": "mm-40",
        "title": "കാറ്റോടു കാതോരം",
        "artist": "K. J. Yesudas & Lathika",
        "film": "Kaathodu Kaathoram",
        "year": 1985,
        "duration": 250,
        "videoId": "xD7YidNHbcg"
      },
      {
        "id": "mm-41",
        "title": "നിലാവിന്റെ നീലഭസ്മക്കുറിയിട്ടവളേ",
        "artist": "M. G. Sreekumar",
        "film": "Agnidevan",
        "year": 1995,
        "duration": 295,
        "videoId": "vfskc13V4zc"
      },
      {
        "id": "mm-42",
        "title": "പാതിരാപ്പാല പൂത്തു",
        "artist": "K. J. Yesudas",
        "film": "Manivathoorile Aayiram Sivarathrikal",
        "year": 1987,
        "duration": 270,
        "videoId": "l5ba4wM-BAM"
      },
      {
        "id": "mm-43",
        "title": "അരികിൽ നീയുണ്ടായിരുന്നെങ്കിൽ",
        "artist": "K. J. Yesudas",
        "film": "Nee Ethra Dhanya",
        "year": 1987,
        "duration": 265,
        "videoId": "ApnGtx8Hhok"
      },
      {
        "id": "mm-44",
        "title": "ദേവസംഗീതം നീയല്ലേ",
        "artist": "K. J. Yesudas & Radhika Thilak",
        "film": "Guru",
        "year": 1997,
        "duration": 280,
        "videoId": "agaFoKER7A8"
      },
      {
        "id": "mm-45",
        "title": "മറന്നിട്ടുമെന്തിനോ മനസ്സിൻ മണിയറയിൽ",
        "artist": "P. Jayachandran & Sujatha",
        "film": "Randam Bhavam",
        "year": 2001,
        "duration": 285,
        "videoId": "12T5zJtDG9I"
      },
      {
        "id": "mm-46",
        "title": "കിളിച്ചുണ്ടൻ മാമ്പഴം ചുണ്ടിൽ",
        "artist": "M. G. Sreekumar & Sujatha",
        "film": "Kilichundan Mampazham",
        "year": 2003,
        "duration": 290,
        "videoId": "n4a2bkFvSag"
      },
      {
        "id": "mm-47",
        "title": "കസ്തൂരിമാൻ കുറുമ്പേ",
        "artist": "M. G. Sreekumar",
        "film": "Kilichundan Mampazham",
        "year": 2003,
        "duration": 280,
        "videoId": "Y85hHfTw6XA"
      },
      {
        "id": "mm-48",
        "title": "ഒന്നാം കിളി പൊന്നാൺകിളി",
        "artist": "M. G. Sreekumar & Sujatha",
        "film": "Kilichundan Mampazham",
        "year": 2003,
        "duration": 295,
        "videoId": "Rfy2D8nT7Bo"
      },
      {
        "id": "mm-49",
        "title": "പവിഴമഴയേ",
        "artist": "K. S. Harisankar",
        "film": "Athiran",
        "year": 2019,
        "duration": 250,
        "videoId": "P-jKtzUuVcM"
      },
      {
        "id": "mm-50",
        "title": "നീ മണിമുകിലായ്",
        "artist": "M. G. Sreekumar & K. S. Chithra",
        "film": "Kakkakuyil",
        "year": 2001,
        "duration": 290,
        "videoId": "L7PlgWuV1OM"
      },
      {
        "id": "mm-51",
        "title": "മേഘരാഗം നേർത്തൊരു",
        "artist": "K. S. Chithra",
        "film": "Kakkakuyil",
        "year": 2001,
        "duration": 275,
        "videoId": "_0dx-8BR0T4"
      },
      {
        "id": "mm-52",
        "title": "പൊൻപുലരിയിൽ",
        "artist": "K. J. Yesudas",
        "film": "Unnikale Oru Kadha Parayam",
        "year": 1987,
        "duration": 260,
        "videoId": "VnOLG5amCIQ"
      },
      {
        "id": "mm-53",
        "title": "ഉണ്ണികളെ ഒരു കഥ പറയാം",
        "artist": "K. J. Yesudas",
        "film": "Unnikale Oru Kadha Parayam",
        "year": 1987,
        "duration": 270,
        "videoId": "wMiVIOzjvxg"
      },
      {
        "id": "mm-54",
        "title": "ശാന്തമീ രാത്രിയിൽ",
        "artist": "K. J. Yesudas",
        "film": "Johnny Walker",
        "year": 1992,
        "duration": 280,
        "videoId": "vrrQ5QjW_sI"
      },
      {
        "id": "mm-55",
        "title": "ചെമ്പൂവേ പൂവേ",
        "artist": "K. J. Yesudas & Sujatha",
        "film": "Sneham",
        "year": 1998,
        "duration": 290,
        "videoId": "tT2dcK70QPQ"
      },
      {
        "id": "mm-56",
        "title": "ഹരിചന്ദന മലരുകളായ്",
        "artist": "M. G. Sreekumar",
        "film": "Kannezhuthi Pottum Thottu",
        "year": 1999,
        "duration": 275,
        "videoId": "-lQxo3_QhPs"
      },
      {
        "id": "mm-57",
        "title": "ഓർമ്മകൾ ഓടിക്കളിക്കുവാനെത്തുന്നു",
        "artist": "M. G. Sreekumar",
        "film": "Mukundetta Sumithra Vilikkunnu",
        "year": 1988,
        "duration": 265,
        "videoId": "f7bCKCaJkOg"
      },
      {
        "id": "mm-58",
        "title": "എന്റെ ഉള്ളുടുക്കം കൊട്ടി",
        "artist": "K. J. Yesudas",
        "film": "Kannezhuthi Pottum Thottu",
        "year": 1999,
        "duration": 285,
        "videoId": "z3kz8fyJ4mM"
      },
      {
        "id": "mm-59",
        "title": "എത്ര പൂക്കാലം",
        "artist": "M. G. Sreekumar",
        "film": "Rakkuyilin Ragasadassil",
        "year": 1986,
        "duration": 260,
        "videoId": "QbXCX_kSRgo"
      },
      {
        "id": "mm-60",
        "title": "പൂങ്കാറ്റിനോടും കിളികളോടും",
        "artist": "K. J. Yesudas",
        "film": "Poomukhappadiyil Ninneyum Kaathu",
        "year": 1986,
        "duration": 270,
        "videoId": "ADU0B95tbvo"
      },
      {
        "id": "mm-61",
        "title": "പെണ്ണാളേ പെണ്ണാളേ",
        "artist": "P. Leela & K. J. Yesudas",
        "film": "Chemmeen",
        "year": 1965,
        "duration": 240,
        "videoId": "mvTk9xdAzOg"
      },
      {
        "id": "mm-62",
        "title": "പുഴയോരത്തിൽ പൂന്തോണിയിൽ",
        "artist": "S. Janaki",
        "film": "Adaminte Vaariyellu",
        "year": 1983,
        "duration": 260,
        "videoId": "4jG9RotOjLM"
      },
      {
        "id": "mm-63",
        "title": "നീലക്കുറിഞ്ഞികൾ പൂക്കുന്ന വീഥിയിൽ",
        "artist": "K. J. Yesudas & S. Janaki",
        "film": "Neelakkurinji Poothappol",
        "year": 1987,
        "duration": 275,
        "videoId": "Z8ktZu08eeA"
      },
      {
        "id": "mm-64",
        "title": "ഇന്നുമെന്റെ കണ്ണുനീരിൽ",
        "artist": "K. J. Yesudas",
        "film": "Yuvajanotsavam",
        "year": 1986,
        "duration": 260,
        "videoId": "9eacMX-mpB0"
      },
      {
        "id": "mm-65",
        "title": "മായമഞ്ചലിൽ",
        "artist": "G. Venugopal & Radhika Thilak",
        "film": "Ottayal Pattalam",
        "year": 1991,
        "duration": 280,
        "videoId": "wVIRmAjmNAk"
      },
      {
        "id": "mm-66",
        "title": "തുള്ളിമഞ്ചാടികൾ",
        "artist": "Kalabhavan Mani",
        "film": "Kaazhcha",
        "year": 2004,
        "duration": 265,
        "videoId": "n0HYJcsjFSw"
      },
      {
        "id": "mm-67",
        "title": "കുണുങ്ങി കുണുങ്ങി നടക്കുന്ന കാറ്റേ",
        "artist": "M. G. Sreekumar & K. S. Chithra",
        "film": "Varnapakittu",
        "year": 1997,
        "duration": 285,
        "videoId": "iqeIUAFV_GY"
      },
      {
        "id": "mm-68",
        "title": "ആകാശദൂതു പോയോ",
        "artist": "K. S. Chithra",
        "film": "Akashadoothu",
        "year": 1993,
        "duration": 270,
        "videoId": "AcAL9nai7Hg"
      },
      {
        "id": "mm-69",
        "title": "ആലിപ്പഴം ചുരത്തും",
        "artist": "Rajalakshmy",
        "film": "Kuttisrank",
        "year": 2010,
        "duration": 240,
        "videoId": "BwBcFFst6AY"
      },
      {
        "id": "mm-70",
        "title": "എൻ പൂവേ പൊൻപൂവേ",
        "artist": "S. Janaki",
        "film": "Kattathe Kilikkoodu",
        "year": 1983,
        "duration": 250,
        "videoId": "t7C6LNu7SSQ"
      },
      {
        "id": "mm-71",
        "title": "മന്ദാരച്ചെപ്പുണ്ടോ",
        "artist": "M. G. Sreekumar & K. S. Chithra",
        "film": "Dasaratham",
        "year": 1989,
        "duration": 275,
        "videoId": "EK7uz1PrCNg"
      },
      {
        "id": "mm-72",
        "title": "പൂത്താലം വലംകയ്യിൽ",
        "artist": "P. Jayachandran",
        "film": "Thilakkam",
        "year": 2003,
        "duration": 280,
        "videoId": "_YLJW_gr2HQ"
      },
      {
        "id": "mm-73",
        "title": "മഴവില്ലിൻ തീരങ്ങൾ",
        "artist": "Najim Arshad",
        "film": "Oru Indian Pranayakadha",
        "year": 2013,
        "duration": 250,
        "videoId": "4VF6ADoO8rI"
      },
      {
        "id": "mm-74",
        "title": "തിരനുരയും ചുരുൾമുടിയിൽ",
        "artist": "K. J. Yesudas",
        "film": "Ananthabhadram",
        "year": 2005,
        "duration": 280,
        "videoId": "z6AjRAlIk0g"
      },
      {
        "id": "mm-75",
        "title": "പിന്നെയുമൊരു മഴക്കാലം",
        "artist": "P. Jayachandran",
        "film": "Mazhakkalam",
        "year": 2004,
        "duration": 260,
        "videoId": "XQZJ6iU2DT0"
      },
      {
        "id": "mm-76",
        "title": "കാർമുകിൽ വർണ്ണന്റെ ചുണ്ടിൽ",
        "artist": "K. S. Chithra",
        "film": "Nandanam",
        "year": 2002,
        "duration": 290,
        "videoId": "2B1bNfVZPac"
      },
      {
        "id": "mm-77",
        "title": "വരവായ് തോഴി വാ",
        "artist": "K. S. Chithra",
        "film": "Chithram",
        "year": 1988,
        "duration": 250,
        "videoId": "31OyQJPMKVs"
      },
      {
        "id": "mm-78",
        "title": "കിളിയേ കിളിയേ",
        "artist": "K. S. Chithra",
        "film": "Akashadoothu",
        "year": 1993,
        "duration": 260,
        "videoId": "dR9B_gPxjkk"
      },
      {
        "id": "mm-79",
        "title": "ഒരു കിളി ഇരുകിളി",
        "artist": "K. J. Yesudas",
        "film": "Vasanthiyum Lakshmiyum Pinne Njanum",
        "year": 1999,
        "duration": 280,
        "videoId": "J55VvmvRrAY"
      },
      {
        "id": "mm-80",
        "title": "ആലാപനം തേടും തായ്മനം",
        "artist": "K. J. Yesudas",
        "film": "Kaakkothikkavile Appooppan Thaadikal",
        "year": 1988,
        "duration": 265,
        "videoId": "G7imi6MFrSM"
      },
      {
        "id": "mm-81",
        "title": "ചഞ്ചലദൃതപദതാളം",
        "artist": "K. S. Chithra",
        "film": "Rajashilpi",
        "year": 1992,
        "duration": 270,
        "videoId": "VUZH7lGV84o"
      },
      {
        "id": "mm-82",
        "title": "കാറ്റിൽ വരും ഗീതം",
        "artist": "K. J. Yesudas",
        "film": "Kakkakuyil",
        "year": 2001,
        "duration": 280,
        "videoId": "BvzuXhbGjDA"
      },
      {
        "id": "mm-83",
        "title": "മഴ പെയ്തു മാനം",
        "artist": "M. G. Sreekumar",
        "film": "The Car",
        "year": 1997,
        "duration": 260,
        "videoId": "zk_LYAtW0z4"
      },
      {
        "id": "mm-84",
        "title": "നീലരാവിൽ ഇന്നു നിന്റെ",
        "artist": "K. J. Yesudas & Sujatha",
        "film": "Kudumbakodathi",
        "year": 1996,
        "duration": 275,
        "videoId": "dQ5vtN6BnKU"
      },
      {
        "id": "mm-85",
        "title": "തൂമഞ്ഞു വീഴുമീ രാവിൽ",
        "artist": "K. J. Yesudas",
        "film": "Nokkethadhoorathu Kannum Nattu",
        "year": 1984,
        "duration": 260,
        "videoId": "VoHm8RfDx3I"
      },
      {
        "id": "mm-86",
        "title": "തളിർവലയോ താമരനൂലോ",
        "artist": "K. S. Chithra",
        "film": "Cheppu",
        "year": 1987,
        "duration": 255,
        "videoId": "FlLEVIq5bVM"
      },
      {
        "id": "mm-87",
        "title": "പൊൻമുളന്തണ്ടു മൂളും",
        "artist": "K. J. Yesudas",
        "film": "Vatsalyam",
        "year": 1993,
        "duration": 265,
        "videoId": "3K9ZCdWTvsg"
      },
      {
        "id": "mm-88",
        "title": "ശ്രീരാഗമോ വീണ്ടും",
        "artist": "K. J. Yesudas",
        "film": "Pavithram",
        "year": 1994,
        "duration": 320,
        "videoId": "SK6-LxKjSyE"
      },
      {
        "id": "mm-89",
        "title": "വാൽക്കണ്ണെഴുതി വനപുഷ്പം ചൂടി",
        "artist": "K. J. Yesudas",
        "film": "Paithrukam",
        "year": 1993,
        "duration": 290,
        "videoId": "Hjve04Ptd0M"
      },
      {
        "id": "mm-90",
        "title": "പൂങ്കാറ്റിൻ താരാട്ടും",
        "artist": "K. S. Chithra",
        "film": "Malootty",
        "year": 1992,
        "duration": 260,
        "videoId": "iXeK1GIflWQ"
      },
      {
        "id": "mm-91",
        "title": "മഞ്ഞുകാലം പടിയിറങ്ങി",
        "artist": "K. S. Chithra",
        "film": "Mazha",
        "year": 2000,
        "duration": 250,
        "videoId": "S5eZsNdw__8"
      },
      {
        "id": "mm-92",
        "title": "ആകാശപ്പൂമഴ പെയ്യുന്നു",
        "artist": "M. G. Sreekumar",
        "film": "Kalyanaraman",
        "year": 2002,
        "duration": 280,
        "videoId": "weIc_-0Sk8E"
      },
      {
        "id": "mm-93",
        "title": "മഴനിലാ തെന്നലായ്",
        "artist": "Najim Arshad",
        "film": "Vikramadithyan",
        "year": 2014,
        "duration": 260,
        "videoId": "PM91C6Rpe1w"
      },
      {
        "id": "mm-94",
        "title": "ഓർമ്മകളിൽ ഒരു മഴത്തുള്ളി",
        "artist": "G. Venugopal",
        "film": "Sasneham",
        "year": 1990,
        "duration": 270,
        "videoId": "6HYUGlVxvHg"
      },
      {
        "id": "mm-95",
        "title": "പൂവേ പൂവേ പാലപ്പൂവേ",
        "artist": "K. S. Chithra & P. Jayachandran",
        "film": "Devadoothan",
        "year": 2000,
        "duration": 295,
        "videoId": "5e7_ZL1mHa4"
      },
      {
        "id": "mm-96",
        "title": "കണ്ണാടി ആദ്യമായെൻ",
        "artist": "K. J. Yesudas",
        "film": "Paava",
        "year": 2016,
        "duration": 260,
        "videoId": "3_Vc4jwo3L0"
      },
      {
        "id": "mm-97",
        "title": "തൂവെള്ളത്തൂവൽ വീശുമീ കാറ്റേ",
        "artist": "K. J. Yesudas",
        "film": "Kayal",
        "year": 1991,
        "duration": 270,
        "videoId": "FHPgFX89WSc"
      },
      {
        "id": "mm-98",
        "title": "മഴവില്ലു കൊണ്ടുവാ",
        "artist": "K. S. Chithra",
        "film": "Ennum Ezhunnollathu",
        "year": 2000,
        "duration": 260,
        "videoId": "vSkbndwe8z0"
      },
      {
        "id": "mm-99",
        "title": "പാതിരാക്കാറ്റേ പാടൂ",
        "artist": "K. J. Yesudas",
        "film": "Vatsalyam",
        "year": 1993,
        "duration": 270,
        "videoId": "Ewh5jw8JvtA"
      },
      {
        "id": "mm-100",
        "title": "നീയെൻ സർഗ്ഗസൗന്ദര്യമേ",
        "artist": "K. J. Yesudas",
        "film": "Kaathodu Kaathoram",
        "year": 1985,
        "duration": 270,
        "videoId": "SZWN9qJJ2_E"
      }
    ]
  },
  {
    "id": "night-radio",
    "name": "Night Radio",
    "tracks": [
      {
        "id": "nr-1",
        "title": "മഞ്ഞുപോലെ",
        "artist": "Sreenivas",
        "film": "Dosth",
        "year": 2001,
        "duration": 300,
        "videoId": "KH5dNdFFKRQ"
      },
      {
        "id": "nr-2",
        "title": "കാണുമ്പോൾ പറയാമോ",
        "artist": "K. J. Yesudas & K. S. Chithra",
        "film": "Ishtam",
        "year": 2001,
        "duration": 300,
        "videoId": "IQPjBH-4Qn4"
      },
      {
        "id": "nr-3",
        "title": "എന്റെ ഖൽബിലെ",
        "artist": "Sujatha Mohan",
        "film": "Classmates",
        "year": 2006,
        "duration": 300,
        "videoId": "eRoxt_MKAUY"
      },
      {
        "id": "nr-4",
        "title": "സുഖമാണീ നിലാവ്",
        "artist": "Vidhu Prathap & Jyotsna",
        "film": "Nammal",
        "year": 2002,
        "duration": 300,
        "videoId": "06Bpuh2oYvs"
      },
      {
        "id": "nr-5",
        "title": "മിഴിയറിയാതെ",
        "artist": "K. J. Yesudas & K. S. Chithra",
        "film": "Niram",
        "year": 1999,
        "duration": 300,
        "videoId": "HXP_lbIqXOI"
      },
      {
        "id": "nr-6",
        "title": "അനുരാഗത്തിൻ വേലയിലായി",
        "artist": "Vineeth Sreenivasan",
        "film": "Thattathin Marayathu",
        "year": 2012,
        "duration": 300,
        "videoId": "em95xAZv6Vc"
      },
      {
        "id": "nr-7",
        "title": "മുത്തുചിപ്പി പോലൊരു",
        "artist": "Sachin Warrier & Ramya Nambeesan",
        "film": "Thattathin Marayathu",
        "year": 2012,
        "duration": 300,
        "videoId": "Xq2GDrTNTXE"
      },
      {
        "id": "nr-8",
        "title": "വാതിൽ മെല്ലെ",
        "artist": "Haricharan",
        "film": "Neram",
        "year": 2013,
        "duration": 300,
        "videoId": "r3fhuJJRcYc"
      },
      {
        "id": "nr-9",
        "title": "കിളിപ്പെണ്ണേ നിലാവിൻ",
        "artist": "K. J. Yesudas & Sujatha Mohan",
        "film": "Dosth",
        "year": 2001,
        "duration": 300,
        "videoId": "fekM3qXI-zU"
      },
      {
        "id": "nr-10",
        "title": "അറിയാതെ അറിയാതെ",
        "artist": "P. Jayachandran & K. S. Chithra",
        "film": "Ravanaprabhu",
        "year": 2001,
        "duration": 332,
        "videoId": "1WgeGByWSXM"
      },
      {
        "id": "nr-11",
        "title": "പറയാതെ അറിയാതെ",
        "artist": "K. J. Yesudas & K. S. Chithra",
        "film": "Udayananu Tharam",
        "year": 2005,
        "duration": 385,
        "videoId": "Uwcs4V5CaM0"
      },
      {
        "id": "nr-12",
        "title": "ഒരു കിളി പാട്ടുമൂളവേ",
        "artist": "K. J. Yesudas & K. S. Chithra",
        "film": "Vadakkumnathan",
        "year": 2006,
        "duration": 335,
        "videoId": "U0xLMiU7eG0"
      },
      {
        "id": "nr-13",
        "title": "മണിമുട്ടത്താവണി",
        "artist": "K. J. Yesudas & Sujatha Mohan",
        "film": "Dreams",
        "year": 2000,
        "duration": 295,
        "videoId": "RvWjdhSwRgI"
      },
      {
        "id": "nr-14",
        "title": "കരിനീല കണ്ണിലെന്തെടി",
        "artist": "Vineeth Sreenivasan & Sujatha Mohan",
        "film": "Chakkaramuthu",
        "year": 2006,
        "duration": 261,
        "videoId": "wtB2IdJcbzg"
      },
      {
        "id": "nr-15",
        "title": "എൻ കണ്ണിൽ നിനക്കായ്",
        "artist": "Nazriya Nazim & Gopi Sundar",
        "film": "Bangalore Days",
        "year": 2014,
        "duration": 317,
        "videoId": "FJUYcXNznb8"
      },
      {
        "id": "nr-16",
        "title": "ശ്യാമാംബരം",
        "artist": "Vineeth Sreenivasan",
        "film": "Thattathin Marayathu",
        "year": 2012,
        "duration": 208,
        "videoId": "9ACmSKu3EU8"
      },
      {
        "id": "nr-17",
        "title": "ഹേമന്തമേൻ",
        "artist": "Vijay Yesudas",
        "film": "Kohinoor",
        "year": 2015,
        "duration": 258,
        "videoId": "oxz5Xp1NSJk"
      },
      {
        "id": "nr-18",
        "title": "ലീലാലോകമേ",
        "artist": "Haricharan",
        "film": "Ezra",
        "year": 2017,
        "duration": 256,
        "videoId": "FAn2i7gu32w"
      },
      {
        "id": "nr-19",
        "title": "ആരാധികേ",
        "artist": "Sooraj Santhosh & Madhuvanthi Narayan",
        "film": "Ambili",
        "year": 2019,
        "duration": 361,
        "videoId": "NqvlLQHZQgw"
      },
      {
        "id": "nr-20",
        "title": "ഏതോ മഴനിലാവിലും",
        "artist": "Haricharan",
        "film": "Bangalore Days",
        "year": 2014,
        "duration": 325,
        "videoId": "7-qAsUrWyVc"
      },
      {
        "id": "nr-21",
        "title": "നിനക്കെന്റെ മനസ്സിലെ",
        "artist": "K. J. Yesudas & Sujatha Mohan",
        "film": "Gramaphone",
        "year": 2003,
        "duration": 286,
        "videoId": "OgLL25006js"
      },
      {
        "id": "nr-22",
        "title": "രാത്തിങ്കൾ പൂത്താലി ചാർത്തി",
        "artist": "K. J. Yesudas & K. S. Chithra",
        "film": "Ee Puzhayum Kadannu",
        "year": 1996,
        "duration": 310,
        "videoId": "AARLH1r_hvQ"
      },
      {
        "id": "nr-23",
        "title": "രാപ്പാടി കേഴുന്നുവോ",
        "artist": "K. J. Yesudas",
        "film": "Akashadoothu",
        "year": 1993,
        "duration": 290,
        "videoId": "g6-USqm-VX8"
      },
      {
        "id": "nr-24",
        "title": "നെറ്റിയിൽ പൂവുള്ള",
        "artist": "K. J. Yesudas",
        "film": "Manivathoorile Aayiram Sivarathrikal",
        "year": 1987,
        "duration": 280,
        "videoId": "La3w0avl3eo"
      },
      {
        "id": "nr-25",
        "title": "സ്വർഗ്ഗങ്ങൾ സ്വപ്നം കാണും",
        "artist": "G. Venugopal & Sujatha Mohan",
        "film": "Malootty",
        "year": 1990,
        "duration": 290,
        "videoId": "9as4cATbebc"
      },
      {
        "id": "nr-26",
        "title": "സായന്തനം ചന്ദ്രികാ ലോലമായ്",
        "artist": "K. J. Yesudas & K. S. Chithra",
        "film": "Kamaladhalam",
        "year": 1992,
        "duration": 310,
        "videoId": "xA2qFihFbR0"
      },
      {
        "id": "nr-27",
        "title": "അനുരാഗ വിലോചനനായി",
        "artist": "Shreya Ghoshal & Sreeram",
        "film": "Neelathamara",
        "year": 2009,
        "duration": 310,
        "videoId": "fFU5OxdXf70"
      },
      {
        "id": "nr-28",
        "title": "പ്രേമിക്കുമ്പോൾ നീയും ഞാനും",
        "artist": "P. Jayachandran & Neha Nair",
        "film": "Salt N Pepper",
        "year": 2011,
        "duration": 275,
        "videoId": "YcZ6-L7vj5U"
      },
      {
        "id": "nr-29",
        "title": "ദേവതാരു പൂത്തു",
        "artist": "K. J. Yesudas & S. Janaki",
        "film": "Engane Nee Marakkum",
        "year": 1983,
        "duration": 285,
        "videoId": "3x4auzgrOkM"
      },
      {
        "id": "nr-30",
        "title": "താരാപഥം ചേതോഹരം",
        "artist": "K. J. Yesudas & K. S. Chithra",
        "film": "Anaswaram",
        "year": 1991,
        "duration": 290,
        "videoId": "0uWA5YzmgZw"
      },
      {
        "id": "nr-31",
        "title": "താലോലം താനേ താരാട്ടും",
        "artist": "K. S. Chithra",
        "film": "Kudumbapuranam",
        "year": 1988,
        "duration": 290,
        "videoId": "KU8XoP23is8"
      },
      {
        "id": "nr-32",
        "title": "പാർവണേന്ദു മുഖി",
        "artist": "K. S. Chithra",
        "film": "Parinayam",
        "year": 1994,
        "duration": 300,
        "videoId": "GVk8ptvx1_8"
      },
      {
        "id": "nr-33",
        "title": "കളഭം തരാം ഭഗവാനെൻ",
        "artist": "K. S. Chithra",
        "film": "Vadakkumnathan",
        "year": 2006,
        "duration": 310,
        "videoId": "uhy7v2isaeY"
      },
      {
        "id": "nr-34",
        "title": "ഗംഗേ തുടികെടു",
        "artist": "K. J. Yesudas",
        "film": "Vadakkumnathan",
        "year": 2006,
        "duration": 330,
        "videoId": "DY5fg1Msg4Y"
      },
      {
        "id": "nr-35",
        "title": "മലരേ നിന്നെ കാണാതിരുന്നാൽ",
        "artist": "Vijay Yesudas",
        "film": "Premam",
        "year": 2015,
        "duration": 315,
        "videoId": "0G2VxhV_gXM"
      },
      {
        "id": "nr-36",
        "title": "നിലാ നിലാ മലരേ",
        "artist": "Vijay Yesudas",
        "film": "Diamond Necklace",
        "year": 2012,
        "duration": 260,
        "videoId": "j3CVp79PuO4"
      },
      {
        "id": "nr-37",
        "title": "ആകാശ ദീപങ്ങൾ സാക്ഷി",
        "artist": "K. J. Yesudas",
        "film": "Ravanaprabhu",
        "year": 2001,
        "duration": 300,
        "videoId": "QLPvtwR4Ook"
      },
      {
        "id": "nr-38",
        "title": "പിന്നിലാവില്‍ പൂ വിടര്‍ന്നു",
        "artist": "K. J. Yesudas",
        "film": "Veendum Chila Veettukaryangal",
        "year": 1999,
        "duration": 285,
        "videoId": "ad6LzRU_ezs"
      },
      {
        "id": "nr-39",
        "title": "ആമ്പല്ലൂർ അമ്പലത്തിൽ",
        "artist": "M. G. Sreekumar",
        "film": "Midhunam",
        "year": 1993,
        "duration": 275,
        "videoId": "aVbRovM7RwQ"
      },
      {
        "id": "nr-40",
        "title": "എന്നു വരും നീ",
        "artist": "K. J. Yesudas",
        "film": "Kannaki",
        "year": 2001,
        "duration": 285,
        "videoId": "2lV8f3MHqVU"
      },
      {
        "id": "nr-41",
        "title": "അഴകേ നിൻ മിഴിനീർമണിയായ്",
        "artist": "K. J. Yesudas",
        "film": "Ammakkilikkoodu",
        "year": 2003,
        "duration": 290,
        "videoId": "cDhiH8DfAkw"
      },
      {
        "id": "nr-42",
        "title": "നീ ഹിമമഴയായ്",
        "artist": "K. S. Harisankar & Nithya Mammen",
        "film": "Edakkad Battalion 06",
        "year": 2019,
        "duration": 245,
        "videoId": "mqOkSK8bEBM"
      },
      {
        "id": "nr-43",
        "title": "വരമഞ്ഞളാടിയ രാവിന്റെ മാറിൽ",
        "artist": "Sujatha",
        "film": "Pranayavarnangal",
        "year": 1998,
        "duration": 280,
        "videoId": "BKbWMHLff3Y"
      },
      {
        "id": "nr-44",
        "title": "ചന്ദനത്തിൽ കടഞ്ഞെടുത്തൊരു",
        "artist": "K. J. Yesudas",
        "film": "Sasneham Sumithra",
        "year": 2004,
        "duration": 285,
        "videoId": "7gCHtDfVr_o"
      },
      {
        "id": "nr-45",
        "title": "അന്തിക്കടപ്പുറത്തു",
        "artist": "M. G. Sreekumar",
        "film": "Chamayam",
        "year": 1993,
        "duration": 290,
        "videoId": "d7OW-1leSmE"
      },
      {
        "id": "nr-46",
        "title": "ചാഞ്ചാടിയാടി ഉറങ്ങൂ നീ",
        "artist": "K. J. Yesudas",
        "film": "Makante Achan",
        "year": 2009,
        "duration": 285,
        "videoId": "HVLO0yZ4JAE"
      },
      {
        "id": "nr-47",
        "title": "പിന്നെയും പിന്നെയും ആരോ കിനാവിന്റെ",
        "artist": "K. J. Yesudas & K. S. Chithra",
        "film": "Krishnagudiyil Oru Pranayakalathu",
        "year": 1997,
        "duration": 310,
        "videoId": "NsNBbEttKms"
      },
      {
        "id": "nr-48",
        "title": "ഒരു ചെമ്പനീർ പൂവിറുത്തു",
        "artist": "Unni Menon",
        "film": "Sthithi",
        "year": 2003,
        "duration": 300,
        "videoId": "GndJ2ab9GRA"
      },
      {
        "id": "nr-49",
        "title": "മധുരം ജീവാമൃതബിന്ദു",
        "artist": "K. J. Yesudas",
        "film": "Chenkol",
        "year": 1993,
        "duration": 290,
        "videoId": "8zC46y6Rf2I"
      },
      {
        "id": "nr-50",
        "title": "രാവിൻ നിലാക്കായലിൽ",
        "artist": "K. J. Yesudas",
        "film": "Mazhavillu",
        "year": 1999,
        "duration": 280,
        "videoId": "L0B6_57sdZA"
      },
      {
        "id": "nr-51",
        "title": "കളരിവിളക്കു തെളിഞ്ഞതാണോ",
        "artist": "K. S. Chithra",
        "film": "Oru Vadakkan Veeragatha",
        "year": 1989,
        "duration": 280,
        "videoId": "xSTg6GCGDSk"
      },
      {
        "id": "nr-52",
        "title": "പൂങ്കാറ്റേ പോയി ചൊല്ലാമോ",
        "artist": "K. J. Yesudas",
        "film": "Friends",
        "year": 1999,
        "duration": 290,
        "videoId": "170DpQb2CmE"
      },
      {
        "id": "nr-53",
        "title": "തങ്കത്തോണി ഏറി വാ",
        "artist": "K. J. Yesudas",
        "film": "Mazhavillu",
        "year": 1999,
        "duration": 280,
        "videoId": "SN_gUIG7A1Q"
      },
      {
        "id": "nr-54",
        "title": "താമരപ്പൂവിൽ വാഴും",
        "artist": "K. J. Yesudas & Sujatha",
        "film": "Chandranudikkunna Dikkil",
        "year": 1999,
        "duration": 295,
        "videoId": "lX0yUkmy1iY"
      },
      {
        "id": "nr-55",
        "title": "അമ്പാടിപ്പയ്യുകൾ മേയും",
        "artist": "K. J. Yesudas",
        "film": "Chandranudikkunna Dikkil",
        "year": 1999,
        "duration": 285,
        "videoId": "4aHC84GUNrU"
      },
      {
        "id": "nr-56",
        "title": "ഒരുവട്ടം കൂടിയെൻ",
        "artist": "K. J. Yesudas",
        "film": "Chillu",
        "year": 1982,
        "duration": 260,
        "videoId": "bFk6fObx3qQ"
      },
      {
        "id": "nr-57",
        "title": "നീയെൻ കിനാവോ",
        "artist": "Afsal & Jyotsna",
        "film": "Hello",
        "year": 2007,
        "duration": 270,
        "videoId": "CwwSUR0ISPw"
      },
      {
        "id": "nr-58",
        "title": "മനസ്സിൻ മടിയിലെ",
        "artist": "K. J. Yesudas & Sujatha",
        "film": "Manasinakkare",
        "year": 2003,
        "duration": 280,
        "videoId": "egTeLRALUKI"
      },
      {
        "id": "nr-59",
        "title": "ചെണ്ടുമല്ലിക പൂത്തു വിരിഞ്ഞു",
        "artist": "M. G. Sreekumar",
        "film": "Manasinakkare",
        "year": 2003,
        "duration": 270,
        "videoId": "5o-5Ab7L2NI"
      },
      {
        "id": "nr-60",
        "title": "കനകമുന്തിരികൾ മണികൾ",
        "artist": "P. Jayachandran",
        "film": "Punaradhivasam",
        "year": 2000,
        "duration": 280,
        "videoId": "izt2fhfGSs8"
      },
      {
        "id": "nr-61",
        "title": "മേഘം പൂത്തു തുടങ്ങി",
        "artist": "K. J. Yesudas",
        "film": "Thoovanathumbikal",
        "year": 1987,
        "duration": 285,
        "videoId": "JrIAGLBrN_0"
      },
      {
        "id": "nr-62",
        "title": "രാക്കിളി തൻ പൊൻമകൾ",
        "artist": "K. S. Chithra",
        "film": "Perumazhakkalam",
        "year": 2004,
        "duration": 295,
        "videoId": "BL9bdwlpzQI"
      },
      {
        "id": "nr-63",
        "title": "മെഹർബാൻ മെഹർബാൻ",
        "artist": "M. G. Sreekumar & Sujatha",
        "film": "Perumazhakkalam",
        "year": 2004,
        "duration": 290,
        "videoId": "CHVNf3r2PJc"
      },
      {
        "id": "nr-64",
        "title": "ആലോലം താലോലം പാടാം",
        "artist": "K. J. Yesudas",
        "film": "Kaliyattam",
        "year": 1997,
        "duration": 270,
        "videoId": "CfTWu4Llbvo"
      },
      {
        "id": "nr-65",
        "title": "പൂമുഖവാതിൽക്കൽ സ്നേഹം",
        "artist": "K. J. Yesudas",
        "film": "Rakkuyilin Ragasadassil",
        "year": 1986,
        "duration": 280,
        "videoId": "RkCjoOr2SFo"
      },
      {
        "id": "nr-66",
        "title": "താരിളം പൂവേ താരാട്ടാം",
        "artist": "K. S. Chithra",
        "film": "Sphadikam",
        "year": 1995,
        "duration": 260,
        "videoId": "y_0MUPPTie4"
      },
      {
        "id": "nr-67",
        "title": "ഏഴുമല പൂഞ്ചോല",
        "artist": "K. S. Chithra & M. G. Sreekumar",
        "film": "Sphadikam",
        "year": 1995,
        "duration": 280,
        "videoId": "-fuI6tYvZFk"
      },
      {
        "id": "nr-68",
        "title": "മനസ്സിൻ മണിമുറ്റത്ത്",
        "artist": "K. J. Yesudas",
        "film": "Manichitrathazhu",
        "year": 1993,
        "duration": 270,
        "videoId": "rwyBEyqYohM"
      },
      {
        "id": "nr-69",
        "title": "അക്കരെയിക്കരെ നിന്നൊരു പൂങ്കാറ്റ്",
        "artist": "K. J. Yesudas",
        "film": "Akkare Ninnoru Maran",
        "year": 1985,
        "duration": 260,
        "videoId": "M1xnWdVb1As"
      },
      {
        "id": "nr-70",
        "title": "ഓത്തുപള്ളിയിലന്നു നമ്മൾ",
        "artist": "Sujatha & Sreekumar",
        "film": "Thenmavin Kombath",
        "year": 1994,
        "duration": 290,
        "videoId": "HV06gd9pp_4"
      },
      {
        "id": "nr-71",
        "title": "മാനത്തെ ചന്ദനക്കീറ്",
        "artist": "M. G. Sreekumar & K. S. Chithra",
        "film": "Chandralekha",
        "year": 1997,
        "duration": 295,
        "videoId": "_Hk7NDx5Xcc"
      },
      {
        "id": "nr-72",
        "title": "ഇന്നലെ മയങ്ങുമ്പോൾ",
        "artist": "K. J. Yesudas",
        "film": "Anveshichu Kandethiyilla",
        "year": 1967,
        "duration": 250,
        "videoId": "2D9dDUZoFpE"
      },
      {
        "id": "nr-73",
        "title": "രാരീ രാരീരം രാരോ",
        "artist": "G. Venugopal",
        "film": "Onnu Muthal Poojyam Vare",
        "year": 1986,
        "duration": 280,
        "videoId": "rCR97gqmIz4"
      },
      {
        "id": "nr-74",
        "title": "ഒരു ദള വീര്യമായ്",
        "artist": "K. J. Yesudas",
        "film": "Arayannangalude Veedu",
        "year": 2000,
        "duration": 270,
        "videoId": "7LHYo15BV1M"
      },
      {
        "id": "nr-75",
        "title": "കണ്മണിയെ താരാട്ടാം",
        "artist": "K. S. Chithra",
        "film": "Thoovalsparsham",
        "year": 1990,
        "duration": 260,
        "videoId": "oGnExPztHRA"
      },
      {
        "id": "nr-76",
        "title": "താളവട്ടത്തിൽ തെയ്യം തുള്ളും",
        "artist": "M. G. Sreekumar",
        "film": "Thalavattam",
        "year": 1986,
        "duration": 265,
        "videoId": "2HSz5wg8rO8"
      },
      {
        "id": "nr-77",
        "title": "പ്രണയവസന്തം പൂത്തു വിരിഞ്ഞു",
        "artist": "K. J. Yesudas",
        "film": "Kalyanaraman",
        "year": 2002,
        "duration": 280,
        "videoId": "6KyPBx0Zabc"
      },
      {
        "id": "nr-78",
        "title": "വാർത്തിങ്കളേ വാ",
        "artist": "K. S. Chithra",
        "film": "Chithram",
        "year": 1988,
        "duration": 255,
        "videoId": "rykWOFTvMpQ"
      },
      {
        "id": "nr-79",
        "title": "അമ്പിളീ മാമനെ പുൽകാൻ",
        "artist": "K. J. Yesudas",
        "film": "Thoovalsparsham",
        "year": 1990,
        "duration": 270,
        "videoId": "RAZztT-Mk9U"
      },
      {
        "id": "nr-80",
        "title": "രാപ്പാടി പക്ഷി മൂളും",
        "artist": "K. S. Chithra",
        "film": "Akashadoothu",
        "year": 1993,
        "duration": 265,
        "videoId": "07s8WbjVNGA"
      },
      {
        "id": "nr-81",
        "title": "ചഞ്ചല മിഴിയിൽ നിന്റെ",
        "artist": "K. J. Yesudas",
        "film": "Aaranyakam",
        "year": 1988,
        "duration": 280,
        "videoId": "myAAgpx05B8"
      },
      {
        "id": "nr-82",
        "title": "ഇന്നലെ നീയൊരു സുന്ദര രാഗമായ്",
        "artist": "K. J. Yesudas",
        "film": "Sthree",
        "year": 1970,
        "duration": 250,
        "videoId": "k6zIS-A5OVc"
      },
      {
        "id": "nr-83",
        "title": "സന്ധ്യക്കെന്തിനു സിന്ദൂരം",
        "artist": "K. J. Yesudas",
        "film": "Maya",
        "year": 1972,
        "duration": 260,
        "videoId": "mVndpu2lu7o"
      },
      {
        "id": "nr-84",
        "title": "കണ്മണി അൻപോടു കാതലൻ",
        "artist": "S. Janaki & Kamal Haasan",
        "film": "Guna",
        "year": 1991,
        "duration": 310,
        "videoId": "laoJjq7-WGQ"
      },
      {
        "id": "nr-85",
        "title": "ഹൃദയസഖീ സ്നേഹമയീ",
        "artist": "K. J. Yesudas",
        "film": "Oru Painkili Kadha",
        "year": 1984,
        "duration": 270,
        "videoId": "xoZ2HNMTaNY"
      },
      {
        "id": "nr-86",
        "title": "സുന്ദരി സുന്ദരി ഒന്നു പറയു",
        "artist": "M. G. Sreekumar",
        "film": "Aye Auto",
        "year": 1990,
        "duration": 290,
        "videoId": "wdy9MAwlfBw"
      },
      {
        "id": "nr-87",
        "title": "പൊൻകസവു തട്ടമിട്ടു",
        "artist": "Madhu Balakrishnan",
        "film": "Kazhcha",
        "year": 2004,
        "duration": 280,
        "videoId": "Xx6SKzOUqhQ"
      },
      {
        "id": "nr-88",
        "title": "നീല രാവുലഞ്ഞൂ",
        "artist": "K. J. Yesudas",
        "film": "Kadathanadan Ambadi",
        "year": 1990,
        "duration": 270,
        "videoId": "RxiYFoitGaI"
      },
      {
        "id": "nr-89",
        "title": "മാനേ മധുരക്കരിമ്പേ",
        "artist": "K. J. Yesudas",
        "film": "Thoovalsparsham",
        "year": 1990,
        "duration": 265,
        "videoId": "la6dCbgPQAU"
      },
      {
        "id": "nr-90",
        "title": "പൂനിലാവു മാഞ്ഞുപോയ്",
        "artist": "K. J. Yesudas",
        "film": "Ente Sooryaputhrikku",
        "year": 1991,
        "duration": 275,
        "videoId": "ybiqxIu5Xqk"
      },
      {
        "id": "nr-91",
        "title": "രാപ്പാടി തൻ പാട്ടിൽ",
        "artist": "K. S. Chithra",
        "film": "Daisy",
        "year": 1988,
        "duration": 260,
        "videoId": "5XLYdoV2J48"
      },
      {
        "id": "nr-92",
        "title": "സ്വർണ്ണപ്പക്ഷി പാടുമോ",
        "artist": "K. J. Yesudas",
        "film": "Thooval kottaram",
        "year": 1996,
        "duration": 280,
        "videoId": "Pf7Gwda2vtQ"
      },
      {
        "id": "nr-93",
        "title": "പാതിരാ നിലാവിൽ",
        "artist": "K. J. Yesudas",
        "film": "Kauravar",
        "year": 1992,
        "duration": 285,
        "videoId": "k3jBg8yYp1A"
      },
      {
        "id": "nr-94",
        "title": "മാറ്റേറും കാഞ്ചനപ്പൂങ്കാറ്റേ",
        "artist": "K. S. Chithra",
        "film": "Vatsalyam",
        "year": 1993,
        "duration": 270,
        "videoId": "KVd7FEofNKE"
      },
      {
        "id": "nr-95",
        "title": "കണ്ണീർപ്പൂവിലൊരു തുള്ളി",
        "artist": "K. J. Yesudas",
        "film": "Arayannangalude Veedu",
        "year": 2000,
        "duration": 280,
        "videoId": "g88AbU1DztY"
      },
      {
        "id": "nr-96",
        "title": "നീലക്കുയിലേ പാടൂ",
        "artist": "K. S. Chithra",
        "film": "Adhipan",
        "year": 1989,
        "duration": 265,
        "videoId": "dsLm_OC7Yt4"
      },
      {
        "id": "nr-97",
        "title": "തേൻകിളിയേ മാന്തളിരിൽ",
        "artist": "M. G. Sreekumar",
        "film": "Thilakkam",
        "year": 2003,
        "duration": 275,
        "videoId": "93Gg44b9YVE"
      },
      {
        "id": "nr-98",
        "title": "മധുരമീ നിലാവിൽ",
        "artist": "K. J. Yesudas",
        "film": "Nokkethadhoorathu",
        "year": 1984,
        "duration": 270,
        "videoId": "bLBIrx_0M2c"
      },
      {
        "id": "nr-99",
        "title": "രാവിൻ നിലാവിൽ ഒന്നു ചേരാൻ",
        "artist": "K. J. Yesudas",
        "film": "Mazhavillu",
        "year": 1999,
        "duration": 275,
        "videoId": "0VbhRHBQY2A"
      },
      {
        "id": "nr-100",
        "title": "നീലരാവിൽ ശ്രുതിമീട്ടി",
        "artist": "K. J. Yesudas",
        "film": "Gramaphone",
        "year": 2002,
        "duration": 265,
        "videoId": "lyeB62xV4zw"
      }
    ]
  }
];
