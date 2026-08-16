// // "use client";

// // import { Content } from "@/lib/content";
// // import DoodleHero from "./illustrations/DoodleHero";
// // import ProofChips from "./illustrations/ProofChips";

// // export default function Hero({ hero }: { hero: Content["hero"] }) {
// //   return (
// //     <section className="relative overflow-hidden px-6 pb-16 pt-16 sm:px-10 sm:pt-20 lg:px-16 lg:pt-24">
// //       <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
// //         <div>
// //           <p className="mb-3 font-display text-2xl text-copper-bright">Hi, I'm</p>
// //           <h1 className="font-display text-5xl leading-[1.05] text-paper sm:text-6xl lg:text-7xl xl:text-8xl">
// //             {hero.preferredName}.
// //           </h1>
// //           <p className="mt-4 max-w-xl text-xl leading-snug text-paper/90 sm:text-2xl lg:text-3xl">
// //             {hero.title}
// //           </p>
// //           <p className="mt-5 max-w-lg text-base leading-relaxed text-muted lg:max-w-xl lg:text-lg">
// //             {hero.subheadline}
// //           </p>

// //           <div className="mt-8 flex flex-wrap items-center gap-4">
// //             <a
// //               href={hero.ctaHref}
// //               target="_blank"
// //               rel="noreferrer"
// //               className="rounded-full border-2 border-paper bg-copper px-6 py-3 font-display text-lg text-paper shadow-[3px_3px_0_0_#22314f] transition-transform hover:-translate-y-0.5 hover:shadow-[4px_5px_0_0_#22314f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper-bright"
// //             >
// //               {hero.ctaLabel}
// //             </a>
// //             <a
// //               href="#projects"
// //               className="font-display text-lg text-paper underline decoration-copper decoration-wavy underline-offset-4 hover:text-copper-bright"
// //             >
// //               see what I've built
// //             </a>
// //           </div>
// //         </div>

// //         {/* Right column: original hanging doodle up top, proof chips filling the rest of the space below it */}
// //         <div className="flex flex-col items-end">
// //           <div className="mr-2 sm:mr-6">
// //             <DoodleHero size={140} />
// //           </div>
// //           <ProofChips />
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }



// // "use client";

// // import { Content } from "@/lib/content";
// // import DoodleHero from "./illustrations/DoodleHero";
// // import ProofChips from "./illustrations/ProofChips";

// // export default function Hero({ hero }: { hero: Content["hero"] }) {
// //   return (
// //     <section className="relative overflow-hidden px-6 pb-16 pt-16 sm:px-10 sm:pt-20 lg:px-16 lg:pt-24">
      
// //       {/* ========================================= */}
// //       {/* PLACEMENT OPTION 1: FAR RIGHT EDGE        */}
// //       {/* ========================================= */}
//       // <div className="absolute right-2  z-10 sm:right-8 lg:right-16 lg:top-0">
//       //   <DoodleHero size={95} />
//       // </div>

// //       <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
        
// //         {/* Left Column (Text) */}
// //         <div className="relative">
          
// //           {/* ========================================= */}
// //           {/* PLACEMENT OPTION 2: LEFT OF TEXT          */}
// //           {/* ========================================= */}
// //           {/* <div className="absolute -left-20 top-4 z-10 hidden sm:block md:-left-28 lg:-left-32">
// //             <DoodleHero size={95} />
// //           </div> */}

// //           <p className="mb-3 font-display text-2xl text-copper-bright">Hi, I'm</p>
// //           <h1 className="font-display text-5xl leading-[1.05] text-paper sm:text-6xl lg:text-7xl xl:text-8xl">
// //             {hero.preferredName}.
// //           </h1>
// //           <p className="mt-4 max-w-xl text-xl leading-snug text-paper/90 sm:text-2xl lg:text-3xl">
// //             {hero.title}
// //           </p>
// //           <p className="mt-5 max-w-lg text-base leading-relaxed text-muted lg:max-w-xl lg:text-lg">
// //             {hero.subheadline}
// //           </p>

