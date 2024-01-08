// this file is for querying and updating pinned apps in the database

import { AppType } from "@/constants/appInfo";
import { getAllAppsDic, getAllAppsList, parseMessage } from "./allApps";
import { prisma } from "./globalPrisma";

type PinnedAppType = {
  id: string;
};

const getPinnedApps = async () => {
  const pinnedApps = (await prisma.pinnedApp.findMany()) as PinnedAppType[];
  const appsDic = getAllAppsDic();
  let pinnedAppsList: AppType[] = [];
  pinnedApps.map((app) => {
    const appId = app.id;
    if (appsDic[appId]) {
      pinnedAppsList.push(appsDic[appId]);
    }
  });
  return pinnedAppsList;
};

// given an app id, update the status in the database
// if pinned is true, add the id in the database, otherwise remove it
const updatePinnedApps = async (
  id: string,
  pinned: boolean,
): Promise<boolean> => {
  // if not pinned, just create the record to pin the app, otherwise remove it to unpin the app
  if (!pinned) {
    try {
      await prisma.pinnedApp.create({
        data: {
          id: id,
        },
      });
    } catch (e) {
      console.log("error: ", e);
      return false;
    }
  } else {
    try {
      await prisma.pinnedApp.delete({
        where: {
          id: id,
        },
      });
    } catch (e) {
      console.log("error: ", e);
      return false;
    }
  }
  return true;
};

const getAppPinnedStatus = async (id: string) => {
  let result;
  try {
    result = await prisma.pinnedApp.findFirst({
      where: {
        id: id,
      },
    });
  } catch (e) {
    console.error("error", e);
    return false;
  }
  console.log("db result is: ", result);
  return !(result === null);
};

export { getPinnedApps, updatePinnedApps, getAppPinnedStatus };
