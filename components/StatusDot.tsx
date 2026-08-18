import { ProjectStatus } from "@/lib/content";

const STATUS_MAP: Record<ProjectStatus, { label: string; color: string; pulse: boolean }> = {
  live: { label: "live", color: "#2a9d78", pulse: true },
  "code-complete": { label: "code complete, not deployed", color: "#f2b705", pulse: false },
  archived: { label: "archived", color: "#9aa5b8", pulse: false },
};

export function OriginBadge({ origin }: { origin: "freelance" | "personal" }) {
  return (
    <span className="rounded-full border border-line bg-ink-2 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
      {origin === "freelance" ? "Freelance" : "Personal project"}
    </span>
  );
}

export default function StatusDot({ status }: { status: ProjectStatus }) {
  const meta = STATUS_MAP[status];
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted">
      <span
        className="inline-block h-2 w-2 rounded-full"
        style={{
          backgroundColor: meta.color,
          animation: meta.pulse ? "pulseDot 2s ease-in-out infinite" : undefined,
        }}
      />
      {meta.label}
    </span>
  );
}