// //           <div className="mt-8 flex flex-wrap items-center gap-4">
// //             <a
// //               href={hero.ctaHref}
// //               target="_blank"
// //               rel="noreferrer"
// //               className="rounded-full border-2 border-paper bg-copper px-6 py-3 font-display text-lg text-paper shadow-[3px_3px_0_0_#22314f] transition-transform hover:-translate-y-0.5 hover:shadow-[4px_5px_0_0_#22314f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper-bright"
// //             >
// //               {hero.ctaLabel}
// //             </a>
// //             <a
// //               href="#projects"
// //               className="font-display text-lg text-paper underline decoration-copper decoration-wavy underline-offset-4 hover:text-copper-bright"
// //             >
// //               see what I've built
// //             </a>
// //           </div>
// //         </div>

// //         {/* Right column: Proof chips */}
// //         <div className="flex flex-col items-center lg:items-end">
   
// //           {/* Replaced ProofChips with the new interactive component */}
// //           <ProofChips />
// //         </div>
// //       </div>
// //     </section>
// //   );
// // } 

// "use client";

// import { Content } from "@/lib/content";
// import DoodleHero from "./illustrations/DoodleHero";
// import { motion } from "framer-motion";

// export default function Hero({ hero }: { hero: Content["hero"] }) {
//   // Framer Motion variants for a beautiful, cascading entrance
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: { staggerChildren: 0.15, delayChildren: 0.1 },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     show: { 
//       opacity: 1, 
//       y: 0, 
//       transition: { type: "spring", stiffness: 120, damping: 14 } 
//     },
//   };

//   return (
//     // Added a subtle dot-grid background to make the whole section feel like a sketchbook/blueprint
//     <section className="relative overflow-hidden bg-[#Fdfbf7] px-6 pb-20 pt-16 sm:px-10 sm:pt-24 lg:px-16 lg:pt-32 min-h-[90vh] flex items-center">
      
//       {/* Subtle Dot Grid Background */}
//       <div className="absolute inset-0 z-0 bg-[radial-gradient(#cbd5e1_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-60 pointer-events-none"></div>

//       <div className="relative z-10 mx-auto w-full max-w-7xl grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
        
//         {/* ========================================= */}
//         {/* LEFT COLUMN: THE INTRO                    */}
//         {/* ========================================= */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="show"
//           className="relative"
//         >
//           {/* Playful tilted greeting */}
//           <motion.div variants={itemVariants} className="mb-4 inline-block">
//             <span className="font-display text-xl sm:text-2xl text-[#f59e0b] -rotate-2 block origin-bottom-left">
//               Hi, I'm
//             </span>
//           </motion.div>
          
//           {/* Main Name with animated "Scribble" underline */}
//           <motion.div variants={itemVariants} className="relative inline-block w-full mb-6">
//             <h1 className="font-display text-6xl leading-[0.95] text-[#22314f] sm:text-7xl lg:text-[5.5rem] tracking-tight">
//               {hero.preferredName}.
//             </h1>
//             <svg 
//               className="absolute -bottom-2 left-0 w-[85%] max-w-[350px] h-4 text-[#f59e0b] opacity-80" 
//               viewBox="0 0 200 12" 
//               fill="none" 
//               preserveAspectRatio="none"
//               aria-hidden="true"
//             >
//               <motion.path
//                 d="M2 8 Q 50 -2, 100 5 T 198 4"
//                 stroke="currentColor"
//                 strokeWidth="4"
//                 strokeLinecap="round"
//                 initial={{ pathLength: 0, opacity: 0 }}
//                 animate={{ pathLength: 1, opacity: 1 }}
//                 transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
//               />
//             </svg>
//           </motion.div>

//           <motion.h2 
//             variants={itemVariants} 
//             className="max-w-xl text-2xl font-medium leading-snug text-[#22314f] sm:text-3xl lg:text-4xl mb-5"
//           >
//             {hero.title}
//           </motion.h2>

//           <motion.p 
//             variants={itemVariants} 
//             className="max-w-lg text-lg leading-relaxed text-[#22314f]/70 lg:max-w-xl"
//           >
//             {hero.subheadline}
//           </motion.p>

//           {/* Tactile, Neo-brutalist Buttons */}
//           <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center gap-6">
//             <motion.a
//               whileHover={{ scale: 1.03, rotate: -1 }}
//               whileTap={{ scale: 0.97, y: 4, boxShadow: "0px 0px 0px 0px #22314f" }}
//               href={hero.ctaHref}
//               target="_blank"
//               rel="noreferrer"
//               className="rounded-xl border-2 border-[#22314f] bg-[#f59e0b] px-7 py-3.5 font-display text-xl text-[#22314f] shadow-[4px_4px_0_0_#22314f] transition-all hover:bg-[#fbbf24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper-bright"
//             >
//               {hero.ctaLabel}
//             </motion.a>

//             <motion.a
//               whileHover="hover"
//               href="#projects"
//               className="group flex items-center gap-2 font-display text-xl text-[#22314f] underline decoration-2 decoration-[#f59e0b]/50 underline-offset-4 hover:decoration-[#f59e0b] transition-colors"
//             >
//               see what I've built
//               <motion.span
//                 variants={{ hover: { x: 5 } }}
//                 transition={{ type: "spring", stiffness: 300 }}
//               >
//                 →
//               </motion.span>
//             </motion.a>
//           </motion.div>
//         </motion.div>

//         {/* ========================================= */}
//         {/* RIGHT COLUMN: THE EDITORIAL INFOGRAPHIC   */}
//         {/* ========================================= */}
//         <motion.div 
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, delay: 0.3 }}
//           className="relative w-full flex flex-col pt-12 lg:pt-0"
//         >
//           {/* Spidey hangs right over the infographic perfectly */}
//           {/* <div className="absolute right-0 -top-24 sm:-top-32 lg:-top-40 z-20 pointer-events-none">
//             <DoodleHero size={120} />
//           </div> */}

