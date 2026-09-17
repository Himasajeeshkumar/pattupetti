"use client";

import type { Playlist } from "@/lib/tracks";

type PlaylistTabsProps = {
  playlists: Playlist[];
  activeId: string;
  onSelect: (id: string) => void;
};

export default function PlaylistTabs({
  playlists,
  activeId,
  onSelect,
}: PlaylistTabsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2" role="tablist">
      {playlists.map((playlist) => {
        const active = playlist.id === activeId;
        return (
          <button
            key={playlist.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(playlist.id)}
            className={`group flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all ${
              active
                ? "border border-marigold/40 bg-gradient-to-r from-marigold to-marigold-2 text-ink shadow-[0_4px_16px_rgba(232,163,61,0.35)]"
                : "border border-white/10 bg-white/[0.05] text-cream/70 hover:border-white/20 hover:bg-white/[0.1] hover:text-cream"
            }`}
          >
            <span>{playlist.name}</span>
            <span
              className={`rounded-full px-2 py-0.5 font-mono text-[10px] tabular-nums ${
                active ? "bg-ink/20 text-ink font-bold" : "bg-white/10 text-cream/50 group-hover:text-cream"
              }`}
            >
              {playlist.tracks.length}
            </span>
          </button>
        );
      })}
    </div>
  );
}
