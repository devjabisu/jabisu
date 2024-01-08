import Appcard from "@/components/app-card";
import { getPinnedApps } from "@/data/pinned";
import { AppType } from "@/constants/appInfo";

const PinnedApps = async () => {
  const pinnedApps = await getPinnedApps();
  return (
    <div id="pinned-tools" className="px-8 pb-10">
      <div id="apps-panel" className="mt-12">
        <div className="grid grid-cols-3 gap-6">
          {pinnedApps.map((card: AppType) => (
            <Appcard
              id={card.id}
              title={card.name}
              description={card.desc}
              short={card.short}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PinnedApps;
