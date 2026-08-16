"use client";

import { motion } from "framer-motion";

function StarBadge() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" className="mt-0.5 shrink-0">
      <path
        d="M9 1L11 6.5L17 7L12.5 10.8L14 17L9 13.5L4 17L5.5 10.8L1 7L7 6.5Z"
        fill="#f4a300"
      />
    </svg>
  );
}

export function AchievementsList({ items }: { items: string[] }) {
  if (!items.length) {
    return <p className="text-sm text-muted">Nothing listed yet.</p>;
  }
  const accents = ["#f4a300", "#2a9d78", "#ff6b4a", "#f2b705"];
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -14, rotate: 0 }}
          whileInView={{ opacity: 1, x: 0, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
          whileHover={{ rotate: 0, scale: 1.02 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.09 }}
          className="flex items-start gap-3 rounded-xl border-2 bg-ink-2 px-4 py-3 text-sm text-paper/85 shadow-[3px_3px_0_0_#e2cfa4]"
          style={{ borderColor: accents[i % accents.length] }}
        >
          <StarBadge />
          {item}
        </motion.div>
      ))}
    </div>
  );
}

export function ContactBar({
  email,
  linkedin,
  github,
  resumeLink,
}: {
  email: string;
  linkedin: string;
  github: string;
  resumeLink: string;
}) {
  const links = [
    { label: "Email", href: `mailto:${email}` },
    { label: "LinkedIn", href: linkedin },
    { label: "GitHub", href: github },
    { label: "Resume", href: resumeLink },
  ].filter((l) => l.href && !l.href.endsWith(":"));

  return (
    <div className="flex flex-wrap gap-3">
      {links.map((l, i) => (
        <motion.a
          key={l.label}
          href={l.href}
          target={l.label === "Email" ? undefined : "_blank"}
          rel="noreferrer"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -3, rotate: i % 2 === 0 ? -2 : 2 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          className="rounded-full border-2 border-line bg-ink-2 px-5 py-2.5 font-display text-lg text-paper shadow-[2px_2px_0_0_#e2cfa4] transition-colors hover:border-copper hover:text-copper-bright"
        >
          {l.label}
        </motion.a>
      ))}
    </div>
  );
}