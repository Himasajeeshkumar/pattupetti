async function test() {
  try {
    const res = await fetch("https://html.duckduckgo.com/html/?q=" + encodeURIComponent("Pramadavanam veendum His Highness Abdullah youtube watch"), {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
    });
    const html = await res.text();
    const ids = [...html.matchAll(/v%3D([a-zA-Z0-9_-]{11})/g)].map(m => m[1]);
    const ids2 = [...html.matchAll(/watch\?v=([a-zA-Z0-9_-]{11})/g)].map(m => m[1]);
    console.log("DuckDuckGo IDs:", [...new Set([...ids, ...ids2])]);
  } catch (err) {
    console.error("DDG err:", err);
  }
}
test();
