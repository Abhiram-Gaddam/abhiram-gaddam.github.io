// "use client";

// import { motion, useReducedMotion } from "framer-motion";

// export default function DoodleHero({ size = 250 }: { size?: number }) {
//   const reduce = useReducedMotion();
//   const height = size * 1.5; 

//   return (
//     <div className="pointer-events-none select-none flex flex-col items-center" aria-hidden="true">
//       <motion.div
//         style={{ transformOrigin: "top center" }}
//         animate={reduce ? undefined : { rotate: [-5, 5, -5] }}
//         transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//         className="flex flex-col items-center"
//       >
//         {/* The Web Thread (Kept inline because it is literally just one line of code) */}
//         {/* <svg width="4" height={height * 0.25} className="block -mb-2">
//           <line
//             x1="2"
//             y1="0"
//             x2="2"
//             y2={height * 0.05}
//             stroke="#e2e8f0"
//             strokeWidth="3"
//           />
//         </svg> */}

//         {/* Your External SVG File */}
//         <motion.img
//           src="/nre.svg" /* Make sure this path matches where you saved it */
//           alt="Hanging Spider-Man"
//           width={size}
//           height={height}
//           initial={reduce ? undefined : { opacity: 0, scale: 0.8 }}
//           animate={
//             reduce
//               ? { opacity: 1 }
//               : { opacity: 1, scale: 1, y: [0, -5, 0] }
//           }
//           transition={
//             reduce
//               ? { duration: 0.4 }
//               : { scale: { duration: 0.5 }, y: { duration: 2.6, repeat: Infinity, ease: "easeInOut" } }
//           }
//           /* Optional: Adds a slight drop shadow around the SVG file */
//           className="drop-shadow-lg" 
//         />
//       </motion.div>
//     </div>
//   );
// }

"use client";

import { motion, useReducedMotion, useMotionValue, useTransform } from "framer-motion";

interface DoodleHeroProps {
  size?: number;
  swing?: boolean; // New parameter!
}

export default function DoodleHero({ size = 250, swing = false }: DoodleHeroProps) {
  const reduce = useReducedMotion();
  const height = size * 1.5; 

  // We capture the X and Y coordinates of the mouse drag
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Drag physics: makes him tilt as you pull him left or right
  const dragRotate = useTransform(x, [-200, 200], [15, -15]);

  return (
    <div className="pointer-events-auto select-none flex flex-col items-center relative">
      
      {/* 
        1. THE ENTRANCE DROP
        Waits 2 seconds, then slowly drops down over 5 seconds.
      */}
      <motion.div
        initial={reduce ? { opacity: 0 } : { y: "-150vh" }}
        animate={reduce ? { opacity: 1 } : { y: 0 }}
        transition={{
          delay: 1,           
          duration: 5,        
          ease: "easeOut",    
        }}
        className="flex flex-col items-center relative z-20"
      >
        
        {/* 
          2. THE DRAGGABLE WRAPPER
          Handles the mouse physics and rubber-band snapping.
        */}
        <motion.div
          drag={!reduce}
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
          dragElastic={0.4} 
          dragTransition={{ bounceStiffness: 400, bounceDamping: 10 }}
          style={{ x, y, rotate: dragRotate, cursor: "grab" }}
          whileDrag={{ cursor: "grabbing", scale: 1.05 }}
          className="flex flex-col items-center relative group"
        >
          
          {/* The Infinite Web Thread */}
          <div className="absolute bottom-[98%] left-1/2 w-[2px] h-[200vh] -translate-x-1/2 bg-[#111]/40" />

          {/* "Pull me" hint on hover */}
          <div className="absolute -left-20 top-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 font-display text-sm font-bold text-[#111] -rotate-6 pointer-events-none">
            pull me! ↘
          </div>

          {/* 
            3. THE SPIDER-MAN IMAGE & SWING PHYSICS
            If 'swing' is true, he rotates. We delay the rotation by 7 seconds
            so it only starts AFTER the 2s wait + 5s drop.
          */}
          <motion.img
            src="/nre.svg" 
            alt="Hanging Spider-Man"
            width={size}
            height={height}
            draggable={false} 
            animate={reduce ? undefined : { 
              y: [0, -8, 0], // Gentle vertical breathing
              rotate: swing ? [-4, 4, -4] : 0 // Conditionally apply pendulum swing
            }}
            transition={reduce ? undefined : { 
              // The breathing bob starts immediately
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              // The swing waits exactly 7 seconds before starting, and takes 5 seconds per loop
              rotate: { delay: 7, duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="drop-shadow-[8px_8px_0_rgba(17,17,17,0.15)] pointer-events-none" 
          />
        </motion.div>
      </motion.div>
    </div>
  );
}