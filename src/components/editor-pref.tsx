"use client";

import { useState, useEffect } from "react";
import { Logger } from "tslog";

const log = new Logger({ name: "snippet-pref-page" });

const changeSnippetPrefTheme = (theme: string) => {
  const data = {
    theme: theme,
    type: "theme",
  };
  fetch("/api/prefs/snippet", {
    method: "PATCH",
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((resBody) => {
      if (resBody.code !== 0) {
        log.error(resBody);
        return;
      }
      console.log("change theme resBody: ", resBody);
    });
};

const EditorPref = () => {
  useEffect(() => {
    fetch("/api/prefs/snippet")
      .then((res) => res.json())
      .then((resBody) => {
        if (resBody.code !== 0) {
          log.error(resBody);
          return;
        }
        setTheme(resBody.data.theme);
        console.log("resBody: ", resBody);
      });
  }, []);

  const [theme, setTheme] = useState("monokai");
  const [fontSize, setFontSize] = useState(12);

  return (
    <div className="mt-16">
      <div className="grid grid-cols-2 gap-7">
        <div>Font Size</div>
        <div>
          <input
            type="text"
            className="text-md focus:outline-none border-b-gray-800 border-b-2 w-52"
            placeholder="type font size."
            value={fontSize}
            onChange={(event) => {
              setFontSize(parseInt(event.target.value));
            }}
          />
        </div>
        <div>Font Family</div>
        <div>
          <select className="block w-52 text-md bg-transparent border-0 border-b-gray-800 border-b-2 focus:outline-none focus:ring-0">
            <option value="incosolata">Incosolata</option>
            <option value="firaCode">Fira Code</option>
            <option value="jetBrainsMono">JetBrains Mono</option>
            <option value="rototoMono">Roboto Mono</option>
            <option value="ubuntuMono">Ubuntu Mono</option>
            <option value="firaCode">Fira Code</option>
            <option value="ptMono">PT Mono</option>
            <option value="spaceMono">Space Mono</option>
          </select>
        </div>
        <div>Theme</div>
        <div id="theme-changer">
          <select
            value={theme}
            onChange={(event) => {
              setTheme(event.target.value);
              changeSnippetPrefTheme(event.target.value);
            }}
            className="block w-52 text-md bg-transparent border-0 border-b-gray-800 border-b-2 focus:outline-none focus:ring-0"
          >
            <option value="monokai">Monokai</option>
            <option value="github">Github</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="kuroir">Kuroir</option>
            <option value="twilight">Twilight</option>
            <option value="xcode">Xcode</option>
            <option value="textmate">Textmate</option>
            <option value="solarized_dark">Solarized Dark</option>
            <option value="solarized_light">Solarized Light</option>
            <option value="terminal">Terminal</option>
          </select>
        </div>
        <div>Wrap</div>
        <div>
          <select className="block w-52 text-md bg-transparent border-0 border-b-gray-800 border-b-2 focus:outline-none focus:ring-0">
            <option value="wrap">Wrap</option>
            <option value="nowrap">None</option>
          </select>
        </div>
        <div>Tab Size</div>
        <div>
          <select className="block w-52 text-md bg-transparent border-0 border-b-gray-800 border-b-2 focus:outline-none focus:ring-0">
            <option value="two">2</option>
            <option value="four">4</option>
          </select>
        </div>
        <div>Highlight Active Line</div>
        <div>
          <input
            id="highlight-line"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2 "
          />
        </div>
        <div>Autocompletion</div>
        <div>
          <input
            id="autocompletion"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2 "
          />
        </div>
      </div>
    </div>
  );
};

export default EditorPref;
