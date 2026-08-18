// "use client";

// import { useState } from "react";
// import { useContent } from "@/lib/ContentContext";
// import { Content, Project, ExperienceEntry, SkillCategory } from "@/lib/content";

// const TABS = [
//   "Positioning",
//   "Hero",
//   "Skills",
//   "Projects",
//   "Experience",
//   "Achievements",
//   "Contact",
//   "Personal",
// ] as const;
// type Tab = (typeof TABS)[number];

// export default function AdminEditor() {
//   const { content, updateContent, saveNow, resetToDefault, lastSavedAt, hydrated } =
//     useContent();
//   const [tab, setTab] = useState<Tab>("Positioning");
//   const [toast, setToast] = useState("");

//   const flash = (msg: string) => {
//     setToast(msg);
//     setTimeout(() => setToast(""), 2000);
//   };

//   const handleSave = () => {
//     saveNow();
//     flash("Saved to this browser");
//   };

//   const handleExport = () => {
//     const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "portfolio-content.json";
//     a.click();
//     URL.revokeObjectURL(url);
//     flash("Exported content.json");
//   };

//   const handleImport = (file: File) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       try {
//         const parsed = JSON.parse(reader.result as string) as Content;
//         updateContent(() => parsed);
//         flash("Imported — remember to Save");
//       } catch {
//         flash("Import failed: invalid JSON");
//       }
//     };
//     reader.readAsText(file);
//   };

//   if (!hydrated) {
//     return <p className="p-10 font-mono text-sm text-muted">Loading editor…</p>;
//   }

//   return (
//     <div className="mx-auto max-w-4xl px-6 py-10 sm:px-10">
//       <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
//         <div>
//           <h1 className="font-mono text-xl text-paper">Content admin</h1>
//           <p className="mt-1 text-sm text-muted">
//             Edits save to this browser. Export JSON to bake changes into{" "}
//             <code className="text-copper-soft">lib/content.ts</code> permanently.
//           </p>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           <label className="cursor-pointer rounded-md border border-line px-4 py-2 font-mono text-xs text-muted hover:border-copper-soft">
//             Import JSON
//             <input
//               type="file"
//               accept="application/json"
//               className="hidden"
//               onChange={(e) => e.target.files && handleImport(e.target.files[0])}
//             />
//           </label>
//           <button
//             onClick={handleExport}
//             className="rounded-md border border-line px-4 py-2 font-mono text-xs text-muted hover:border-copper-soft"
//           >
//             Export JSON
//           </button>
//           <button
//             onClick={handleSave}
//             className="rounded-md border border-copper bg-copper/10 px-4 py-2 font-mono text-xs text-copper-bright hover:bg-copper/20"
//           >
//             Save now
//           </button>
//           <button
//             onClick={() => {
//               if (confirm("Reset all edits back to defaults?")) resetToDefault();
//             }}
//             className="rounded-md border border-line px-4 py-2 font-mono text-xs text-danger hover:border-danger"
//           >
//             Reset
//           </button>
//         </div>
//       </div>

//       <p className="mb-6 font-mono text-[11px] text-muted">
//         {lastSavedAt ? `Last saved ${lastSavedAt.toLocaleTimeString()}` : "Not saved yet"} ·
//         autosaves every 30s
//       </p>

//       <div className="mb-8 flex flex-wrap gap-2 border-b border-line pb-4">
//         {TABS.map((t) => (
//           <button
//             key={t}
//             onClick={() => setTab(t)}
//             className={`rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors ${
//               tab === t
//                 ? "border-copper bg-copper/10 text-copper-bright"
//                 : "border-line text-muted hover:text-paper"
//             }`}
//           >
//             {t}
//           </button>
//         ))}
//       </div>

//       {tab === "Positioning" && (
//         <div className="space-y-5">
//           <TextField
//             label="Target role(s)"
//             value={content.positioning.targetRoles}
//             onChange={(v) =>
//               updateContent((d) => ({ ...d, positioning: { ...d.positioning, targetRoles: v } }))
//             }
//           />
//           <TextArea
//             label="One-line identity statement"
//             value={content.positioning.oneLiner}
//             onChange={(v) =>
//               updateContent((d) => ({ ...d, positioning: { ...d.positioning, oneLiner: v } }))
//             }
//           />
//         </div>
//       )}

