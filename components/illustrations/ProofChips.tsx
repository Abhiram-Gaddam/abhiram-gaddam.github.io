// "use client";

// import { motion } from "framer-motion";

// const FACTS = [
//   { text: "3 platforms shipped solo, end-to-end", rotate: -3, accent: "#f4a300" },
//   { text: "0.89 F1 on the SROIE OCR benchmark", rotate: 2, accent: "#2a9d78" },
//   { text: "Found and fixed a live auth gap before it became a problem", rotate: -2, accent: "#ff6b4a" },
// ];

// export default function ProofChips() {
//   return (
//     <div className="mt-4 flex flex-col gap-4 sm:mt-0">
//       {FACTS.map((f, i) => (
//         <motion.div
//           key={f.text}
//           initial={{ opacity: 0, x: 24, rotate: 0 }}
//           whileInView={{ opacity: 1, x: 0, rotate: f.rotate }}
//           whileHover={{ rotate: 0, scale: 1.03 }}
//           viewport={{ once: true, margin: "-30px" }}
//           transition={{ duration: 0.45, delay: 0.15 + i * 0.12, ease: "easeOut" }}
//           className="rounded-xl border-2 bg-ink-2 px-4 py-3 text-sm text-paper shadow-[3px_3px_0_0_#e2cfa4]"
//           style={{ borderColor: f.accent }}
//         >
//           {f.text}
//         </motion.div>
//       ))}
//     </div>
//   );
// }

"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

export default function InteractiveNotes() {
  // This ref acts as the boundary so the user can't drag the notes off the screen entirely
  const constraintsRef = useRef(null);

  const notes = [
    {
      id: 1,
      text: "3 platforms shipped solo, end-to-end",
      color: "bg-[#fef9c3] border-[#fde047]", // Yellow-ish
      initialRotate: -6,
      initialY: 0,
      initialX: 20,
    },
    {
      id: 2,
      text: "0.89 F1 on the SROIE OCR benchmark",
      color: "bg-[#dcfce7] border-[#86efac]", // Green-ish
      initialRotate: 4,
      initialY: 20,
      initialX: -10,
    },
    {
      id: 3,
      text: "Found and fixed a live auth gap before it became a problem",
      color: "bg-[#ffedd5] border-[#fdba74]", // Orange/Red-ish
      initialRotate: -3,
      initialY: 40,
      initialX: 10,
    },
  ];

  return (
    <div ref={constraintsRef} className="relative h-[350px] w-full max-w-sm mt-8">
      {/* 
        A subtle hint to the user that these are interactive. 
        It fades out after a few seconds. 
      */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4, delay: 1 }}
        className="absolute -top-6 right-10 font-display text-sm text-copper/60 z-0"
      >
        (drag us around)
      </motion.p>

      {notes.map((note, index) => (
        <motion.div
          key={note.id}
          drag
          dragConstraints={constraintsRef}
          // Adds a nice spring physics effect when released
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          // Pops the card up and straightens it when grabbed
          whileDrag={{ 
            scale: 1.1, 
            rotate: 0, 
            zIndex: 50,
            cursor: "grabbing"
          }}
          initial={{ opacity: 0, y: note.initialY + 50, x: note.initialX }}
          animate={{ 
            opacity: 1, 
            y: note.initialY, 
            x: note.initialX,
            rotate: note.initialRotate 
          }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.15,
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          className={`absolute cursor-grab p-5 rounded-xl border-2 shadow-[4px_4px_0_0_#22314f] ${note.color} w-72 sm:w-80`}
          style={{ top: index * 80 }}
        >
          {/* Subtle tape/pin effect on top of the note to sell the aesthetic */}
          <div className="absolute -top-3 left-1/2 h-4 w-12 -translate-x-1/2 bg-white/40 border border-black/10 rounded-sm shadow-sm" />
          
          <p className="font-medium text-paper-darker text-sm sm:text-base leading-snug">
            {note.text}
          </p>
        </motion.div>
      ))}
    </div>
  );
}