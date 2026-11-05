import { useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  MapPin,
  Terminal,
  Network,
  ShieldCheck,
  Server,
  CodeXml,
  Fingerprint,
  Waypoints,
} from "lucide-react";
import { SectionShell, Column, Wash } from "./Section";
import { Logo } from "./Logo";
import { useT } from "../i18n";

/** The path so far, in his own words — no invented milestones. */
const TIMELINE = [
  {
    when: { pt: "Aos 11 anos", en: "At 11" },
    what: { pt: "Primeiro contato com programação, em Python. Durou algumas semanas e acabou ficando pra trás.", en: "First contact with programming, in Python. It lasted a few weeks and ended up left behind." },
  },
  {
    when: { pt: "Abril de 2025", en: "April 2025" },
    what: { pt: "Depois de conhecer um amigo que já era desenvolvedor, a paixão por programação e tecnologia despertou de novo.", en: "After meeting a friend who was already a developer, the passion for programming and technology woke up again." },
  },
  {
    when: { pt: "Desde então", en: "Since then" },
    what: { pt: "Construindo base de verdade: dos fundamentos da programação a redes, Linux e administração de servidores.", en: "Building a real foundation: from programming fundamentals to networking, Linux and server administration." },
  },
];

/** Tux silhouette (Simple Icons, CC0). */
function Tux({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.910.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.180 1.180 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.71-.07-.268-.005-.47.193-.6.224-.135.38-.271.483-.336.104-.074.143-.102.176-.131h.002v-.003c.169-.202.436-.47.839-.601.139-.036.294-.065.466-.065zm2.8 2.142c.358 1.417 1.196 3.475 1.735 4.473.286.534.855 1.659 1.102 3.024.156-.005.33.018.513.064.646-1.671-.546-3.467-1.089-3.966-.22-.2-.232-.335-.123-.335.59.534 1.365 1.572 1.646 2.757.13.535.16 1.104.021 1.67.067.028.135.06.205.067 1.032.534 1.413.938 1.23 1.537v-.043c-.06-.003-.12 0-.18 0h-.016c.151-.467-.182-.825-1.065-1.224-.915-.4-1.646-.336-1.77.465-.008.043-.013.066-.018.135-.068.023-.139.053-.209.064-.43.268-.662.669-.793 1.187-.13.533-.17 1.156-.205 1.869v.003c-.02.334-.17.838-.319 1.350-1.500 1.072-3.580 1.538-5.348.334a2.645 2.645 0 00-.402-.533 1.450 1.450 0 00-.275-.333c.182 0 .338-.03.465-.067a.615.615 0 00.314-.334c.108-.267 0-.697-.345-1.163-.345-.467-.931-.995-1.788-1.521-.63-.4-.986-.87-1.15-1.396-.165-.534-.143-1.085-.015-1.645.245-1.07.873-2.11 1.274-2.763.107-.065.037.135-.408.974-.396.751-1.14 2.497-.122 3.854a8.123 8.123 0 01.647-2.876c.564-1.278 1.743-3.504 1.836-5.268.048.036.217.135.289.202.218.133.38.333.59.465.21.201.477.335.876.335.039.003.075.006.11.006.412 0 .73-.134.997-.268.29-.134.52-.334.74-.4h.005c.467-.135.835-.402 1.044-.7zm2.185 8.958c.037.6.343 1.245.882 1.377.588.134 1.434-.333 1.791-.765l.211-.01c.315-.007.577.01.847.268l.003.003c.208.199.305.53.391.876.085.4.154.78.409 1.066.486.527.645.906.636 1.14l.003-.007v.018l-.003-.012c-.015.262-.185.396-.498.595-.63.401-1.746.712-2.457 1.570-.618.737-1.37 1.14-2.036 1.191-.664.053-1.237-.2-1.574-.898l-.005-.003c-.21-.4-.12-1.025.056-1.690.176-.668.428-1.344.463-1.897.037-.714.076-1.335.195-1.814.12-.465.308-.797.641-.984l.045-.022zm-10.814.049h.01c.053 0 .105.005.157.014.376.055.706.333 1.023.752l.91 1.664.003.003c.243.533.754 1.064 1.189 1.637.434.598.77 1.131.729 1.570v.006c-.057.744-.48 1.148-1.125 1.294-.645.135-1.520.002-2.395-.464-.968-.536-2.118-.469-2.857-.602-.369-.066-.61-.2-.723-.4-.11-.2-.113-.602.123-1.230v-.004l.002-.003c.117-.334.03-.752-.027-1.118-.055-.401-.083-.71.043-.94.16-.334.396-.4.69-.533.294-.135.64-.202.915-.47h.002v-.002c.256-.268.445-.601.668-.838.19-.201.38-.336.663-.336zm7.159-9.074c-.435.201-.945.535-1.488.535-.542 0-.97-.267-1.280-.466-.154-.134-.28-.268-.373-.335-.164-.134-.144-.333-.074-.333.109.016.129.134.199.2.096.066.215.2.36.333.292.2.68.467 1.167.467.485 0 1.053-.267 1.398-.466.195-.135.445-.334.648-.467.156-.136.149-.267.279-.267.128.016.034.134-.147.332a8.097 8.097 0 01-.69.468zm-1.082-1.583V5.640c-.006-.02.013-.042.029-.05.074-.043.18-.027.26.004.063 0 .16.067.15.135-.006.049-.085.066-.135.066-.055 0-.092-.043-.141-.068-.052-.018-.146-.008-.163-.065zm-.551 0c-.02.058-.113.049-.166.066-.047.025-.086.068-.14.068-.05 0-.13-.02-.136-.068-.01-.066.088-.133.15-.133.08-.031.184-.047.259-.005.019.009.036.03.03.05v.02h.003z" />
    </svg>
  );
}

