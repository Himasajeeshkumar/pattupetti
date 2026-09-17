import { NextIcon, PauseIcon, PlayIcon, PrevIcon } from "./icons";

type TransportControlsProps = {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  variant: "desktop" | "mobile";
};

export default function TransportControls({
  isPlaying,
  onPlayPause,
  onPrev,
  onNext,
  variant,
}: TransportControlsProps) {
  const sideButtonClass =
    variant === "desktop"
      ? "flex h-8 w-8 items-center justify-center rounded-full text-cream/80 transition-colors hover:text-cream"
      : "flex h-11 w-11 items-center justify-center rounded-full text-cream/80 transition-colors hover:text-cream";

  const playButtonClass =
    variant === "desktop"
      ? "flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-b from-marigold-2 to-marigold text-ink shadow-[0_4px_14px_rgba(232,163,61,0.45)] ring-1 ring-white/25 transition-transform active:scale-95"
      : "flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gradient-to-b from-marigold-2 to-marigold text-ink shadow-[0_6px_20px_rgba(232,163,61,0.5)] ring-1 ring-white/25 transition-transform active:scale-95";

  const iconSize = variant === "desktop" ? "h-4 w-4" : "h-5 w-5";
  const playIconSize = variant === "desktop" ? "h-4 w-4" : "h-6 w-6";

  return (
    <div
      className={
        variant === "desktop"
          ? "flex items-center gap-1"
          : "flex items-center gap-5"
      }
    >
      <button
        type="button"
        aria-label="Previous track"
        onClick={onPrev}
        className={sideButtonClass}
      >
        <PrevIcon className={iconSize} />
      </button>
      <button
        type="button"
        aria-label={isPlaying ? "Pause" : "Play"}
        onClick={onPlayPause}
        className={playButtonClass}
      >
        {isPlaying ? (
          <PauseIcon className={playIconSize} />
        ) : (
          <PlayIcon className={`${playIconSize} translate-x-[1px]`} />
        )}
      </button>
      <button
        type="button"
        aria-label="Next track"
        onClick={onNext}
        className={sideButtonClass}
      >
        <NextIcon className={iconSize} />
      </button>
    </div>
  );
}
