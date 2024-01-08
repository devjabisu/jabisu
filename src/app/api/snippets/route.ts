import { NextResponse } from "next/server";
import {
  emptySnippetTrash,
  createSnippet,
  NewSnippetType,
  getSnippets,
} from "@/data/snippets";
import ErrorCode from "@/constants/errorCode";
import { Logger } from "tslog";

const log = new Logger({ name: "snippets" });

type CreateNewSnippetType = {
  folderId: string;
};

const TYPE_FETCH_ALL = "all";
const TYPE_FETCH_FAVORITES = "fav";
const TYPE_FETCH_TRASHED = "trash";
const TYPE_FETCH_FOLDERS = "folders";
const DEFAULT_FOLDER_ID = "default";

// create a new snippet
export async function POST(req: Request) {
  const body = (await req.json()) as CreateNewSnippetType;
  log.info("the body", body);
  let folderId = body.folderId;
  if (folderId === undefined) {
    // use default folder
    folderId = DEFAULT_FOLDER_ID;
  }
  log.info("front folder ID: ", folderId);
  const result = await createSnippet({
    title: "Untitled snippet",
    folderId: folderId,
    content: "",
  } as NewSnippetType);
  return NextResponse.json({ code: ErrorCode.OK, data: result });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const filter = searchParams.get("filter");

  let dbSnippets = null;
  let page = 0;
  if (searchParams.get("page") != null) {
    page = parseInt(searchParams.get("page") as string);
  }
  switch (type) {
    case TYPE_FETCH_ALL:
      dbSnippets = await getSnippets(filter, page, [{ deleted: false }]);
      break;
    case TYPE_FETCH_FAVORITES:
      dbSnippets = await getSnippets(filter, page, [
        { deleted: false },
        { favorite: true },
      ]);
      break;
    case TYPE_FETCH_TRASHED:
      dbSnippets = await getSnippets(filter, page, [{ deleted: true }]);
      break;
    case TYPE_FETCH_FOLDERS:
      const selectedFolder = searchParams.get("folderId");
      if (selectedFolder == null || selectedFolder == "") {
        return NextResponse.json({ code: ErrorCode.GENERAL_ERROR });
      }
      dbSnippets = await getSnippets(filter, page, [
        { deleted: false },
        { folderId: selectedFolder },
      ]);
      break;
    default:
      return NextResponse.json({ code: ErrorCode.GENERAL_ERROR });
  }
  if (dbSnippets === null) {
    return NextResponse.json({ code: ErrorCode.DATABASE_ERROR });
  }
  return NextResponse.json({ code: ErrorCode.OK, data: dbSnippets });
}

export async function DELETE(req: Request) {
  const result = await emptySnippetTrash();
  if (!result) {
    return NextResponse.json({ code: ErrorCode.DATABASE_ERROR });
  }
  return NextResponse.json({ code: ErrorCode.OK });
}
