"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

function splitParts(date: Date) {
  const parts = formatter.formatToParts(date);
  const hour = parts.find((p) => p.type === "hour")?.value ?? "";
  const minute = parts.find((p) => p.type === "minute")?.value ?? "";
  const dayPeriod = parts.find((p) => p.type === "dayPeriod")?.value ?? "";
  return { hour, minute, dayPeriod };
}

export default function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return <div className="font-mono text-xs text-cream-dim opacity-0">--:--</div>;
  }

  const { hour, minute, dayPeriod } = splitParts(now);

  return (
    <div className="flex items-baseline gap-1 font-mono text-sm text-cream/90 tabular-nums sm:text-base">
      <span>{hour}</span>
      <span className="animate-blink">:</span>
      <span>{minute}</span>
      <span className="ml-1 text-[10px] uppercase tracking-widest text-cream-dim sm:text-xs">
        {dayPeriod}
      </span>
    </div>
  );
}
