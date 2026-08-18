// "use client";

// import { useRef, useState } from "react";
// import {
//   motion,
//   MotionValue,
//   useMotionValueEvent,
//   useScroll,
//   useTransform,
// } from "framer-motion";
// import { ExperienceEntry } from "@/lib/content";
// import PhotoDeck from "./PhotoDeck";

// const ACCENTS = ["#f4a300", "#ff6b4a", "#2a9d78", "#f2b705"];

// export default function ExperienceScroller({ entries }: { entries: ExperienceEntry[] }) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [activeIndex, setActiveIndex] = useState(0);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   // Cheap: only drives the small timeline dots, never remounts content.
//   useMotionValueEvent(scrollYProgress, "change", (v) => {
//     const idx = Math.min(entries.length - 1, Math.max(0, Math.round(v * entries.length - 0.5)));
//     setActiveIndex((prev) => (prev === idx ? prev : idx));
//   });

//   function jumpTo(i: number) {
//     const el = containerRef.current;
//     if (!el) return;
//     const target = el.offsetTop + (i / entries.length) * el.offsetHeight + 4;
//     window.scrollTo({ top: target, behavior: "smooth" });
//   }

//   return (
//     <div ref={containerRef} style={{ height: `${entries.length * 90}vh` }} className="relative">
//       <div className="sticky top-20 flex h-[75vh] items-center">
//         <div className="grid w-full items-center gap-8 lg:grid-cols-[auto_1fr_auto] lg:gap-14">
//           {/* timeline */}
//           <div className="flex gap-4 lg:flex-col lg:gap-6">
//             {entries.map((e, i) => {
//               const isActive = i === activeIndex;
//               return (
//                 <button
//                   key={e.id}
//                   onClick={() => jumpTo(i)}
//                   className="group flex items-center gap-3 text-left"
//                 >
//                   <span
//                     className="h-2.5 w-2.5 shrink-0 rounded-full border-2 transition-all duration-200"
//                     style={{
//                       borderColor: isActive ? ACCENTS[i % ACCENTS.length] : "#8b97a6",
//                       backgroundColor: isActive ? ACCENTS[i % ACCENTS.length] : "transparent",
//                       transform: isActive ? "scale(1.4)" : "scale(1)",
//                     }}
//                   />
//                   <span
//                     className={`hidden font-mono text-xs transition-colors lg:inline ${
//                       isActive ? "text-paper" : "text-muted group-hover:text-paper/70"
//                     }`}
//                   >
//                     {e.org.length > 22 ? e.org.slice(0, 20) + "…" : e.org}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>

//           {/* content — all entries stacked, opacity driven directly by scroll (no remounting) */}
//           <div className="relative min-h-[280px]">
//             {entries.map((entry, i) => (
//               <ContentSlide
//                 key={entry.id}
//                 entry={entry}
//                 index={i}
//                 total={entries.length}
//                 scrollYProgress={scrollYProgress}
//                 accent={ACCENTS[i % ACCENTS.length]}
//               />
//             ))}
//           </div>

//           {/* photo deck — same stacking approach */}
//           <div className="relative mx-auto h-64 w-72 lg:mx-0">
//             {entries.map((entry, i) => (
//               <DeckSlide
//                 key={entry.id}
//                 entry={entry}
//                 index={i}
//                 total={entries.length}
//                 scrollYProgress={scrollYProgress}
//                 accent={ACCENTS[i % ACCENTS.length]}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {activeIndex < entries.length - 1 && (
//         <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-wider text-muted/60 lg:left-auto lg:right-8 lg:translate-x-0">
//           scroll for next ↓
//         </div>
//       )}
//     </div>
//   );
// }

// function useSlideOpacity(
//   scrollYProgress: MotionValue<number>,
//   index: number,
//   total: number
// ) {
//   const start = index / total;
//   const end = (index + 1) / total;
//   const edge = (end - start) * 0.18;

