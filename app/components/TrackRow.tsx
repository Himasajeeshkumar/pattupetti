"use client";

import type { Track } from "@/lib/tracks";
import AppIcon from "./AppIcon";
import { usePlayer } from "@/lib/player-context";

export default function TrackRow({
  track,
  playlistId,
  index,
}: {
  track: Track;
  playlistId: string;
  index: number;
}) {
  const { current, isPlaying, playTrack, playNext } = usePlayer();
  const active = current.id === track.id;

  return (
    <div
      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-150 ${
        active
          ? "border border-marigold/50 bg-[rgba(24,32,40,0.70)] shadow-[0_2px_15px_rgba(232,163,61,0.15)]"
          : "border border-white/[0.06] bg-[rgba(10,14,18,0.40)] hover:border-marigold/30 hover:bg-[rgba(18,24,32,0.65)]"
      }`}
    >
      {/* Play/Index Button */}
      <button
        type="button"
        aria-label={active && isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
        onClick={() => playTrack(track, playlistId)}
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform active:scale-95 ${
          active
            ? "bg-gradient-to-b from-marigold-2 to-marigold text-ink shadow-[0_2px_10px_rgba(232,163,61,0.4)] font-bold"
            : "border border-white/10 bg-white/[0.04] text-cream/50 group-hover:border-marigold/30 group-hover:bg-marigold/10 group-hover:text-marigold"
        }`}
      >
        {active && isPlaying ? (
          <div className="flex items-center gap-0.5">
            <span className="h-3 w-0.5 animate-[pulse_0.8s_infinite] bg-ink" />
            <span className="h-4 w-0.5 animate-[pulse_0.6s_infinite_150ms] bg-ink" />
            <span className="h-2 w-0.5 animate-[pulse_0.9s_infinite_300ms] bg-ink" />
          </div>
        ) : (
          <span className="font-mono text-xs font-semibold tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </button>

      {/* Track Info */}
      <button
        type="button"
        className="min-w-0 flex-1 text-left"
        onClick={() => playTrack(track, playlistId)}
      >
        <div
          className={`truncate font-display text-sm font-semibold tracking-wide transition-colors ${
            active ? "text-marigold-2" : "text-cream group-hover:text-cream"
          }`}
        >
          {track.title}
        </div>
        <div className="truncate text-xs text-cream/50 group-hover:text-cream/70">
          <span className="font-medium text-cream/75">{track.artist}</span>
          <span className="mx-1.5 text-marigold/60">·</span>
          <span>{track.film}</span>
          <span className="ml-1 text-[11px] text-cream/40">({track.year})</span>
        </div>
      </button>

      {/* Actions: Play Next, Duration */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Add to queue next"
          title="Play next in queue"
          onClick={() => playNext(track, playlistId)}
          className="hidden h-8 w-8 items-center justify-center rounded-lg text-cream/30 opacity-0 transition group-hover:opacity-100 hover:bg-white/10 hover:text-cream sm:flex"
        >
          <AppIcon name="more" size={15} />
        </button>

        <span className="w-11 text-right font-mono text-[11px] text-cream/40 tabular-nums">
          {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