//       {tab === "Hero" && (
//         <div className="space-y-5">
//           <TextField
//             label="Full name"
//             value={content.hero.name}
//             onChange={(v) => updateContent((d) => ({ ...d, hero: { ...d.hero, name: v } }))}
//           />
//           <TextField
//             label="Preferred name (shown big in the hero)"
//             value={content.hero.preferredName}
//             onChange={(v) =>
//               updateContent((d) => ({ ...d, hero: { ...d.hero, preferredName: v } }))
//             }
//           />
//           <TextField
//             label="Title"
//             value={content.hero.title}
//             onChange={(v) => updateContent((d) => ({ ...d, hero: { ...d.hero, title: v } }))}
//           />
//           <TextArea
//             label="Subheadline"
//             value={content.hero.subheadline}
//             onChange={(v) =>
//               updateContent((d) => ({ ...d, hero: { ...d.hero, subheadline: v } }))
//             }
//           />
//           <div className="grid gap-4 sm:grid-cols-2">
//             <TextField
//               label="CTA label"
//               value={content.hero.ctaLabel}
//               onChange={(v) =>
//                 updateContent((d) => ({ ...d, hero: { ...d.hero, ctaLabel: v } }))
//               }
//             />
//             <TextField
//               label="CTA link"
//               value={content.hero.ctaHref}
//               onChange={(v) =>
//                 updateContent((d) => ({ ...d, hero: { ...d.hero, ctaHref: v } }))
//               }
//             />
//           </div>
//         </div>
//       )}

//       {tab === "Skills" && (
//         <ListEditor
//           items={content.skills}
//           onChange={(items) => updateContent((d) => ({ ...d, skills: items }))}
//           newItem={{ category: "", stack: "", depth: "Comfortable" }}
//           renderItem={(item, update) => (
//             <div className="grid gap-3 sm:grid-cols-3">
//               <TextField
//                 label="Category"
//                 value={item.category}
//                 onChange={(v) => update({ ...item, category: v })}
//               />
//               <TextField
//                 label="Stack"
//                 value={item.stack}
//                 onChange={(v) => update({ ...item, stack: v })}
//               />
//               <SelectField
//                 label="Depth"
//                 value={item.depth}
//                 options={["Production-ready", "Comfortable", "Learning"]}
//                 onChange={(v) => update({ ...item, depth: v as SkillCategory["depth"] })}
//               />
//             </div>
//           )}
//         />
//       )}

//       {tab === "Projects" && (
//         <ListEditor
//           items={content.projects}
//           onChange={(items) => updateContent((d) => ({ ...d, projects: items }))}
//           newItem={{
//             id: `project-${Date.now()}`,
//             name: "",
//             what: "",
//             highlights: [""],
//             problem: "",
//             role: "",
//             stack: "",
//             decisions: "",
//             impact: "",
//             links: "",
//             status: "code-complete",
//             image: "",
//           }}
//           renderItem={(item, update) => (
//             <div className="space-y-3">
//               <TextField label="Name" value={item.name} onChange={(v) => update({ ...item, name: v })} />
//               <TextArea label="What it is" value={item.what} onChange={(v) => update({ ...item, what: v })} />
//               <div>
//                 <p className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-muted">
//                   Highlights (shown as bullets on the card)
//                 </p>
//                 <div className="space-y-2">
//                   {item.highlights.map((h, hi) => (
//                     <div key={hi} className="flex gap-2">
//                       <input
//                         value={h}
//                         onChange={(e) => {
//                           const highlights = [...item.highlights];
//                           highlights[hi] = e.target.value;
//                           update({ ...item, highlights });
//                         }}
//                         className="flex-1 rounded-md border border-line bg-ink-3 p-2 text-sm text-paper"
//                       />
//                       <button
//                         onClick={() =>
//                           update({ ...item, highlights: item.highlights.filter((_, x) => x !== hi) })
//                         }
//                         className="px-2 font-mono text-xs text-danger"
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     onClick={() => update({ ...item, highlights: [...item.highlights, ""] })}
//                     className="font-mono text-xs text-copper-soft"
//                   >
//                     + Add highlight
//                   </button>
//                 </div>
//               </div>
//               <TextArea label="Problem / context" value={item.problem} onChange={(v) => update({ ...item, problem: v })} />
//               <TextArea label="My role" value={item.role} onChange={(v) => update({ ...item, role: v })} />
//               <TextField label="Tech stack" value={item.stack} onChange={(v) => update({ ...item, stack: v })} />
//               <TextArea label="Key technical decisions" value={item.decisions} onChange={(v) => update({ ...item, decisions: v })} />
//               <TextArea label="Impact / result" value={item.impact} onChange={(v) => update({ ...item, impact: v })} />
//               <TextField
//                 label="Screenshot path (e.g. /projects/eaap.png — leave blank for placeholder)"
//                 value={item.image ?? ""}
//                 onChange={(v) => update({ ...item, image: v })}
//               />
//               <div className="grid gap-3 sm:grid-cols-2">
//                 <TextField label="Links" value={item.links} onChange={(v) => update({ ...item, links: v })} />
//                 <SelectField
//                   label="Status"
//                   value={item.status}
//                   options={["live", "code-complete", "archived"]}
//                   onChange={(v) => update({ ...item, status: v as Project["status"] })}
//                 />
//               </div>
//             </div>
//           )}
//         />
//       )}

