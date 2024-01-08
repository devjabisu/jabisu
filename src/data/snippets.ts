import { randomUUID } from "crypto";
import { prisma } from "./globalPrisma";
import { SNIPPET_PAGE_SIZE } from "@/constants/snippetConst";
import { Prisma } from "@prisma/client";

type NewSnippetType = {
  title: string;
  content: string;
  folderId: string;
};

type DbSnippetType = {
  id: number;
  title: string;
  updatedAt: Date;
  deleted: boolean;
  favorite: boolean;
  folder: {
    id: string;
    name: string;
  };
};

type QuerySnippetReturnType = {
  hasPrev: boolean;
  hasNext: boolean;
  page: number;
  snippets: DbSnippetType[];
  totalCount: number;
};

const getSnippets = async (
  keyword: string | null,
  page: number,
  condition: object[],
): Promise<QuerySnippetReturnType> => {
  let whereCondition = {};
  if (keyword != null) {
    condition.push({
      OR: [
        { title: { contains: keyword } },
        { content: { contains: keyword } },
      ],
    });
  }
  whereCondition = {
    AND: condition,
  };
  const skip = page * SNIPPET_PAGE_SIZE;
  const queryCondition = {
    skip: skip,
    take: SNIPPET_PAGE_SIZE,
    where: whereCondition,
    orderBy: [{ updatedAt: Prisma.SortOrder.desc }],
    select: {
      id: true,
      title: true,
      updatedAt: true,
      deleted: true,
      favorite: true,
      folder: {
        select: { id: true, name: true },
      },
    },
  };

  const totalCount = await prisma.snippet.count({
    where: whereCondition,
  });

  const snippets = (await prisma.snippet.findMany(
    queryCondition,
  )) as DbSnippetType[];
  if (snippets.length === 0 && totalCount > 0) {
    return getSnippets(
      keyword,
      Math.ceil(totalCount / SNIPPET_PAGE_SIZE) - 1,
      condition,
    );
  }
  let hasPrev = true;
  let hasNext = true;
  if (page < 1) {
    hasPrev = false;
  }
  if (snippets.length === 0) {
    hasPrev = false;
    hasNext = false;
  } else {
    if ((page + 1) * SNIPPET_PAGE_SIZE >= totalCount) {
      hasNext = false;
    }
  }
  return {
    hasPrev: hasPrev,
    hasNext: hasNext,
    page: page,
    snippets: snippets,
    totalCount: totalCount,
  } as QuerySnippetReturnType;
};

const getAllSnippets = async () => {
  const snippets = await prisma.snippet.findMany({
    where: { deleted: false },
    orderBy: { updatedAt: "desc" },
    take: SNIPPET_PAGE_SIZE,
    select: {
      id: true,
      title: true,
      updatedAt: true,
      deleted: true,
      favorite: true,
      folder: {
        select: { id: true, name: true },
      },
    },
  });
  return snippets;
};

const getAllSnippetsWithFilter = async (keyword: string) => {
  const snippets = await prisma.snippet.findMany({
    where: {
      AND: [
        { deleted: false },
        {
          OR: [
            { title: { contains: keyword } },
            { content: { contains: keyword } },
          ],
        },
      ],
    },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      updatedAt: true,
      deleted: true,
      favorite: true,
      folder: {
        select: { id: true, name: true },
      },
    },
  });
  return snippets;
};

const getSnippetById = async (id: number) => {
  return await prisma.snippet.findFirst({
    where: { id: id },
    select: {
      id: true,
      title: true,
      content: true,
      updatedAt: true,
      language: true,
      favorite: true,
      folderId: true,
    },
  });
};

const getSnippetByFolder = async (folderId: string) => {
  return await prisma.snippet.findMany({
    where: { AND: [{ deleted: false }, { folderId: folderId }] },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      updatedAt: true,
      deleted: true,
      favorite: true,
      folder: {
        select: { id: true, name: true },
      },
    },
  });
};

const getFavSnippets = async () => {
  // get favorite snippets
  return await prisma.snippet.findMany({
    where: { AND: [{ deleted: false }, { favorite: true }] },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      updatedAt: true,
      deleted: true,
      favorite: true,
      folder: {
        select: { id: true, name: true },
      },
    },
  });
};