//           {/* Section Divider */}
//           <div className="flex items-center gap-4 mb-8 pr-12">
//             <span className="font-display text-[#f59e0b] text-sm tracking-[0.2em] uppercase font-bold">
//               The Proof
//             </span>
//             <span className="h-[2px] flex-1 bg-[#22314f]/10"></span>
//           </div>

//           {/* Editorial Grid instead of "SaaS Bars" */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
            
//             {/* Proof 1: Spans full width for asymmetry */}
//             <motion.div 
//               whileHover={{ x: 5 }}
//               className="sm:col-span-2 group cursor-default"
//             >
//               <h3 className="font-display text-6xl text-[#22314f] mb-1 group-hover:text-[#f59e0b] transition-colors duration-300">
//                 03
//               </h3>
//               <p className="text-lg text-[#22314f]/80 font-medium border-l-2 border-[#f59e0b] pl-4">
//                 Platforms shipped solo,<br/>end-to-end.
//               </p>
//             </motion.div>

//             {/* Proof 2: Half width */}
//             <motion.div 
//               whileHover={{ x: 5 }}
//               className="group cursor-default"
//             >
//               <h3 className="font-display text-5xl text-[#22314f] mb-1 group-hover:text-[#f59e0b] transition-colors duration-300">
//                 .89
//               </h3>
//               <p className="text-base text-[#22314f]/80 font-medium border-l-2 border-[#22314f]/20 pl-4 group-hover:border-[#f59e0b] transition-colors">
//                 F1 on the SROIE<br/>OCR benchmark.
//               </p>
//             </motion.div>

//             {/* Proof 3: Half width */}
//             <motion.div 
//               whileHover={{ x: 5 }}
//               className="group cursor-default"
//             >
//               <h3 className="font-display text-5xl text-[#22314f] mb-1 group-hover:text-[#f59e0b] transition-colors duration-300">
//                 0-Day
//               </h3>
//               <p className="text-base text-[#22314f]/80 font-medium border-l-2 border-[#22314f]/20 pl-4 group-hover:border-[#f59e0b] transition-colors">
//                 Found & fixed a live auth gap before escalation.
//               </p>
//             </motion.div>

//           </div>
//         </motion.div>

//       </div>
//     </section>
//   );
// }

"use client";

import { Content } from "@/lib/content";
import { motion, type Variants } from "framer-motion"; // <-- Added type import

