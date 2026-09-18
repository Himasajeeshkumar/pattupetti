"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { track as trackAnalyticsEvent } from "@vercel/analytics";
import { playlists, type Track } from "@/lib/tracks";
import { useYouTubePlayer } from "@/lib/use-youtube-player";

type RepeatMode = "off" | "all" | "one";
type QueueItem = Track & { playlistId: string };

type PlayerContextValue = {
  current: QueueItem;
  queue: QueueItem[];
  upcoming: QueueItem[];
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  shuffle: boolean;
  repeat: RepeatMode;
  recent: QueueItem[];
  queueOpen: boolean;
  setQueueOpen: (open: boolean) => void;
  fullOpen: boolean;
  setFullOpen: (open: boolean) => void;
  playTrack: (track: Track, playlistId: string, source?: Track[]) => void;
  playAll: (playlistId: string, shuffle?: boolean) => void;
  togglePlay: () => void;
  next: () => void;
  previous: () => void;
  seek: (seconds: number) => void;
  setVolume: (value: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
  removeFromQueue: (trackId: string, index: number) => void;
  clearQueue: () => void;
  playNext: (track: Track, playlistId: string) => void;
  playbackError: string | null;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);
const PLAYER_ELEMENT_ID = "paattupetti-youtube-player";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/pattupetti";

function getAudioUrl(src: string): string {
  if (!src) return "";
  if (src.startsWith("http") || src.startsWith("blob:")) return src;
  const cleanBase = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
  const cleanSrc = src.startsWith("/") ? src : `/${src}`;
  return `${cleanBase}${cleanSrc}`;
}

function makeQueue(tracks: Track[], playlistId: string): QueueItem[] {
  return tracks.map((track) => ({ ...track, playlistId }));
}

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const first = playlists[0];
  const firstTrack = first.tracks[0];
  const [current, setCurrent] = useState<QueueItem>({ ...firstTrack, playlistId: first.id });
  const [queue, setQueue] = useState<QueueItem[]>(makeQueue(first.tracks, first.id));
  const [queueIndex, setQueueIndex] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<RepeatMode>("off");
  const [volume, setVolumeState] = useState(80);
  const [isMuted, setMuted] = useState(false);
  const [recent, setRecent] = useState<QueueItem[]>([]);
  const [queueOpen, setQueueOpen] = useState(false);
  const [fullOpen, setFullOpen] = useState(false);
  const [playbackError, setPlaybackError] = useState<string | null>(null);

  // Native HTML5 Audio state for local files
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);

  const currentRef = useRef(current);
  const queueRef = useRef(queue);
  const queueIndexRef = useRef(queueIndex);
  const repeatRef = useRef(repeat);
  const shuffleRef = useRef(shuffle);
  const isMutedRef = useRef(isMuted);
  const volumeRef = useRef(volume);

  currentRef.current = current;
  queueRef.current = queue;
  queueIndexRef.current = queueIndex;
  repeatRef.current = repeat;
  shuffleRef.current = shuffle;
  isMutedRef.current = isMuted;
  volumeRef.current = volume;

  const isLocalTrack = Boolean(current.audioSrc);

  // Initialize storage values
  useEffect(() => {
    setRecent(readStorage<QueueItem[]>("paattupetti:recent", []));
    setVolumeState(readStorage<number>("paattupetti:volume", 80));
  }, []);

  useEffect(() => localStorage.setItem("paattupetti:recent", JSON.stringify(recent)), [recent]);
  useEffect(() => localStorage.setItem("paattupetti:volume", JSON.stringify(volume)), [volume]);

  // Advance logic (Auto-next)
  const advance = useCallback(() => {
    const q = queueRef.current;
    if (!q.length) return;

    if (repeatRef.current === "one") {
      const active = currentRef.current;
      if (active.audioSrc && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      } else {
        yt.loadVideo(active.videoId);
        setTimeout(() => yt.play(), 80);
      }
      return;
    }

    let nextIndex = queueIndexRef.current + 1;
    if (nextIndex >= q.length) {
      if (repeatRef.current === "all") {
        nextIndex = 0;
      } else {
        setIsAudioPlaying(false);
        return;
      }
    }

    const nextTrack = q[nextIndex];
    setQueueIndex(nextIndex);
    setCurrent(nextTrack);
    setPlaybackError(null);

    if (nextTrack.audioSrc) {
      if (yt.isPlaying) yt.pause();
      if (audioRef.current) {
        audioRef.current.src = getAudioUrl(nextTrack.audioSrc);
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((err) => {
          console.warn("Auto-play local audio blocked or failed:", err);
        });
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      yt.loadVideo(nextTrack.videoId);
      setTimeout(() => yt.play(), 80);
    }
  }, []);

  const onEnded = useCallback(() => advance(), [advance]);

  const onError = useCallback((info: { code: number; videoId: string }) => {
    trackAnalyticsEvent("youtube_playback_error", { code: info.code, videoId: info.videoId });
    setPlaybackError("Playback error on YouTube stream. Advancing to next track...");
    advance();
  }, [advance]);

  const yt = useYouTubePlayer({
    elementId: PLAYER_ELEMENT_ID,
    initialVideoId: firstTrack.videoId,
    onEnded,
    onError,
  });

  // Setup HTMLAudioElement event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      setIsAudioPlaying(true);
      setPlaybackError(null);
    };
    const handlePause = () => setIsAudioPlaying(false);
    const handleTimeUpdate = () => setAudioCurrentTime(audio.currentTime);
    const handleDurationChange = () => setAudioDuration(audio.duration || 0);
    const handleLoadedMetadata = () => setAudioDuration(audio.duration || 0);
    const handleAudioEnded = () => {
      setIsAudioPlaying(false);
      advance();
    };
    const handleAudioError = (e: Event) => {
      console.error("Local audio loading/playback error:", e);
      setPlaybackError("Failed to load local audio file.");
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleAudioEnded);
    audio.addEventListener("error", handleAudioError);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleAudioEnded);
      audio.removeEventListener("error", handleAudioError);
    };
  }, [advance]);

  // Sync volume with both Audio and YouTube
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
      audioRef.current.muted = isMuted;
    }
    yt.setVolume(volume);
  }, [volume, isMuted, yt]);

  const recordRecent = useCallback((item: QueueItem) => {
    setRecent((prev) => [item, ...prev.filter((x) => x.id !== item.id)].slice(0, 12));
  }, []);

  const loadAndStartTrack = useCallback((item: QueueItem) => {
    setPlaybackError(null);
    if (item.audioSrc) {
      if (yt.isPlaying) yt.pause();
      if (audioRef.current) {
        audioRef.current.src = getAudioUrl(item.audioSrc);
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((err) => {
          console.warn("Local audio play failed or was blocked:", err);
        });
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      yt.loadVideo(item.videoId);
      setTimeout(() => yt.play(), 80);
    }
  }, [yt]);

  const playTrack = useCallback((track: Track, playlistId: string, source?: Track[]) => {
    const items = makeQueue(source ?? playlists.find((p) => p.id === playlistId)?.tracks ?? [track], playlistId);
    const idx = Math.max(0, items.findIndex((x) => x.id === track.id));
    setQueue(items);
    setQueueIndex(idx);
    const item = items[idx] ?? { ...track, playlistId };
    setCurrent(item);
    recordRecent(item);
    loadAndStartTrack(item);
  }, [recordRecent, loadAndStartTrack]);

  const playAll = useCallback((playlistId: string, shouldShuffle = false) => {
    const p = playlists.find((x) => x.id === playlistId);
    if (!p?.tracks.length) return;
    let items = makeQueue(p.tracks, p.id);
    if (shouldShuffle) items = [...items].sort(() => Math.random() - 0.5);
    setShuffle(shouldShuffle);
    setQueue(items);
    setQueueIndex(0);
    setCurrent(items[0]);
    recordRecent(items[0]);
    loadAndStartTrack(items[0]);
  }, [recordRecent, loadAndStartTrack]);

  const next = useCallback(() => {
    const q = queueRef.current;
    if (!q.length) return;
    let idx = queueIndexRef.current + 1;
    if (idx >= q.length) idx = repeatRef.current === "all" ? 0 : q.length - 1;
    const item = q[idx];
    setQueueIndex(idx);
    setCurrent(item);
    recordRecent(item);
    loadAndStartTrack(item);
  }, [recordRecent, loadAndStartTrack]);

  const previous = useCallback(() => {
    const activeTime = isLocalTrack ? (audioRef.current?.currentTime || 0) : yt.currentTime;
    if (activeTime > 3) {
      if (isLocalTrack && audioRef.current) {
        audioRef.current.currentTime = 0;
      } else {
        yt.seekTo(0);
      }
      return;
    }
    const q = queueRef.current;
    if (!q.length) return;
    let idx = queueIndexRef.current - 1;
    if (idx < 0) idx = repeatRef.current === "all" ? q.length - 1 : 0;
    const item = q[idx];
    setQueueIndex(idx);
    setCurrent(item);
    recordRecent(item);
    loadAndStartTrack(item);
  }, [isLocalTrack, recordRecent, loadAndStartTrack, yt]);

  const togglePlay = useCallback(() => {
    if (current.audioSrc && audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        if (!audioRef.current.src || !audioRef.current.src.includes(current.audioSrc)) {
          audioRef.current.src = getAudioUrl(current.audioSrc);
        }
        audioRef.current.play().catch((err) => console.warn("Audio play error:", err));
      }
    } else {
      if (yt.isPlaying) {
        yt.pause();
      } else {
        yt.play();
      }
    }
  }, [current.audioSrc, isAudioPlaying, yt]);

  const seek = useCallback((seconds: number) => {
    if (current.audioSrc && audioRef.current) {
      audioRef.current.currentTime = seconds;
      setAudioCurrentTime(seconds);
    } else {
      yt.seekTo(seconds);
    }
  }, [current.audioSrc, yt]);

  const setVolume = useCallback((value: number) => {
    const safe = Math.max(0, Math.min(100, value));
    setVolumeState(safe);
    if (audioRef.current) {
      audioRef.current.volume = safe / 100;
      audioRef.current.muted = false;
    }
    yt.setVolume(safe);
    if (safe > 0) setMuted(false);
  }, [yt]);

  const toggleMute = useCallback(() => {
    if (isMuted) {
      setMuted(false);
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.volume = volume / 100;
      }
      yt.unMute();
      yt.setVolume(volume);
    } else {
      setMuted(true);
      if (audioRef.current) {
        audioRef.current.muted = true;
      }
      yt.mute();
    }
  }, [isMuted, volume, yt]);

  const toggleShuffle = useCallback(() => {
    const nextShuffle = !shuffleRef.current;
    setShuffle(nextShuffle);
    if (nextShuffle) {
      const currentItem = currentRef.current;
      const rest = queueRef.current.filter((x) => x.id !== currentItem.id).sort(() => Math.random() - 0.5);
      const nextQueue = [currentItem, ...rest];
      setQueue(nextQueue);
      setQueueIndex(0);
    }
  }, []);

  const cycleRepeat = useCallback(() => {
    setRepeat((r) => (r === "off" ? "all" : r === "all" ? "one" : "off"));
  }, []);

  const removeFromQueue = useCallback((trackId: string, index: number) => {
    setQueue((prev) => prev.filter((x, i) => !(x.id === trackId && i === index)));
    if (index < queueIndexRef.current) setQueueIndex((i) => Math.max(0, i - 1));
  }, []);

  const clearQueue = useCallback(() => {
    const c = currentRef.current;
    setQueue([c]);
    setQueueIndex(0);
  }, []);

  const playNext = useCallback((track: Track, playlistId: string) => {
    setQueue((prev) => {
      const item = { ...track, playlistId };
      const without = prev.filter((x) => x.id !== track.id);
      const idx = Math.min(queueIndexRef.current + 1, without.length);
      without.splice(idx, 0, item);
      return without;
    });
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      const playing = isLocalTrack ? isAudioPlaying : yt.isPlaying;
      const curTime = isLocalTrack ? audioCurrentTime : yt.currentTime;
      const dur = isLocalTrack ? (audioDuration || current.duration) : (yt.duration || current.duration);

      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      }
      if (e.code === "ArrowLeft") seek(Math.max(0, curTime - 5));
      if (e.code === "ArrowRight") seek(Math.min(dur || 999999, curTime + 5));
      if (e.code === "ArrowUp") setVolume(volume + 5);
      if (e.code === "ArrowDown") setVolume(volume - 5);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isLocalTrack, isAudioPlaying, yt.isPlaying, audioCurrentTime, yt.currentTime, audioDuration, yt.duration, current.duration, togglePlay, seek, setVolume, volume]);

  const currentlyPlaying = isLocalTrack ? isAudioPlaying : yt.isPlaying;
  const currentActiveTime = isLocalTrack ? audioCurrentTime : yt.currentTime;
  const currentActiveDuration = isLocalTrack ? (audioDuration || current.duration) : (yt.duration || current.duration);

  // Browser Media Session API Integration
  useEffect(() => {
    if (typeof window === "undefined" || !("mediaSession" in navigator)) return;

    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: current.title,
        artist: current.artist,
        album: current.film || "Paattupetti",
        artwork: [
          {
            src: `https://i.ytimg.com/vi/${current.videoId}/hqdefault.jpg`,
            sizes: "480x360",
            type: "image/jpeg",
          },
          {
            src: `https://i.ytimg.com/vi/${current.videoId}/mqdefault.jpg`,
            sizes: "320x180",
            type: "image/jpeg",
          },
        ],
      });

      navigator.mediaSession.playbackState = currentlyPlaying ? "playing" : "paused";

      const setAction = (action: MediaSessionAction, handler: MediaSessionActionHandler | null) => {
        try {
          navigator.mediaSession.setActionHandler(action, handler);
        } catch {
          // Action not supported in this environment
        }
      };

      setAction("play", () => togglePlay());
      setAction("pause", () => togglePlay());
      setAction("nexttrack", () => next());
      setAction("previoustrack", () => previous());
      setAction("seekto", (details) => {
        if (typeof details.seekTime === "number") seek(details.seekTime);
      });
      setAction("seekforward", (details) => {
        const offset = details.seekOffset || 10;
        seek(Math.min(currentActiveDuration, currentActiveTime + offset));
      });
      setAction("seekbackward", (details) => {
        const offset = details.seekOffset || 10;
        seek(Math.max(0, currentActiveTime - offset));
      });
    } catch (err) {
      console.warn("MediaSession update error:", err);
    }
  }, [current, currentlyPlaying, currentActiveTime, currentActiveDuration, togglePlay, next, previous, seek]);

  const upcoming = queue.slice(queueIndex + 1);

  const value = useMemo<PlayerContextValue>(
    () => ({
      current,
      queue,
      upcoming,
      isPlaying: currentlyPlaying,
      currentTime: currentActiveTime,
      duration: currentActiveDuration,
      volume,
      isMuted,
      shuffle,
      repeat,
      recent,
      queueOpen,
      setQueueOpen,
      fullOpen,
      setFullOpen,
      playTrack,
      playAll,
      togglePlay,
      next,
      previous,
      seek,
      setVolume,
      toggleMute,
      toggleShuffle,
      cycleRepeat,
      removeFromQueue,
      clearQueue,
      playNext,
      playbackError,
    }),
    [
      current,
      queue,
      upcoming,
      currentlyPlaying,
      currentActiveTime,
      currentActiveDuration,
      volume,
      isMuted,
      shuffle,
      repeat,
      recent,
      queueOpen,
      fullOpen,
      playTrack,
      playAll,
      togglePlay,
      next,
      previous,
      seek,
      setVolume,
      toggleMute,
      toggleShuffle,
      cycleRepeat,
      removeFromQueue,
      clearQueue,
      playNext,
      playbackError,
    ]
  );

  return (
    <PlayerContext.Provider value={value}>
      {children}
      {/* Native HTML5 Audio Element for Local Audio Playback */}
      <audio
        ref={audioRef}
        preload="metadata"
        className="hidden"
        aria-hidden="true"
      />
      {/* Hidden container for YouTube fallback player */}
      <div className="sr-only" aria-hidden="true">
        <div id={PLAYER_ELEMENT_ID} />
      </div>
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const value = useContext(PlayerContext);
  if (!value) throw new Error("usePlayer must be used inside PlayerProvider");
  return value;
}
