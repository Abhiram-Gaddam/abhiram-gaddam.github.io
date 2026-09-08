import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken } from "@/lib/adminSession";
import AdminEditor from "@/components/admin/AdminEditor";

export const metadata = {
  title: "Admin — Portfolio Content",
  robots: "noindex, nofollow",
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;

  if (!verifySessionToken(session)) {
    redirect("/admin/login");
  }

  return <AdminEditor />;
}