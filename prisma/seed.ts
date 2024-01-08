import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const initSnippetPref = async () => {
  const snippetPref = await prisma.snippetPref.findUnique({
    where: { id: "defaultId" },
  });
  if (!snippetPref) {
    await prisma.snippetPref.create({
      data: {
        id: "defaultId",
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

const initSnippetFolder = async () => {
  const defaultSnippetFolder = await prisma.snippetFolder.findUnique({
    where: { id: "defaultId" },
  });
  if (!defaultSnippetFolder) {
    await prisma.snippetFolder.create({
      data: {
        id: "defaultId",
        name: "Default",
      },
    });
  }
};

const initLocale = async () => {
  const locale = Intl.DateTimeFormat().resolvedOptions().locale;
  const localeData = await prisma.localePref.findUnique({
    where: { id: "locale" },
  });
  if (!localeData) {
    await prisma.localePref.create({
      data: {
        id: "locale",
        locale: locale,
      },
    });
  }
};

async function main() {
  await initSnippetPref();
  console.log("snippet pref init done");
  await initSnippetFolder();
  console.log("snippet folder init done");
  await initLocale();
  console.log("locale init done");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
