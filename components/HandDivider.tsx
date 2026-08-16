"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function HandDivider() {
  const reduce = useReducedMotion();

  return (
    <div className="relative my-16 h-8 w-full opacity-80" aria-hidden="true">
      <svg viewBox="0 0 1200 32" preserveAspectRatio="none" className="h-full w-full" fill="none">
        <motion.path
          d="M0 16 Q 60 2, 120 16 T 240 16 T 360 16 T 480 16 T 600 16 T 720 16 T 840 16 T 960 16 T 1080 16 T 1200 16"
          stroke="#d98c1f"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={reduce ? undefined : { pathLength: 0 }}
          whileInView={reduce ? undefined : { pathLength: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