//   if (index === 0) {
//     return {
//       opacity: useTransform(scrollYProgress, [0, end - edge, end], [1, 1, 0]),
//       y: useTransform(scrollYProgress, [0, end - edge, end], [0, 0, -24]),
//     };
//   }
//   if (index === total - 1) {
//     return {
//       opacity: useTransform(scrollYProgress, [start, start + edge, 1], [0, 1, 1]),
//       y: useTransform(scrollYProgress, [start, start + edge, 1], [24, 0, 0]),
//     };
//   }
//   return {
//     opacity: useTransform(
//       scrollYProgress,
//       [start, start + edge, end - edge, end],
//       [0, 1, 1, 0]
//     ),
//     y: useTransform(
//       scrollYProgress,
//       [start, start + edge, end - edge, end],
//       [24, 0, 0, -24]
//     ),
//   };
// }

// function ContentSlide({
//   entry,
//   index,
//   total,
//   scrollYProgress,
//   accent,
// }: {
//   entry: ExperienceEntry;
//   index: number;
//   total: number;
//   scrollYProgress: MotionValue<number>;
//   accent: string;
// }) {
//   const { opacity, y } = useSlideOpacity(scrollYProgress, index, total);
//   const pointerEvents = useTransform(opacity, (o) => (o > 0.5 ? "auto" : "none")) as MotionValue<
//     "auto" | "none"
//   >;

//   return (
//     <motion.div style={{ opacity, y, pointerEvents }} className="absolute inset-0">
//       <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
//         <h3 className="font-display text-3xl text-paper sm:text-4xl">{entry.org}</h3>
//         {entry.period && <span className="font-mono text-xs text-muted/70">{entry.period}</span>}
//       </div>
//       <p className="mb-5 font-mono text-sm text-copper-soft">{entry.role}</p>
//       <ul className="space-y-2.5">
//         {entry.bullets.map((b, i) => (
//           <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted sm:text-base">
//             <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: accent }} />
//             {b}
//           </li>
//         ))}
//       </ul>
//     </motion.div>
//   );
// }

// function DeckSlide({
//   entry,
//   index,
//   total,
//   scrollYProgress,
//   accent,
// }: {
//   entry: ExperienceEntry;
//   index: number;
//   total: number;
//   scrollYProgress: MotionValue<number>;
//   accent: string;
// }) {
//   const { opacity, y } = useSlideOpacity(scrollYProgress, index, total);
//   const pointerEvents = useTransform(opacity, (o) => (o > 0.5 ? "auto" : "none")) as MotionValue<
//     "auto" | "none"
//   >;

//   return (
//     <motion.div style={{ opacity, y, pointerEvents }} className="absolute inset-0 flex items-center justify-center">
//       <PhotoDeck images={entry.images} orgId={entry.id} accent={accent} />
//     </motion.div>
//   );
// }

"use client";

import { useRef, useState } from "react";
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { ExperienceEntry } from "@/lib/content";
import PhotoDeck from "./PhotoDeck";

const ACCENTS = ["#f4a300", "#ff6b4a", "#2a9d78", "#f2b705"];

export default function ExperienceScroller({ entries }: { entries: ExperienceEntry[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(entries.length - 1, Math.max(0, Math.round(v * entries.length - 0.5)));
    setActiveIndex((prev) => (prev === idx ? prev : idx));
  });

  function jumpTo(i: number) {
    const el = containerRef.current;
    if (!el) return;
    const target = el.offsetTop + (i / entries.length) * el.offsetHeight + 4;
    window.scrollTo({ top: target, behavior: "smooth" });
  }

  return (
    <div ref={containerRef} style={{ height: `${entries.length * 90}vh` }} className="relative">
      <div className="sticky top-20 flex h-[75vh] items-center">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[auto_1fr_auto] lg:gap-14">
          {/* timeline */}
          <div className="flex gap-4 lg:flex-col lg:gap-6">
            {entries.map((e, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={e.id}
                  onClick={() => jumpTo(i)}
                  className="group flex items-center gap-3 text-left"
                >
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full border-2 transition-all duration-200"
                    style={{
                      borderColor: isActive ? ACCENTS[i % ACCENTS.length] : "#8b97a6",
                      backgroundColor: isActive ? ACCENTS[i % ACCENTS.length] : "transparent",
                      transform: isActive ? "scale(1.4)" : "scale(1)",
                    }}
                  />
                  <span
                    className={`hidden font-mono text-xs transition-colors lg:inline ${
                      isActive ? "text-paper" : "text-muted group-hover:text-paper/70"
                    }`}
                  >
                    {e.org.length > 22 ? e.org.slice(0, 20) + "…" : e.org}
                  </span>
                </button>
              );
            })}
          </div>

          {/* content */}
          <div className="relative min-h-[280px]">
            {entries.map((entry, i) => (
              <ContentSlide
                key={entry.id}
                entry={entry}
                index={i}
                total={entries.length}
                scrollYProgress={scrollYProgress}
                accent={ACCENTS[i % ACCENTS.length]}
              />
            ))}
          </div>

          {/* photo deck */}
          <div className="relative mx-auto h-64 w-72 lg:mx-0">
            {entries.map((entry, i) => (
              <DeckSlide
                key={entry.id}
                entry={entry}
                index={i}
                total={entries.length}
                scrollYProgress={scrollYProgress}
                accent={ACCENTS[i % ACCENTS.length]}
              />
            ))}
          </div>
        </div>
      </div>

      {activeIndex < entries.length - 1 && (
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-wider text-muted/60 lg:left-auto lg:right-8 lg:translate-x-0">
          scroll for next ↓
        </div>
      )}
    </div>
  );
}

