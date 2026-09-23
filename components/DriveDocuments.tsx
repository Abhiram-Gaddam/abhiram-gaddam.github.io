"use client";

import { useEffect, useMemo, useState } from "react";

interface DriveDoc {
  id: string;
  name: string;
  mimeType: string;
  webViewLink: string;
  iconLink: string;
  thumbnailLink?: string;
  modifiedTime: string;
}

export default function DriveDocuments() {
  const [unlocked, setUnlocked] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [docs, setDocs] = useState<DriveDoc[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [previewId, setPreviewId] = useState<string | null>(null);

  // On mount, see if we already have a valid session (cookie-based, so just
  // try the files endpoint — it 401s if the cookie is missing/expired).
  useEffect(() => {
    fetchDocs(true);
  }, []);

  async function fetchDocs(silent = false) {
    if (!silent) setLoading(true);
    setCheckingSession(true);
    try {
      const res = await fetch("/api/drive-files");
      if (res.ok) {
        const data = await res.json();
        setDocs(data.files);
        setUnlocked(true);
      } else {
        setUnlocked(false);
      }
    } finally {
      setLoading(false);
      setCheckingSession(false);
    }
  }

  async function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    const res = await fetch("/api/drive-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setPassword("");
      await fetchDocs();
    } else {
      setAuthError("Wrong password.");
    }
  }

  const filtered = useMemo(() => {
    if (!query.trim()) return docs;
    const q = query.toLowerCase();
    return docs.filter((d) => d.name.toLowerCase().includes(q));
  }, [docs, query]);

  if (checkingSession) {
    return <div className="text-sm text-neutral-500">Loading…</div>;
  }

  if (!unlocked) {
    return (
      <form
        onSubmit={handleUnlock}
        className="max-w-xs mx-auto flex flex-col gap-3 py-12"
      >
        <label className="text-sm text-neutral-600">
          This section is private. Enter password:
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm"
          autoFocus
        />
        {authError && <p className="text-sm text-red-600">{authError}</p>}
        <button
          type="submit"
          className="bg-neutral-900 text-white rounded-md px-3 py-2 text-sm"
        >
          Unlock
        </button>
      </form>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Search documents…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border rounded-md px-3 py-2 text-sm w-full max-w-sm"
      />

      {loading ? (
        <p className="text-sm text-neutral-500">Loading documents…</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-neutral-500">No documents found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {filtered.map((doc) => {
            const isImage = doc.mimeType.startsWith("image/");
            return (
              <div
                key={doc.id}
                className="border rounded-lg overflow-hidden bg-white"
              >
                <button
                  onClick={() => setPreviewId(doc.id)}
                  className="block w-full aspect-square bg-neutral-100 relative"
                  title="Preview"
                >
                  {isImage ? (
                    <img
                      src={`/api/drive-thumb/${doc.id}`}
                      alt={doc.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <img src={doc.iconLink} alt="" className="w-10 h-10" />
                    </div>
                  )}
                  <img
                    src={doc.iconLink}
                    alt=""
                    className="absolute top-1.5 left-1.5 w-4 h-4 bg-white rounded-sm shadow"
                  />
                </button>
                <div className="p-2 flex flex-col gap-1">
                  <span
                    className="text-xs font-medium truncate"
                    title={doc.name}
                  >
                    {doc.name}
                  </span>
                  <a
                    href={doc.webViewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Open in Drive
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {previewId && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewId(null)}
        >
          <div
            className="bg-white rounded-lg w-full max-w-3xl h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end p-2 border-b">
              <button
                onClick={() => setPreviewId(null)}
                className="text-sm px-2 py-1"
              >
                Close ✕
              </button>
            </div>
            <iframe
              src={`https://drive.google.com/file/d/${previewId}/preview`}
              className="w-full h-full"
              allow="autoplay"
            />
          </div>
        </div>
      )}
    </div>
  );
}