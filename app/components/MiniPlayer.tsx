"use client";

import { usePlayer } from "@/lib/player-context";
import AppIcon from "./AppIcon";

export default function MiniPlayer() {
  const p = usePlayer();
  const pct = p.duration ? Math.min(100, (p.currentTime / p.duration) * 100) : 0;

  return (
    <aside
      aria-label="Audio player"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-marigold/20 bg-[rgba(8,11,14,0.75)] shadow-[0_-10px_35px_rgba(0,0,0,0.7)]"
    >
      {/* Top Thin Interactive Progress Track */}
      <div
        className="group relative h-1 w-full cursor-pointer bg-white/10"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const ratio = (e.clientX - rect.left) / rect.width;
          if (p.duration) p.seek(ratio * p.duration);
        }}
      >
        <div
          className="h-full bg-gradient-to-r from-marigold-2 to-marigold transition-all duration-100"
          style={{ width: `${pct}%` }}
        />
        <div
          className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-marigold-2 opacity-0 shadow-[0_0_8px_rgba(244,192,101,0.9)] transition-opacity group-hover:opacity-100"
          style={{ left: `${pct}%` }}
        />
      </div>

      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-3 px-3 py-2.5 sm:gap-6 sm:px-6">
        {/* Track Artwork & Info (Single clean button, NO nested buttons) */}
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            aria-label="Open Now Playing"
            onClick={() => p.setFullOpen(true)}
            className="group relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black shadow-md transition-transform active:scale-95"
          >
            <img
              src={`https://i.ytimg.com/vi/${p.current.videoId}/hqdefault.jpg`}
              alt=""
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
              <AppIcon name="music" size={16} className="text-marigold" />
            </div>
          </button>

          <button
            type="button"
            aria-label="Open Now Playing details"
            onClick={() => p.setFullOpen(true)}
            className="min-w-0 text-left"
          >
            <div className="truncate text-sm font-semibold text-cream transition hover:text-marigold-2">
              {p.current.title}
            </div>
            <div className="truncate text-[11.5px] text-cream/50">
              {p.current.artist} · <span className="text-cream/70">{p.current.film}</span> ({p.current.year})
            </div>
          </button>
        </div>

        {/* Center Transport Controls & Time */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              aria-label="Previous track"
              onClick={p.previous}
              className="rounded-full p-2 text-cream/70 transition hover:bg-white/[.08] hover:text-cream active:scale-95"
            >
              <AppIcon name="prev" size={19} />
            </button>

            <button
              type="button"
              aria-label={p.isPlaying ? "Pause track" : "Play track"}
              onClick={p.togglePlay}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-b from-marigold-2 to-marigold text-ink shadow-[0_4px_16px_rgba(232,163,61,0.4)] ring-1 ring-white/25 transition-transform hover:scale-105 active:scale-95 sm:h-11 sm:w-11"
            >
              <AppIcon name={p.isPlaying ? "pause" : "play"} size={20} />
            </button>

            <button
              type="button"
              aria-label="Next track"
              onClick={p.next}
              className="rounded-full p-2 text-cream/70 transition hover:bg-white/[.08] hover:text-cream active:scale-95"
            >
              <AppIcon name="next" size={19} />
            </button>
          </div>

          <div className="hidden font-mono text-[10px] text-cream/40 tabular-nums sm:block">
            {fmt(p.currentTime)} / {fmt(p.duration)}
          </div>
        </div>

        {/* Right Controls: Volume, Queue, Now Playing */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Volume Control with Mute Toggle */}
          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              aria-label={p.isMuted ? "Unmute" : "Mute"}
              onClick={p.toggleMute}
              className="text-cream/60 hover:text-cream"
            >
              <AppIcon name="volume" size={17} />
            </button>
            <input
              aria-label="Volume slider"
              type="range"
              min="0"
              max="100"
              value={p.isMuted ? 0 : p.volume}
              onChange={(e) => p.setVolume(Number(e.target.value))}
              className="h-1.5 w-24 cursor-pointer appearance-none rounded-full bg-white/15 accent-[var(--color-marigold)]"
            />
          </div>

          {/* Queue Drawer Button */}
          <button
            type="button"
            aria-label="Open Queue"
            onClick={() => p.setQueueOpen(true)}
            className={`relative rounded-full border border-white/10 p-2 transition ${
              p.queueOpen
                ? "bg-marigold text-ink"
                : "bg-white/[.04] text-cream/70 hover:bg-white/[.1] hover:text-cream"
            }`}
          >
            <AppIcon name="queue" size={18} />
            {p.queue.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-marigold px-1 font-mono text-[9px] font-bold text-ink">
                {p.queue.length}
              </span>
            )}
          </button>

          {/* Now Playing Expand Button */}
          <button
            type="button"
            aria-label="Expand Now Playing"
            onClick={() => p.setFullOpen(true)}
            className="hidden rounded-full bg-white/[.06] px-3 py-1.5 font-mono text-[11px] font-semibold text-cream/80 transition hover:bg-white/[.12] hover:text-cream sm:block"
          >
            Now Playing
          </button>
        </div>
      </div>
    </aside>
  );
}

function fmt(s: number) {
  if (!Number.isFinite(s) || s < 0) s = 0;
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}