//       {tab === "Experience" && (
//         <ListEditor
//           items={content.experience}
//           onChange={(items) => updateContent((d) => ({ ...d, experience: items }))}
//           newItem={{ id: `exp-${Date.now()}`, org: "", role: "", period: "", bullets: [""], images: [] }}
//           renderItem={(item, update) => (
//             <div className="space-y-3">
//               <div className="grid gap-3 sm:grid-cols-3">
//                 <TextField label="Organization" value={item.org} onChange={(v) => update({ ...item, org: v })} />
//                 <TextField label="Role" value={item.role} onChange={(v) => update({ ...item, role: v })} />
//                 <TextField label="Period (optional)" value={item.period} onChange={(v) => update({ ...item, period: v })} />
//               </div>
//               <div>
//                 <p className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-muted">Bullets</p>
//                 <div className="space-y-2">
//                   {item.bullets.map((b, bi) => (
//                     <div key={bi} className="flex gap-2">
//                       <textarea
//                         value={b}
//                         onChange={(e) => {
//                           const bullets = [...item.bullets];
//                           bullets[bi] = e.target.value;
//                           update({ ...item, bullets });
//                         }}
//                         className="min-h-[44px] flex-1 rounded-md border border-line bg-ink-3 p-2 text-sm text-paper"
//                       />
//                       <button
//                         onClick={() =>
//                           update({ ...item, bullets: item.bullets.filter((_, x) => x !== bi) })
//                         }
//                         className="px-2 font-mono text-xs text-danger"
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     onClick={() => update({ ...item, bullets: [...item.bullets, ""] })}
//                     className="font-mono text-xs text-copper-soft"
//                   >
//                     + Add bullet
//                   </button>
//                 </div>
//               </div>
//               <div>
//                 <p className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-muted">
//                   Screenshots (paths, e.g. /experience/eaap-1.png)
//                 </p>
//                 <div className="space-y-2">
//                   {(item.images ?? []).map((img, ii) => (
//                     <div key={ii} className="flex gap-2">
//                       <input
//                         value={img}
//                         onChange={(e) => {
//                           const images = [...(item.images ?? [])];
//                           images[ii] = e.target.value;
//                           update({ ...item, images });
//                         }}
//                         className="flex-1 rounded-md border border-line bg-ink-3 p-2 text-sm text-paper"
//                       />
//                       <button
//                         onClick={() =>
//                           update({ ...item, images: (item.images ?? []).filter((_, x) => x !== ii) })
//                         }
//                         className="px-2 font-mono text-xs text-danger"
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     onClick={() => update({ ...item, images: [...(item.images ?? []), ""] })}
//                     className="font-mono text-xs text-copper-soft"
//                   >
//                     + Add screenshot
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         />
//       )}

//       {tab === "Achievements" && (
//         <div className="space-y-2">
//           {content.achievements.map((a, i) => (
//             <div key={i} className="flex gap-2">
//               <input
//                 value={a}
//                 onChange={(e) => {
//                   const items = [...content.achievements];
//                   items[i] = e.target.value;
//                   updateContent((d) => ({ ...d, achievements: items }));
//                 }}
//                 className="flex-1 rounded-md border border-line bg-ink-3 p-2 text-sm text-paper"
//               />
//               <button
//                 onClick={() =>
//                   updateContent((d) => ({
//                     ...d,
//                     achievements: d.achievements.filter((_, x) => x !== i),
//                   }))
//                 }
//                 className="px-2 font-mono text-xs text-danger"
//               >
//                 ✕
//               </button>
//             </div>
//           ))}
//           <button
//             onClick={() => updateContent((d) => ({ ...d, achievements: [...d.achievements, ""] }))}
//             className="font-mono text-xs text-copper-soft"
//           >
//             + Add achievement
//           </button>
//         </div>
//       )}

