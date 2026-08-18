// "use client";

// import { motion } from "framer-motion";
// import { SkillCategory } from "@/lib/content";

// const DEPTH_WIDTH: Record<SkillCategory["depth"], string> = {
//   "Production-ready": "100%",
//   Comfortable: "72%",
//   Learning: "38%",
// };

// const ACCENTS = ["#f4a300", "#ff6b4a", "#2a9d78", "#f2b705"];
// // bento spans: first tile is the hero tile, spanning 2 cols + 2 rows on desktop
// const SPANS = [
//   "md:col-span-2 md:row-span-2",
//   "md:col-span-2",
//   "md:col-span-1",
//   "md:col-span-1",
// ];

// export default function SkillsMatrix({ skills }: { skills: SkillCategory[] }) {
//   return (
//     <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2">
//       {skills.map((s, i) => {
//         const accent = ACCENTS[i % ACCENTS.length];
//         const span = SPANS[i] ?? "md:col-span-1";
//         const isHero = i === 0;
//         return (
//           <motion.div
//             key={s.category}
//             initial={{ opacity: 0, y: 18, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
//             whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1 : 1 }}
//             whileHover={{ rotate: 0, y: -4 }}
//             viewport={{ once: true, margin: "-40px" }}
//             transition={{ duration: 0.45, delay: i * 0.07 }}
//             className={`${span} flex flex-col justify-between rounded-2xl border-2 bg-ink-2 p-5 shadow-[4px_5px_0_0_#e2cfa4] ${
//               isHero ? "md:p-7" : ""
//             }`}
//             style={{ borderColor: accent }}
//           >
//             <div>
//               <div className="mb-2 flex items-center gap-2">
//                 <span
//                   className="inline-block h-2.5 w-2.5 rounded-full"
//                   style={{ backgroundColor: accent }}
//                 />
//                 <h3 className={`font-display ${isHero ? "text-3xl" : "text-xl"} text-paper`}>
//                   {s.category}
//                 </h3>
//               </div>
//               <p className={`text-muted ${isHero ? "text-base" : "text-sm"} leading-relaxed`}>
//                 {s.stack}
//               </p>
//             </div>
//             <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-ink-3">
//               <motion.div
//                 className="h-full rounded-full"
//                 style={{ backgroundColor: accent }}
//                 initial={{ width: 0 }}
//                 whileInView={{ width: DEPTH_WIDTH[s.depth] }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.7, delay: 0.15 + i * 0.07, ease: "easeOut" }}
//               />
//             </div>
//             <span className="mt-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
//               {s.depth}
//             </span>
//           </motion.div>
//         );
//       })}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { SkillCategory } from "@/lib/content";

const DEPTH_WIDTH: Record<SkillCategory["depth"], string> = {
  "Production-ready": "100%",
  Comfortable: "72%",
  Learning: "38%",
};

const ACCENTS = ["#f4a300", "#ff6b4a", "#2a9d78", "#f2b705"];
const TAG_COLORS = ["#f4a300", "#ff6b4a", "#2a9d78", "#f2b705", "#4fd1c5", "#e07856"];

// "Next.js, Node.js — the backbone of everything I've shipped"
// -> techs: ["Next.js", "Node.js"], description: "the backbone of everything I've shipped"
function parseStack(stack: string): { techs: string[]; description: string } {
  const parts = stack.split(" — ");
  if (parts.length >= 2) {
    const techs = parts[0].split(",").map((t) => t.trim()).filter(Boolean);
    return { techs, description: parts.slice(1).join(" — ").trim() };
  }
  return { techs: [], description: stack };
}

function TechPills({ techs, highlighted }: { techs: string[]; highlighted?: boolean }) {
  if (!techs.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {techs.map((t, i) => {
        const color = TAG_COLORS[i % TAG_COLORS.length];
        return (
          <span
            key={t}
            className="rounded-full border px-2 py-0.5 font-mono text-[10px] font-medium transition-colors duration-200"
            style={
              highlighted
                ? { borderColor: color, color }
                : { borderColor: "#e2cfa4", color: "#5c6f8a" }
            }
          >
            {t}
          </span>
        );
      })}
    </div>
  );
}

type Variant = "idle" | "active" | "sibling";

