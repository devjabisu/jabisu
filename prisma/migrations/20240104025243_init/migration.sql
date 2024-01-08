-- CreateTable
CREATE TABLE "SnippetPref" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "theme" TEXT NOT NULL,
    "fontSize" INTEGER NOT NULL,
    "fontFamily" TEXT NOT NULL,
    "tabSize" INTEGER NOT NULL,
    "lineNumbers" BOOLEAN NOT NULL,
    "wordWrap" BOOLEAN NOT NULL,
    "highlightLine" BOOLEAN NOT NULL,
    "autoCompletion" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "PinnedApp" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "Snippet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "folderId" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted" BOOLEAN NOT NULL,
    "favorite" BOOLEAN NOT NULL,
    "language" TEXT NOT NULL,
    CONSTRAINT "Snippet_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "SnippetFolder" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SnippetFolder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "LocalePref" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "locale" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SnippetPref_id_key" ON "SnippetPref"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PinnedApp_id_key" ON "PinnedApp"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SnippetFolder_id_key" ON "SnippetFolder"("id");

-- CreateIndex
CREATE UNIQUE INDEX "LocalePref_id_key" ON "LocalePref"("id");
