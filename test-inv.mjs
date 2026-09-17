async function testInvidious() {
  const instances = [
    'https://inv.nadeko.net',
    'https://invidious.nerdvpn.de',
    'https://yt.artemislena.eu',
    'https://invidious.flokinet.to'
  ];

  for (const inst of instances) {
    try {
      const res = await fetch(`${inst}/api/v1/search?q=${encodeURIComponent("Pramadavanam veendum His Highness Abdullah")}`);
      if (res.ok) {
        const items = await res.json();
        console.log(`Success with ${inst}:`, items.slice(0, 3).map(x => ({ id: x.videoId, title: x.title, author: x.author })));
        return;
      }
    } catch (e) {
      console.log(`Failed ${inst}:`, e.message);
    }
  }
}

testInvidious();
