"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * A clay-style character at a laptop. Head and eyes track the cursor within
 * the wrapping area; the whole figure settles in with a scroll entrance and
 * idles with a gentle float. This is the thing that should read as "alive,"
 * not a static doodle.
 */
export default function BuilderCharacter({ size = 340 }: { size?: number }) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 120, damping: 14 });
  const springY = useSpring(rawY, { stiffness: 120, damping: 14 });

  const headRotate = useTransform(springX, [-1, 1], [-9, 9]);
  const headTiltY = useTransform(springY, [-1, 1], [-4, 4]);
  const eyeShiftX = useTransform(springX, [-1, 1], [-3, 3]);
  const eyeShiftY = useTransform(springY, [-1, 1], [-2, 2]);
  const bodyShiftX = useTransform(springX, [-1, 1], [-4, 4]);
  const screenGlowX = useTransform(springX, [-1, 1], [-6, 6]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(relX * 2);
    rawY.set(relY * 2);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={reduce ? undefined : { opacity: 0, y: 30, rotate: -4, scale: 0.92 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, rotate: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto"
      style={{ width: size, height: size }}
    >
      <motion.div
        className={reduce ? "" : "animate-floatY"}
        style={{ x: bodyShiftX }}
      >
        <svg viewBox="0 0 300 300" width={size} height={size}>
          <defs>
            <radialGradient id="clayBody" cx="35%" cy="30%" r="75%">
              <stop offset="0%" stopColor="#ffb997" />
              <stop offset="100%" stopColor="#ff6b4a" />
            </radialGradient>
            <radialGradient id="clayShirt" cx="35%" cy="25%" r="80%">
              <stop offset="0%" stopColor="#3d5a90" />
              <stop offset="100%" stopColor="#22314f" />
            </radialGradient>
            <radialGradient id="clayDesk" cx="30%" cy="20%" r="90%">
              <stop offset="0%" stopColor="#eeddb8" />
              <stop offset="100%" stopColor="#d9bf8c" />
            </radialGradient>
            <radialGradient id="screenGlow" cx="50%" cy="40%" r="70%">
              <stop offset="0%" stopColor="#fff3d6" />
              <stop offset="100%" stopColor="#f4a300" />
            </radialGradient>
            <filter id="softShadow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#22314f" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Desk */}
          <rect x="40" y="205" width="220" height="16" rx="8" fill="url(#clayDesk)" filter="url(#softShadow)" />
          <rect x="55" y="221" width="14" height="46" rx="6" fill="#d9bf8c" />
          <rect x="231" y="221" width="14" height="46" rx="6" fill="#d9bf8c" />

          {/* Laptop */}
          <g>
            <rect x="118" y="150" width="64" height="46" rx="6" fill="#22314f" />
            <motion.rect
              x="122"
              y="154"
              width="56"
              height="36"
              rx="3"
              fill="url(#screenGlow)"
              style={{ x: screenGlowX }}
            />
            <rect x="110" y="196" width="80" height="9" rx="4" fill="#3d5a90" />
          </g>

          {/* Body */}
          <path
            d="M95 205 Q90 150 150 148 Q210 150 205 205 Z"
            fill="url(#clayShirt)"
            filter="url(#softShadow)"
          />

          {/* Head group — rotates toward cursor */}
          <motion.g
            style={{
              rotate: headRotate,
              y: headTiltY,
              originX: "150px",
              originY: "110px",
            }}
          >
            <circle cx="150" cy="105" r="46" fill="url(#clayBody)" filter="url(#softShadow)" />
            {/* Hair */}
            <path
              d="M105 95 Q100 55 150 52 Q200 55 195 95 Q190 70 150 70 Q110 70 105 95Z"
              fill="#22314f"
            />
            {/* Eyes */}
            <motion.g style={{ x: eyeShiftX, y: eyeShiftY }}>
              <circle cx="134" cy="108" r="5" fill="#22314f" />
              <circle cx="168" cy="108" r="5" fill="#22314f" />
              <circle cx="136" cy="106" r="1.6" fill="#fff" />
              <circle cx="170" cy="106" r="1.6" fill="#fff" />
            </motion.g>
            {/* Smile */}
            <path
              d="M132 124 Q150 138 170 124"
              stroke="#22314f"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Cheeks */}
            <circle cx="118" cy="118" r="6" fill="#ff6b4a" opacity="0.35" />
            <circle cx="184" cy="118" r="6" fill="#ff6b4a" opacity="0.35" />
          </motion.g>

          {/* Arms typing */}
          <motion.path
            d="M108 190 Q120 172 138 176"
            stroke="url(#clayBody)"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
            animate={reduce ? undefined : { d: ["M108 190 Q120 172 138 176", "M108 192 Q120 176 138 178", "M108 190 Q120 172 138 176"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M192 190 Q180 172 162 176"
            stroke="url(#clayBody)"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
            animate={reduce ? undefined : { d: ["M192 190 Q180 172 162 176", "M192 188 Q180 174 162 174", "M192 190 Q180 172 162 176"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
