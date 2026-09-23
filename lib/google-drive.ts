import { google } from "googleapis";

export interface DriveDoc {
  id: string;
  name: string;
  mimeType: string;
  webViewLink: string;
  iconLink: string;
  thumbnailLink?: string;
  modifiedTime: string;
}

function getDriveClient() {
  // GOOGLE_SERVICE_ACCOUNT_KEY is the full service-account JSON, base64-encoded,
  // stored as a single env var (avoids newline issues with the private key).
  const keyJson = Buffer.from(
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY!,
    "base64"
  ).toString("utf-8");
  const credentials = JSON.parse(keyJson);

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });

  return google.drive({ version: "v3", auth });
}

export async function getFileBuffer(
  fileId: string
): Promise<{ buffer: Buffer; mimeType: string } | null> {
  const drive = getDriveClient();

  const meta = await drive.files.get({
    fileId,
    fields: "mimeType",
  });
  const mimeType = meta.data.mimeType ?? "application/octet-stream";

  const res = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "arraybuffer" }
  );

  return { buffer: Buffer.from(res.data as ArrayBuffer), mimeType };
}

export async function listFolderFiles(): Promise<DriveDoc[]> {
  const drive = getDriveClient();
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID!;

  const files: DriveDoc[] = [];
  let pageToken: string | undefined;

  do {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields:
        "nextPageToken, files(id, name, mimeType, webViewLink, iconLink, thumbnailLink, modifiedTime)",
      orderBy: "modifiedTime desc",
      pageSize: 200,
      pageToken,
    });

    for (const f of res.data.files ?? []) {
      files.push({
        id: f.id!,
        name: f.name!,
        mimeType: f.mimeType!,
        webViewLink: f.webViewLink!,
        iconLink: f.iconLink!,
        thumbnailLink: f.thumbnailLink ?? undefined,
        modifiedTime: f.modifiedTime!,
      });
    }
    pageToken = res.data.nextPageToken ?? undefined;
  } while (pageToken);

  return files;
}