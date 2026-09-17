const LINKS = [
  { label: "Instagram", href: "https://instagram.com/" },
  { label: "YouTube", href: "https://youtube.com/" },
];

export default function SocialLinks() {
  return (
    <nav className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-widest text-cream-dim sm:text-xs">
      {LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer noopener"
          className="transition-colors hover:text-marigold"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
