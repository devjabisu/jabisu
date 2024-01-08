"use client";

import {
  AiFillPlusCircle,
  AiFillDelete,
  AiOutlineSearch,
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillTags,
} from "react-icons/ai";

import { useState, useEffect } from "react";

import SnippetBrief from "@/components/snippet-brief";
import ErrorCode from "@/constants/errorCode";
import Popup from "./popup";
import { DbSnippetType, QuerySnippetReturnType } from "@/data/snippets";
import { SNIPPET_PAGE_SIZE } from "@/constants/snippetConst";

type PropsType = {
  selected: string;
  selectedFolder: string;
  selectedSnippetId: number;
  refresh: number;
  onCompRefresh: () => void;
  onHighlighted: (selId: number) => void;
};

const TYPE_FOlDERS = "folders";
const TYPE_TRASH = "trash";
const DEFAULT_FOLDER_ID = "defaultId";

const formatDate = (date: Date | number, lang = navigator.language): string => {
  // Allow dates or times to be passed
  const timeMs = typeof date === "number" ? date : date.getTime();

  // Get the amount of seconds between the given date and now
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

  // Array reprsenting one minute, hour, day, week, month, etc in seconds
  const cutoffs = [
    60,
    3600,
    86400,
    86400 * 7,
    86400 * 30,
    86400 * 365,
    Infinity,
  ];

  // Array equivalent to the above but in the string representation of the units
  const units: Intl.RelativeTimeFormatUnit[] = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year",
  ];

  // Grab the ideal cutoff unit
  const unitIndex = cutoffs.findIndex(
    (cutoff) => cutoff > Math.abs(deltaSeconds),
  );

  // Get the divisor to divide from the seconds. E.g. if our unit is "day" our divisor
  // is one day in seconds, so we can divide our seconds by this to get the # of days
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

  // Intl.RelativeTimeFormat do its magic
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
  return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
};

const showTooltip = (hasTrash: boolean) => {
  if (hasTrash) {
    document.getElementById("tooltip")!.classList.remove("hidden");
  }
};

const hideTooltip = (hasTrash: boolean) => {
  if (hasTrash) {
    document.getElementById("tooltip")!.classList.add("hidden");
  }
};

const addNewSnippet = async (selected: string, selectedFolder: string) => {
  let folderId = DEFAULT_FOLDER_ID;
  if (selected === TYPE_FOlDERS) {
    folderId = selectedFolder;
  }
  const data = {
    folderId: folderId,
  };
  console.log("add new snippet, ", selected, selectedFolder);
  fetch("/api/snippets", { method: "POST", body: JSON.stringify(data) })
    .then((res) => res.json())
    .then((resBody) => {
      console.log("ResBody: ", resBody);
    });
  return true;
};

const emptyTrash = async () => {
  fetch("/api/snippets", { method: "DELETE" })
    .then((res) => res.json())
    .then((resBody) => {
      console.log("ResBody: ", resBody);
    });
  return true;
};

const deleteSnippet = async (snippetId: number) => {
  fetch("/api/snippets/" + snippetId, { method: "DELETE" })
    .then((res) => res.json())
    .then((resBody) => {
      console.log("ResBody: ", resBody);
    });
  return true;
};

