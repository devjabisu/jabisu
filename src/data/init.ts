import { Logger } from "tslog";
import { prisma } from "@/data/globalPrisma";

const log = new Logger({ name: "dataInit" });

const initSnippetPref = async () => {
  const snippetPref = await prisma.snippetPref.findUnique({
    where: { id: "default" },
  });
  if (!snippetPref) {
    await prisma.snippetPref.create({
      data: {
        id: "default",
        theme: "github",
        fontSize: 14,
        fontFamily: "robotoMono",
        tabSize: 2,
        wordWrap: true,
        lineNumbers: true,
        highlightLine: true,
        autoCompletion: true,
      },
    });
  }
};

const dataInit = async () => {
  // do some database init jobs
  await initSnippetPref();
};

export { dataInit };
