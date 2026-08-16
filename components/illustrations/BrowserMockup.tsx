"use client";

import { motion } from "framer-motion";
import StatusDot from "@/components/StatusDot";
import { ProjectStatus } from "@/lib/content";

const ACCENTS = ["#f4a300", "#ff6b4a", "#2a9d78", "#f2b705", "#e07856"];

export default function BrowserMockup({
  name,
  status,
  index,
}: {
  name: string;
  status: ProjectStatus;
  index: number;
}) {
  const accent = ACCENTS[index % ACCENTS.length];
  const initial = name.trim().charAt(0).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: index % 2 === 0 ? -2 : 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
      whileHover={{ rotate: 0, y: -4 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="overflow-hidden rounded-2xl border-2 border-line shadow-[6px_8px_0_0_#e2cfa4]"
      style={{ backgroundColor: "#1c2842" }}
    >
      {/* chrome */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b4a]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#f2b705]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#2a9d78]/70" />
        <div className="ml-3 flex-1 truncate rounded-full bg-white/5 px-3 py-1 font-mono text-[10px] text-white/40">
          {name.toLowerCase().replace(/\s+/g, "-")}.app
        </div>
      </div>

      {/* body */}
      <div className="flex h-56 flex-col items-center justify-center gap-4 px-6">
        <div
          className="flex h-20 w-20 items-center justify-center rounded-2xl font-display text-4xl text-white"
          style={{
            background: `linear-gradient(135deg, ${accent}, #22314f)`,
          }}
        >
          {initial}
        </div>
        <StatusDot status={status} />
      </div>
    </motion.div>
  );
}