"use client";

import { FaArrowsRotate } from "react-icons/fa6";
import { JetBrains_Mono } from "next/font/google";
import { useState } from "react";
import {
  AiOutlineClear,
  AiOutlineCopy,
  AiOutlineDownload,
  AiOutlineUpload,
} from "react-icons/ai";
import AppTitle from "@/components/app-title";

const jetbrainsMono = JetBrains_Mono({ weight: "400", subsets: ["latin"] });

const ConvertPage = () => {
  const [input, setInput] = useState("");
  const [inputType, setInputType] = useState("json");
  const [output, setOutput] = useState("");
  const [outputType, setOutputType] = useState("xml");
  const [infoMsg, setInfoMsg] = useState("");
  const [copyDownloadOk, setCopyDownloadOk] = useState(false);
  const downloadFile = (content: string, type: string) => {
    if (!copyDownloadOk) {
      setInfoMsg("Please convert first!");
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
        setInputType("json");
        break;
      case "xml":
        setInputType("xml");
        break;
      case "yaml":
      case "yml":
        setInputType("yaml");
        break;
      case "toml":
        setInputType("toml");
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
  const handleConvert = async () => {
    if (inputType === outputType) {
      setInfoMsg("You have selected the same file types!");
      setTimeout(() => {
        setInfoMsg("");
      }, 2000);

      return;
    }

    setInfoMsg("Converting...");
    const body = {
      inputText: input,
      inputType: inputType,
      outputType: outputType,
    };
    const response = await fetch("/api/convert", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const result = await response.json();
    if (result.code === 0) {
      setOutput(result.data);
      setCopyDownloadOk(true);
      setInfoMsg("");
    } else {
      setInfoMsg("Failed to convert!");
      setTimeout(() => {
        setInfoMsg("");
      }, 2000);
    }
  };
  return (
    <div>
      <AppTitle id="0003" title="Data Converter" />
      <div className="w-full mt-6">
        <div className="pr-3">
          <div
            className={`pt-8 grid formatter-panel-grid place-items-center ${jetbrainsMono.className}`}
            id="formatter-panel"
          >
            <div className="w-full px-2 col-span-7">
              <div className="mb-4 flex" id="source-sel">
                <label className="text-sm mr-3">FROM</label>
                <select
                  value={inputType}
                  onChange={(e) => setInputType(e.target.value)}
                >
                  <option value="xml">XML</option>
                  <option value="yaml">YAML</option>
                  <option value="toml">TOML</option>
                  <option value="json">JSON</option>
                </select>
                <AiOutlineUpload
                  className="text-xl ml-4 hover:text-blue-600 cursor-pointer"
                  onClick={uploadFile}
                />
                <input
                  type="file"
                  id="upload-file"
                  className="hidden"
                  accept=".json,.xml,.yaml,.yml,.toml"
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
                onClick={handleConvert}
              />
            </div>
            <div className="w-full px-2 col-span-7">
              <div className="mb-4" id="dest-sel">
                <label className="text-sm mr-3">TO</label>
                <select
                  value={outputType}
                  onChange={(e) => setOutputType(e.target.value)}
                >
                  <option value="xml">XML</option>
                  <option value="yaml">YAML</option>
                  <option value="toml">TOML</option>
                  <option value="json">JSON</option>
                </select>
              </div>
              <div
                id="converter-button-set"
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
                  onClick={() => downloadFile(output, outputType)}
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

export default ConvertPage;