/** Four-pane window mark for Windows Server. */
function WindowPanes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <rect x="2" y="2" width="9.5" height="9.5" rx="0.6" />
      <rect x="12.5" y="2" width="9.5" height="9.5" rx="0.6" />
      <rect x="2" y="12.5" width="9.5" height="9.5" rx="0.6" />
      <rect x="12.5" y="12.5" width="9.5" height="9.5" rx="0.6" />
    </svg>
  );
}

const ART = "h-full w-full";

const FOUNDATIONS = [
  {
    icon: Terminal,
    label: { pt: "Fundamentos de programação", en: "Programming fundamentals" },
    desc: { pt: "A base que sustenta o resto — lógica, estruturas e prática constante.", en: "The base that holds everything else — logic, structures and constant practice." },
    art: <CodeXml strokeWidth={1.1} className={ART} />,
  },
  {
    icon: ShieldCheck,
    label: { pt: "Cybersegurança", en: "Cybersecurity" },
    desc: { pt: "Curso básico concluído: princípios de segurança e boas práticas.", en: "Basic course completed: security principles and good practices." },
    art: <Fingerprint strokeWidth={1.1} className={ART} />,
  },
  {
    icon: Terminal,
    label: { pt: "Linux", en: "Linux" },
    desc: { pt: "Linha de comando, permissões e o dia a dia de um sistema Unix.", en: "Command line, permissions and day-to-day life on a Unix system." },
    art: <Tux className={ART} />,
  },
  {
    icon: Network,
    label: { pt: "Redes", en: "Networking" },
    desc: { pt: "Como as máquinas conversam: endereçamento, serviços e diagnóstico.", en: "How machines talk: addressing, services and troubleshooting." },
    art: <Waypoints strokeWidth={1.1} className={ART} />,
  },
  {
    icon: Server,
    label: { pt: "Windows Server", en: "Windows Server" },
    desc: { pt: "Administração na prática — incluindo a criação do meu próprio domínio.", en: "Hands-on administration — including setting up my own domain." },
    art: <WindowPanes className={ART} />,
  },
];