export default function Hero({ hero }: { hero: Content["hero"] }) {
  // Explicitly typed as Variants to fix the TS2322 errors
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 120, damping: 14 } 
    },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#Fdfbf7] px-6 pb-20 pt-16 sm:px-10 sm:pt-24 lg:px-16 lg:pt-32">
      
      {/* Subtle Dot Grid Background */}
      <div 
        className="absolute inset-0 z-0 bg-[radial-gradient(#cbd5e1_1.5px,transparent_1.5px)] bg-size-[24px_24px] opacity-60 pointer-events-none" 
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
        
        {/* LEFT COLUMN: INTRO */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative"
        >
          {/* Tilted greeting */}
          <motion.div variants={itemVariants} className="mb-4 inline-block">
            <span className="font-display text-xl sm:text-2xl text-[#f59e0b] -rotate-2 block origin-bottom-left font-medium">
              Hi, I'm
            </span>
          </motion.div>
          
          {/* Main Name with animated underline */}
          <motion.div variants={itemVariants} className="relative inline-block w-full mb-6">
            <h1 className="font-display text-6xl leading-[0.95] text-paper sm:text-7xl lg:text-[5.5rem] tracking-tight">
              {hero.preferredName}.
            </h1>
            <svg 
              className="absolute -bottom-2 left-0 w-[85%] max-w-87.5 h-4 text-[#f59e0b] opacity-80" 
              viewBox="0 0 200 12" 
              fill="none" 
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <motion.path
                d="M2 8 Q 50 -2, 100 5 T 198 4"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              />
            </svg>
          </motion.div>

          <motion.h2 
            variants={itemVariants} 
            className="max-w-xl text-2xl font-medium leading-snug text-paper sm:text-3xl lg:text-4xl mb-5"
          >
            {hero.title}
          </motion.h2>

          <motion.p 
            variants={itemVariants} 
            className="max-w-lg text-lg leading-relaxed text-paper/70 lg:max-w-xl"
          >
            {hero.subheadline}
          </motion.p>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center gap-6">
            <motion.a
              whileHover={{ scale: 1.03, rotate: -1 }}
              whileTap={{ scale: 0.97, y: 4, boxShadow: "0px 0px 0px 0px #22314f" }}
              href={hero.ctaHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border-2 border-paper bg-[#f59e0b] px-7 py-3.5 font-display text-xl text-paper shadow-[4px_4px_0_0_#22314f] transition-all hover:bg-[#fbbf24] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f59e0b]"
            >
              {hero.ctaLabel}
            </motion.a>

            <motion.a
              whileHover="hover"
              href="#projects"
              className="group flex items-center gap-2 font-display text-xl text-paper underline decoration-2 decoration-[#f59e0b]/50 underline-offset-4 hover:decoration-[#f59e0b] transition-colors"
            >
              see what I've built
              <motion.span
                variants={{ hover: { x: 5 } }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                →
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: INFOGRAPHIC */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full flex flex-col pt-12 lg:pt-0"
        >
          {/* Section Divider */}
          <div className="flex items-center gap-4 mb-8 pr-12">
            <span className="font-display text-[#f59e0b] text-sm tracking-[0.2em] uppercase font-bold">
              The Proof
            </span>
            <span className="h-0.5 flex-1 bg-paper/10"></span>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
            <motion.div 
              whileHover={{ x: 5 }}
              className="sm:col-span-2 group cursor-default"
            >
              <h3 className="font-display text-6xl text-paper mb-1 group-hover:text-[#f59e0b] transition-colors duration-300">
                03
              </h3>
              <p className="text-lg text-paper/80 font-medium border-l-2 border-[#f59e0b] pl-4">
                Platforms shipped solo,<br/>end-to-end.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ x: 5 }}
              className="group cursor-default"
            >
              <h3 className="font-display text-5xl text-paper mb-1 group-hover:text-[#f59e0b] transition-colors duration-300">
                .89
              </h3>
              <p className="text-base text-paper/80 font-medium border-l-2 border-paper/20 pl-4 group-hover:border-[#f59e0b] transition-colors">
                F1 on the SROIE<br/>OCR benchmark.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ x: 5 }}
              className="group cursor-default"
            >
              <h3 className="font-display text-5xl text-paper mb-1 group-hover:text-[#f59e0b] transition-colors duration-300">
                0-Day
              </h3>
              <p className="text-base text-paper/80 font-medium border-l-2 border-paper/20 pl-4 group-hover:border-[#f59e0b] transition-colors">
                Found & fixed a live auth gap before escalation.
              </p>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}