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

const STORAGE_KEY = "portfolio_content_override_v1";

interface ContentContextValue {
  content: Content;
  setContent: (next: Content) => void;
  updateContent: (updater: (draft: Content) => Content) => void;
  saveNow: () => void;
  resetToDefault: () => void;
  lastSavedAt: Date | null;
  hydrated: boolean;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContentState] = useState<Content>(defaultContent);
  const [hydrated, setHydrated] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const dirtyRef = useRef(false);

  // On mount, merge any saved override on top of defaults.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Content;
        setContentState(parsed);
      }
    } catch (e) {
      console.error("Failed to load saved content, using defaults.", e);
    } finally {
      setHydrated(true);
    }
  }, []);

  const persist = useCallback((data: Content) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setLastSavedAt(new Date());
      dirtyRef.current = false;
    } catch (e) {
      console.error("Save failed — storage may be full.", e);
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

  const saveNow = useCallback(() => {
    persist(content);
  }, [content, persist]);

  const resetToDefault = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setContentState(defaultContent);
    setLastSavedAt(null);
  }, []);

  // Autosave every 30s if there are unsaved changes.
  useEffect(() => {
    const interval = setInterval(() => {
      if (dirtyRef.current) {
        persist(content);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [content, persist]);

  // Save on tab close too.
  useEffect(() => {
    const handler = () => {
      if (dirtyRef.current) persist(content);
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [content, persist]);

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