//       {tab === "Contact" && (
//         <div className="space-y-5">
//           <TextField
//             label="Email"
//             value={content.contact.email}
//             onChange={(v) => updateContent((d) => ({ ...d, contact: { ...d.contact, email: v } }))}
//           />
//           <TextField
//             label="LinkedIn"
//             value={content.contact.linkedin}
//             onChange={(v) => updateContent((d) => ({ ...d, contact: { ...d.contact, linkedin: v } }))}
//           />
//           <TextField
//             label="GitHub"
//             value={content.contact.github}
//             onChange={(v) => updateContent((d) => ({ ...d, contact: { ...d.contact, github: v } }))}
//           />
//           <TextField
//             label="Resume link"
//             value={content.resumeLink}
//             onChange={(v) => updateContent((d) => ({ ...d, resumeLink: v }))}
//           />
//         </div>
//       )}

//       {tab === "Personal" && (
//         <div className="space-y-5">
//           <TextArea
//             label="Origin story"
//             value={content.personal.originStory}
//             onChange={(v) => updateContent((d) => ({ ...d, personal: { ...d.personal, originStory: v } }))}
//           />
//           <TextArea
//             label="Background"
//             value={content.personal.background}
//             onChange={(v) => updateContent((d) => ({ ...d, personal: { ...d.personal, background: v } }))}
//           />
//           <TextArea
//             label="Why AI research"
//             value={content.personal.whyAI}
//             onChange={(v) => updateContent((d) => ({ ...d, personal: { ...d.personal, whyAI: v } }))}
//           />
//           <TextArea
//             label="Non-tech interests"
//             value={content.personal.nonTechInterests}
//             onChange={(v) =>
//               updateContent((d) => ({ ...d, personal: { ...d.personal, nonTechInterests: v } }))
//             }
//           />
//           <label className="flex items-center gap-2 font-mono text-xs text-muted">
//             <input
//               type="checkbox"
//               checked={content.personal.includePhoto}
//               onChange={(e) =>
//                 updateContent((d) => ({
//                   ...d,
//                   personal: { ...d.personal, includePhoto: e.target.checked },
//                 }))
//               }
//             />
//             Include personal photo on /about
//           </label>
//         </div>
//       )}

//       {toast && (
//         <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-copper bg-ink-2 px-4 py-2 font-mono text-xs text-copper-bright">
//           {toast}
//         </div>
//       )}
//     </div>
//   );
// }

// function TextField({
//   label,
//   value,
//   onChange,
// }: {
//   label: string;
//   value: string;
//   onChange: (v: string) => void;
// }) {
//   return (
//     <label className="block">
//       <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted">
//         {label}
//       </span>
//       <input
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="w-full rounded-md border border-line bg-ink-3 p-2.5 text-sm text-paper focus:border-copper focus:outline-none"
//       />
//     </label>
//   );
// }

// function TextArea({
//   label,
//   value,
//   onChange,
// }: {
//   label: string;
//   value: string;
//   onChange: (v: string) => void;
// }) {
//   return (
//     <label className="block">
//       <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted">
//         {label}
//       </span>
//       <textarea
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="min-h-[90px] w-full rounded-md border border-line bg-ink-3 p-2.5 text-sm text-paper focus:border-copper focus:outline-none"
//       />
//     </label>
//   );
// }

// function SelectField({
//   label,
//   value,
//   options,
//   onChange,
// }: {
//   label: string;
//   value: string;
//   options: string[];
//   onChange: (v: string) => void;
// }) {
//   return (
//     <label className="block">
//       <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted">
//         {label}
//       </span>
//       <select
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="w-full rounded-md border border-line bg-ink-3 p-2.5 text-sm text-paper focus:border-copper focus:outline-none"
//       >
//         {options.map((o) => (
//           <option key={o} value={o}>
//             {o}
//           </option>
//         ))}
//       </select>
//     </label>
//   );
// }

