"use client";

import AceEditor from "react-ace";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";

import { JetBrains_Mono, Roboto_Mono } from "next/font/google";
import { Inconsolata } from "next/font/google";
import { Source_Code_Pro } from "next/font/google";
import { IBM_Plex_Mono } from "next/font/google";
import { Space_Mono } from "next/font/google";
import { Ubuntu_Mono } from "next/font/google";
import { PT_Mono } from "next/font/google";
import { Fira_Mono } from "next/font/google";

import "ace-builds/src-noconflict/ext-language_tools";
import { modesByName } from "ace-builds/src-noconflict/ext-modelist";
import { themesByName } from "ace-builds/src-noconflict/ext-themelist";
import { SNIPPET_THEMES, SNIPPET_MODES } from "@/constants/snippetConst";
import { SnippetFolderType } from "@/app/snippet/page";
import { useEffect, useState, useRef } from "react";
import { Logger } from "tslog";

const log = new Logger({ name: "snippetEditor" });

const jetbrainsMono = JetBrains_Mono({ weight: "400", subsets: ["latin"] });
const robotoMono = Roboto_Mono({ weight: "400", subsets: ["latin"] });
const inconsolata = Inconsolata({ weight: "400", subsets: ["latin"] });
const sourceCodePro = Source_Code_Pro({ weight: "400", subsets: ["latin"] });
const ibmPlexMono = IBM_Plex_Mono({ weight: "400", subsets: ["latin"] });
const spaceMono = Space_Mono({ weight: "400", subsets: ["latin"] });
const ubuntuMono = Ubuntu_Mono({ weight: "400", subsets: ["latin"] });
const ptMono = PT_Mono({ weight: "400", subsets: ["latin"] });
const firaMono = Fira_Mono({ weight: "400", subsets: ["latin"] });

type ModeType = {
  name: string;
  caption: string;
  mode: string;
  extensions: string;
  extRe: RegExp;
};

type ThemeType = {
  name: string;
  theme: string;
  caption: string;
  isDark: boolean;
};

type SnippetEditorProps = {
  snippetId: number;
  autoCompletion: boolean;
  fontFamily: string;
  fontSize: number;
  highlightLine: boolean;
  lineNumbers: boolean;
  tabSize: number;
  theme: string;
  wordWrap: boolean;
  folders: SnippetFolderType[];
  onCompRefresh: () => void;
};

let allLanguages: string[] = [];
let allThemes: string[] = [];
let modeCaptions: string[] = [];
let themeCaptions: string[] = [];

const modesByNameObj = modesByName as { [key: string]: ModeType };
const themesByNameObj = themesByName as { [key: string]: ThemeType };
SNIPPET_MODES.forEach((mode) => {
  allLanguages.push(mode);
  modeCaptions.push(modesByNameObj[mode].caption);
});

SNIPPET_THEMES.forEach((theme) => {
  allThemes.push(theme);
  themeCaptions.push(themesByNameObj[theme].caption);
});

allLanguages.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
});

allThemes.forEach((theme) => {
  require(`ace-builds/src-noconflict/theme-${theme}`);
});

const moveToFolder = async (folderId: string, id: number) => {
  console.log("move to folder id: ", folderId);
  const body = { type: "move", folderId: folderId };
  fetch("/api/snippets/" + id, { method: "PATCH", body: JSON.stringify(body) })
    .then((res) => res.json())
    .then((resBody) => {
      log.info("move to folder res: ", resBody);
    });
};

const saveEditorContent = (content: string, id: number) => {
  const body = { type: "content", content: content };
  fetch("/api/snippets/" + id, { method: "PATCH", body: JSON.stringify(body) })
    .then((res) => res.json())
    .then((resBody) => {
      log.info("content has changed: " + content);
    });
};

const changeSnippetLanguage = (lang: string, id: number) => {
  log.info("change snippet language: " + lang + " " + id);
  const body = { type: "lang", lang: lang };
  fetch("/api/snippets/" + id, { method: "PATCH", body: JSON.stringify(body) })
    .then((res) => res.json())
    .then((resBody) => {
      log.info("language has changed: " + lang);
    });
};

const changeSnippetFavorite = async (favorite: boolean, id: number) => {
  log.info("change snippet favorite: " + favorite + " " + id);
  const body = { type: "favorite", favorite: favorite };
  fetch("/api/snippets/" + id, { method: "PATCH", body: JSON.stringify(body) })
    .then((res) => res.json())
    .then((resBody) => {
      log.info("favorite has changed: " + favorite);
    });
};

const updateTitle = (title: string, id: number, onCompRefresh: () => void) => {
  const body = { type: "title", title: title };
  fetch("/api/snippets/" + id, { method: "PATCH", body: JSON.stringify(body) })
    .then((res) => res.json())
    .then((resBody) => {
      console.log("update title res: ", resBody);
      onCompRefresh();
    });
};

