"use client";
import { AiFillPushpin } from "react-icons/ai";
import { ResponseType } from "@/app/api/apps/apps";
import ErrorCode from "@/constants/errorCode";
import { useEffect, useState } from "react";
import { useRefreshStore } from "@/components/side-nav";

type AppTitleType = {
  id: string;
  title: string;
};

const showTooltip = () => {
  document.getElementById("tooltip")!.classList.remove("hidden");
};

const hideTooltip = () => {
  document.getElementById("tooltip")!.classList.add("hidden");
};

const AppTitle = (props: AppTitleType) => {
  const changeAppPinnedStatus = async (id: string, appPinned: boolean) => {
    fetch("/api/apps/" + id, {
      method: "PATCH",
      body: JSON.stringify({ pinned: appPinned }),
    })
      .then((res) => res.json())
      .then((resBody: ResponseType) => {
        if (resBody.code == ErrorCode.OK) {
          setAppPinned(!appPinned);
          localStorage.removeItem("pinnedApps");
          useRefreshStore.setState({ refVal: Math.random() });
        }
      });
  };
  const [appPinned, setAppPinned] = useState(false);

  useEffect(() => {
    fetch("/api/apps/" + props.id)
      .then((res) => res.json())
      .then((response: ResponseType) => {
        console.log(response);
        if (response.code === ErrorCode.OK && response.msg === "inDb") {
          setAppPinned(true);
        }
      });
  }, [appPinned]);

  return (
    <div className="flex mt-2 mb-2 items-center">
      <div className="relative">
        <div
          className="p-4"
          onClick={() => {
            changeAppPinnedStatus(props.id, appPinned);
          }}
          onMouseOver={showTooltip}
          onMouseOut={hideTooltip}
        >
          <AiFillPushpin
            className={`text-3xl cursor-pointer ${
              appPinned && "text-amber-600"
            }`}
          />
        </div>

        <div
          id="tooltip"
          className="hidden absolute top-2 left-16 bg-gray-800 text-white p-2 rounded-md text-md w-40"
        >
          <p className="fold-semibold">
            {appPinned ? "Unpin this app" : "Pin this app"}
          </p>
        </div>
      </div>

      <h1 className="text-3xl">{props.title}</h1>
    </div>
  );
};

export default AppTitle;
