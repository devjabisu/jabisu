"use client";

import { Menu, Transition } from "@headlessui/react";
import { useEffect, useState, Fragment } from "react";
import CodeSnippetSideNav from "@/components/code-snippet-side-bar";
import {
  AiFillContainer,
  AiFillStar,
  AiFillDelete,
  AiFillFolder,
  AiFillCaretDown,
  AiOutlineReload,
} from "react-icons/ai";
import SnippetEditor from "@/components/snippet-editor";
import ErrorCode from "@/constants/errorCode";
import { Logger } from "tslog";
import InputModal from "@/components/input-modal";
import AppTitle from "@/components/app-title";

const log = new Logger({ name: "snippet-page" });

const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(" ");
};

const resetSelectedButton = () => {
  log.info("reset all selected button");
  const selectedBtns = document.getElementsByClassName("btn-selected");
  if (selectedBtns.length == 0) {
    return;
  }
  const selectedBtn: HTMLButtonElement = selectedBtns[0] as HTMLButtonElement;
  selectedBtn.classList.remove("btn-selected");
  selectedBtn.classList.add("btn");
};

const changeSelectedButton = (selectedBtn: HTMLButtonElement) => {
  log.info("set selected button", selectedBtn.id);
  if (selectedBtn) {
    selectedBtn.classList.remove("btn");
    selectedBtn.classList.add("btn-selected");
  }
};

type SnippetFolderType = {
  id: string;
  name: string;
};

const TYPE_ALL = "all";
const TYPE_FAVORITES = "fav";
const TYPE_TRASH = "trash";
const TYPE_FOLDERS = "folders";

