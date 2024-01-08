import appInfo from "@/constants/appInfo";
import { AppType } from "@/constants/appInfo";

// load all apps info from apps.toml when application started
// try adding these info in the memory
const getAllAppsDic = () => {
  const appContent = appInfo.apps;
  let appsDic: { [key: string]: AppType } = {};
  appContent.forEach((item: AppType) => {
    appsDic[(item as AppType).id] = item;
  });
  return appsDic;
};

const getAllAppsList = () => {
  const allAppsDic = getAllAppsDic();
  const allAppsList: AppType[] = [];
  for (const appId in allAppsDic) {
    allAppsList.push(allAppsDic[appId]);
  }

  return allAppsList;
};

export { getAllAppsDic, getAllAppsList };
