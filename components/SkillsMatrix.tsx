"use client";

import { motion } from "framer-motion";
import { SkillCategory } from "@/lib/content";

const DEPTH_WIDTH: Record<SkillCategory["depth"], string> = {
  "Production-ready": "100%",
  Comfortable: "72%",
  Learning: "38%",
};

const ACCENTS = ["#f4a300", "#ff6b4a", "#2a9d78", "#f2b705"];
// bento spans: first tile is the hero tile, spanning 2 cols + 2 rows on desktop
const SPANS = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-2",
  "md:col-span-1",
  "md:col-span-1",
];

export default function SkillsMatrix({ skills }: { skills: SkillCategory[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2">
      {skills.map((s, i) => {
        const accent = ACCENTS[i % ACCENTS.length];
        const span = SPANS[i] ?? "md:col-span-1";
        const isHero = i === 0;
        return (
          <motion.div
            key={s.category}
            initial={{ opacity: 0, y: 18, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1 : 1 }}
            whileHover={{ rotate: 0, y: -4 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            className={`${span} flex flex-col justify-between rounded-2xl border-2 bg-ink-2 p-5 shadow-[4px_5px_0_0_#e2cfa4] ${
              isHero ? "md:p-7" : ""
            }`}
            style={{ borderColor: accent }}
          >
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: accent }}
                />
                <h3 className={`font-display ${isHero ? "text-3xl" : "text-xl"} text-paper`}>
                  {s.category}
                </h3>
              </div>
              <p className={`text-muted ${isHero ? "text-base" : "text-sm"} leading-relaxed`}>
                {s.stack}
              </p>
            </div>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-ink-3">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: accent }}
                initial={{ width: 0 }}
                whileInView={{ width: DEPTH_WIDTH[s.depth] }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.07, ease: "easeOut" }}
              />
            </div>
            <span className="mt-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
              {s.depth}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}