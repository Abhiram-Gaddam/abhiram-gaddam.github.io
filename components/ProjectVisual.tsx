"use client";

import { motion } from "framer-motion";
import { ProjectStatus } from "@/lib/content";
import StatusDot from "@/components/StatusDot";

const ACCENTS = ["#f4a300", "#ff6b4a", "#2a9d78", "#f2b705", "#e07856"];

export default function ProjectVisual({
  id,
  name,
  image,
  status,
  index,
  compact,
}: {
  id: string;
  name: string;
  image?: string;
  status: ProjectStatus;
  index: number;
  compact?: boolean;
}) {
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <motion.div
      initial={compact ? undefined : { opacity: 0, y: 16 }}
      whileInView={compact ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className={`relative aspect-[16/10] shrink-0 overflow-hidden rounded-2xl border-2 bg-ink-2 ${
        compact ? "w-32 sm:w-40" : "w-full"
      }`}
      style={{ borderColor: accent }}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={`${name} screenshot`} className="h-full w-full object-cover" />
      ) : compact ? (
        <div className="flex h-full w-full items-center justify-center">
          <svg width="26" height="26" viewBox="0 0 40 40" aria-hidden="true">
            <rect x="4" y="7" width="32" height="26" rx="4" fill="none" stroke={accent} strokeWidth="2" />
            <circle cx="13" cy="16" r="3" fill={accent} opacity="0.6" />
            <path d="M6 27L15 18L22 25L28 19L34 27" stroke={accent} strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 border-2 border-dashed border-line/70 p-6 text-center">
          <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
            <rect x="4" y="7" width="32" height="26" rx="4" fill="none" stroke={accent} strokeWidth="2" />
            <circle cx="13" cy="16" r="3" fill={accent} opacity="0.6" />
            <path d="M6 27L15 18L22 25L28 19L34 27" stroke={accent} strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
            Screenshot pending
          </p>
          <p className="max-w-[220px] font-mono text-[10px] leading-relaxed text-muted/70">
            drop an image at <code className="text-copper-soft">/public/projects/{id}.png</code>{" "}
            and set it in /admin
          </p>
        </div>
      )}

      {!compact && (
        <div className="absolute left-3 top-3">
          <StatusDot status={status} />
        </div>
      )}
    </motion.div>
  );
}