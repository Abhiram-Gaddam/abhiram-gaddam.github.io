"use client";

import { useContent } from "@/lib/ContentContext";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HandDivider from "@/components/HandDivider";
import SkillsMatrix from "@/components/SkillsMatrix";
import ProjectEntry from "@/components/ProjectEntry";
import ExperienceScroller from "@/components/ExperienceScroller";
import { ContactBar } from "@/components/AchievementsAndContact";

export default function HomePage() {
  const { content } = useContent();

  return (
    <>
      <Nav />
      <Hero hero={content.hero} />

      <main className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-14 xl:px-20">
        <Section
          id="skills"
          label="What I'm good at"
          lede="Not a wall of badges — the stack I actually reach for when something needs to get built and shipped."
        >
          <SkillsMatrix skills={content.skills} />
        </Section>

        <HandDivider />

        <Section
          id="projects"
          label="Things I've built"
          lede="Hover a row for a quick look, click for the full case study."
        >
          <ul className="border-t-2 border-line">
            {content.projects.map((p, i) => (
              <ProjectEntry key={p.id} project={p} index={i} />
            ))}
          </ul>
        </Section>

        <HandDivider />

        <Section
          id="experience"
          label="Where I've worked"
          lede="Freelance client work, an agency team, and one internship that had real stakes attached. Scroll to move through them."
        >
          <ExperienceScroller entries={content.experience} />
        </Section>

        <HandDivider />

        <Section
          id="contact"
          label="Let's talk"
          lede="If any of this looks like the kind of work you need done, I'm one message away."
        >
          <ContactBar
            email={content.contact.email}
            linkedin={content.contact.linkedin}
            github={content.contact.github}
            resumeLink={content.resumeLink}
          />
        </Section>
      </main>

      <footer className="border-t-2 border-line px-6 py-10 text-center sm:px-10">
        <a
          href="/about"
          className="font-display text-xl text-paper underline decoration-copper decoration-wavy underline-offset-4 hover:text-copper-bright"
        >
          want to know who's behind this? →
        </a>
      </footer>
    </>
  );
}

function Section({
  id,
  label,
  lede,
  children,
}: {
  id: string;
  label: string;
  lede?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <p className="mb-2 font-display text-2xl text-copper-bright lg:text-3xl">{label}</p>
      {lede && (
        <p className="mb-7 max-w-xl text-sm leading-relaxed text-muted lg:text-base">{lede}</p>
      )}
      {children}
    </section>
  );
}