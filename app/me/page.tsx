// app/documents/page.tsx (or wherever you want it — this route itself
// isn't secret, but nothing renders until the password is entered)
import DriveDocuments from "@/components/DriveDocuments";

export default function DocumentsPage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">My documents</h1>
      <DriveDocuments />
    </main>
  );
}