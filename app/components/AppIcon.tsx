import type React from "react";
type Props = { name: string; size?: number; className?: string };
export default function AppIcon({ name, size = 20, className = "" }: Props) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className };
  const paths: Record<string, React.ReactNode> = {
    home: <><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9"/><path d="M9 20v-6h6v6"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    heart: <path d="M20.8 8.7c0 5.4-8.8 10.2-8.8 10.2S3.2 14.1 3.2 8.7A4.7 4.7 0 0 1 12 6.3a4.7 4.7 0 0 1 8.8 2.4Z"/>,
    queue: <><path d="M4 6h12"/><path d="M4 12h12"/><path d="M4 18h7"/><path d="m17 15 4 3-4 3v-6Z"/></>,
    play: <path d="m9 5 10 7-10 7V5Z" fill="currentColor" stroke="none"/>,
    pause: <><path d="M8 5v14"/><path d="M16 5v14"/></>,
    prev: <><path d="M6 5v14"/><path d="m18 5-9 7 9 7V5Z"/></>,
    next: <><path d="M18 5v14"/><path d="m6 5 9 7-9 7V5Z"/></>,
    shuffle: <><path d="M3 6h3c4 0 6 12 10 12h5"/><path d="m18 15 3 3-3 3"/><path d="M3 18h3c1.6 0 2.8-1.1 3.8-2.5"/><path d="M15.2 8.5C16.2 7 17.3 6 19 6h2"/><path d="m18 3 3 3-3 3"/></>,
    repeat: <><path d="m17 2 3 3-3 3"/><path d="M4 7h15"/><path d="m7 22-3-3 3-3"/><path d="M20 17H5"/></>,
    volume: <><path d="M4 9v6h4l5 4V5L8 9H4Z"/><path d="M17 9a4 4 0 0 1 0 6"/></>,
    menu: <><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></>,
    x: <><path d="m6 6 12 12"/><path d="M18 6 6 18"/></>,
    more: <><circle cx="5" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    music: <><path d="M9 18V5l10-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="16" cy="16" r="3"/></>,
  };
  return <svg {...common}>{paths[name] ?? paths.music}</svg>;
}
