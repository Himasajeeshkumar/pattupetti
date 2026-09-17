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
  favorites: string[];
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
  toggleFavorite: (trackId: string) => void;
  isFavorite: (trackId: string) => boolean;
  removeFromQueue: (trackId: string, index: number) => void;
  clearQueue: () => void;
  playNext: (track: Track, playlistId: string) => void;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);
const PLAYER_ELEMENT_ID = "paattupetti-youtube-player";

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
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recent, setRecent] = useState<QueueItem[]>([]);
  const [queueOpen, setQueueOpen] = useState(false);
  const [fullOpen, setFullOpen] = useState(false);

  const currentRef = useRef(current);
  const queueRef = useRef(queue);
  const queueIndexRef = useRef(queueIndex);
  const repeatRef = useRef(repeat);
  const shuffleRef = useRef(shuffle);
  currentRef.current = current;
  queueRef.current = queue;
  queueIndexRef.current = queueIndex;
  repeatRef.current = repeat;
  shuffleRef.current = shuffle;

  useEffect(() => {
    setFavorites(readStorage<string[]>("paattupetti:favorites", []));
    setRecent(readStorage<QueueItem[]>("paattupetti:recent", []));
    setVolumeState(readStorage<number>("paattupetti:volume", 80));
  }, []);

  useEffect(() => localStorage.setItem("paattupetti:favorites", JSON.stringify(favorites)), [favorites]);
  useEffect(() => localStorage.setItem("paattupetti:recent", JSON.stringify(recent)), [recent]);
  useEffect(() => localStorage.setItem("paattupetti:volume", JSON.stringify(volume)), [volume]);

  const advance = useCallback(() => {
    const q = queueRef.current;
    if (!q.length) return;
    if (repeatRef.current === "one") {
      yt.loadVideo(currentRef.current.videoId);
      return;
    }
    let nextIndex = queueIndexRef.current + 1;
    if (nextIndex >= q.length) {
      if (repeatRef.current === "all") nextIndex = 0;
      else return;
    }
    const nextTrack = q[nextIndex];
    setQueueIndex(nextIndex);
    setCurrent(nextTrack);
    yt.loadVideo(nextTrack.videoId);
  }, []);

  const onEnded = useCallback(() => advance(), [advance]);
  const onError = useCallback((info: { code: number; videoId: string }) => {
    trackAnalyticsEvent("youtube_playback_error", { code: info.code, videoId: info.videoId });
    advance();
  }, [advance]);

  const yt = useYouTubePlayer({
    elementId: PLAYER_ELEMENT_ID,
    initialVideoId: firstTrack.videoId,
    onEnded,
    onError,
  });

  const recordRecent = useCallback((item: QueueItem) => {
    setRecent((prev) => [item, ...prev.filter((x) => x.id !== item.id)].slice(0, 12));
  }, []);

  const playTrack = useCallback((track: Track, playlistId: string, source?: Track[]) => {
    const items = makeQueue(source ?? playlists.find((p) => p.id === playlistId)?.tracks ?? [track], playlistId);
    const idx = Math.max(0, items.findIndex((x) => x.id === track.id));
    setQueue(items);
    setQueueIndex(idx);
    const item = items[idx] ?? { ...track, playlistId };
    setCurrent(item);
    recordRecent(item);
    yt.loadVideo(item.videoId);
    setTimeout(() => yt.play(), 80);
  }, [recordRecent, yt]);

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
    yt.loadVideo(items[0].videoId);
    setTimeout(() => yt.play(), 80);
  }, [recordRecent, yt]);

  const next = useCallback(() => {
    const q = queueRef.current;
    if (!q.length) return;
    let idx = queueIndexRef.current + 1;
    if (idx >= q.length) idx = repeatRef.current === "all" ? 0 : q.length - 1;
    const item = q[idx];
    setQueueIndex(idx);
    setCurrent(item);
    recordRecent(item);
    yt.loadVideo(item.videoId);
    setTimeout(() => yt.play(), 80);
  }, [recordRecent, yt]);

  const previous = useCallback(() => {
    if (yt.currentTime > 5) { yt.seekTo(0); return; }
    const q = queueRef.current;
    if (!q.length) return;
    let idx = queueIndexRef.current - 1;
    if (idx < 0) idx = repeatRef.current === "all" ? q.length - 1 : 0;
    const item = q[idx];
    setQueueIndex(idx);
    setCurrent(item);
    recordRecent(item);
    yt.loadVideo(item.videoId);
    setTimeout(() => yt.play(), 80);
  }, [recordRecent, yt]);

  const setVolume = useCallback((value: number) => {
    const safe = Math.max(0, Math.min(100, value));
    setVolumeState(safe);
    yt.setVolume(safe);
    if (safe > 0) setMuted(false);
  }, [yt]);

  const toggleMute = useCallback(() => {
    if (isMuted) { yt.unMute(); yt.setVolume(volume); setMuted(false); }
    else { yt.mute(); setMuted(true); }
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
    setRepeat((r) => r === "off" ? "all" : r === "all" ? "one" : "off");
  }, []);

  const toggleFavorite = useCallback((trackId: string) => {
    setFavorites((prev) => prev.includes(trackId) ? prev.filter((id) => id !== trackId) : [...prev, trackId]);
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

  useEffect(() => {
    yt.setVolume(volume);
  }, [volume, yt]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      if (e.code === "Space") { e.preventDefault(); yt.isPlaying ? yt.pause() : yt.play(); }
      if (e.code === "ArrowLeft") yt.seekTo(Math.max(0, yt.currentTime - 5));
      if (e.code === "ArrowRight") yt.seekTo(Math.min(yt.duration || 999999, yt.currentTime + 5));
      if (e.code === "ArrowUp") setVolume(volume + 5);
      if (e.code === "ArrowDown") setVolume(volume - 5);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setVolume, volume, yt]);

  const upcoming = queue.slice(queueIndex + 1);

  const value = useMemo<PlayerContextValue>(() => ({
    current, queue, upcoming, isPlaying: yt.isPlaying, currentTime: yt.currentTime,
    duration: yt.duration || current.duration, volume, isMuted, shuffle, repeat,
    favorites, recent, queueOpen, setQueueOpen, fullOpen, setFullOpen, playTrack, playAll, togglePlay: () => yt.isPlaying ? yt.pause() : yt.play(),
    next, previous, seek: yt.seekTo, setVolume, toggleMute, toggleShuffle, cycleRepeat, toggleFavorite,
    isFavorite: (id) => favorites.includes(id), removeFromQueue, clearQueue, playNext,
  }), [current, queue, upcoming, yt.isPlaying, yt.currentTime, yt.duration, volume, isMuted, shuffle, repeat, favorites, recent, queueOpen, fullOpen, playTrack, playAll, next, previous, yt, setVolume, toggleMute, toggleShuffle, cycleRepeat, toggleFavorite, removeFromQueue, clearQueue, playNext]);

  return <PlayerContext.Provider value={value}>
    {children}
    <div className="sr-only" aria-hidden="true"><div id={PLAYER_ELEMENT_ID} /></div>
  </PlayerContext.Provider>;
}

export function usePlayer() {
  const value = useContext(PlayerContext);
  if (!value) throw new Error("usePlayer must be used inside PlayerProvider");
  return value;
}
