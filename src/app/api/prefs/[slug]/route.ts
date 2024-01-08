import { NextResponse } from "next/server";
import { getSnippetPref, patchSnippetPrefTheme } from "@/data/snippetPref";
import { Logger } from "tslog";

const log = new Logger({ name: "snippet-pref-route" });

const SLUG_TYPE_SNIPPET = "snippet";

enum SnippetPrefEnum {
  THEME = "theme",
  FONT_FAMILY = "fontFamily",
  FONT_SIZE = "fontSize",
  TAB_SIZE = "tabSize",
  LINE_NUMBERS = "lineNumbers",
  WORD_WRAP = "wordWrap",
  HIGHLIGHT_LINE = "highlightLine",
  AUTO_COMPLETION = "autoCompletion",
}

type SnippetPrefModifyType = {
  type: string;
  theme: string;
  fontFamily: string;
  fontSize: number;
  tabSize: number;
  lineNumbers: boolean;
  wordWrap: boolean;
  highlightLine: boolean;
  autoCompletion: boolean;
};

// get all snippet preference
export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  const slug = params.slug;
  switch (slug) {
    case SLUG_TYPE_SNIPPET:
      const snippetPref = await getSnippetPref();
      log.debug("snippet pref: ", snippetPref);
      return NextResponse.json({ code: 0, data: snippetPref });
    default:
      return NextResponse.json({ code: 1, msg: "invalid slug" });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { slug: string } },
) {
  const slug = params.slug;
  switch (slug) {
    case SLUG_TYPE_SNIPPET:
      const body = (await req.json()) as SnippetPrefModifyType;
      switch (body.type) {
        case SnippetPrefEnum.THEME:
          log.debug("body: ", body);
          patchSnippetPrefTheme(body.theme);
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
}
