"use client";

import { useCallback, useRef, useState } from "react";

type SeekBarProps = {
  currentTime: number;
  duration: number;
  onSeek: (seconds: number) => void;
  className?: string;
};

export default function SeekBar({
  currentTime,
  duration,
  onSeek,
  className = "",
}: SeekBarProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [dragRatio, setDragRatio] = useState<number | null>(null);

  const ratioFromEvent = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    const raw = (e.clientX - rect.left) / rect.width;
    return Math.min(1, Math.max(0, raw));
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      const ratio = ratioFromEvent(e);
      setDragRatio(ratio);
    },
    [ratioFromEvent]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (dragRatio === null) return;
      setDragRatio(ratioFromEvent(e));
    },
    [dragRatio, ratioFromEvent]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (dragRatio === null) return;
      const ratio = ratioFromEvent(e);
      if (duration > 0) onSeek(ratio * duration);
      setDragRatio(null);
    },
    [dragRatio, duration, onSeek, ratioFromEvent]
  );

  const progressRatio =
    dragRatio ?? (duration > 0 ? currentTime / duration : 0);

  return (
    <div
      ref={trackRef}
      className={`group relative flex h-6 w-full touch-none items-center ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/15">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-marigold shadow-[0_0_10px_2px_rgba(232,163,61,0.55)]"
          style={{ width: `${progressRatio * 100}%` }}
        />
      </div>
      <div
        className="absolute top-1/2 h-3 w-3 -translate-y-1/2 -translate-x-1/2 rounded-full bg-marigold-2 opacity-0 shadow-[0_0_8px_rgba(244,192,101,0.8)] transition-opacity group-hover:opacity-100"
        style={{ left: `${progressRatio * 100}%` }}
      />
    </div>
  );
}
