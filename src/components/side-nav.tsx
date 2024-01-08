"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  AiOutlineLeft,
  AiFillSetting,
  AiFillAppstore,
  AiFillPushpin,
  AiFillCaretUp,
} from "react-icons/ai";
import { ImSpinner } from "react-icons/im";
import { AppType } from "@/constants/appInfo";
import { create } from "zustand";

export const useRefreshStore = create(() => ({
  refVal: 0,
}));

const SideNav = () => {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const [pinnedApps, setPinnedApps] = useState([] as AppType[]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const pinnedApps = localStorage.getItem("pinnedApps");
    if (pinnedApps === null) {
      setLoading(true);
      fetch("/api/apps")
        .then((res) => res.json())
        .then((pinnedApps: AppType[]) => {
          localStorage.setItem("pinnedApps", JSON.stringify(pinnedApps));
          setPinnedApps(pinnedApps);
          setLoading(false);
        });
    } else {
      setPinnedApps(JSON.parse(pinnedApps));
      setLoading(false);
    }
  }, [useRefreshStore((state) => state.refVal)]);

  return (
    <div>
      <div
        className={`bg-indigo-blue h-screen scroll-auto p-5 pt-8 ${
          open ? "w-80" : "w-24"
        } relative duration-300`}
      >
        <AiOutlineLeft
          className={`text-white text-2xl absolute -right-0 mr-1 top-9  cursor-pointer ${
            !open && "rotate-180"
          }`}
          onClick={() => {
            if (open) {
              console.log("panel closed, close the submenu as well");
              setSubmenuOpen(false);
            }
            setOpen(!open);
          }}
        ></AiOutlineLeft>
        <div className="inline-flex">
          <img
            onClick={() => {
              console.log("redirect to home page");
              router.push("/");
            }}
            src={open ? "/logo.svg" : "/logo_col.svg"}
            className="h-12 duration-300"
          ></img>
        </div>
        <div id="items" className="mt-3">
          <ul className="space-y-2 font-medium text-white">
            <li>
              <a
                href="/tools"
                className="flex items-center p-2 rounded-lg hover:bg-cream"
              >
                <AiFillAppstore className="w-5 h-5 text-2xl block float-left" />
                <span className={`ml-3 ${!open && "hidden"}`}>All Apps</span>
              </a>
            </li>
            <li>
              <a
                href="/pref"
                className="flex items-center p-2 rounded-lg hover:bg-cream"
              >
                <AiFillSetting className="w-5 h-5 text-2xl block float-left" />
                <span className={`ml-3 ${!open && "hidden"}`}>Preferences</span>
              </a>
            </li>
            <li>
              <a className="flex items-center p-2 rounded-lg hover:bg-cream">
                <div
                  onClick={() => router.push("/pinned")}
                  className="cursor-pointer pr-12 flex"
                >
                  <AiFillPushpin className="w-5 h-5 text-2xl block float-left" />
                  <span className={`ml-3 ${!open && "hidden"}`}>
                    Pinned Apps
                  </span>
                  {isLoading && (
                    <ImSpinner className="text-white animate-spin ml-2" />
                  )}
                </div>
                <AiFillCaretUp
                  onClick={() => setSubmenuOpen(!submenuOpen)}
                  className={`${submenuOpen && "rotate-180"} ${
                    !open && "hidden"
                  } mr-1 ml-auto cursor-pointer`}
                />
              </a>
              <ul className={`${!submenuOpen && "hidden"} py-2 space-y-2`}>
                {pinnedApps.length > 0 &&
                  pinnedApps.map((app) => (
                    <li key={app.id}>
                      <a
                        href={`${app.short}`}
                        className="flex items-center p-2 rounded-lg hover:bg-cream"
                      >
                        <span className="ml-8">{app.name}</span>
                      </a>
                    </li>
                  ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
