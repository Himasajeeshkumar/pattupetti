export type YTPlayerState = -1 | 0 | 1 | 2 | 3 | 5;

export const YT_STATE = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
} as const;

export interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  loadVideoById(videoId: string): void;
  cueVideoById(videoId: string): void;
  getCurrentTime(): number;
  getDuration(): number;
  getPlayerState(): YTPlayerState;
  setVolume(volume: number): void;
  mute(): void;
  unMute(): void;
  destroy(): void;
}

interface YTPlayerEvent {
  target: YTPlayer;
  data: number;
}

interface YTPlayerOptions {
  videoId?: string;
  playerVars?: Record<string, number | string>;
  events?: {
    onReady?: (event: YTPlayerEvent) => void;
    onStateChange?: (event: YTPlayerEvent) => void;
    onError?: (event: YTPlayerEvent) => void;
  };
}

export interface YTNamespace {
  Player: new (elementId: string, options: YTPlayerOptions) => YTPlayer;
  PlayerState: typeof YT_STATE;
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}