const getTrashedSnippets = async () => {
  // get trashed snippets
  return await prisma.snippet.findMany({
    where: { deleted: true },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      updatedAt: true,
      deleted: true,
      favorite: true,
      folder: {
        select: { id: true, name: true },
      },
    },
  });
};

const emptySnippetTrash = async () => {
  try {
    await prisma.snippet.deleteMany({
      where: { deleted: true },
    });
  } catch (err) {
    return false;
  }
  return true;
};

const deleteSnippet = async (id: number) => {
  await prisma.snippet.update({
    where: { id: id },
    data: { deleted: true },
  });
};

const restoreSnippet = async (id: number) => {
  await prisma.snippet.update({
    where: { id: id },
    data: { deleted: false },
  });
};

const removeSnippet = async (id: number) => {
  console.log("remove snippet", id);
  await prisma.snippet.delete({
    where: { id: id },
  });
};

const emptyDeletedSnippet = async () => {
  await prisma.snippet.deleteMany({
    where: { deleted: true },
  });
};

const createSnippet = async (snippet: NewSnippetType) => {
  try {
    console.log("create snippet: ", snippet);
    await prisma.snippet.create({
      data: {
        title: snippet.title,
        content: snippet.content,
        folderId: snippet.folderId,
        deleted: false,
        favorite: false,
        language: "text",
      },
    });
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
};

const updateSnippetContent = async (id: number, content: string | null) => {
  if (content == null) {
    return;
  }
  await prisma.snippet.update({
    where: { id: id },
    data: { content: content },
  });
};

const changeSnippetTitle = async (id: number, newTitle: string | null) => {
  if (newTitle == null) {
    return;
  }
  await prisma.snippet.update({
    where: { id: id },
    data: { title: newTitle },
  });
};

const changeSnippetLanguage = async (id: number, lang: string | null) => {
  if (lang == null) {
    return;
  }
  await prisma.snippet.update({
    where: { id: id },
    data: { language: lang },
  });
};

const changeSnippetFolder = async (id: number, newFolderId: string | null) => {
  if (newFolderId == null) {
    return;
  }
  const result = await prisma.snippet.update({
    where: { id: id },
    data: { folderId: newFolderId },
  });
  console.log("change snippet folder result: ", result);
};

const changeSnippetFavorite = async (id: number, favorite: boolean | null) => {
  if (favorite == null) {
    return;
  }
  await prisma.snippet.update({
    where: { id: id },
    data: { favorite: favorite },
  });
};

const duplicateSnippet = async (id: number) => {
  const snippet = await prisma.snippet.findFirst({
    where: { id: id },
    select: {
      title: true,
      content: true,
      folderId: true,
      deleted: true,
      favorite: true,
      language: true,
    },
  });
  console.log("db snippet: " + JSON.stringify(snippet));
  if (snippet == null) {
    return false;
  }
  snippet.title = snippet.title + " Copy";
  await prisma.snippet.create({
    data: snippet,
  });
};

const getAllSnippetFolders = async () => {
  return await prisma.snippetFolder.findMany({
    select: {
      id: true,
      name: true,
    },
  });
};

const createSnippetFolder = async (name: string) => {
  console.log("create snippet folder");
  try {
    await prisma.snippetFolder.create({
      data: {
        id: randomUUID(),
        name: name,
      },
    });
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
};

export type { NewSnippetType, DbSnippetType, QuerySnippetReturnType };

export {
  changeSnippetTitle,
  changeSnippetLanguage,
  changeSnippetFavorite,
  changeSnippetFolder,
  duplicateSnippet,
  deleteSnippet,
  removeSnippet,
  restoreSnippet,
  getSnippets,
  getAllSnippets,
  getAllSnippetsWithFilter,
  getSnippetById,
  getFavSnippets,
  getSnippetByFolder,
  getTrashedSnippets,
  createSnippet,
  updateSnippetContent,
  getAllSnippetFolders,
  createSnippetFolder,
  emptySnippetTrash,
};
