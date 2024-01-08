// fetch and update the snippet preference
import { prisma } from "./globalPrisma";
import { Logger } from "tslog";

const log = new Logger({ name: "snippet-pref-prisma" });

type SnippetPrefType = {
  id: string;
  theme: string;
  fontFamily: string;
  fontSize: number;
  tabSize: number;
  lineNumbers: boolean;
  wordWrap: boolean;
  highlightLine: boolean;
  autoCompletion: boolean;
};

const SNIPPET_PREF_ID = "defaultId";

const getSnippetPref = async () => {
  // fetch the database
  const snippetPref = await prisma.snippetPref.findFirst({
    where: {
      id: SNIPPET_PREF_ID,
    },
  });
  return snippetPref as SnippetPrefType;
};

const patchSnippetPrefTheme = async (theme: string) => {
  // update the database
  log.info("patching theme: ", theme);
  try {
    const updatedSnippetPref = await prisma.snippetPref.update({
      where: {
        id: SNIPPET_PREF_ID,
      },
      data: {
        theme: theme,
      },
    });
  } catch (err) {
    log.error(err);
    return false;
  }
  return true;
};

export type { SnippetPrefType };

export { getSnippetPref, patchSnippetPrefTheme };
