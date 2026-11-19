"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Content, defaultContent } from "./content";

interface ContentContextValue {
  content: Content;
  setContent: (next: Content) => void;
  updateContent: (updater: (draft: Content) => Content) => void;
  saveNow: () => Promise<string | null>;
  resetToDefault: () => void;
  lastSavedAt: Date | null;
  hydrated: boolean;
  saveError: string | null;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({
  children,
  initialContent,
}: {
  children: React.ReactNode;
  /** Content fetched server-side in the root layout. When provided, the
   * client skips its own fetch entirely — this is what makes the page
   * SSR-correct: real content in the initial HTML, no flash of defaults,
   * search engines see the real page on first load. */
  initialContent?: Content;
}) {
  const [content, setContentState] = useState<Content>(initialContent ?? defaultContent);
  const [hydrated, setHydrated] = useState(!!initialContent);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const draft = useRef({ content: initialContent ?? defaultContent, revision: 0 });
  const savedRevision = useRef<number | null>(null);
  const saveQueue = useRef<Promise<unknown>>(Promise.resolve());

  // Only fetch client-side as a fallback — if the server already handed us
  // real content via props, there's nothing left to do.
  useEffect(() => {
    if (initialContent) return;
    (async () => {
      try {
        const res = await fetch("/api/content", { cache: "no-store" });
        if (res.ok && draft.current.revision === 0) {
          const data = await res.json();
          if (draft.current.revision === 0) {
            draft.current = { content: data, revision: 0 };
            setContentState(data);
          }
        }
      } catch (e) {
        console.error("Failed to load content from the server — using defaults.", e);
      } finally {
        setHydrated(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveNow = useCallback(() => {
    const pending = saveQueue.current.then(async () => {
      const snapshot = draft.current;
      if (snapshot.revision === savedRevision.current) return null;

      let error: string | null = null;
      try {
        const res = await fetch("/api/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(snapshot.content),
          signal: AbortSignal.timeout(15000),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          error = body.error ?? "Save failed";
        } else {
          savedRevision.current = snapshot.revision;
          setLastSavedAt(new Date());
        }
      } catch {
        error = "Network error while saving";
      }
      setSaveError(error);
      return error;
    });
    saveQueue.current = pending;
    return pending;
  }, []);

  const setContent = useCallback((next: Content) => {
    draft.current = { content: next, revision: draft.current.revision + 1 };
    setContentState(next);
  }, []);

  const updateContent = useCallback((updater: (draft: Content) => Content) => {
    setContent(updater(draft.current.content));
  }, [setContent]);

  const resetToDefault = useCallback(() => {
    setContent(defaultContent);
  }, [setContent]);

  // Autosave every 30s if there are unsaved changes.
  useEffect(() => {
    const interval = setInterval(() => {
      if (draft.current.revision !== (savedRevision.current ?? 0)) void saveNow();
    }, 30000);
    return () => clearInterval(interval);
  }, [saveNow]);

  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      if (draft.current.revision !== (savedRevision.current ?? 0)) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  return (
    <ContentContext.Provider
      value={{
        content,
        setContent,
        updateContent,
        saveNow,
        resetToDefault,
        lastSavedAt,
        hydrated,
        saveError,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return ctx;
}