// function ListEditor<T extends { id?: string }>({
//   items,
//   onChange,
//   newItem,
//   renderItem,
// }: {
//   items: T[];
//   onChange: (items: T[]) => void;
//   newItem: T;
//   renderItem: (item: T, update: (next: T) => void) => React.ReactNode;
// }) {
//   return (
//     <div className="space-y-6">
//       {items.map((item, i) => (
//         <div key={item.id ?? i} className="rounded-lg border border-line bg-ink-2 p-4">
//           <div className="mb-3 flex items-center justify-between">
//             <span className="font-mono text-[11px] uppercase tracking-wider text-copper-soft">
//               Item {i + 1}
//             </span>
//             <button
//               onClick={() => onChange(items.filter((_, x) => x !== i))}
//               className="font-mono text-xs text-danger"
//             >
//               Remove
//             </button>
//           </div>
//           {renderItem(item, (next) => {
//             const copy = [...items];
//             copy[i] = next;
//             onChange(copy);
//           })}
//         </div>
//       ))}
//       <button
//         onClick={() => onChange([...items, { ...newItem }])}
//         className="rounded-md border border-line px-4 py-2 font-mono text-xs text-copper-soft hover:border-copper"
//       >
//         + Add item
//       </button>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useContent } from "@/lib/ContentContext";
import { Content, Project, ExperienceEntry, SkillCategory } from "@/lib/content";

const TABS = [
  "Positioning",
  "Hero",
  "Skills",
  "Projects",
  "Experience",
  "Achievements",
  "Contact",
  "Personal",
] as const;
type Tab = (typeof TABS)[number];

