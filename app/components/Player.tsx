"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { track as trackAnalyticsEvent } from "@vercel/analytics";
import { playlists } from "@/lib/tracks";
import { formatTime } from "@/lib/format-time";
import { useYouTubePlayer } from "@/lib/use-youtube-player";
import VinylDisc from "./VinylDisc";
import SeekBar from "./SeekBar";
import TransportControls from "./TransportControls";
import PlaylistTabs from "./PlaylistTabs";

const VINYL_ELEMENT_ID = "yt-player-disc";

type Position = { playlistIndex: number; trackIndex: number };

function step({ playlistIndex, trackIndex }: Position, delta: 1 | -1): Position {
  const tracks = playlists[playlistIndex].tracks;
  const nextTrackIndex = (trackIndex + delta + tracks.length) % tracks.length;
  return { playlistIndex, trackIndex: nextTrackIndex };
}

export default function Player() {
  const [position, setPosition] = useState<Position>({
    playlistIndex: 0,
    trackIndex: 0,
  });

  const activePlaylist = playlists[position.playlistIndex];
  const track = activePlaylist.tracks[position.trackIndex];

  const handleEnded = useCallback(() => {
    setPosition((prev) => step(prev, 1));
  }, []);

  const handleYtError = useCallback((info: { code: number; videoId: string }) => {
    trackAnalyticsEvent("youtube_playback_error", {
      code: info.code,
      videoId: info.videoId,
    });
    setPosition((prev) => step(prev, 1));
  }, []);

  const player = useYouTubePlayer({
    elementId: VINYL_ELEMENT_ID,
    initialVideoId: playlists[0].tracks[0].videoId,
    onEnded: handleEnded,
    onError: handleYtError,
  });

  // Whenever the resolved track changes (prev/next, playlist switch, auto
  // advance on end/error) — but not on the very first mount, which already
  // has the correct video baked into the player via `initialVideoId` — cue
  // the new video into the one singleton iframe.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    player.loadVideo(track.videoId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track.videoId]);

  const handlePrev = useCallback(() => {
    setPosition((prev) => step(prev, -1));
  }, []);

  const handleNext = useCallback(() => {
    setPosition((prev) => step(prev, 1));
  }, []);

  const handlePlayPause = useCallback(() => {
    if (player.isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  }, [player]);

  const handleSelectPlaylist = useCallback((id: string) => {
    const playlistIndex = playlists.findIndex((p) => p.id === id);
    if (playlistIndex !== -1) {
      setPosition({ playlistIndex, trackIndex: 0 });
    }
  }, []);

  const duration = useMemo(
    () => player.duration || track.duration,
    [player.duration, track.duration]
  );

  return (
    <div
      className="w-full max-w-[920px] sm:px-0" aria-label="Paattupetti music player"
      style={{
        paddingLeft: "max(1rem, env(safe-area-inset-left))",
        paddingRight: "max(1rem, env(safe-area-inset-right))",
        paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
      }}
    >
      <PlaylistTabs
        playlists={playlists}
        activeId={activePlaylist.id}
        onSelect={handleSelectPlaylist}
      />

      {/*
        The vinyl below is the ONE real YouTube iframe. It is rendered
        exactly once, absolutely positioned over whichever layout is
        currently active, so it can never end up duplicated (two live
        players) or hidden inside a `display:none` block. Each of the
        two layouts below reserves its space with a matching invisible
        spacer in normal flow.
      */}
      <div className="relative w-full">
        {/* DESKTOP — horizontal dark pill */}
        <div className="dark-panel hidden w-full items-center gap-5 rounded-full p-3 pr-5 sm:flex">
          <div className="invisible h-[92px] w-[92px] shrink-0" aria-hidden />
          <div className="min-w-0 flex-1">
            <div className="min-w-0">
              <p className="truncate font-display text-[15px] font-semibold italic text-cream">
                {track.title}
              </p>
              <p className="truncate text-[12.5px] text-cream/70">
                {track.artist} · {track.film} · {track.year}
              </p>
            </div>
            <div className="mt-1.5 flex items-center gap-3">
              <SeekBar
                currentTime={player.currentTime}
                duration={duration}
                onSeek={player.seekTo}
                className="flex-1"
              />
              <span className="shrink-0 font-mono text-[10.5px] text-cream-dim tabular-nums">
                {formatTime(player.currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>
          <TransportControls
            isPlaying={player.isPlaying}
            onPlayPause={handlePlayPause}
            onPrev={handlePrev}
            onNext={handleNext}
            variant="desktop"
          />
        </div>

        {/* MOBILE — stacked dark card */}
        <div className="dark-panel flex w-full flex-col gap-3 rounded-[26px] p-4 sm:hidden">
          <div className="flex items-center gap-3">
            <div className="invisible h-16 w-16 shrink-0" aria-hidden />
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-[15px] font-semibold italic text-cream">
                {track.title}
              </p>
              <p className="truncate text-[12.5px] text-cream/70">
                {track.artist} · {track.film} · {track.year}
              </p>
            </div>
          </div>

          <SeekBar
            currentTime={player.currentTime}
            duration={duration}
            onSeek={player.seekTo}
          />

          <div className="flex items-center justify-between">
            <span className="font-mono text-[10.5px] text-cream-dim tabular-nums">
              {formatTime(player.currentTime)} / {formatTime(duration)}
            </span>
            <TransportControls
              isPlaying={player.isPlaying}
              onPlayPause={handlePlayPause}
              onPrev={handlePrev}
              onNext={handleNext}
              variant="mobile"
            />
            <span className="w-[52px]" aria-hidden />
          </div>
        </div>

        {/* The one real, always-visible YouTube player. */}
        <VinylDisc
          elementId={VINYL_ELEMENT_ID}
          isPlaying={player.isPlaying}
          className="absolute left-4 top-4 h-16 w-16 sm:left-3 sm:top-3 sm:h-[92px] sm:w-[92px]"
        />
      </div>
    </div>
  );
}
