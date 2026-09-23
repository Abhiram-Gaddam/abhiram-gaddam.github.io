import { NextRequest, NextResponse } from "next/server";
import { verifyDriveToken, DRIVE_COOKIE_NAME } from "@/lib/drive-auth";
import { listFolderFiles } from "@/lib/google-drive";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(DRIVE_COOKIE_NAME)?.value;
  if (!verifyDriveToken(token)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const files = await listFolderFiles();
    return NextResponse.json({ files });
  } catch (err) {
    console.error("Drive fetch failed:", err);
    return NextResponse.json({ error: "drive_error" }, { status: 500 });
  }
}