type Foundation = (typeof FOUNDATIONS)[number];

/*
 * Scroll-driven sequence: one progress value for the whole grid, split into
 * equal steps. In each step a card appears, then a line draws from it to the
 * next card — so they arrive one at a time, as if the line carried you along.
 * Everything is scrubbed by scroll and reverses when scrolling back up.
 */
const STEP = 1 / FOUNDATIONS.length;

function FoundationCard({
  item,
  p,
  at,
  reduce,
}: {
  item: Foundation;
  p: MotionValue<number>;
  at: number;
  reduce: boolean;
}) {
  const a = at;
  const b = at + STEP * 0.5;
  const r = (from: number, to: number) => (reduce ? [to, to] : [from, to]);

  const opacity = useTransform(p, [a, b], r(0, 1));
  const y = useTransform(p, [a, b], r(40, 0));
  const scale = useTransform(p, [a, b], r(0.92, 1));

  const artEnd = at + STEP;
  const artX = useTransform(p, [a, artEnd], r(80, 0));
  const artRotate = useTransform(p, [a, artEnd], r(-20, 0));
  const artOpacity = useTransform(p, [a + STEP * 0.2, artEnd], r(0, 0.09));

  const t = useT();
  const { icon: Icon, label, desc, art } = item;

  return (
    <motion.div
      data-card
      style={{ opacity, y, scale }}
      // Zigzag: alternate sides on wider screens so the line has room to travel.
      className={`sm:w-[46%] ${Math.round(at / STEP) % 2 ? "sm:self-end" : "sm:self-start"}`}
    >
      <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/[0.07] hover:shadow-[0_0_30px_-8px_rgb(var(--rgb-violet)/0.4)]">
        <motion.div
          aria-hidden
          style={{ x: artX, rotate: artRotate, opacity: artOpacity }}
          className="pointer-events-none absolute -bottom-8 -right-6 h-40 w-40 text-violet-200"
        >
          {art}
        </motion.div>
        <div className="relative">
          <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-400/10">
            <Icon size={16} className="text-violet-300" />
          </span>
          <h3 className="font-display text-lg font-semibold text-white">{t(label)}</h3>
          <p className="mt-2 text-base leading-relaxed text-white/55">{t(desc)}</p>
        </div>
      </div>
    </motion.div>
  );
}

function Connector({
  d,
  p,
  at,
  reduce,
}: {
  d: string;
  p: MotionValue<number>;
  at: number;
  reduce: boolean;
}) {
  // Draws in the second half of the step, after its card has landed.
  const a = at + STEP * 0.5;
  const b = at + STEP;
  const pathLength = useTransform(p, [a, b], reduce ? [1, 1] : [0, 1]);
  const opacity = useTransform(p, [a, a + 0.01], reduce ? [1, 1] : [0, 1]);
  return (
    <motion.path
      d={d}
      fill="none"
      strokeWidth={1.5}
      strokeLinecap="round"
      style={{ pathLength, opacity, stroke: "rgb(var(--rgb-lilac) / 0.7)" }}
    />
  );
}

function FoundationsGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const [paths, setPaths] = useState<string[]>([]);

  // Route a line between consecutive cards: straight across the gap within a
  // row, or down → across → down when the next card starts a new row. Uses
  // offset* so the cards' own scroll transforms don't skew the measurement.
  useLayoutEffect(() => {
    const grid = ref.current;
    if (!grid) return;
    const measure = () => {
      const cards = [...grid.querySelectorAll<HTMLElement>("[data-card]")];
      const out: string[] = [];
      for (let i = 0; i < cards.length - 1; i++) {
        const c = cards[i];
        const n = cards[i + 1];
        const x1 = c.offsetLeft + c.offsetWidth / 2;
        const y1 = c.offsetTop + c.offsetHeight;
        const x2 = n.offsetLeft + n.offsetWidth / 2;
        const y2 = n.offsetTop;
        const mid = (y1 + y2) / 2;
        out.push(`M${x1} ${y1} C${x1} ${mid} ${x2} ${mid} ${x2} ${y2}`);
      }
      setPaths(out);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(grid);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative flex flex-col gap-20 sm:gap-28">
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        style={{ filter: "drop-shadow(0 0 4px rgb(var(--rgb-violet) / 0.9))" }}
      >
        {paths.map((d, i) => (
          <Connector key={i} d={d} p={scrollYProgress} at={i * STEP} reduce={reduce} />
        ))}
      </svg>
      {FOUNDATIONS.map((item, i) => (
        <FoundationCard
          key={item.label.pt}
          item={item}
          p={scrollYProgress}
          at={i * STEP}
          reduce={reduce}
        />
      ))}
    </div>
  );
}

export function IntroSection() {
  const t = useT();
  return (
    <SectionShell id="intro" className="py-32 sm:py-36">
      <Wash background="radial-gradient(ellipse 58% 50% at 72% 30%, rgb(var(--rgb-violet) / var(--wash-3)), transparent 74%)" />
      <Wash background="radial-gradient(ellipse 46% 42% at 18% 72%, rgb(var(--rgb-fuchsia) / var(--wash-2)), transparent 76%)" />

      <Column>
        <div className="grid gap-14 sm:grid-cols-[1fr_auto] sm:items-start">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="text-sm font-medium text-violet-400"
            >
              {t("Quem eu sou", "Who I am")}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="font-display mt-2 text-4xl font-semibold text-white sm:text-5xl"
            >
              Nicolas Caraffa
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-3 inline-flex items-center gap-2 text-sm text-white/45"
            >
              <MapPin size={14} className="text-violet-300" />
              Corumbá, Mato Grosso do Sul
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-7 max-w-3xl space-y-4 text-lg leading-relaxed text-white/60"
            >
              <p>
                {t(
                  "Desde pequeno, sempre tive uma certa paixão por jogos e computadores. Aos 11 anos tive meu primeiro contato com programação em Python — algo que durou algumas semanas, mas acabou ficando pra trás.",
                  "Ever since I was a kid I have had a certain passion for games and computers. At 11 I had my first contact with programming, in Python — it lasted a few weeks, but ended up left behind.",
                )}
              </p>
              <p>
                {t(
                  "Em meados de abril de 2025, depois de conhecer um amigo que já era desenvolvedor, essa paixão por programação e tecnologia despertou de novo. Desde então venho desenvolvendo minhas habilidades na área — e dessa vez para valer.",
                  "Around April 2025, after meeting a friend who was already a developer, that passion for programming and technology woke up again. Since then I have been developing my skills in the field — and this time for real.",
                )}
              </p>
            </motion.div>
          </div>

          {/* The mark, given room to actually be seen. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="order-first flex justify-center sm:order-last sm:justify-end"
          >
            <Logo className="h-24 sm:h-40" glow="opacity-90" />
          </motion.div>
        </div>

        {/* Journey */}
        <div className="relative mt-16">
          <div
            aria-hidden
            className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-violet-400/35 to-transparent"
          />
          <ol className="space-y-8">
            {TIMELINE.map((step, i) => (
              <motion.li
                key={step.when.pt}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-8"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-[9px] h-[11px] w-[11px] rounded-full border border-violet-300/60 bg-violet-400/25 shadow-[0_0_12px_2px_rgb(var(--rgb-violet)/0.45)]"
                />
                <span className="font-display text-sm font-semibold text-violet-200">
                  {t(step.when)}
                </span>
                <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                  {t(step.what)}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Foundations */}
        <div className="mt-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="mb-6 block text-xs font-medium uppercase tracking-[0.18em] text-white/35"
          >
            {t("Base técnica", "Technical foundation")}
          </motion.span>

          <FoundationsGrid />
        </div>
      </Column>
    </SectionShell>
  );
}
