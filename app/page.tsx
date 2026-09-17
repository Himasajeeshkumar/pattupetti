"use client";

import { useMemo, useState } from "react";
import { playlists, type Playlist, type Track } from "@/lib/tracks";
import { PlayerProvider, usePlayer } from "@/lib/player-context";
import AppIcon from "./components/AppIcon";
import TrackRow from "./components/TrackRow";
import MiniPlayer from "./components/MiniPlayer";
import FullPlayer from "./components/FullPlayer";
import QueuePanel from "./components/QueuePanel";

type View = "home" | "playlists" | "playlist-detail" | "search";

function App() {
  const player = usePlayer();
  const [view, setView] = useState<View>("home");
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>(playlists[0].id);
  const [searchQuery, setSearchQuery] = useState("");

  const activePlaylist =
    playlists.find((p) => p.id === selectedPlaylistId) ?? playlists[0];

  const activeTheme =
    view === "playlist-detail"
      ? selectedPlaylistId
      : view === "playlists"
      ? selectedPlaylistId
      : "golden-memories";

  const allTracks = useMemo(
    () => playlists.flatMap((p) => p.tracks.map((t) => ({ ...t, playlistId: p.id }))),
    []
  );

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return allTracks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.artist.toLowerCase().includes(q) ||
        t.film.toLowerCase().includes(q) ||
        String(t.year).includes(q)
    );
  }, [allTracks, searchQuery]);

  const openPlaylistDetail = (id: string) => {
    setSelectedPlaylistId(id);
    setView("playlist-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`page-shell pb-32 text-cream selection:bg-marigold selection:text-ink theme-${activeTheme}`}>
      {/* Paattupetti Kerala Photographic Scene Background (Full-page, clearly visible without dark/smoky overlays) */}
      <div className="paattupetti-bg" />

      {/* Header — Transparent, Minimal & Elegant */}
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[rgba(8,11,14,0.40)] shadow-[0_4px_25px_rgba(0,0,0,0.3)]">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo & Malayalam Branding */}
          <button
            type="button"
            onClick={() => {
              setView("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group flex min-w-0 items-center gap-3 text-left transition-transform active:scale-95"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-marigold-2 to-marigold text-ink shadow-[0_2px_12px_rgba(232,163,61,0.4)]">
              <AppIcon name="music" size={20} />
            </div>
            <div className="min-w-0">
              <div className="font-display text-lg font-bold leading-none tracking-tight text-cream drop-shadow-sm group-hover:text-marigold-2">
                പാട്ടുപെട്ടി
              </div>
              <div className="mt-0.5 font-mono text-[9px] font-semibold uppercase tracking-[.25em] text-marigold">
                PAATTUPETTI RADIO
              </div>
            </div>
          </button>

          {/* Navigation Bar (Home, Search, Playlists, Now Playing — NO Favorites, NO Listener Counter) */}
          <nav className="flex items-center gap-1.5 sm:gap-2" aria-label="Main Navigation">
            <NavButton
              active={view === "home"}
              onClick={() => {
                setView("home");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              icon="home"
            >
              Home
            </NavButton>

            <NavButton
              active={view === "search"}
              onClick={() => {
                setView("search");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              icon="search"
            >
              Search
            </NavButton>

            <NavButton
              active={view === "playlists" || view === "playlist-detail"}
              onClick={() => {
                setView("playlists");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              icon="queue"
            >
              Playlists
            </NavButton>

            <button
              type="button"
              onClick={() => player.setFullOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-marigold/30 bg-marigold/15 px-3 py-1.5 text-xs font-bold text-marigold-2 shadow-[0_2px_12px_rgba(232,163,61,0.2)] transition hover:bg-marigold/25 active:scale-95"
            >
              <span className="h-2 w-2 rounded-full bg-marigold animate-pulse" />
              Now Playing
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* 1. HOME VIEW (Cinematic Landing Page — Integrated Hero)   */}
        {/* ========================================================= */}
        {view === "home" && (
          <div className="space-y-12">
            {/* Cinematic Hero Section — Open & Integrated directly onto Kerala background */}
            <section className="relative pt-6 pb-6 sm:pt-12 sm:pb-12">
              <div className="relative z-10 max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-marigold/30 bg-marigold/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[.25em] text-marigold shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-marigold animate-ping" />
                  Malayalam Nostalgic Radio & Archive
                </div>

                <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-cream sm:text-6xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                  പഴയ പാട്ടുകൾ,<br />
                  <span className="bg-gradient-to-r from-marigold-2 via-marigold to-amber-200 bg-clip-text text-transparent">
                    പുതിയ ഓർമ്മകൾ.
                  </span>
                </h1>

                <p className="mt-5 text-sm leading-relaxed text-cream/90 sm:text-base drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                  A warm, nostalgic corner for Malayalam film melodies — from evergreen cassette-era classics of the 80s and 90s to soulful monsoon tunes and late-night memories.
                </p>

                {/* Hero Action Buttons */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setView("playlists");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-marigold-2 to-marigold px-6 py-3 text-sm font-bold text-ink shadow-[0_4px_18px_rgba(232,163,61,0.35)] transition hover:scale-105 active:scale-95"
                  >
                    <AppIcon name="play" size={17} />
                    Explore Playlists (300 Songs)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setView("search");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="flex items-center gap-2 rounded-xl border border-marigold/35 bg-[rgba(10,14,18,0.45)] px-5 py-3 text-sm font-semibold text-cream transition hover:border-marigold/60 hover:bg-[rgba(18,24,30,0.65)] active:scale-95 shadow-sm"
                  >
                    <AppIcon name="search" size={16} />
                    Search Songs
                  </button>
                </div>
              </div>
            </section>

            {/* Featured Playlists Overview Cards (Three Nostalgic Shelves) */}
            <section>
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[.25em] text-marigold">
                    Curated Collections
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl drop-shadow-sm">
                    Three Nostalgic Shelves
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setView("playlists")}
                  className="font-mono text-xs text-marigold transition hover:underline"
                >
                  View All Shelves →
                </button>
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                {playlists.map((p) => (
                  <div
                    key={p.id}
                    className="translucent-card group relative flex flex-col justify-between overflow-hidden rounded-2xl p-5 transition-all duration-300"
                  >
                    <div>
                      <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-xl border border-marigold/20 bg-black/40">
                        <img
                          src={`https://i.ytimg.com/vi/${p.tracks[0]?.videoId || ""}/hqdefault.jpg`}
                          alt=""
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <span className="absolute bottom-2.5 left-2.5 rounded-md bg-marigold px-2.5 py-0.5 font-mono text-[11px] font-bold text-ink shadow-md">
                          100 Tracks
                        </span>
                      </div>

                      <h3 className="font-display text-xl font-bold text-cream group-hover:text-marigold-2">
                        {p.name}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-cream/70">
                        {p.id === "golden-memories"
                          ? "Evergreen cassette-era masterpieces from Malayalam cinema."
                          : p.id === "monsoon-memories"
                          ? "Rain-drenched nostalgic melodies capturing the soulful Kerala monsoon mood."
                          : "Calm, late-night atmospheric melodies for quiet listening, memories, and peaceful reflection."}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center gap-2 pt-4 border-t border-white/[0.08]">
                      <button
                        type="button"
                        onClick={() => openPlaylistDetail(p.id)}
                        className="flex-1 rounded-lg border border-marigold/25 bg-white/[0.04] py-2 text-xs font-semibold text-cream transition hover:border-marigold/45 hover:bg-marigold/10"
                      >
                        Explore / View 100 Songs
                      </button>

                      <button
                        type="button"
                        aria-label={`Play ${p.name}`}
                        onClick={() => player.playAll(p.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-b from-marigold-2 to-marigold text-ink shadow-md transition hover:scale-105 active:scale-95"
                      >
                        <AppIcon name="play" size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Station Archive Notes */}
            <section className="grid gap-5 sm:grid-cols-2">
              <div className="translucent-card rounded-2xl p-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                  <span className="font-mono text-[10px] uppercase tracking-[.25em] text-marigold">
                    About The Archive
                  </span>
                  <div className="font-display text-lg font-bold text-marigold">പാട്ടുപെട്ടി</div>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-cream/75">
                  Paattupetti is a hand-curated archive of 300 timeless Malayalam film songs. Each playlist represents a distinct emotional atmosphere of Kerala — from vintage morning tea-shop memories to gentle monsoon downpours and peaceful midnight radio.
                </p>
              </div>

              <div className="translucent-card rounded-2xl p-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                  <span className="font-mono text-[10px] uppercase tracking-[.25em] text-marigold">
                    Playback Info
                  </span>
                  <span className="font-mono text-xs text-marigold">300 Verified Songs</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-lg border border-white/[0.08] bg-black/25 p-3">
                    <span className="block font-mono text-[10px] text-marigold">Play / Pause</span>
                    <b className="text-sm font-semibold text-cream">Spacebar</b>
                  </div>
                  <div className="rounded-lg border border-white/[0.08] bg-black/25 p-3">
                    <span className="block font-mono text-[10px] text-marigold">Seek Forward / Back</span>
                    <b className="text-sm font-semibold text-cream">← / → Arrow</b>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================= */}
        {/* 2. PLAYLISTS VIEW (3 Translucent Cards — Golden, Monsoon, Night) */}
        {/* ========================================================= */}
        {view === "playlists" && (
          <div className="space-y-8">
            <div className="border-b border-marigold/15 pb-5">
              <p className="font-mono text-[10px] uppercase tracking-[.3em] text-marigold">
                Audio Archive · Curated Collections
              </p>
              <h1 className="mt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl drop-shadow-sm">
                The Playlists
              </h1>
              <p className="mt-2 text-sm text-cream/75">
                Choose a playlist below to browse its complete 100-song library or play immediately.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {playlists.map((p) => (
                <div
                  key={p.id}
                  className="translucent-card group flex flex-col justify-between overflow-hidden rounded-[22px] p-6 transition-all duration-300"
                >
                  <div>
                    <div className="relative mb-5 aspect-[4/3] w-full overflow-hidden rounded-xl border border-marigold/20 bg-black/40">
                      <img
                        src={`https://i.ytimg.com/vi/${p.tracks[0]?.videoId || ""}/hqdefault.jpg`}
                        alt=""
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                      <span className="absolute bottom-3 left-3 rounded-lg bg-marigold px-3 py-1 font-mono text-xs font-bold text-ink shadow-md">
                        100 Tracks
                      </span>
                    </div>

                    <h2 className="font-display text-2xl font-bold text-cream group-hover:text-marigold-2">
                      {p.name}
                    </h2>
                    <p className="mt-2.5 text-xs leading-relaxed text-cream/70">
                      {p.id === "golden-memories"
                        ? "Evergreen cassette-era masterpieces from Malayalam cinema."
                        : p.id === "monsoon-memories"
                        ? "Rain-drenched nostalgic melodies capturing the soulful Kerala monsoon mood."
                        : "Calm, late-night atmospheric melodies for quiet listening, memories, and peaceful reflection."}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-3 pt-4 border-t border-white/[0.08]">
                    <button
                      type="button"
                      onClick={() => openPlaylistDetail(p.id)}
                      className="flex-1 rounded-xl border border-marigold/30 bg-white/[0.05] py-2.5 text-xs font-semibold text-cream transition hover:border-marigold/50 hover:bg-marigold/10"
                    >
                      Browse 100 Songs
                    </button>

                    <button
                      type="button"
                      aria-label={`Play ${p.name}`}
                      onClick={() => player.playAll(p.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-b from-marigold-2 to-marigold text-ink shadow-[0_2px_12px_rgba(232,163,61,0.4)] transition hover:scale-105 active:scale-95"
                    >
                      <AppIcon name="play" size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 3. PLAYLIST DETAIL VIEW (100 Songs Music Library View)     */}
        {/* ========================================================= */}
        {view === "playlist-detail" && (
          <div className="space-y-6">
            {/* Top Navigation & Playlist Switcher */}
            <div className="flex flex-col gap-4 border-b border-marigold/15 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <button
                  type="button"
                  onClick={() => setView("playlists")}
                  className="mb-2 inline-flex items-center gap-1.5 font-mono text-xs font-medium text-marigold transition hover:underline"
                >
                  ← All Playlists
                </button>
                <div className="flex items-center gap-3">
                  <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl drop-shadow-sm">
                    {activePlaylist.name}
                  </h1>
                  <span className="rounded-lg border border-marigold/30 bg-marigold/15 px-2.5 py-0.5 font-mono text-xs font-bold text-marigold">
                    100 Songs
                  </span>
                </div>
                <p className="mt-1 text-xs text-cream/70">
                  {activePlaylist.id === "golden-memories"
                    ? "Evergreen cassette-era masterpieces from Malayalam cinema."
                    : activePlaylist.id === "monsoon-memories"
                    ? "Rain-drenched nostalgic melodies capturing the soulful Kerala monsoon mood."
                    : "Calm, late-night atmospheric melodies for quiet listening, memories, and peaceful reflection."}
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => player.playAll(activePlaylist.id)}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-marigold-2 to-marigold px-5 py-2.5 text-xs font-bold text-ink shadow-md transition hover:scale-105 active:scale-95"
                >
                  <AppIcon name="play" size={15} />
                  Play All (100)
                </button>

                <button
                  type="button"
                  onClick={() => player.playAll(activePlaylist.id, true)}
                  className="flex items-center gap-2 rounded-xl border border-marigold/30 bg-[rgba(10,14,18,0.45)] px-4 py-2.5 text-xs font-semibold text-cream transition hover:border-marigold/50 hover:bg-marigold/10 active:scale-95"
                >
                  <AppIcon name="shuffle" size={14} />
                  Shuffle
                </button>
              </div>
            </div>

            {/* Playlist Tabs to switch between the 3 playlists */}
            <div className="flex flex-wrap items-center gap-2">
              {playlists.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPlaylistId(p.id)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${
                    p.id === activePlaylist.id
                      ? "border border-marigold/50 bg-gradient-to-r from-marigold-2 to-marigold text-ink shadow-sm font-bold"
                      : "border border-marigold/20 bg-[rgba(10,14,18,0.45)] text-cream/80 hover:border-marigold/40 hover:text-cream"
                  }`}
                >
                  <span>{p.name}</span>
                  <span className="font-mono text-[10px] opacity-75 tabular-nums">
                    ({p.tracks.length})
                  </span>
                </button>
              ))}
            </div>

            {/* Song Table — Transparent rows directly over Kerala scene */}
            <div className="space-y-1.5 pt-2">
              {activePlaylist.tracks.map((track, i) => (
                <TrackRow
                  key={track.id}
                  track={track}
                  playlistId={activePlaylist.id}
                  index={i}
                />
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 4. SEARCH VIEW (Search 300 Songs Archive)                  */}
        {/* ========================================================= */}
        {view === "search" && (
          <div className="space-y-6">
            <div className="border-b border-marigold/15 pb-5">
              <p className="font-mono text-[10px] uppercase tracking-[.3em] text-marigold">
                Audio Archive · Search
              </p>
              <h1 className="mt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl drop-shadow-sm">
                Search Songs
              </h1>
              <p className="mt-2 text-sm text-cream/75">
                Find songs from our 300-track library by title, singer, movie, or year.
              </p>
            </div>

            {/* Search Input */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 rounded-2xl border border-marigold/30 bg-[rgba(9,12,16,0.55)] px-4 py-3.5 shadow-inner">
                <AppIcon name="search" size={19} className="text-marigold" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search across all 300 songs, singers, movies or years..."
                  className="w-full bg-transparent text-sm text-cream outline-none placeholder:text-cream/40"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="rounded-lg bg-white/10 px-2 py-1 text-xs text-cream/70 hover:text-cream"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Search Results List */}
            <div className="pt-2">
              {searchQuery.trim() ? (
                searchResults.length > 0 ? (
                  <div className="space-y-1.5">
                    <div className="mb-3 px-3 text-xs font-mono text-marigold">
                      Found {searchResults.length} matching {searchResults.length === 1 ? "song" : "songs"}
                    </div>
                    {searchResults.map((t, i) => (
                      <TrackRow
                        key={`${t.id}-${t.playlistId}`}
                        track={t}
                        playlistId={t.playlistId}
                        index={i}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="translucent-card rounded-2xl py-16 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.05] text-cream/40">
                      <AppIcon name="search" size={22} />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-cream">No songs found</h3>
                    <p className="mt-1 text-xs text-cream/50">
                      No track matched "{searchQuery}". Try searching by singer name or movie title.
                    </p>
                  </div>
                )
              ) : (
                <div className="translucent-card rounded-2xl py-16 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-marigold/10 text-marigold">
                    <AppIcon name="search" size={22} />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-cream">Search the 300-Song Archive</h3>
                  <p className="mt-1 text-xs text-cream/50">
                    Type a title, artist (e.g. Yesudas, Chithra), movie name, or release year above.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Persistent Bottom Mini Player */}
      <MiniPlayer />

      {/* Full Player Modal */}
      {player.fullOpen && <FullPlayer />}

      {/* Queue Drawer */}
      {player.queueOpen && <QueuePanel />}
    </div>
  );
}

function NavButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
        active
          ? "border border-marigold/40 bg-marigold/15 text-marigold-2 shadow-sm font-bold"
          : "text-cream/70 hover:bg-white/[0.06] hover:text-cream"
      }`}
    >
      <AppIcon name={icon} size={15} />
      {children}
    </button>
  );
}

export default function Home() {
  return (
    <PlayerProvider>
      <App />
    </PlayerProvider>
  );
}
