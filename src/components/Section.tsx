import type { CSSProperties, ReactNode } from "react";

/**
 * Full-bleed section shell. Owns the atmosphere; spans the real content width
 * so a child's `inset-x-0` resolves to it (never `100vw`, which would include
 * the scrollbar and shift the layer off-centre relative to the column).
 *
 * Two invariants, and breaking either one brings the seams straight back:
 *
 *  1. It must NOT become a stacking context. Adding `isolate`, `transform`,
 *     `filter`, `opacity < 1` or `mix-blend-mode` traps the `z-index: -1`
 *     atmosphere here instead of letting it hoist to .app-root — and that
 *     section's wash immediately starts painting over the previous section's
 *     paragraphs.
 *  2. It must NOT get `overflow-hidden`. The vertical spill IS the fix: each
 *     wash deliberately over-scans into its neighbours so no wash edge ever
 *     lands on a section boundary. Clipping it re-creates the hard edge.
 */
export function SectionShell({
  children,
  className = "",
  id,
  lang,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Set when a section's content is in a different language than the page,
      so screen readers switch pronunciation for it. */
  lang?: string;
}) {
  return (
    <section id={id} lang={lang} className={`relative ${className}`}>
      {children}
    </section>
  );
}

/** The 1024px reading measure. Content only — never decoration. */
export function Column({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative mx-auto max-w-5xl px-6 ${className}`}>{children}</div>
  );
}

/**
 * An over-scanned, four-side-feathered light source. Sibling of the reading
 * column, never a child of it. `background` is passed in so each section can
 * place its own light while sharing one geometry and one falloff.
 */
export function Wash({
  background,
  className = "",
}: {
  background: string;
  className?: string;
}) {
  return (
    <div aria-hidden className={`atmo ${className}`} style={{ background }} />
  );
}

export function GlowOrb({
  className,
  delay = 0,
  style,
}: {
  className: string;
  delay?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden
      style={{ animationDelay: `${delay}s`, ...style }}
      className={`glow-breathe pointer-events-none absolute rounded-full blur-3xl ${className}`}
    />
  );
}

/** Retained for the header, which wants the reading measure and no atmosphere. */
export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative mx-auto max-w-5xl px-6 ${className}`}>
      {children}
    </section>
  );
}
