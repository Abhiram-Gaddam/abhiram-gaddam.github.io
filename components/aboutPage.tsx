// "use client";

// import { motion } from "framer-motion";
// import { useContent } from "@/lib/ContentContext";
// import Link from "next/link";
// import ClayTilt from "@/components/illustrations/ClayTilt";
// import { BadmintonClay, CompassClay, NetworkClay } from "@/components/illustrations/ClayIcons";
// import DoodleHero from "@/components/illustrations/DoodleHero";

// const fadeUp = {
//   hidden: { opacity: 0, y: 18 },
//   show: { opacity: 1, y: 0 },
// };

// export default function AboutPage() {
//   const { content } = useContent();
//   const { personal } = content;
//   const photo = "/GaddamAbhiram.jpg"
//   return (
//     <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
//       <Link
//         href="/"
//         className="mb-10 inline-block font-display text-lg text-paper underline decoration-copper decoration-wavy underline-offset-4 hover:text-copper-bright"
//       >
//         ← back to the work
//       </Link>

//       <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
         
//         {/* Left column — the story, reveals as you scroll */}
//         <div>
//         <div className="fixed right-0  lg: -top-1 z-20 pointer-events-none">
//                     <DoodleHero size={120} swing={true} />
//           </div>
//           <motion.p
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             variants={fadeUp}
//             transition={{ duration: 0.5 }}
//             className="mb-2 font-display text-2xl text-copper-bright"
//           >
//             Off the record
//           </motion.p>
//           <motion.h1
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             variants={fadeUp}
//             transition={{ duration: 0.5, delay: 0.05 }}
//             className="mb-8 font-display text-4xl text-paper sm:text-5xl lg:text-6xl"
//           >
//             Who I am outside the code
//           </motion.h1>

//           {personal.originStory && (
//             <motion.p
//               initial="hidden"
//               whileInView="show"
//               viewport={{ once: true }}
//               variants={fadeUp}
//               transition={{ duration: 0.5, delay: 0.1 }}
//               className="mb-6 text-lg leading-relaxed text-paper/90"
//             >
//               {personal.originStory}
//             </motion.p>
//           )}

//           <motion.p
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             variants={fadeUp}
//             transition={{ duration: 0.5, delay: 0.15 }}
//             className="mb-10 text-base leading-relaxed text-muted"
//           >
//             {personal.background}
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.96, rotate: -1 }}
//             whileInView={{ opacity: 1, scale: 1, rotate: -1 }}
//             whileHover={{ rotate: 0, scale: 1.01 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.4 }}
//             className="mb-12 rounded-2xl border-2 border-line bg-ink-2 p-6 shadow-[4px_4px_0_0_#e2cfa4]"
//           >
//             <h2 className="mb-2 font-display text-2xl text-copper-bright">
//               Why I follow AI closely
//             </h2>
//             <p className="text-sm leading-relaxed text-muted">{personal.whyAI}</p>
//           </motion.div>

//           <h2 className="mb-6 font-display text-2xl text-paper">
//             Outside of building things
//           </h2>
//           <div className="grid grid-cols-3 gap-5 sm:max-w-sm">
//             <InterestCard icon={<BadmintonClay size={40} />} label="Badminton" delay={0} />
//             <InterestCard icon={<CompassClay size={40} />} label="Exploring" delay={0.08} />
//             <InterestCard icon={<NetworkClay size={40} />} label="People" delay={0.16} />
//           </div>
//           <motion.p
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             variants={fadeUp}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="mt-6 max-w-md text-sm leading-relaxed text-muted"
//           >
//             {personal.nonTechInterests}
//           </motion.p>
//         </div>

