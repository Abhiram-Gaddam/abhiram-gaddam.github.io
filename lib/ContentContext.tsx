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
  saveNow: () => Promise<void>;
  resetToDefault: () => void;
  lastSavedAt: Date | null;
  hydrated: boolean;
  saveError: string | null;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  // Start with the code defaults immediately — no blank page while the
  // network request to Supabase resolves.
  const [content, setContentState] = useState<Content>(defaultContent);
  const [hydrated, setHydrated] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const dirtyRef = useRef(false);

  // Load the real content from the database on mount.
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/content", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setContentState(data);
        }
      } catch (e) {
        console.error("Failed to load content from the server — using defaults.", e);
      } finally {
        setHydrated(true);
      }
    })();
  }, []);

  const persist = useCallback(async (data: Content) => {
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setSaveError(body.error ?? "Save failed");
        return;
      }
      setSaveError(null);
      setLastSavedAt(new Date());
      dirtyRef.current = false;
    } catch (e) {
      console.error("Save failed", e);
      setSaveError("Network error while saving");
    }
  }, []);

  const setContent = useCallback((next: Content) => {
    setContentState(next);
    dirtyRef.current = true;
  }, []);

  const updateContent = useCallback((updater: (draft: Content) => Content) => {
    setContentState((prev) => {
      const next = updater(prev);
      dirtyRef.current = true;
      return next;
    });
  }, []);

  const saveNow = useCallback(async () => {
    await persist(content);
  }, [content, persist]);

  const resetToDefault = useCallback(() => {
    setContentState(defaultContent);
    dirtyRef.current = true;
  }, []);

  // Autosave every 30s if there are unsaved changes.
  useEffect(() => {
    const interval = setInterval(() => {
      if (dirtyRef.current) persist(content);
    }, 30000);
    return () => clearInterval(interval);
  }, [content, persist]);

  // Best-effort save on tab close.
  useEffect(() => {
    const handler = () => {
      if (dirtyRef.current) {
        fetch("/api/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(content),
          keepalive: true,
        }).catch(() => {});
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [content]);

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