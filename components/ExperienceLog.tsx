"use client";

import { motion } from "framer-motion";
import { ExperienceEntry } from "@/lib/content";

export default function ExperienceLog({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <div className="relative space-y-8 border-l border-line pl-6 sm:pl-8">
      {entries.map((e, i) => (
        <motion.div
          key={e.id}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="relative"
        >
          <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-ink bg-copper sm:-left-[37px]" />
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="font-mono text-base text-paper">{e.org}</h3>
            <span className="font-mono text-xs text-muted">{e.role}</span>
            {e.period && (
              <span className="font-mono text-[11px] text-muted/60">{e.period}</span>
            )}
          </div>
          <ul className="mt-2.5 space-y-1.5">
            {e.bullets.map((b, bi) => (
              <li key={bi} className="text-sm leading-relaxed text-muted">
                <span className="mr-2 text-copper-soft">–</span>
                {b}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
