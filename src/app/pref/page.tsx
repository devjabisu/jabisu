"use client";

import { useState } from "react";
import EditorPref from "@/components/editor-pref";

const PreferencePage = () => {
  const [selected, setSelected] = useState("editor");

  return (
    <div className="flex">
      <div
        onClick={() => setSelected("editor")}
        className={`cursor-pointer flex-col w-48 h-screen pr-7 mt-12 font-semibold text-md space-y-4 ${
          selected === "editor" && "text-rose-700"
        }`}
      >
        <div>Snippet Editor</div>
      </div>
      <div className="ml-4">
        <div>
          <EditorPref />
        </div>
      </div>
    </div>
  );
};

export default PreferencePage;
