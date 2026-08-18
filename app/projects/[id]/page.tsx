"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useContent } from "@/lib/ContentContext";
import Nav from "@/components/Nav";
import ProjectVisual from "@/components/ProjectVisual";
import StatusDot, { OriginBadge } from "@/components/StatusDot";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ProjectCaseStudyPage() {
  const params = useParams<{ id: string }>();
  const { content, hydrated } = useContent();

  if (!hydrated) {
    return (
      <>
        <Nav />
        <p className="mx-auto max-w-3xl px-6 py-20 font-mono text-sm text-muted">Loading…</p>
      </>
    );
  }

  const index = content.projects.findIndex((p) => p.id === params.id);
  const project = content.projects[index];

  if (!project) {
    notFound();
  }

  const prev = content.projects[index - 1];
  const next = content.projects[index + 1];
  const pills = project.stack.split(",").map((s) => s.trim()).filter(Boolean);
  // Split the decisions paragraph into digestible bullet-style beats.
  const decisionBeats = project.decisions
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <>
      <Nav />
      <article className="mx-auto max-w-4xl px-6 py-14 sm:px-10 lg:px-16">
        <Link
          href="/#projects"
          className="mb-10 inline-block font-display text-lg text-paper underline decoration-copper decoration-wavy underline-offset-4 hover:text-copper-bright"
        >
          ← all projects
        </Link>

        <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="mb-3 flex items-center gap-3">
            <span className="font-mono text-xs text-copper-soft">
              {String(index + 1).padStart(2, "0")} / {String(content.projects.length).padStart(2, "0")}
            </span>
            <StatusDot status={project.status} />
            <OriginBadge origin={project.origin} />
          </div>
          <h1 className="font-display text-5xl text-paper sm:text-6xl">{project.name}</h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{project.what}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-10"
        >
          <ProjectVisual
            id={project.id}
            name={project.name}
            image={project.image}
            status={project.status}
            index={index}
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.4 }}
          className="mt-8 flex flex-wrap gap-2"
        >
          {pills.map((p) => (
            <span
              key={p}
              className="rounded-full border border-line bg-ink-2 px-3 py-1 font-mono text-xs text-muted"
            >
              {p}
            </span>
          ))}
        </motion.div>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_1fr]">
          <Section title="The problem" delay={0}>
            <p className="text-base leading-relaxed text-paper/85">{project.problem}</p>
          </Section>

          <Section title="My role" delay={0.05}>
            <p className="text-base leading-relaxed text-paper/85">{project.role}</p>
          </Section>
        </div>

        <Section title="What I actually built" delay={0.1} className="mt-14">
          <ul className="space-y-3">
            {decisionBeats.map((beat, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="flex items-start gap-3 text-base leading-relaxed text-paper/85"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />
                {beat}
              </motion.li>
            ))}
          </ul>
        </Section>

        <Section title="Highlights" delay={0.15} className="mt-14">
          <div className="grid gap-3 sm:grid-cols-2">
            {project.highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                className="rounded-lg border border-line bg-ink-2 px-4 py-3 text-sm text-paper/85"
              >
                {h}
              </motion.div>
            ))}
          </div>
        </Section>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-14 rounded-2xl border-2 border-copper bg-copper/10 p-7"
        >
          <p className="mb-1 font-mono text-xs uppercase tracking-wider text-copper-soft">
            The impact
          </p>
          <p className="font-display text-2xl leading-snug text-paper sm:text-3xl">
            {project.impact}
          </p>
        </motion.div>

        {project.links && (
          <div className="mt-10">
            <a
              href={project.links}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full border-2 border-paper bg-copper px-6 py-3 font-display text-lg text-paper shadow-[3px_3px_0_0_#22314f] transition-transform hover:-translate-y-0.5"
            >
              View it live →
            </a>
          </div>
        )}

        <nav className="mt-20 grid gap-4 border-t-2 border-line pt-8 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/projects/${prev.id}`}
              className="rounded-xl border border-line p-4 transition-colors hover:border-copper-soft"
            >
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted">← previous</p>
              <p className="mt-1 font-display text-xl text-paper">{prev.name}</p>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/projects/${next.id}`}
              className="rounded-xl border border-line p-4 text-right transition-colors hover:border-copper-soft"
            >
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted">next →</p>
              <p className="mt-1 font-display text-xl text-paper">{next.name}</p>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </article>
    </>
  );
}

function Section({
  title,
  delay,
  className,
  children,
}: {
  title: string;
  delay: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      transition={{ duration: 0.45, delay }}
      className={className}
    >
      <p className="mb-3 font-mono text-xs uppercase tracking-wider text-copper-soft">{title}</p>
      {children}
    </motion.section>
  );
}