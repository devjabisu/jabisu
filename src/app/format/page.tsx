"use client";

import { useEffect, useState } from "react";
import { JetBrains_Mono } from "next/font/google";
import { FaArrowsRotate } from "react-icons/fa6";
import {
  AiOutlineClear,
  AiOutlineCopy,
  AiOutlineUpload,
  AiOutlineDownload,
} from "react-icons/ai";
import AppTitle from "@/components/app-title";

const jetbrainsMono = JetBrains_Mono({ weight: "400", subsets: ["latin"] });

const TYPE_HTML = "html";
const TYPE_CSS = "css";
const TYPE_JS = "babel";
const TYPE_JSON = "json";
const TYPE_XML = "xml";

const FORMAT_ERROR_MSG = "Failed to format!";

const resetSelectedButton = () => {
  const selectedBtns = document.getElementsByClassName("btn-selected");
  if (selectedBtns.length == 0) {
    return;
  }
  const selectedBtn: HTMLButtonElement = selectedBtns[0] as HTMLButtonElement;
  selectedBtn.classList.remove("btn-selected");
  selectedBtn.classList.add("btn");
};

const doFormat = async (content: string, type: string) => {
  const outPanel = document.getElementById(
    "formatter-out",
  ) as HTMLTextAreaElement;
  outPanel.value = "Formatting...";
  const response = await fetch("/api/format", {
    method: "POST",
    body: JSON.stringify({ content, type }),
  });
  const result = await response.json();
  if (result.code === 0) {
    return result.data;
  } else {
    return FORMAT_ERROR_MSG;
  }
};

const changeSelectedButton = (selectedBtn: HTMLButtonElement) => {
  if (selectedBtn) {
    selectedBtn.classList.remove("btn");
    selectedBtn.classList.add("btn-selected");
  }
};

const FormatPage = () => {
  const [type, setType] = useState(TYPE_HTML);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [infoMsg, setInfoMsg] = useState("");
  const [copyDownloadOk, setCopyDownloadOk] = useState(false);

  const downloadFile = (content: string, type: string) => {
    if (!copyDownloadOk) {
      setInfoMsg("Please format first!");
      setTimeout(() => {
        setInfoMsg("");
      }, 2000);
      return;
    }
    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `output.${type}`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const clear = async () => {
    setInput("");
    setOutput("");
    setCopyDownloadOk(false);
  };

  const copyToClipboard = async (content: string) => {
    if (!copyDownloadOk) {
      setInfoMsg("Please format first!");
      setTimeout(() => {
        setInfoMsg("");
      }, 2000);
      return false;
    }
    navigator.clipboard.writeText(content);
    return true;
  };

  const uploadFile = async () => {
    const inputElem = document.getElementById(
      "upload-file",
    ) as HTMLInputElement;
    inputElem.click();
  };

  const handleFileUploaded = async () => {
    const inputElem = document.getElementById(
      "upload-file",
    ) as HTMLInputElement;

    const files = inputElem.files;
    if (!files || files.length === 0) {
      setInfoMsg("No file selected!");
      setTimeout(() => {
        setInfoMsg("");
      }, 2000);
      return;
    }
    const fileType = files[0].name.split(".")[1];
    switch (fileType) {
      case "json":
        setType(TYPE_JSON);
        break;
      case "xml":
        setType(TYPE_XML);
        break;
      case "html":
        setType(TYPE_HTML);
        break;
      case "css":
        setType(TYPE_CSS);
        break;
      case "js":
        setType(TYPE_JS);
        break;
      default:
        setInfoMsg("Unsupported file type!");
        setTimeout(() => {
          setInfoMsg("");
        }, 2000);
        return;
    }

    const text = await files[0].text();
    setInput(text);
  };

  useEffect(() => {
    resetSelectedButton();
    const selectedType: HTMLButtonElement = document.getElementById(
      "btn-" + type,
    ) as HTMLButtonElement;
    changeSelectedButton(selectedType);
  }, [type]);

  return (
    <div>
      <AppTitle id="0002" title="Code Formatter" />
      <div className="w-full mt-6">
        <div className="pr-3">
          <div className="grid place-items-center">
            <div className="inline-flex rounded-d shadow-sm">
              <button
                id="btn-html"
                className="btn rounded-l-lg"
                onClick={() => setType(TYPE_HTML)}
              >
                HTML
              </button>
              <button
                id="btn-css"
                className="btn"
                onClick={() => setType(TYPE_CSS)}
              >
                CSS
              </button>
              <button
                id="btn-js"
                className="btn"
                onClick={() => setType(TYPE_JS)}
              >
                Javascript
              </button>
              <button
                id="btn-json"
                className="btn"
                onClick={() => setType(TYPE_JSON)}
              >
                JSON
              </button>
              <button
                id="btn-xml"
                className="btn rounded-r-lg"
                onClick={() => setType(TYPE_XML)}
              >
                XML
              </button>
            </div>
          </div>
          <div
            className={`pt-8 grid formatter-panel-grid place-items-center ${jetbrainsMono.className}`}
            id="formatter-panel"
          >
            <div className="w-full px-2 col-span-7 relative">
              <div className="absolute top-2 right-4">
                <AiOutlineUpload
                  onClick={uploadFile}
                  className="text-xl hover:text-blue-600 cursor-pointer"
                />
                <input
                  type="file"
                  id="upload-file"
                  className="hidden"
                  accept=".json,.xml,.css,.js,.html"
                  onChange={handleFileUploaded}
                />
              </div>
              <textarea
                id="formatter-in"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                className="w-full block p-2 text-sm rounded-md border-2 border-gray-300 focus:border-blue-700 resize-none focus:outline-none"
              />
            </div>
            <div className="col-span-1">
              <FaArrowsRotate
                className="text-2xl cursor-pointer hover:text-blue-600"
                onClick={() => {
                  doFormat(input, type).then((result) => {
                    setOutput(result);
                    if (result !== FORMAT_ERROR_MSG) {
                      setCopyDownloadOk(true);
                    }
                  });
                }}
              />
            </div>
            <div className="w-full px-2 col-span-7">
              <div
                id="foramtter-button-set"
                className="z-10 flex right-7 mt-2 fixed"
              >
                <AiOutlineClear
                  onClick={() => {
                    clear().then(() => {
                      setInfoMsg("Cleared!");
                      setTimeout(() => {
                        setInfoMsg("");
                      }, 2000);
                    });
                  }}
                  className="text-xl mr-2 hover:text-blue-600 cursor-pointer"
                />
                <AiOutlineCopy
                  onClick={() => {
                    copyToClipboard(output).then((res) => {
                      if (!res) {
                        return;
                      }
                      setInfoMsg("Copied!");
                      setTimeout(() => {
                        setInfoMsg("");
                      }, 2000);
                    });
                  }}
                  className="text-xl mr-2 hover:text-blue-600 cursor-pointer"
                />
                <AiOutlineDownload
                  onClick={() => downloadFile(output, type)}
                  className="text-xl hover:text-blue-600 cursor-pointer"
                />
              </div>
              <div id="info-prompt" className="z-10 bottom-8 right-7 fixed">
                <span className="text-md font-sans">{infoMsg}</span>
              </div>
              <textarea
                id="formatter-out"
                readOnly={true}
                value={output}
                className="bg-gray-100 w-full block p-2 text-sm rounded-md border-2 border-gray-300 focus:border-gray-300 resize-none focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormatPage;
