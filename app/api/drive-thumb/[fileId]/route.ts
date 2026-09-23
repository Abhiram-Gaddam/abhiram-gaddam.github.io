import { NextRequest, NextResponse } from "next/server";
import { verifyDriveToken, DRIVE_COOKIE_NAME } from "@/lib/drive-auth";
import { getFileBuffer } from "@/lib/google-drive";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  const { fileId } = await params;

  const token = req.cookies.get(DRIVE_COOKIE_NAME)?.value;
  if (!verifyDriveToken(token)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const file = await getFileBuffer(fileId);
    if (!file || !file.mimeType.startsWith("image/")) {
      return NextResponse.json({ error: "not_an_image" }, { status: 404 });
    }

    return new NextResponse(new Uint8Array(file.buffer), {
      headers: {
        "Content-Type": file.mimeType,
        // Private cache only in the visitor's own browser — this is
        // password-gated content, don't let a shared/CDN cache store it.
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch (err) {
    console.error("Thumbnail fetch failed:", err);
    return NextResponse.json({ error: "drive_error" }, { status: 500 });
  }
}