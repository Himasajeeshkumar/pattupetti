type IconProps = { className?: string };

export function PlayIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8 5.5v13l11-6.5-11-6.5z" />
    </svg>
  );
}

export function PauseIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

export function PrevIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M6 5v14h2V5H6zm3.5 7 11-7v14l-11-7z" />
    </svg>
  );
}

export function NextIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18 5v14h-2V5h2zM14.5 12l-11-7v14l11-7z" />
    </svg>
  );
}
