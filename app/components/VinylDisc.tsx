type VinylDiscProps = {
  elementId: string;
  isPlaying: boolean;
  className: string;
};

/**
 * The single, always-mounted visible YouTube player. It never unmounts
 * and never physically moves in the DOM — only its size/position
 * change (via `className`, driven by the sm: breakpoint) so the
 * player never reloads and is never hidden from the listener, per
 * YouTube's embed requirements.
 */
export default function VinylDisc({
  elementId,
  isPlaying,
  className,
}: VinylDiscProps) {
  return (
    <div className={`shrink-0 rounded-full ${className}`}>
      <div
        className="vinyl-frame absolute inset-0 overflow-hidden rounded-full bg-ink-2 ring-1 ring-white/10"
        style={{
          animation: "spin 8s linear infinite",
          animationPlayState: isPlaying ? "running" : "paused",
        }}
      >
        <div id={elementId} className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/70 ring-2 ring-white/40" />
    </div>
  );
}