function useSlideOpacity(
  scrollYProgress: MotionValue<number>,
  index: number,
  total: number
) {
  const section = 1 / total;
  const start = index * section;
  const end = start + section;
  const edge = section * 0.15; // Smooth overlap without bleeding into 3 slides

  let input: number[];
  let outputOpacity: number[];
  let outputY: number[];

  // FIX: This explicitly clamps inputs so they NEVER go below 0 or above 1.
  // This prevents the Web Animations API from crashing.
  if (total <= 1) {
    input = [0, 1];
    outputOpacity = [1, 1];
    outputY = [0, 0];
  } else if (index === 0) {
    input = [0, end - edge, end + edge];
    outputOpacity = [1, 1, 0];
    outputY = [0, 0, -20];
  } else if (index === total - 1) {
    input = [start - edge, start + edge, 1];
    outputOpacity = [0, 1, 1];
    outputY = [20, 0, 0];
  } else {
    input = [start - edge, start + edge, end - edge, end + edge];
    outputOpacity = [0, 1, 1, 0];
    outputY = [20, 0, 0, -20];
  }

  const opacity = useTransform(scrollYProgress, input, outputOpacity);
  const y = useTransform(scrollYProgress, input, outputY);
  
  // Hides inactive slides to prevent GPU overdraw and heavy DOM lag
  const visibility = useTransform(opacity, (v) => (v > 0.01 ? "visible" : "hidden"));
  const pointerEvents = useTransform(opacity, (v) => (v > 0.5 ? "auto" : "none"));

  return { opacity, y, visibility, pointerEvents };
}

function ContentSlide({
  entry,
  index,
  total,
  scrollYProgress,
  accent,
}: {
  entry: ExperienceEntry;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  accent: string;
}) {
  const { opacity, y, visibility, pointerEvents } = useSlideOpacity(scrollYProgress, index, total);

  return (
    <motion.div 
      style={{ opacity, y, visibility, pointerEvents }} 
      className="absolute inset-0 will-change-transform"
    >
      <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="font-display text-3xl text-paper sm:text-4xl">{entry.org}</h3>
        {entry.period && <span className="font-mono text-xs text-muted/70">{entry.period}</span>}
      </div>
      <p className="mb-5 font-mono text-sm text-copper-soft">{entry.role}</p>
      <ul className="space-y-2.5">
        {entry.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted sm:text-base">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: accent }} />
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function DeckSlide({
  entry,
  index,
  total,
  scrollYProgress,
  accent,
}: {
  entry: ExperienceEntry;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  accent: string;
}) {
  const { opacity, y, visibility, pointerEvents } = useSlideOpacity(scrollYProgress, index, total);

  return (
    <motion.div 
      style={{ opacity, y, visibility, pointerEvents }} 
      className="absolute inset-0 flex items-center justify-center will-change-transform"
    >
      <PhotoDeck images={entry.images} orgId={entry.id} accent={accent} />
    </motion.div>
  );
}