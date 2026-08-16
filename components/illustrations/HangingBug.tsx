"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * A small clay-style bug hanging by a thread near the hero, swinging gently
 * — a wink at "squashing bugs in production." Meant to be tiny and alive,
 * not a centerpiece.
 */
export default function HangingBug() {
  const reduce = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute right-6 top-0 z-10 hidden sm:right-10 sm:block md:right-16"
      aria-hidden="true"
    >
      <motion.div
        style={{ transformOrigin: "top center" }}
        animate={reduce ? undefined : { rotate: [-10, 10, -10] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* thread */}
        <svg width="2" height="46" className="mx-auto block">
          <line x1="1" y1="0" x2="1" y2="46" stroke="#d98c1f" strokeWidth="1.5" strokeDasharray="3 2" />
        </svg>

        {/* bug */}
        <motion.svg
          width="52"
          height="52"
          viewBox="0 0 52 52"
          className="-mt-1"
          animate={reduce ? undefined : { y: [0, 3, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <defs>
            <radialGradient id="bugBody" cx="35%" cy="25%" r="80%">
              <stop offset="0%" stopColor="#7fd6b8" />
              <stop offset="100%" stopColor="#2a9d78" />
            </radialGradient>
          </defs>
          {/* legs */}
          <g stroke="#22314f" strokeWidth="1.6" strokeLinecap="round">
            <path d="M14 22 L4 18" />
            <path d="M14 28 L4 30" />
            <path d="M14 34 L6 40" />
            <path d="M38 22 L48 18" />
            <path d="M38 28 L48 30" />
            <path d="M38 34 L46 40" />
          </g>
          {/* antennae */}
          <path d="M20 12 L15 4" stroke="#22314f" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M32 12 L37 4" stroke="#22314f" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="15" cy="4" r="2" fill="#ff6b4a" />
          <circle cx="37" cy="4" r="2" fill="#ff6b4a" />
          {/* body */}
          <ellipse cx="26" cy="26" rx="14" ry="16" fill="url(#bugBody)" />
          <line x1="26" y1="14" x2="26" y2="38" stroke="#22314f" strokeWidth="1" opacity="0.3" />
          {/* eyes */}
          <circle cx="20" cy="22" r="3.2" fill="#22314f" />
          <circle cx="32" cy="22" r="3.2" fill="#22314f" />
          <circle cx="21" cy="21" r="1" fill="#fff" />
          <circle cx="33" cy="21" r="1" fill="#fff" />
          {/* smile */}
          <path d="M20 30 Q26 34 32 30" stroke="#22314f" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </motion.svg>
      </motion.div>
    </div>
  );
}