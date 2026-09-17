"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { YT_STATE, type YTPlayer, type YTPlayerState } from "./youtube-types";

const IFRAME_API_SRC = "https://www.youtube.com/iframe_api";
let apiLoadPromise: Promise<void> | null = null;

function loadYouTubeIframeApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();
  if (apiLoadPromise) return apiLoadPromise;

  apiLoadPromise = new Promise((resolve) => {
    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      resolve();
    };
    if (!document.querySelector(`script[src="${IFRAME_API_SRC}"]`)) {
      const tag = document.createElement("script");
      tag.src = IFRAME_API_SRC;
      document.head.appendChild(tag);
    }
  });
  return apiLoadPromise;
}

type YouTubeErrorInfo = { code: number; videoId: string };

type UseYouTubePlayerArgs = {
  elementId: string;
  initialVideoId: string;
  onEnded: () => void;
  onError: (info: YouTubeErrorInfo) => void;
};

export function useYouTubePlayer({
  elementId,
  initialVideoId,
  onEnded,
  onError,
}: UseYouTubePlayerArgs) {
  const playerRef = useRef<YTPlayer | null>(null);
  const currentVideoIdRef = useRef(initialVideoId);
  const onEndedRef = useRef(onEnded);
  const onErrorRef = useRef(onError);
  onEndedRef.current = onEnded;
  onErrorRef.current = onError;

  const [isReady, setIsReady] = useState(false);
  const [playerState, setPlayerState] = useState<YTPlayerState>(
    YT_STATE.UNSTARTED
  );
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let poll: ReturnType<typeof setInterval> | null = null;

    loadYouTubeIframeApi().then(() => {
      if (cancelled || !window.YT) return;

      const player = new window.YT.Player(elementId, {
        videoId: currentVideoIdRef.current,
        playerVars: {
          playsinline: 1,
          controls: 0,
          disablekb: 1,
          rel: 0,
          modestbranding: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            setIsReady(true);
            try {
              const readyDuration = event.target.getDuration();
              if (readyDuration > 0) setDuration(readyDuration);
            } catch {
              // Duration becomes available once YouTube has loaded the media.
            }
          },
          onStateChange: (event) => {
            const state = event.data as YTPlayerState;
            setPlayerState(state);
            if (state === YT_STATE.PLAYING) {
              setDuration(event.target.getDuration());
            }
            if (state === YT_STATE.ENDED) {
              onEndedRef.current();
            }
          },
          onError: (event) => {
            onErrorRef.current({
              code: event.data,
              videoId: currentVideoIdRef.current,
            });
          },
        },
      });

      playerRef.current = player;

      poll = setInterval(() => {
        const p = playerRef.current;
        if (!p) return;
        try {
          setCurrentTime(p.getCurrentTime());
        } catch {
          // player not ready between destroy/create cycles
        }
      }, 250);
    });

    return () => {
      cancelled = true;
      if (poll) clearInterval(poll);
      playerRef.current?.destroy();
      playerRef.current = null;
      setIsReady(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    };
  }, [elementId]);

  const loadVideo = useCallback((videoId: string) => {
    currentVideoIdRef.current = videoId;
    setCurrentTime(0);
    setDuration(0);
    playerRef.current?.loadVideoById(videoId);
  }, []);

  const play = useCallback(() => {
    playerRef.current?.playVideo();
  }, []);

  const pause = useCallback(() => {
    playerRef.current?.pauseVideo();
  }, []);

  const setVolume = useCallback((value: number) => {
    playerRef.current?.setVolume(Math.max(0, Math.min(100, value)));
  }, []);

  const mute = useCallback(() => { playerRef.current?.mute(); }, []);
  const unMute = useCallback(() => { playerRef.current?.unMute(); }, []);

  const seekTo = useCallback((seconds: number) => {
    playerRef.current?.seekTo(seconds, true);
    setCurrentTime(seconds);
  }, []);

  return {
    isReady,
    playerState,
    isPlaying: playerState === YT_STATE.PLAYING,
    currentTime,
    duration,
    loadVideo,
    play,
    pause,
    seekTo,
    setVolume,
    mute,
    unMute,
  };
}
