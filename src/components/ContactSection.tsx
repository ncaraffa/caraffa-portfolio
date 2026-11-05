import { useState, type PointerEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { SectionShell, Wash } from "./Section";
import { useT } from "../i18n";

const EMAIL = "nicolascaraffa0105@gmail.com";
const EASE = [0.22, 1, 0.36, 1] as const;

/** Brand logo (Simple Icons, CC0) painted through a mask so it can take a gradient. */
function BrandLogo({ id, paint }: { id: string; paint: string }) {
  return (
    <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] shadow-[inset_0_1px_0_rgb(255_255_255/0.08)]">
      <span
        aria-hidden
        className="block h-7 w-7"
        style={{
          background: paint,
          mask: `url(/logos/${id}.svg) center / contain no-repeat`,
          WebkitMask: `url(/logos/${id}.svg) center / contain no-repeat`,
        }}
      />
    </span>
  );
}

const spotlight = (e: PointerEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

const CARD =
  "group relative flex min-h-[44px] items-center gap-4 overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.04] p-4 sm:p-5 transition-[transform,border-color] duration-[180ms] ease-out hover:-translate-y-[3px] hover:border-violet-400/40 active:scale-[0.98] active:duration-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300";

function Spot() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:hidden"
      style={{ background: "radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), rgb(var(--rgb-violet) / 0.16), transparent 70%)" }}
    />
  );
}

function Item({ i, children, className = "" }: { i: number; children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: 0.15 + i * 0.07, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/*
 * Editorial close (Codex's direction): a dominant title, then one big violet
 * glass panel — e-mail as the primary action on its own row (send or copy),
 * Instagram and GitHub sharing the second. Every channel shows its own logo.
 */
export function ContactSection() {
  const t = useT();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <SectionShell id="contato" className="py-[72px] sm:py-[120px]">
      <Wash background="radial-gradient(ellipse 60% 56% at 50% 56%, rgb(var(--rgb-violet) / var(--wash-4)), transparent 74%)" />
      <Wash background="radial-gradient(ellipse 46% 42% at 78% 24%, rgb(var(--rgb-fuchsia) / var(--wash-2)), transparent 76%)" />

      <div className="relative mx-auto w-full max-w-[1120px] px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-violet-300/80">
            {t("Contato", "Contact")}
          </span>
          <h2 className="font-display mt-4 text-[clamp(40px,7vw,80px)] font-semibold leading-[1.05] tracking-tight text-white">
            {t("Vamos construir algo", "Shall we build something")}
            <br />
            <span className="bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
              {t("juntos?", "together?")}
            </span>
          </h2>
          <p className="mt-5 max-w-md text-white/55">
            {t(
              "Aberto a novos projetos, colaborações e conversas sobre tecnologia.",
              "Open to new projects, collaborations and conversations about technology.",
            )}
          </p>
        </motion.div>

        {/* The glass panel */}
        <div
          className="relative mt-12 overflow-hidden rounded-[28px] border border-white/10 p-3 backdrop-blur-[16px] sm:p-4"
          style={{
            background:
              "radial-gradient(ellipse 70% 90% at 15% 0%, rgb(124 58 237 / 0.16), transparent 70%), linear-gradient(rgb(255 255 255 / 0.04), rgb(255 255 255 / 0.04)), rgb(11 8 18 / 0.7)",
            boxShadow: "inset 0 1px 0 rgb(255 255 255 / 0.1), 0 40px 120px -40px rgb(0 0 0 / 0.9)",
          }}
        >
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {/* E-mail — full first row */}
            <Item i={0} className="sm:col-span-2">
              <div onPointerMove={spotlight} className={`${CARD} cursor-default flex-wrap sm:flex-nowrap sm:p-6`}>
                <Spot />
                <BrandLogo id="gmail" paint="#EA4335" />
                <div className="relative min-w-0 flex-1">
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">E-mail</div>
                  <div className="mt-1 truncate font-display text-lg font-semibold text-white sm:text-2xl">{EMAIL}</div>
                </div>
                <div className="relative flex shrink-0 flex-col gap-2 sm:flex-row">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-black transition hover:bg-white/90 active:scale-[0.98]"
                  >
                    {t("Enviar e-mail", "Send e-mail")}
                    <ArrowUpRight size={16} className="transition-transform duration-[180ms] group-hover:translate-x-[3px]" />
                  </a>
                  <button
                    type="button"
                    onClick={copy}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm font-medium text-white/80 transition hover:border-violet-300/40 hover:text-white active:scale-[0.98]"
                  >
                    {copied ? <Check size={16} className="text-emerald-300" /> : <Copy size={16} />}
                    {copied ? t("E-mail copiado!", "E-mail copied!") : t("Copiar", "Copy")}
                  </button>
                </div>
              </div>
            </Item>

            <span aria-live="polite" className="sr-only">
              {copied ? t("E-mail copiado!", "E-mail copied!") : ""}
            </span>

            {/* Instagram + GitHub — second row */}
            {[
              {
                id: "instagram",
                paint: "linear-gradient(45deg, #f9ce34, #ee2a7b 50%, #6228d7)",
                label: "Instagram",
                handle: "@ncaraffa_",
                href: "https://www.instagram.com/ncaraffa_/",
              },
              { id: "github", paint: "#ffffff", label: "GitHub", handle: "ncaraffa", href: "https://github.com/ncaraffa" },
            ].map((c, i) => (
              <Item key={c.id} i={i + 1}>
                <a href={c.href} target="_blank" rel="noreferrer" onPointerMove={spotlight} className={CARD}>
                  <Spot />
                  <BrandLogo id={c.id} paint={c.paint} />
                  <div className="relative min-w-0 flex-1">
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">{c.label}</div>
                    <div className="mt-1 truncate font-display text-lg font-semibold text-white">{c.handle}</div>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="relative shrink-0 text-white/40 transition-[transform,color] duration-[180ms] ease-out group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-violet-200"
                  />
                </a>
              </Item>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
