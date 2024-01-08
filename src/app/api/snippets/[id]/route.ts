import {
  changeSnippetTitle,
  changeSnippetLanguage,
  changeSnippetFavorite,
  changeSnippetFolder,
  getSnippetById,
  updateSnippetContent,
  duplicateSnippet,
  deleteSnippet,
  removeSnippet,
  restoreSnippet,
} from "@/data/snippets";
import ErrorCode from "@/constants/errorCode";
import { NextResponse } from "next/server";
import { Logger } from "tslog";

const log = new Logger({ name: "snippetIdRoute" });

type ModifySnippetType = {
  id: number;
  type: string;
  lang: string | null;
  title: string | null;
  favorite: boolean | null;
  content: string | null;
  folderId: string | null;
};

const TYPE_TITLE_MODIFY = "title";
const TYPE_LANG_MODIFY = "lang";
const TYPE_CONTENT_MODIFY = "content";
const TYPE_FAVORITE_MODIFY = "favorite";
const TYPE_DUPLICATE_MODIFY = "duplicate";
const TYPE_DELETE_MODIFY = "delete";
const TYPE_RESTORE_MODIFY = "restore";
const TYPE_MOVE_MODIFY = "move";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  log.info("new request from front");
  const id: number = parseInt(params.id);
  if (id == null) {
    return NextResponse.json({ code: ErrorCode.GENERAL_ERROR });
  }
  const body = (await req.json()) as ModifySnippetType;
  if (body.type == null) {
    return NextResponse.json({ code: ErrorCode.GENERAL_ERROR });
  }
  let result: boolean = false;
  log.info("front request body: ", body);
  switch (body.type) {
    case TYPE_TITLE_MODIFY:
      await changeSnippetTitle(id, body.title);
      break;
    case TYPE_CONTENT_MODIFY:
      await updateSnippetContent(id, body.content);
      break;
    case TYPE_LANG_MODIFY:
      await changeSnippetLanguage(id, body.lang);
      break;
    case TYPE_FAVORITE_MODIFY:
      await changeSnippetFavorite(id, body.favorite);
      break;
    case TYPE_DUPLICATE_MODIFY:
      await duplicateSnippet(id);
      break;
    case TYPE_DELETE_MODIFY:
      await deleteSnippet(id);
      break;
    case TYPE_RESTORE_MODIFY:
      await restoreSnippet(id);
      break;
    case TYPE_MOVE_MODIFY:
      await changeSnippetFolder(id, body.folderId);
      break;
    default:
      // return invalid error
      break;
  }
  return NextResponse.json({ code: ErrorCode.OK });
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const id: number = parseInt(params.id);
  if (id == null) {
    return NextResponse.json({ code: ErrorCode.GENERAL_ERROR });
  }
  const snippet = await getSnippetById(id);
  return NextResponse.json({ code: ErrorCode.OK, data: snippet });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const id: number = parseInt(params.id);
  if (id == null) {
    return NextResponse.json({ code: ErrorCode.GENERAL_ERROR });
  }
  await removeSnippet(id);
  return NextResponse.json({ code: ErrorCode.OK });
}
