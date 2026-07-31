/**
 * The NC mark. The logo's "C" is almost black, so on this page it needs its own
 * light to read — a soft violet glow sits behind it rather than a plate or
 * border, which would reintroduce exactly the kind of hard-edged box the rest
 * of the design works to avoid.
 */
export function Logo({
  className = "",
  glow = "opacity-70",
}: {
  className?: string;
  glow?: string;
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 -z-10 scale-[1.5] rounded-full bg-[radial-gradient(ellipse_at_center,rgb(var(--rgb-violet)/0.55),transparent_70%)] blur-xl ${glow}`}
      />
      <picture>
        <source srcSet="/images/nc-logo.webp" type="image/webp" />
        <img
          src="/images/nc-logo.png"
          alt="Logo NC — Nicolas Caraffa"
          width={696}
          height={336}
          decoding="async"
          className="h-full w-auto select-none"
        />
      </picture>
    </span>
  );
}