//         {/* Right column — sticky photo/visual anchor on desktop */}
//         <div className="lg:sticky lg:top-24 lg:order-last order-first lg:self-start">
//           {personal.includePhoto && (
//           <motion.img
//           src={photo}
//           alt="Photo"
//           initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
//           whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
//           whileHover={{ rotate: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//           className="mx-auto h-56 w-56 rounded-3xl border-2 border-line object-cover object-[center_30%] shadow-[6px_6px_0_0_#e2cfa4] lg:mx-0"
//         />
//           )}
//           <p className="mt-4 text-center font-display text-lg text-copper-soft lg:text-left">
//             — not just a builder, apparently a badminton player too
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// function InterestCard({
//   icon,
//   label,
//   delay,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   delay: number;
// }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 12 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.4, delay }}
//       className="flex flex-col items-center gap-2 text-center"
//     >
//       <ClayTilt>{icon}</ClayTilt>
//       <span className="font-display text-base text-muted">{label}</span>
//     </motion.div>
//   );
// }

"use client";

import { motion } from "framer-motion";
import { useContent } from "@/lib/ContentContext";
import Link from "next/link";
import ClayTilt from "@/components/illustrations/ClayTilt";
import { BadmintonClay, CompassClay, NetworkClay } from "@/components/illustrations/ClayIcons";
import JourneyMap from "@/components/Journeymap";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  const { content } = useContent();
  const { personal, hero } = content;

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
      <Link
        href="/"
        className="mb-10 inline-block font-display text-lg text-paper underline decoration-copper decoration-wavy underline-offset-4 hover:text-copper-bright"
      >
        ← back to the work
      </Link>

      <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
        {/* Left column — the story, reveals as you scroll */}
        <div>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mb-2 font-display text-2xl text-copper-bright"
          >
            Off the record
          </motion.p>
          <motion.h1
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-8 font-display text-4xl text-paper sm:text-5xl lg:text-6xl"
          >
            Who I am outside the code
          </motion.h1>

          {personal.originStory && (
            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 text-lg leading-relaxed text-paper/90"
            >
              {personal.originStory}
            </motion.p>
          )}

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-14 text-base leading-relaxed text-muted"
          >
            {personal.background}
          </motion.p>

          {personal.journey && personal.journey.length > 0 && (
            <div className="mb-14">
              <JourneyMap stops={personal.journey} />
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.96, rotate: -1 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -1 }}
            whileHover={{ rotate: 0, scale: 1.01 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-12 rounded-2xl border-2 border-line bg-ink-2 p-6 shadow-[4px_4px_0_0_#e2cfa4]"
          >
            <h2 className="mb-2 font-display text-2xl text-copper-bright">
              Why I follow AI closely
            </h2>
            <p className="text-sm leading-relaxed text-muted">{personal.whyAI}</p>
          </motion.div>

          <h2 className="mb-6 font-display text-2xl text-paper">
            Outside of building things
          </h2>
          <div className="grid grid-cols-3 gap-5 sm:max-w-sm">
            <InterestCard icon={<BadmintonClay size={40} />} label="Badminton" delay={0} />
            <InterestCard icon={<CompassClay size={40} />} label="Exploring" delay={0.08} />
            <InterestCard icon={<NetworkClay size={40} />} label="People" delay={0.16} />
          </div>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-md text-sm leading-relaxed text-muted"
          >
            {personal.nonTechInterests}
          </motion.p>
        </div>

        {/* Right column — sticky photo/visual anchor on desktop */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          {personal.includePhoto && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
              whileHover={{ rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mx-auto flex h-56 w-56 items-center justify-center overflow-hidden rounded-3xl border-2 border-line bg-ink-2 font-display text-lg text-muted shadow-[6px_6px_0_0_#e2cfa4] lg:mx-0"
            >
              {hero.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={hero.photo} alt={hero.preferredName} className="h-full w-full object-cover" />
              ) : (
                "photo"
              )}
            </motion.div>
          )}
          <p className="mt-4 text-center font-display text-lg text-copper-soft lg:text-left">
            — not just a builder, apparently a badminton player too
          </p>
        </div>
      </div>
    </div>
  );
}

function InterestCard({
  icon,
  label,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="flex flex-col items-center gap-2 text-center"
    >
      <ClayTilt>{icon}</ClayTilt>
      <span className="font-display text-base text-muted">{label}</span>
    </motion.div>
  );
}