export default function AdminEditor() {
  const { content, updateContent, saveNow, resetToDefault, lastSavedAt, hydrated } =
    useContent();
  const [tab, setTab] = useState<Tab>("Positioning");
  const [toast, setToast] = useState("");

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const handleSave = () => {
    saveNow();
    flash("Saved to this browser");
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio-content.json";
    a.click();
    URL.revokeObjectURL(url);
    flash("Exported content.json");
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string) as Content;
        updateContent(() => parsed);
        flash("Imported — remember to Save");
      } catch {
        flash("Import failed: invalid JSON");
      }
    };
    reader.readAsText(file);
  };

  if (!hydrated) {
    return <p className="p-10 font-mono text-sm text-muted">Loading editor…</p>;
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10 sm:px-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <h1 className="font-mono text-xl text-paper">Content admin</h1>
          <p className="mt-1 text-sm text-muted">
            Edits save to this browser. Export JSON to bake changes into{" "}
            <code className="text-copper-soft">lib/content.ts</code> permanently.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <label className="cursor-pointer rounded-md border border-line px-4 py-2 font-mono text-xs text-muted hover:border-copper-soft">
            Import JSON
            <input
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => e.target.files && handleImport(e.target.files[0])}
            />
          </label>
          <button
            onClick={handleExport}
            className="rounded-md border border-line px-4 py-2 font-mono text-xs text-muted hover:border-copper-soft"
          >
            Export JSON
          </button>
          <button
            onClick={handleSave}
            className="rounded-md border border-copper bg-copper/10 px-4 py-2 font-mono text-xs text-copper-bright hover:bg-copper/20"
          >
            Save now
          </button>
          <button
            onClick={() => {
              if (confirm("Reset all edits back to defaults?")) resetToDefault();
            }}
            className="rounded-md border border-line px-4 py-2 font-mono text-xs text-danger hover:border-danger"
          >
            Reset
          </button>
        </div>
      </div>

      <p className="mb-6 font-mono text-[11px] text-muted">
        {lastSavedAt ? `Last saved ${lastSavedAt.toLocaleTimeString()}` : "Not saved yet"} ·
        autosaves every 30s
      </p>

      <div className="mb-8 flex flex-wrap gap-2 border-b border-line pb-4">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors ${
              tab === t
                ? "border-copper bg-copper/10 text-copper-bright"
                : "border-line text-muted hover:text-paper"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Positioning" && (
        <div className="space-y-5">
          <TextField
            label="Target role(s)"
            value={content.positioning.targetRoles}
            onChange={(v) =>
              updateContent((d) => ({ ...d, positioning: { ...d.positioning, targetRoles: v } }))
            }
          />
          <TextArea
            label="One-line identity statement"
            value={content.positioning.oneLiner}
            onChange={(v) =>
              updateContent((d) => ({ ...d, positioning: { ...d.positioning, oneLiner: v } }))
            }
          />
        </div>
      )}

      {tab === "Hero" && (
        <div className="space-y-5">
          <TextField
            label="Full name"
            value={content.hero.name}
            onChange={(v) => updateContent((d) => ({ ...d, hero: { ...d.hero, name: v } }))}
          />
          <TextField
            label="Preferred name (shown big in the hero)"
            value={content.hero.preferredName}
            onChange={(v) =>
              updateContent((d) => ({ ...d, hero: { ...d.hero, preferredName: v } }))
            }
          />
          <TextField
            label="Title"
            value={content.hero.title}
            onChange={(v) => updateContent((d) => ({ ...d, hero: { ...d.hero, title: v } }))}
          />
          <TextArea
            label="Subheadline"
            value={content.hero.subheadline}
            onChange={(v) =>
              updateContent((d) => ({ ...d, hero: { ...d.hero, subheadline: v } }))
            }
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="CTA label"
              value={content.hero.ctaLabel}
              onChange={(v) =>
                updateContent((d) => ({ ...d, hero: { ...d.hero, ctaLabel: v } }))
              }
            />
            <TextField
              label="CTA link"
              value={content.hero.ctaHref}
              onChange={(v) =>
                updateContent((d) => ({ ...d, hero: { ...d.hero, ctaHref: v } }))
              }
            />
          </div>
          <TextField
            label="Photo path (e.g. /hero-photo.jpg — leave blank for placeholder)"
            value={content.hero.photo ?? ""}
            onChange={(v) => updateContent((d) => ({ ...d, hero: { ...d.hero, photo: v } }))}
          />
          <TextField
            label="Speech-bubble badge text"
            value={content.hero.badge}
            onChange={(v) => updateContent((d) => ({ ...d, hero: { ...d.hero, badge: v } }))}
          />
          <div>
            <p className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-muted">
              "Powered by" tags
            </p>
            <div className="space-y-2">
              {content.hero.poweredBy.map((tag, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={tag}
                    onChange={(e) => {
                      const poweredBy = [...content.hero.poweredBy];
                      poweredBy[i] = e.target.value;
                      updateContent((d) => ({ ...d, hero: { ...d.hero, poweredBy } }));
                    }}
                    className="flex-1 rounded-md border border-line bg-ink-3 p-2 text-sm text-paper"
                  />
                  <button
                    onClick={() =>
                      updateContent((d) => ({
                        ...d,
                        hero: { ...d.hero, poweredBy: d.hero.poweredBy.filter((_, x) => x !== i) },
                      }))
                    }
                    className="px-2 font-mono text-xs text-danger"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                onClick={() =>
                  updateContent((d) => ({
                    ...d,
                    hero: { ...d.hero, poweredBy: [...d.hero.poweredBy, ""] },
                  }))
                }
                className="font-mono text-xs text-copper-soft"
              >
                + Add tag
              </button>
            </div>
          </div>
        </div>
      )}

      {tab === "Skills" && (
        <ListEditor
          items={content.skills}
          onChange={(items) => updateContent((d) => ({ ...d, skills: items }))}
          newItem={{ category: "", stack: "", depth: "Comfortable" , story: "" }}
          renderItem={(item, update) => (
            <div className="grid gap-3 sm:grid-cols-3">
              <TextField
                label="Category"
                value={item.category}
                onChange={(v) => update({ ...item, category: v })}
              />
              <TextField
                label="Stack"
                value={item.stack}
                onChange={(v) => update({ ...item, stack: v })}
              />
              <SelectField
                label="Depth"
                value={item.depth}
                options={["Production-ready", "Comfortable", "Learning"]}
                onChange={(v) => update({ ...item, depth: v as SkillCategory["depth"] })}
              />
            </div>
          )}
        />
      )}

      {tab === "Projects" && (
        <ListEditor
          items={content.projects}
          onChange={(items) => updateContent((d) => ({ ...d, projects: items }))}
          newItem={{
            id: `project-${Date.now()}`,
            name: "",
            what: "",
            highlights: [""],
            problem: "",
            role: "",
            stack: "",
            decisions: "",
            impact: "",
            links: "",
            status: "code-complete",
            origin: "personal",
            image: "",
          }}
          renderItem={(item, update) => (
            <div className="space-y-3">
              <TextField label="Name" value={item.name} onChange={(v) => update({ ...item, name: v })} />
              <TextArea label="What it is" value={item.what} onChange={(v) => update({ ...item, what: v })} />
              <div>
                <p className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-muted">
                  Highlights (shown as bullets on the card)
                </p>
                <div className="space-y-2">
                  {item.highlights.map((h, hi) => (
                    <div key={hi} className="flex gap-2">
                      <input
                        value={h}
                        onChange={(e) => {
                          const highlights = [...item.highlights];
                          highlights[hi] = e.target.value;
                          update({ ...item, highlights });
                        }}
                        className="flex-1 rounded-md border border-line bg-ink-3 p-2 text-sm text-paper"
                      />
                      <button
                        onClick={() =>
                          update({ ...item, highlights: item.highlights.filter((_, x) => x !== hi) })
                        }
                        className="px-2 font-mono text-xs text-danger"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => update({ ...item, highlights: [...item.highlights, ""] })}
                    className="font-mono text-xs text-copper-soft"
                  >
                    + Add highlight
                  </button>
                </div>
              </div>
              <TextArea label="Problem / context" value={item.problem} onChange={(v) => update({ ...item, problem: v })} />
              <TextArea label="My role" value={item.role} onChange={(v) => update({ ...item, role: v })} />
              <TextField label="Tech stack" value={item.stack} onChange={(v) => update({ ...item, stack: v })} />
              <TextArea label="Key technical decisions" value={item.decisions} onChange={(v) => update({ ...item, decisions: v })} />
              <TextArea label="Impact / result" value={item.impact} onChange={(v) => update({ ...item, impact: v })} />
              <TextField
                label="Screenshot path (e.g. /projects/eaap.png — leave blank for placeholder)"
                value={item.image ?? ""}
                onChange={(v) => update({ ...item, image: v })}
              />
              <div className="grid gap-3 sm:grid-cols-3">
                <TextField label="Links" value={item.links} onChange={(v) => update({ ...item, links: v })} />
                <SelectField
                  label="Status"
                  value={item.status}
                  options={["live", "code-complete", "archived"]}
                  onChange={(v) => update({ ...item, status: v as Project["status"] })}
                />
                <SelectField
                  label="Origin"
                  value={item.origin}
                  options={["freelance", "personal"]}
                  onChange={(v) => update({ ...item, origin: v as Project["origin"] })}
                />
              </div>
            </div>
          )}
        />
      )}

      {tab === "Experience" && (
        <ListEditor
          items={content.experience}
          onChange={(items) => updateContent((d) => ({ ...d, experience: items }))}
          newItem={{ id: `exp-${Date.now()}`, org: "", role: "", period: "", bullets: [""], images: [] }}
          renderItem={(item, update) => (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-3">
                <TextField label="Organization" value={item.org} onChange={(v) => update({ ...item, org: v })} />
                <TextField label="Role" value={item.role} onChange={(v) => update({ ...item, role: v })} />
                <TextField label="Period (optional)" value={item.period} onChange={(v) => update({ ...item, period: v })} />
              </div>
              <div>
                <p className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-muted">Bullets</p>
                <div className="space-y-2">
                  {item.bullets.map((b, bi) => (
                    <div key={bi} className="flex gap-2">
                      <textarea
                        value={b}
                        onChange={(e) => {
                          const bullets = [...item.bullets];
                          bullets[bi] = e.target.value;
                          update({ ...item, bullets });
                        }}
                        className="min-h-[44px] flex-1 rounded-md border border-line bg-ink-3 p-2 text-sm text-paper"
                      />
                      <button
                        onClick={() =>
                          update({ ...item, bullets: item.bullets.filter((_, x) => x !== bi) })
                        }
                        className="px-2 font-mono text-xs text-danger"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => update({ ...item, bullets: [...item.bullets, ""] })}
                    className="font-mono text-xs text-copper-soft"
                  >
                    + Add bullet
                  </button>
                </div>
              </div>
              <div>
                <p className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-muted">
                  Screenshots (paths, e.g. /experience/eaap-1.png)
                </p>
                <div className="space-y-2">
                  {(item.images ?? []).map((img, ii) => (
                    <div key={ii} className="flex gap-2">
                      <input
                        value={img}
                        onChange={(e) => {
                          const images = [...(item.images ?? [])];
                          images[ii] = e.target.value;
                          update({ ...item, images });
                        }}
                        className="flex-1 rounded-md border border-line bg-ink-3 p-2 text-sm text-paper"
                      />
                      <button
                        onClick={() =>
                          update({ ...item, images: (item.images ?? []).filter((_, x) => x !== ii) })
                        }
                        className="px-2 font-mono text-xs text-danger"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => update({ ...item, images: [...(item.images ?? []), ""] })}
                    className="font-mono text-xs text-copper-soft"
                  >
                    + Add screenshot
                  </button>
                </div>
              </div>
            </div>
          )}
        />
      )}

      {tab === "Achievements" && (
        <div className="space-y-2">
          {content.achievements.map((a, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={a}
                onChange={(e) => {
                  const items = [...content.achievements];
                  items[i] = e.target.value;
                  updateContent((d) => ({ ...d, achievements: items }));
                }}
                className="flex-1 rounded-md border border-line bg-ink-3 p-2 text-sm text-paper"
              />
              <button
                onClick={() =>
                  updateContent((d) => ({
                    ...d,
                    achievements: d.achievements.filter((_, x) => x !== i),
                  }))
                }
                className="px-2 font-mono text-xs text-danger"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={() => updateContent((d) => ({ ...d, achievements: [...d.achievements, ""] }))}
            className="font-mono text-xs text-copper-soft"
          >
            + Add achievement
          </button>
        </div>
      )}

      {tab === "Contact" && (
        <div className="space-y-5">
          <TextField
            label="Email"
            value={content.contact.email}
            onChange={(v) => updateContent((d) => ({ ...d, contact: { ...d.contact, email: v } }))}
          />
          <TextField
            label="LinkedIn"
            value={content.contact.linkedin}
            onChange={(v) => updateContent((d) => ({ ...d, contact: { ...d.contact, linkedin: v } }))}
          />
          <TextField
            label="GitHub"
            value={content.contact.github}
            onChange={(v) => updateContent((d) => ({ ...d, contact: { ...d.contact, github: v } }))}
          />
          <TextField
            label="Resume link"
            value={content.resumeLink}
            onChange={(v) => updateContent((d) => ({ ...d, resumeLink: v }))}
          />
        </div>
      )}

      {tab === "Personal" && (
        <div className="space-y-5">
          <TextArea
            label="Origin story"
            value={content.personal.originStory}
            onChange={(v) => updateContent((d) => ({ ...d, personal: { ...d.personal, originStory: v } }))}
          />
          <TextArea
            label="Background"
            value={content.personal.background}
            onChange={(v) => updateContent((d) => ({ ...d, personal: { ...d.personal, background: v } }))}
          />
          <TextArea
            label="Why AI research"
            value={content.personal.whyAI}
            onChange={(v) => updateContent((d) => ({ ...d, personal: { ...d.personal, whyAI: v } }))}
          />
          <TextArea
            label="Non-tech interests"
            value={content.personal.nonTechInterests}
            onChange={(v) =>
              updateContent((d) => ({ ...d, personal: { ...d.personal, nonTechInterests: v } }))
            }
          />
          <label className="flex items-center gap-2 font-mono text-xs text-muted">
            <input
              type="checkbox"
              checked={content.personal.includePhoto}
              onChange={(e) =>
                updateContent((d) => ({
                  ...d,
                  personal: { ...d.personal, includePhoto: e.target.checked },
                }))
              }
            />
            Include personal photo on /about
          </label>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-copper bg-ink-2 px-4 py-2 font-mono text-xs text-copper-bright">
          {toast}
        </div>
      )}
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-line bg-ink-3 p-2.5 text-sm text-paper focus:border-copper focus:outline-none"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[90px] w-full rounded-md border border-line bg-ink-3 p-2.5 text-sm text-paper focus:border-copper focus:outline-none"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-line bg-ink-3 p-2.5 text-sm text-paper focus:border-copper focus:outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function ListEditor<T extends { id?: string }>({
  items,
  onChange,
  newItem,
  renderItem,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  newItem: T;
  renderItem: (item: T, update: (next: T) => void) => React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      {items.map((item, i) => (
        <div key={item.id ?? i} className="rounded-lg border border-line bg-ink-2 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-copper-soft">
              Item {i + 1}
            </span>
            <button
              onClick={() => onChange(items.filter((_, x) => x !== i))}
              className="font-mono text-xs text-danger"
            >
              Remove
            </button>
          </div>
          {renderItem(item, (next) => {
            const copy = [...items];
            copy[i] = next;
            onChange(copy);
          })}
        </div>
      ))}
      <button
        onClick={() => onChange([...items, { ...newItem }])}
        className="rounded-md border border-line px-4 py-2 font-mono text-xs text-copper-soft hover:border-copper"
      >
        + Add item
      </button>
    </div>
  );
}