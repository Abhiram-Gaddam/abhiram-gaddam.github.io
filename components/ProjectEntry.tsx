"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/lib/content";
import ProjectVisual from "./ProjectVisual";
import StatusDot from "./StatusDot";

export default function ProjectEntry({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <li
      className="relative"
      style={{ zIndex: hovered ? 30 : 1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/projects/${project.id}`} className="block">
        {/* baseline row — always in flow, fixed height, doesn't move */}
        <motion.div
          animate={{ opacity: hovered ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="flex h-20 items-center justify-between border-b-2 border-line px-1 sm:px-2"
        >
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-copper-soft">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-2xl text-paper sm:text-3xl">{project.name}</h3>
          </div>
          <div className="flex items-center gap-4">
            <StatusDot status={project.status} />
            <span className="hidden font-mono text-xs text-muted sm:inline">view →</span>
          </div>
        </motion.div>

        {/* floating preview — grows from the row's own vertical center, overlays neighbors */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ scaleY: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "center" }}
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 rounded-2xl border-2 border-copper bg-ink-2 px-5 py-5 shadow-[6px_8px_0_0_#e2cfa4] sm:px-7 sm:py-6"
            >
              <div className="flex items-center gap-5 sm:gap-7">
                <ProjectVisual
                  id={project.id}
                  name={project.name}
                  image={project.image}
                  status={project.status}
                  index={index}
                  compact
                />
                <div className="min-w-0">
                  <div className="mb-1.5 flex items-center gap-3">
                    <span className="font-mono text-xs text-copper-soft">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <StatusDot status={project.status} />
                  </div>
                  <h3 className="font-display text-2xl text-paper sm:text-3xl">{project.name}</h3>
                  <p className="mt-1.5 line-clamp-2 max-w-md text-sm leading-relaxed text-muted sm:text-base">
                    {project.what}
                  </p>
                  <span className="mt-2 inline-block font-display text-base text-copper-bright underline decoration-copper decoration-wavy underline-offset-4">
                    View case study →
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Link>
    </li>
  );
}