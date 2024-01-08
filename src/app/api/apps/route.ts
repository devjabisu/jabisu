import { NextResponse } from "next/server";
import { getPinnedApps } from "@/data/pinned";

// fetch local pinned apps from db
export async function GET(req: Request) {
  // get the only record in app database
  const pinnedAppList = await getPinnedApps();
  return NextResponse.json(pinnedAppList);
}
