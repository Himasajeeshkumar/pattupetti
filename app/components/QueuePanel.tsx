"use client";

import { useEffect } from "react";
import { usePlayer } from "@/lib/player-context";
import AppIcon from "./AppIcon";

export default function QueuePanel() {
  const p = usePlayer();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        p.setQueueOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [p]);

  return (
    <div
      className="fixed inset-0 z-[65] bg-black/70 transition-opacity"
      onMouseDown={(e) => {
        if (e.currentTarget === e.target) p.setQueueOpen(false);
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Queue"
    >
      <aside className="absolute bottom-0 right-0 top-0 flex w-full max-w-md flex-col border-l border-marigold/25 bg-[rgba(10,14,18,0.92)] shadow-[0_0_60px_rgba(0,0,0,0.9)]">
        {/* Queue Header */}
        <div className="flex items-center justify-between border-b border-marigold/15 p-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-marigold/20 text-marigold">
              <AppIcon name="queue" size={17} />
            </div>
            <div>
              <div className="font-display text-lg font-semibold text-cream">Play Queue</div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-cream/40">
                {p.queue.length} {p.queue.length === 1 ? "track" : "tracks"} total
              </div>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close Queue"
            onClick={() => p.setQueueOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[.06] text-cream/60 transition hover:bg-white/[.15] hover:text-cream"
          >
            <AppIcon name="x" size={16} />
          </button>
        </div>

        {/* Queue Controls */}
        <div className="flex gap-2 border-b border-white/10 p-4">
          <button
            type="button"
            onClick={p.toggleShuffle}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition ${
              p.shuffle
                ? "border-marigold/40 bg-marigold text-ink shadow-md"
                : "border-white/10 bg-white/[.04] text-cream/70 hover:bg-white/[.08] hover:text-cream"
            }`}
          >
            <AppIcon name="shuffle" size={14} />
            Shuffle Queue
          </button>
          <button
            type="button"
            onClick={p.clearQueue}
            className="flex-1 rounded-xl border border-white/10 bg-white/[.04] px-3 py-2 text-xs font-semibold text-cream/60 transition hover:border-rose/30 hover:bg-rose/10 hover:text-rose"
          >
            Clear Upcoming
          </button>
        </div>

        {/* Tracks List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-2.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[.25em] text-marigold">
            <span className="h-1.5 w-1.5 rounded-full bg-marigold animate-ping" />
            Now Playing
          </div>
          <QueueItem item={p.current} active />

          <div className="mb-2.5 mt-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[.25em] text-cream/40">
            <span>Next Up ({p.upcoming.length})</span>
            {p.repeat !== "off" && (
              <span className="text-marigold">Repeat: {p.repeat}</span>
            )}
          </div>

          {p.upcoming.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-xs text-cream/35">
              End of queue. Pick songs from any playlist to keep listening.
            </div>
          ) : (
            <div className="space-y-1">
              {p.upcoming.map((item, i) => (
                <QueueItem
                  key={`${item.id}-${i}`}
                  item={item}
                  index={p.queue.findIndex((x) => x.id === item.id)}
                />
              ))}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

function QueueItem({ item, active, index }: { item: any; active?: boolean; index?: number }) {
  const p = usePlayer();
  return (
    <div
      className={`group flex items-center gap-3 rounded-xl border p-2 transition ${
        active
          ? "border-marigold/30 bg-marigold/10 shadow-sm"
          : "border-white/[.04] bg-[#121619] hover:border-white/10 hover:bg-[#181e22]"
      }`}
    >
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-black">
        <img
          src={`https://i.ytimg.com/vi/${item.videoId}/default.jpg`}
          alt=""
          className="h-full w-full object-cover"
        />
        {active && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="h-2 w-2 rounded-full bg-marigold animate-pulse" />
          </div>
        )}
      </div>

      <button
        type="button"
        className="min-w-0 flex-1 text-left"
        onClick={() => p.playTrack(item, item.playlistId)}
      >
        <div className={`truncate text-sm font-semibold ${active ? "text-marigold-2" : "text-cream"}`}>
          {item.title}
        </div>
        <div className="truncate text-xs text-cream/40">
          {item.artist} · {item.film}
        </div>
      </button>

      {!active && index !== undefined && (
        <button
          type="button"
          aria-label="Remove from queue"
          onClick={() => p.removeFromQueue(item.id, index)}
          className="flex h-7 w-7 items-center justify-center rounded-full p-1 text-cream/25 opacity-0 transition group-hover:opacity-100 hover:bg-rose/15 hover:text-rose"
        >
          <AppIcon name="x" size={14} />
        </button>
      )}
    </div>
  );
}