function Tile({
  s,
  index,
  accent,
  isBig,
  variant,
  onEnter,
  onLeave,
}: {
  s: SkillCategory;
  index: number;
  accent: string;
  isBig: boolean;
  variant: Variant;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const { techs, description } = parseStack(s.stack);

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`relative flex w-full flex-col overflow-hidden rounded-2xl border-2 bg-ink-2 p-5 shadow-[4px_5px_0_0_#e2cfa4] md:min-h-0 md:flex-1 md:basis-0 ${
        variant === "sibling" ? "justify-center" : "justify-between"
      } ${variant === "active" ? "md:p-7" : ""}`}
      style={{ borderColor: accent }}
    >
      <AnimatePresence mode="wait">
        {variant === "sibling" ? (
          // collapsed: title only, everything else hidden
          <motion.div
            key="sibling"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: accent }} />
            <h3 className="font-display text-lg text-paper">{s.category}</h3>
          </motion.div>
        ) : variant === "active" ? (
          <motion.div
            key="story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, delay: 0.15 }}
            className="flex h-full flex-col justify-between"
          >
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: accent }} />
                <h3 className="font-display text-2xl text-paper md:text-3xl">{s.category}</h3>
              </div>
              <p className="text-sm leading-relaxed text-paper/85 md:text-base">{s.story}</p>
              {s.proofLink && (
                <Link
                  href={s.proofLink.href}
                  className="mt-3 inline-block font-display text-base text-copper-bright underline decoration-copper decoration-wavy underline-offset-4"
                >
                  {s.proofLink.label} →
                </Link>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <TechPills techs={techs} highlighted />
              <button
                type="button"
                onClick={onLeave}
                className="self-start font-mono text-[10px] uppercase tracking-wider text-copper-soft underline underline-offset-2 md:hidden"
              >
                Show less
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex h-full flex-col justify-between"
          >
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: accent }} />
                <h3 className={`font-display ${isBig ? "text-3xl" : "text-xl"} text-paper`}>
                  {s.category}
                </h3>
              </div>
              <p className={`text-muted ${isBig ? "text-base" : "text-sm"} mb-3 leading-relaxed`}>
                {description}
              </p>
              <TechPills techs={techs} />
            </div>
            <div className="mt-4">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-3">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: accent }}
                  initial={{ width: 0 }}
                  whileInView={{ width: DEPTH_WIDTH[s.depth] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 + index * 0.07, ease: "easeOut" }}
                />
              </div>
              <div className="mt-1.5 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                  {s.depth}
                </span>
                <button
                  type="button"
                  onClick={onEnter}
                  className="font-mono text-[10px] uppercase tracking-wider text-copper-soft underline underline-offset-2 md:hidden"
                >
                  Show more
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SkillsMatrix({ skills }: { skills: SkillCategory[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const set = (i: number) => setActiveIndex(i);
  const clear = () => setActiveIndex(null);

  function variantFor(i: number): Variant {
    if (activeIndex === null) return "idle";
    return activeIndex === i ? "active" : "sibling";
  }

  const [full, genai, programming, tools] = skills;

  const g = {
    left: activeIndex === 0 ? 4 : activeIndex === null ? 1 : 0.6,
    right: activeIndex === 0 ? 0.6 : activeIndex === null ? 1 : 4,
    top: activeIndex === 1 ? 4 : activeIndex === 2 || activeIndex === 3 ? 0.6 : 1,
    bottomRow: activeIndex === 2 || activeIndex === 3 ? 4 : activeIndex === 1 ? 0.6 : 1,
    p2: activeIndex === 2 ? 4 : activeIndex === 3 ? 0.6 : 1,
    p3: activeIndex === 3 ? 4 : activeIndex === 2 ? 0.6 : 1,
  };

  return (
    <>
      <motion.div layout className="hidden gap-4 md:flex md:h-[560px]">
        <motion.div layout style={{ flexGrow: g.left, flexBasis: 0 }} className="flex min-w-0">
          <Tile
            s={full}
            index={0}
            accent={ACCENTS[0]}
            isBig={activeIndex === null || activeIndex === 0}
            variant={variantFor(0)}
            onEnter={() => set(0)}
            onLeave={clear}
          />
        </motion.div>

        <motion.div
          layout
          style={{ flexGrow: g.right, flexBasis: 0 }}
          className="flex min-w-0 flex-col gap-4"
        >
          <motion.div layout style={{ flexGrow: g.top, flexBasis: 0 }} className="flex min-h-0">
            <Tile
              s={genai}
              index={1}
              accent={ACCENTS[1]}
              isBig={false}
              variant={variantFor(1)}
              onEnter={() => set(1)}
              onLeave={clear}
            />
          </motion.div>

          <motion.div
            layout
            style={{ flexGrow: g.bottomRow, flexBasis: 0 }}
            className="flex min-h-0 gap-4"
          >
            <motion.div layout style={{ flexGrow: g.p2, flexBasis: 0 }} className="flex min-w-0">
              <Tile
                s={programming}
                index={2}
                accent={ACCENTS[2]}
                isBig={false}
                variant={variantFor(2)}
                onEnter={() => set(2)}
                onLeave={clear}
              />
            </motion.div>
            <motion.div layout style={{ flexGrow: g.p3, flexBasis: 0 }} className="flex min-w-0">
              <Tile
                s={tools}
                index={3}
                accent={ACCENTS[3]}
                isBig={false}
                variant={variantFor(3)}
                onEnter={() => set(3)}
                onLeave={clear}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="flex flex-col gap-4 md:hidden">
        {skills.map((s, i) => (
          <Tile
            key={s.category}
            s={s}
            index={i}
            accent={ACCENTS[i % ACCENTS.length]}
            isBig={false}
            variant={activeIndex === i ? "active" : "idle"}
            onEnter={() => set(i)}
            onLeave={clear}
          />
        ))}
      </div>
    </>
  );
}