const SnippetEditor = (props: SnippetEditorProps) => {
  // fetch prefs later.

  console.log("snippet editor,", props);

  const editorContentRef = useRef("");
  const titleRef = useRef("");
  const [editorContent, setEditorContent] = useState("");
  const [editorHeight, setEditorHeight] = useState(550);
  const [title, setTitle] = useState("Untitled snippet");
  const [lang, setLang] = useState("text");
  const [folderId, setFolderId] = useState("default");
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const editorTop = (document.getElementById("editor") as HTMLDivElement)
      .offsetTop;
    setEditorHeight(window.innerHeight * 0.95 - editorTop);
    const handleResize = () => {
      setEditorHeight(window.innerHeight * 0.95 - editorTop);
    };
    window.addEventListener("resize", handleResize);

    if (props.snippetId !== -1) {
      console.log("url: /api/snippets/" + props.snippetId);
      fetch("/api/snippets/" + props.snippetId)
        .then((res) => res.json())
        .then((resBody) => {
          if (resBody.code !== 0) {
            console.log("Failed to fetch snippet, error code: ", resBody.code);
            return;
          }
          const snippet = resBody.data;
          console.log("snippet from database", snippet);
          setTitle(snippet.title);
          setEditorContent(snippet.content);
          setLang(snippet.language);
          setFavorite(snippet.favorite);
          setFolderId(snippet.folderId);
          titleRef.current = snippet.title;
          editorContentRef.current = snippet.content;
        });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [props.snippetId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (editorContent != editorContentRef.current) {
        saveEditorContent(editorContent, props.snippetId);
        editorContentRef.current = editorContent;
      }
      if (props.snippetId !== -1 && title !== titleRef.current) {
        log.info("title changed:", title, titleRef.current);
        updateTitle(title, props.snippetId, props.onCompRefresh);
        titleRef.current = title;
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [editorContent, title]);

  if (props.snippetId === -1) {
    return (
      <div className="mt-16 w-full">
        <div id="editor" className="flex justify-center">
          <span className="text-2xl font-semibold">No Snippet Selected</span>
        </div>
      </div>
    );
  }

  let selectedFont = jetbrainsMono;
  switch (props.fontFamily) {
    case "robotoMono":
      selectedFont = robotoMono;
      break;
    case "inconsolata":
      selectedFont = inconsolata;
      break;
    case "sourceCodePro":
      selectedFont = sourceCodePro;
      break;
    case "ibmPlexMono":
      selectedFont = ibmPlexMono;
      break;
    case "spaceMono":
      selectedFont = spaceMono;
      break;
    case "ubuntuMono":
      selectedFont = ubuntuMono;
      break;
    case "ptMono":
      selectedFont = ptMono;
      break;
    case "firaMono":
      selectedFont = firaMono;
      break;
    default:
      break;
  }
  const editorOptions = {
    enableBasicAutocompletion: props.autoCompletion,
    showLineNumbers: props.lineNumbers,
    fontFamily: selectedFont.style.fontFamily,
    fontWeight: selectedFont.style.fontWeight,
    fontSize: props.fontSize,
    wrap: props.wordWrap,
    tabSize: props.tabSize,
  };

  log.info("editor options: ", editorOptions);

  return (
    <div className="mt-10 w-full px-10">
      <div className="mb-4 flex">
        <div className="pt-1 mr-2 float-left">
          {favorite ? (
            <AiFillStar
              onClick={() => {
                setFavorite(false);
                changeSnippetFavorite(false, props.snippetId).then((res) => {
                  props.onCompRefresh();
                });
              }}
              className="text-2xl cursor-pointer text-yellow-500"
            />
          ) : (
            <AiOutlineStar
              onClick={() => {
                setFavorite(true);
                changeSnippetFavorite(true, props.snippetId).then((res) => {
                  props.onCompRefresh();
                });
              }}
              className="text-2xl cursor-pointer"
            />
          )}
        </div>
        <input
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          type="text"
          className="text-2xl font-semibold focus:outline-none"
          value={title}
          placeholder="Snippet title..."
        />
      </div>
      <div id="editor-controls" className="flex justify-between">
        <div id="lan-sel">
          Language:{" "}
          <select
            value={lang}
            id="language"
            onChange={(event) => {
              setLang(event.target.value);
              changeSnippetLanguage(event.target.value, props.snippetId);
            }}
          >
            {allLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {modesByNameObj[lang].caption}
              </option>
            ))}
          </select>
        </div>

        <div id="folder-sel">
          Move To Folder:{" "}
          <select
            value={folderId}
            id="theme"
            onChange={(event) => {
              moveToFolder(event.target.value, props.snippetId).then((res) => {
                props.onCompRefresh();
              });
            }}
          >
            {props.folders.map((folder: SnippetFolderType) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div id="editor" className="mt-4">
        <AceEditor
          width="100%"
          height={editorHeight + "px"}
          onChange={(newVal) => setEditorContent(newVal)}
          value={editorContent}
          mode={lang}
          theme={props.theme}
          name="snippet-editor"
          fontSize={props.fontSize}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={props.highlightLine}
          setOptions={editorOptions}
        />
      </div>
    </div>
  );
};

export default SnippetEditor;