const CodeSnippetSideNav = (props: PropsType) => {
  // should loading the existed snippets from database according to the selected button
  const [snippetBriefs, setSnippetBriefs] = useState([] as DbSnippetType[]);
  const [showAlert, setShowAlert] = useState(false);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [totalSnippetCount, setTotalSnippetCount] = useState(0);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertContent, setAlertContent] = useState("");
  const [deleteSnippetId, setDeleteSnippetId] = useState(-1);

  const handleDeleteSnippet = (snippetId: number) => {
    setDeleteSnippetId(snippetId);
    setAlertTitle("Delete Snippet");
    setAlertContent(
      "Are you sure you want to delete this snippet? You cannot undo this operation.",
    );
    setShowAlert(true);
  };

  // useEffect(() => {
  //   if (showAlert) {
  //     return;
  //   }
  //   console.log("selected: ", props.selected);
  //   let queryUrl = "/api/snippets?type=" + props.selected;
  //   if (props.selected === TYPE_FOlDERS) {
  //     queryUrl += "&folderId=" + props.selectedFolder;
  //   }
  //   fetch(queryUrl)
  //     .then((res) => res.json())
  //     .then((resBody) => {
  //       if (resBody.code !== ErrorCode.OK) {
  //         console.log("Failed to fetch snippets, error code: ", resBody.code);
  //         return;
  //       }
  //       const resData = resBody.data as QuerySnippetReturnType;
  //       setCurrentPage(resData.page);
  //       setSnippetBriefs(resData.snippets as DbSnippetType[]);
  //     });
  // }, [props.refresh]);

  useEffect(() => {
    console.log("re query data from db");
    if (showAlert) {
      return;
    }

    let queryUrl =
      "/api/snippets?type=" +
      props.selected +
      "&filter=" +
      filter +
      "&page=" +
      currentPage;

    if (props.selected === TYPE_FOlDERS) {
      queryUrl += "&folderId=" + props.selectedFolder;
    }
    fetch(queryUrl)
      .then((res) => res.json())
      .then((resBody) => {
        if (resBody.code !== ErrorCode.OK) {
          console.log("Failed to fetch snippets, error code: ", resBody.code);
          return;
        }
        const resData = resBody.data as QuerySnippetReturnType;
        console.log("res data from db: ", resData);
        setCurrentPage(resData.page);
        setSnippetBriefs(resData.snippets as DbSnippetType[]);
        setTotalSnippetCount(resData.totalCount);
        setHasPrev(resData.hasPrev);
        setHasNext(resData.hasNext);
      });
  }, [filter, currentPage, props.refresh]);

  if (showAlert) {
    return (
      <Popup
        title={alertTitle}
        content={alertContent}
        confirmButton="Confirm"
        onDismiss={() => {
          setShowAlert(false);
        }}
        onConfirm={() => {
          if (deleteSnippetId !== -1) {
            deleteSnippet(deleteSnippetId).then(() => {
              setShowAlert(false);
              props.onCompRefresh();
            });
          } else {
            emptyTrash().then(() => {
              console.log("empty trash");
              setShowAlert(false);
              props.onCompRefresh();
            });
          }
        }}
      />
    );
  }

  return (
    <div className="h-screen border-r-gray-300 border-r-2">
      <div id="snippet-sidebar" className="overflow-auto">
        <div className="hidden">{props.refresh}</div>
        <div className="pt-2 flex pr-3">
          <div id="snippet-search-bar" className="flex">
            <div
              className="flex items-center w-50 border-b-2 border-b-gray-300 bg-light-white mt-3 mb-1 p-1"
              id="filter-snippet"
            >
              <AiOutlineSearch className="text-lg text-gray-800 block float-left cursor-pointer ml-2 mr-2" />
              <input
                id="filter"
                type="search"
                onChange={(e) => setFilter(e.target.value)}
                className="text-gray-800 text-md w-full focus:outline-none"
                placeholder="Search..."
              />
              <span
                onClick={() => {
                  if (props.selected === TYPE_TRASH) {
                    setAlertTitle("Empty Trash");
                    setAlertContent(
                      "Are you sure you want to empty all trashed snippets? You cannot undo this operation.",
                    );
                    setDeleteSnippetId(-1);
                    setShowAlert(true);
                  } else {
                    addNewSnippet(props.selected, props.selectedFolder).then(
                      (res) => {
                        props.onCompRefresh();
                      },
                    );
                  }
                }}
              >
                {props.selected === TYPE_TRASH ? (
                  <button
                    disabled={snippetBriefs.length === 0}
                    className="hover:text-blue-500 cursor-pointer disabled:text-gray-200 disabled:cursor-not-allowed"
                  >
                    <AiFillDelete
                      className="text-xl float-right ml-4"
                      onMouseOver={() =>
                        showTooltip(snippetBriefs.length !== 0)
                      }
                      onMouseOut={() => hideTooltip(snippetBriefs.length !== 0)}
                    />
                    <div
                      id="tooltip"
                      className="hidden absolute ml-12 bg-gray-800 text-white p-2 rounded-md text-md w-32"
                    >
                      Empty Trash
                    </div>
                  </button>
                ) : (
                  <>
                    <AiFillPlusCircle
                      className="text-xl float-right ml-4 hover:text-blue-500 cursor-pointer"
                      onMouseOver={() => showTooltip(true)}
                      onMouseOut={() => hideTooltip(true)}
                    />
                    <div
                      id="tooltip"
                      className="hidden absolute ml-12 bg-gray-800 text-white p-2 rounded-md text-md w-32"
                    >
                      New Snippet
                    </div>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-1 pr-3" id="snippet-brief-list">
          {snippetBriefs.map((brief) => (
            <div key={brief.id} onClick={() => props.onHighlighted(brief.id)}>
              <SnippetBrief
                snippetId={brief.id}
                name={brief.title}
                folder={brief.folder.name}
                date={formatDate(new Date(brief.updatedAt))}
                favorite={brief.favorite}
                deleted={brief.deleted}
                highlighted={props.selectedSnippetId === brief.id}
                onCompRefresh={props.onCompRefresh}
                onShowAlert={(snippetId: number) =>
                  handleDeleteSnippet(snippetId)
                }
              />
            </div>
          ))}
        </div>
      </div>
      <div
        id="snippet-pagnination"
        className="flex justify-center bg-white pr-3 mt-2"
      >
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              disabled={!hasPrev}
              onClick={() => setCurrentPage(currentPage - 1)}
              id="btn-prev"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-800 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:bg-slate-100 disabled:text-slate-300 disabled:cursor-not-allowed"
            >
              <AiFillCaretLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <a
              id="page-switcher"
              type="text"
              className="relative inline-flex items-center px-3 py-1 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              suppressContentEditableWarning={true}
              onBlur={(e) => {
                console.log("on blur");
                let page: number = parseInt(e.target.innerText);
                if (isNaN(page) || page < 1) {
                  page = 1;
                }
                console.log("user input page: ", page);
                setCurrentPage(page - 1);
                // todo: add logic to fetch the paged data
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  document.getElementById("page-switcher")!.blur();
                }
              }}
              contentEditable="true"
            >
              {currentPage + 1}
            </a>

            <button
              disabled={!hasNext}
              onClick={() => setCurrentPage(currentPage + 1)}
              id="btn-next"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-800 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:bg-slate-100 disabled:text-slate-300 disabled:cursor-not-allowed"
            >
              <AiFillCaretRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
      <div className="py-2 pr-3 flex justify-center text-sm">
        Showing &nbsp; <b>{currentPage * SNIPPET_PAGE_SIZE + 1}</b> &nbsp; to{" "}
        &nbsp;
        <b>
          {Math.min((currentPage + 1) * SNIPPET_PAGE_SIZE, totalSnippetCount)}
        </b>
        &nbsp; of &nbsp; <b>{totalSnippetCount}</b> &nbsp; snippets{" "}
      </div>
    </div>
  );
};

export default CodeSnippetSideNav;
