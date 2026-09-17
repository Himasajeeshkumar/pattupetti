"use client";

import { useEffect, useState } from "react";

const BASE = 1248;

export default function ListenerCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    setCount(BASE + Math.floor(Math.random() * 9) - 4);
    const id = setInterval(() => {
      setCount((prev) => {
        const current = prev ?? BASE;
        const drift = Math.floor(Math.random() * 5) - 2;
        const next = current + drift;
        return Math.min(1390, Math.max(1120, next));
      });
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-1.5 whitespace-nowrap font-mono text-[11px] text-cream-dim sm:text-xs">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-marigold/70" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-marigold" />
      </span>
      <span className="tabular-nums">{count ?? BASE}</span>
      <span className="uppercase tracking-widest">listening</span>
    </div>
  );
}
