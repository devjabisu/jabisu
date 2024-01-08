import { NextResponse } from "next/server";
import { getAllSnippetFolders, createSnippetFolder } from "@/data/snippets";

export async function GET(req: Request) {
  const result = await getAllSnippetFolders();
  return NextResponse.json({ code: 0, data: result });
}

export async function POST(req: Request) {
  const body = (await req.json()) as { name: string };
  const name = body.name;
  if (name == null || name == "") {
    return NextResponse.json({ code: 1, data: "name is empty" });
  }

  if (name.length > 20) {
    return NextResponse.json({ code: 1, data: "name is too long" });
  }

  const result = await createSnippetFolder(name);

  return NextResponse.json({ code: 0, data: result });
}
