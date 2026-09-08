// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";

// export default function PhotoDeck({
//   images,
//   orgId,
//   accent,
// }: {
//   images?: string[];
//   orgId: string;
//   accent: string;
// }) {
//   const pics = images ?? [];
//   const [order, setOrder] = useState(pics.map((_, i) => i));

//   if (pics.length === 0) {
//     return (
//       <div
//         className="flex aspect-[4/3] w-64 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed bg-ink-2 p-5 text-center"
//         style={{ borderColor: accent }}
//       >
//         <svg width="32" height="32" viewBox="0 0 40 40" aria-hidden="true">
//           <rect x="4" y="7" width="32" height="26" rx="4" fill="none" stroke={accent} strokeWidth="2" />
//           <circle cx="13" cy="16" r="3" fill={accent} opacity="0.6" />
//           <path d="M6 27L15 18L22 25L28 19L34 27" stroke={accent} strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" />
//         </svg>
//         <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
//           Screenshots pending
//         </p>
//         <p className="max-w-[180px] font-mono text-[9px] leading-relaxed text-muted/70">
//           add images at <code className="text-copper-soft">/public/experience/{orgId}-1.png</code>{" "}
//           and list them in /admin
//         </p>
//       </div>
//     );
//   }

//   function bringToFront(idx: number) {
//     setOrder((prev) => [idx, ...prev.filter((i) => i !== idx)]);
//   }

//   return (
//     <div className="relative h-56 w-64 sm:h-60 sm:w-72">
//       {order.map((picIndex, stackPos) => {
//         const isTop = stackPos === 0;
//         const depth = order.length - stackPos;
//         const dir = stackPos % 2 === 0 ? -1 : 1;
//         return (
//           <motion.button
//             key={picIndex}
//             type="button"
//             layout
//             onClick={() => !isTop && bringToFront(picIndex)}
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{
//               opacity: 1,
//               scale: isTop ? 1 : 0.96,
//               rotate: isTop ? 0 : dir * (6 + stackPos * 4),
//               x: isTop ? 0 : dir * (14 + stackPos * 10),
//               y: stackPos * 10,
//             }}
//             transition={{ duration: 0.4, ease: "easeOut" }}
//             style={{ zIndex: depth, cursor: isTop ? "default" : "pointer" }}
//             className="absolute left-1/2 top-0 h-full w-56 -translate-x-1/2 overflow-hidden rounded-2xl border-2 bg-ink-2 shadow-[4px_6px_0_0_#e2cfa4] sm:w-64"
//           >
//             {/* eslint-disable-next-line @next/next/no-img-element */}
//             <img
//               src={pics[picIndex]}
//               alt="Work screenshot"
//               className="h-full w-full object-cover"
//               style={{ borderColor: accent }}
//             />
//           </motion.button>
//         );
//       })}
//       {pics.length > 1 && (
//         <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-muted">
//           tap a photo to bring it forward
//         </span>
//       )}
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";

// export default function PhotoDeck({
//   images,
//   orgId,
//   accent,
// }: {
//   images?: string[];
//   orgId: string;
//   accent: string;
// }) {
//   const pics = images ?? [];
//   const [order, setOrder] = useState(pics.map((_, i) => i));

//   if (pics.length === 0) {
//     return (
//       <div className="flex h-56 w-64 items-center justify-center sm:h-60 sm:w-72">
//         <p className="font-mono text-xs uppercase tracking-wider text-muted">
//           No images available
//         </p>
//       </div>
//     );
//   }

//   function bringToFront(idx: number) {
//     setOrder((prev) => [idx, ...prev.filter((i) => i !== idx)]);
//   }

//   return (
//     <div className="relative h-56 w-64 sm:h-60 sm:w-72">
//       {order.map((picIndex, stackPos) => {
//         const isTop = stackPos === 0;
//         const depth = order.length - stackPos;
//         const dir = stackPos % 2 === 0 ? -1 : 1;
        
//         return (
//           <motion.button
//             key={picIndex}
//             type="button"
//             onClick={() => !isTop && bringToFront(picIndex)}
//             animate={{
//               scale: isTop ? 1 : 0.96,
//               rotate: isTop ? 0 : dir * (6 + stackPos * 4),
//               x: isTop ? 0 : dir * (14 + stackPos * 10),
//               y: stackPos * 10,
//             }}
//             transition={{ 
//               type: "spring", 
//               // Tighter spring makes the flip feel instant and light
//               stiffness: 250, 
//               damping: 25,
//             }}
//             style={{ zIndex: depth, cursor: isTop ? "default" : "pointer" }}
//             // Added will-change-transform for smooth GPU hardware rendering
//             className="absolute left-0 right-0 top-0 mx-auto h-full w-56 overflow-hidden rounded-2xl border-2 bg-ink-2 shadow-[4px_6px_0_0_#e2cfa4] will-change-transform sm:w-64"
//           >
//             {/* eslint-disable-next-line @next/next/no-img-element */}
//             <img
//               src={pics[picIndex]}
//               alt="Work screenshot"
//               className="h-full w-full object-cover"
//               style={{ borderColor: accent }}
//             />
//           </motion.button>
//         );
//       })}
      
//       {pics.length > 1 && (
//         <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-muted">
//           tap a photo to bring it forward
//         </span>
//       )}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function PhotoDeck({
  images,
  orgId,
  accent,
}: {
  images?: string[];
  orgId: string;
  accent: string;
}) {
  const pics = images ?? [];
  const [order, setOrder] = useState(pics.map((_, i) => i));

  if (pics.length === 0) {
    return (
      <div className="flex aspect-square w-full items-center justify-center">
        <p className="font-mono text-xs uppercase tracking-wider text-muted">
          No images available
        </p>
      </div>
    );
  }

  function bringToFront(idx: number) {
    setOrder((prev) => [idx, ...prev.filter((i) => i !== idx)]);
  }

  return (
    // Replaced fixed widths with w-full so it scales with its parent
    <div className="relative mb-10 grid w-full place-items-center">
      {order.map((picIndex, stackPos) => {
        const isTop = stackPos === 0;
        const depth = order.length - stackPos;
        const dir = stackPos % 2 === 0 ? -1 : 1;
        
        return (
          <motion.button
            key={picIndex}
            type="button"
            onClick={() => !isTop && bringToFront(picIndex)}
            animate={{
              scale: isTop ? 1 : 0.96,
              rotate: isTop ? 0 : dir * (6 + stackPos * 4),
              // Slightly reduced the X offset so background cards don't push the visual center too far off
              x: isTop ? 0 : dir * (8 + stackPos * 8),
              y: stackPos * 10,
            }}
            transition={{ 
              type: "spring", 
              stiffness: 250, 
              damping: 25,
            }}
            style={{ zIndex: depth, cursor: isTop ? "default" : "pointer" }}
            className="col-start-1 row-start-1 h-auto w-full overflow-hidden rounded-2xl border-2 bg-ink-2 shadow-[4px_6px_0_0_#e2cfa4] will-change-transform"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={pics[picIndex]}
              alt="Work screenshot"
              className="block h-auto w-full max-h-[60vh] object-cover sm:max-h-[70vh]"
              style={{ borderColor: accent, objectPosition: "center top" }}
            />
          </motion.button>
        );
      })}
      
      {pics.length > 1 && (
        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-muted">
          tap a photo to bring it forward
        </span>
      )}
    </div>
  );
}