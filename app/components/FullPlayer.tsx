"use client";

import { useEffect } from "react";
import { usePlayer } from "@/lib/player-context";
import AppIcon from "./AppIcon";

export default function FullPlayer() {
  const p = usePlayer();
  const pct = p.duration ? Math.min(100, (p.currentTime / p.duration) * 100) : 0;

  // Listen for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        p.setFullOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [p]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-3 transition-opacity duration-200 sm:p-6"
      onMouseDown={(e) => {
        if (e.currentTarget === e.target) {
          p.setFullOpen(false);
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Now Playing Full Player"
    >
      <div className="relative flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-[28px] border border-marigold/30 bg-[rgba(10,14,18,0.92)] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(232,163,61,0.12)] sm:p-8">
        {/* Header with Title and Working Close Button */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-marigold animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[.3em] text-marigold">
              Now Playing · പാട്ടുപെട്ടി
            </span>
          </div>
          <button
            type="button"
            aria-label="Close Now Playing"
            onClick={() => p.setFullOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[.08] text-cream/70 transition-all hover:scale-105 hover:border-marigold/40 hover:bg-white/[.15] hover:text-cream active:scale-95"
          >
            <AppIcon name="x" size={18} />
          </button>
        </div>

        {/* Album Cover / Vinyl Artwork Presentation */}
        <div className="relative z-10 mx-auto mt-6 aspect-square w-full max-w-[280px] overflow-hidden rounded-[20px] border border-white/10 bg-black shadow-[0_15px_40px_rgba(0,0,0,0.6)] group sm:max-w-[310px]">
          <img
            src={`https://i.ytimg.com/vi/${p.current.videoId}/hqdefault.jpg`}
            alt={p.current.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Subtle Vinyl Grooves Overlay */}
          <div className="pointer-events-none absolute inset-0 rounded-[20px] bg-gradient-to-tr from-black/50 via-transparent to-white/10" />
          {p.isPlaying && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg bg-black/80 px-2.5 py-1">
              <span className="h-2 w-0.5 animate-[bounce_1s_infinite] bg-marigold" />
              <span className="h-3 w-0.5 animate-[bounce_1.2s_infinite_200ms] bg-marigold" />
              <span className="h-2 w-0.5 animate-[bounce_0.8s_infinite_400ms] bg-marigold" />
            </div>
          )}
        </div>

        {/* Song Info */}
        <div className="relative z-10 mt-6 text-center">
          <h3 className="truncate font-display text-2xl font-bold tracking-tight text-cream sm:text-3xl">
            {p.current.title}
          </h3>
          <p className="mt-1.5 truncate text-xs text-cream/65 sm:text-sm">
            {p.current.artist} <span className="text-marigold/70">·</span> {p.current.film} ({p.current.year})
          </p>
        </div>

        {/* Interactive Seek Bar */}
        <div className="relative z-10 mt-6">
          <input
            aria-label="Seek track"
            type="range"
            min="0"
            max={p.duration || 1}
            value={Math.min(p.currentTime, p.duration || 1)}
            onChange={(e) => p.seek(Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[var(--color-marigold)] transition-all"
            style={{
              background: `linear-gradient(to right, var(--color-marigold) ${pct}%, rgba(255,255,255,.15) ${pct}%)`,
            }}
          />
          <div className="mt-1.5 flex justify-between font-mono text-[10px] text-cream/40">
            <span>{fmt(p.currentTime)}</span>
            <span>{fmt(p.duration)}</span>
          </div>
        </div>

        {/* Transport Controls */}
        <div className="relative z-10 mt-4 flex items-center justify-center gap-5 sm:gap-6">
          <button
            type="button"
            aria-label={p.shuffle ? "Disable shuffle" : "Enable shuffle"}
            onClick={p.toggleShuffle}
            className={`rounded-full p-2.5 transition ${
              p.shuffle ? "text-marigold bg-marigold/15" : "text-cream/40 hover:text-cream"
            }`}
          >
            <AppIcon name="shuffle" size={19} />
          </button>

          <button
            type="button"
            aria-label="Previous track"
            onClick={p.previous}
            className="rounded-full p-2 text-cream/80 transition hover:scale-110 hover:text-cream active:scale-95"
          >
            <AppIcon name="prev" size={24} />
          </button>

          <button
            type="button"
            aria-label={p.isPlaying ? "Pause track" : "Play track"}
            onClick={p.togglePlay}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-marigold-2 to-marigold text-ink shadow-[0_8px_25px_rgba(232,163,61,0.45)] ring-1 ring-white/30 transition hover:scale-105 active:scale-95"
          >
            <AppIcon name={p.isPlaying ? "pause" : "play"} size={26} />
          </button>

          <button
            type="button"
            aria-label="Next track"
            onClick={p.next}
            className="rounded-full p-2 text-cream/80 transition hover:scale-110 hover:text-cream active:scale-95"
          >
            <AppIcon name="next" size={24} />
          </button>

          <button
            type="button"
            aria-label={`Repeat mode: ${p.repeat}`}
            onClick={p.cycleRepeat}
            className={`rounded-full p-2.5 transition ${
              p.repeat !== "off" ? "text-marigold bg-marigold/15" : "text-cream/40 hover:text-cream"
            }`}
          >
            <AppIcon name="repeat" size={19} />
          </button>
        </div>

        {/* Bottom Queue Shortcut */}
        <div className="relative z-10 mt-5 flex items-center justify-center border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={() => {
              p.setFullOpen(false);
              p.setQueueOpen(true);
            }}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[.05] px-4 py-2 text-xs font-medium text-cream/70 transition hover:border-white/20 hover:text-cream"
          >
            <AppIcon name="queue" size={15} />
            View Play Queue ({p.queue.length})
          </button>
        </div>
      </div>
    </div>
  );
}

function fmt(s: number) {
  if (!Number.isFinite(s) || s < 0) s = 0;
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}
