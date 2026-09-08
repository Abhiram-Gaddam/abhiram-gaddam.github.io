"use client";

import { motion } from "framer-motion";
import { JourneyStop } from "@/lib/content";

const ACCENTS = ["#f4a300", "#ff6b4a", "#2a9d78", "#f2b705", "#4fd1c5", "#e07856"];

export default function JourneyMap({ stops }: { stops: JourneyStop[] }) {
  return (
    <div className="relative">
      <p className="mb-2 font-display text-2xl text-copper-bright">The journey so far</p>
      <p className="mb-8 text-sm text-muted">
        Not a resume — just how I actually got here.
      </p>

      <div className="relative">
        {stops.map((stop, i) => {
          const accent = ACCENTS[i % ACCENTS.length];
          const isLast = i === stops.length - 1;
          return (
            <div key={stop.id}>
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative flex gap-4 pl-1"
              >
                <div className="flex flex-col items-center">
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1, type: "spring", stiffness: 300 }}
                    className="z-10 mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-paper"
                    style={{ backgroundColor: accent }}
                  />
                </div>

                <motion.div
                  whileHover={{ x: 4 }}
                  className="mb-10 flex-1 rounded-xl border-2 bg-ink-2 p-4 shadow-[3px_4px_0_0_#e2cfa4]"
                  style={{ borderColor: accent }}
                >
                  <div className="mb-1 flex flex-wrap items-baseline gap-x-2">
                    <h3 className="font-display text-xl text-paper">{stop.title}</h3>
                    {stop.period && (
                      <span className="font-mono text-[11px] text-muted/70">{stop.period}</span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-muted">{stop.description}</p>
                </motion.div>
              </motion.div>

              {!isLast && (
                <svg
                  width="14"
                  height="56"
                  viewBox="0 0 14 56"
                  className="-mt-10 mb-0 ml-[7px] block"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M7 0 Q 1 14, 7 28 T 7 56"
                    stroke="#d98c1f"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </svg>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}