const SnippetPage = () => {
  const [folders, setFolders] = useState([] as SnippetFolderType[]);
  const [selected, setSelected] = useState("all");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [selectedFolderName, setSelectedFolderName] = useState("");
  const [selectedSnippetId, setSelectedSnippetId] = useState(-1);
  const [refresh, setRefresh] = useState(0);
  const [autoCompletion, setAutoCompletion] = useState(true);
  const [fontFamily, setFontFamily] = useState("RobotoMono");
  const [fontSize, setFontSize] = useState(14);
  const [highlightLine, setHighlightLine] = useState(true);
  const [lineNumbers, setLineNumbers] = useState(true);
  const [tabSize, setTabSize] = useState(2);
  const [theme, setTheme] = useState("github");
  const [wordWrap, setWordWrap] = useState(true);
  const [showInputModal, setShowInputModal] = useState(false);

  const onConfirm = async (val: string) => {
    console.log("onConfirm: ", val);
    fetch("/api/snippet-folders", {
      method: "POST",
      body: JSON.stringify({ name: val }),
    })
      .then((res) => res.json())
      .then((resBody) => {
        console.log(resBody);
        setShowInputModal(false);
        // now refresh the page
        setSelected(TYPE_ALL);
      });
  };

  useEffect(() => {
    if (showInputModal) {
      return;
    }
    resetSelectedButton();
    const selectedBtn: HTMLButtonElement = document.getElementById(
      "btn-" + selected,
    ) as HTMLButtonElement;
    changeSelectedButton(selectedBtn);

    // now fetch the snippet prefs from database
    fetch("/api/prefs/snippet")
      .then((res) => res.json())
      .then((resBody) => {
        if (resBody.code !== ErrorCode.OK) {
          log.error(resBody);
          return;
        }
        const dbSnippetPref = resBody.data as {
          autoCompletion: boolean;
          fontFamily: string;
          fontSize: number;
          highlightLine: boolean;
          lineNumbers: boolean;
          tabSize: number;
          theme: string;
          wordWrap: boolean;
        };
        console.log("dbsnippetpref: ", resBody.data);
        setAutoCompletion(dbSnippetPref.autoCompletion);
        setFontFamily(dbSnippetPref.fontFamily);
        setFontSize(dbSnippetPref.fontSize);
        setHighlightLine(dbSnippetPref.highlightLine);
        setLineNumbers(dbSnippetPref.lineNumbers);
        setTabSize(dbSnippetPref.tabSize);
        setTheme(dbSnippetPref.theme);
        setWordWrap(dbSnippetPref.wordWrap);
      });
    fetch("/api/snippet-folders")
      .then((res) => res.json())
      .then((resBody) => {
        const folders = resBody.data as SnippetFolderType[];
        log.info("folders: ", folders);
        setFolders(folders);
      });
  }, [selected]);

  if (showInputModal) {
    return (
      <InputModal
        title="Add a new folder"
        inputPlaceholder="Your new folder name"
        confirmButton="Add"
        onConfirm={onConfirm}
      />
    );
  }

  return (
    <div className="flex">
      <div className="hidden">{refresh}</div>
      <CodeSnippetSideNav
        selected={selected}
        selectedFolder={selectedFolder}
        selectedSnippetId={selectedSnippetId}
        refresh={refresh}
        onCompRefresh={() => setRefresh(Math.random())}
        onHighlighted={(selId: number) => setSelectedSnippetId(selId)}
      />
      <div className="w-full">
        <AppTitle id="0006" title="Code Snippet" />
        <div className="right-4 absolute mt-2">
          <AiOutlineReload
            id="snippet-btn-refresh"
            onClick={() => setRefresh(Math.random())}
            className="text-xl hover:text-blue-500 hover:cursor-pointer"
          />
        </div>
        <div className="hidden">{selectedSnippetId}</div>
        <div id="button-container" className="grid place-items-center">
          <div className="inline-flex rounded-d shadow-sm">
            <button
              id="btn-all"
              type="button"
              className="btn rounded-l-lg"
              onClick={() => {
                setSelected(TYPE_ALL);
                setSelectedFolder("");
                setSelectedFolderName("");
                setSelectedSnippetId(-1);
                setRefresh(Math.random());
              }}
            >
              <AiFillContainer className="text-xl mr-2" />
              All Snippets
            </button>
            <button
              id="btn-fav"
              type="button"
              className="btn"
              onClick={() => {
                setSelected(TYPE_FAVORITES);
                setSelectedFolder("");
                setSelectedFolderName("");
                setSelectedSnippetId(-1);
                setRefresh(Math.random());
              }}
            >
              <AiFillStar className="text-xl mr-2" />
              Favorites
            </button>
            <button
              id="btn-trash"
              type="button"
              className="btn"
              onClick={() => {
                setSelected(TYPE_TRASH);
                setSelectedFolder("");
                setSelectedFolderName("");
                setSelectedSnippetId(-1);
                setRefresh(Math.random());
              }}
            >
              <AiFillDelete className="text-xl mr-2" />
              Trash
            </button>

            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="btn rounded-r-lg" id="btn-folders">
                  <AiFillFolder className="text-xl mr-2" />
                  {selectedFolder === ""
                    ? "Folders"
                    : "Folder • " + selectedFolderName}
                  <AiFillCaretDown
                    aria-hidden="true"
                    className="text-md ml-2"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="divide-y divide-gray-200 absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {folders.map((folder) => (
                      <div key={folder.id}>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              onClick={() => {
                                setSelected(TYPE_FOLDERS);
                                setSelectedFolder(folder.id);
                                setSelectedFolderName(folder.name);
                                setSelectedSnippetId(-1);
                                setRefresh(Math.random());
                              }}
                              className={classNames(
                                active
                                  ? "bg-blue-600 text-white"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm",
                              )}
                            >
                              {folder.name}
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    ))}
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-blue-600 text-white" : "text-gray-700",
                            "block px-4 py-2 text-sm",
                          )}
                          onClick={() => setShowInputModal(true)}
                        >
                          Add a new folder
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <SnippetEditor
          folders={folders}
          onCompRefresh={() => setRefresh(Math.random())}
          snippetId={selectedSnippetId}
          autoCompletion={autoCompletion}
          fontFamily={fontFamily}
          fontSize={fontSize}
          highlightLine={highlightLine}
          lineNumbers={lineNumbers}
          tabSize={tabSize}
          theme={theme}
          wordWrap={wordWrap}
        />
      </div>
    </div>
  );
};

export type { SnippetFolderType };

export default SnippetPage;
