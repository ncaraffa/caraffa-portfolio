/** Infinite horizontal marquee, pauses on hover and under reduced motion. */
export function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];
  return (
    <div className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="marquee-track flex w-max gap-3 group-hover:[animation-play-state:paused]">
        {loop.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50 transition-colors duration-300 hover:border-violet-400/40 hover:text-white/80"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
