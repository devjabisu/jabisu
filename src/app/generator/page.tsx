"use client";

import { useState } from "react";
import { BsChevronExpand } from "react-icons/bs";
import fakerInfo from "@/constants/fakerInfo";
import SelectModal from "@/components/select-modal";
import {
  AiOutlineClose,
  AiFillPlusSquare,
  AiOutlineClear,
  AiOutlineDownload,
  AiOutlineCopy,
} from "react-icons/ai";
import { JetBrains_Mono } from "next/font/google";
import AppTitle from "@/components/app-title";

let catTypeObj = {} as { [key: string]: string[] };
fakerInfo.faker.map((item) => {
  if (!(item.category in catTypeObj)) {
    catTypeObj[item.category] = [item.type];
  } else {
    catTypeObj[item.category].push(item.type);
  }
});

const showTooltip = () => {
  document.getElementById("add-field-tooltip")!.classList.remove("hidden");
};

const hideTooltip = () => {
  document.getElementById("add-field-tooltip")!.classList.add("hidden");
};

const jetbrainsMono = JetBrains_Mono({ weight: "400", subsets: ["latin"] });

const DataGenerator = () => {
  const [dataList, setDataList] = useState(
    [] as { name: string; type: string; option: string }[],
  );

  const [showSelectPanel, setShowSelectPanel] = useState(false);
  const [editingIdx, setEditingIdx] = useState(-1);
  const [lines, setLines] = useState(50);
  const [generateType, setGenerateType] = useState("json");
  const [output, setOutput] = useState("");
  const [copyDownloadOk, setCopyDownloadOk] = useState(false);
  const [infoMsg, setInfoMsg] = useState("");

  const downloadFile = (content: string, type: string) => {
    if (!copyDownloadOk) {
      setInfoMsg("Please generate first!");
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
    setOutput("");
    setCopyDownloadOk(false);
  };

  const copyToClipboard = async (content: string) => {
    if (!copyDownloadOk) {
      setInfoMsg("Please generate first!");
      setTimeout(() => {
        setInfoMsg("");
      }, 2000);
      return false;
    }
    navigator.clipboard.writeText(content);
    return true;
  };

  const generateMockData = async () => {
    const body = {
      lines: lines,
      type: generateType,
      mock: dataList,
    };
    setInfoMsg("Generating...");
    fetch("/api/mock", {
      method: "POST",
      body: JSON.stringify(body),
    }).then(async (res) => {
      const result = await res.json();
      if (result.code === 0) {
        setOutput(result.data);
        setInfoMsg("");
        setCopyDownloadOk(true);
      } else {
        setInfoMsg("Failed to generate!");
        setTimeout(() => {
          setInfoMsg("");
        }, 2000);
      }
    });
  };

  const addField = async () => {
    const newDataList = [...dataList];
    newDataList.push({ name: "", type: "lorem/text", option: "" });
    setDataList(newDataList);
  };

  const deleteField = (idx: number) => {
    const newDataList = [...dataList];
    newDataList.splice(idx, 1);
    setDataList(newDataList);
  };

  const handleNameChange = (idx: number, name: string) => {
    const nextDataList = dataList.map((c, i) => {
      if (i === idx) {
        c.name = name;
      }
      return c;
    });
    setDataList(
      nextDataList as { name: string; type: string; option: string }[],
    );
  };

  const handleTypeChange = async (idx: number, type: string) => {
    const nextDataList = dataList.map((c, i) => {
      if (i === idx) {
        c.type = type;
      }
      return c;
    });
    setDataList(
      nextDataList as { name: string; type: string; option: string }[],
    );
  };

  const handleOptionChange = async (idx: number, option: string) => {
    const nextDataList = dataList.map((c, i) => {
      if (i === idx) {
        c.option = option;
      }
      return c;
    });
    setDataList(
      nextDataList as { name: string; type: string; option: string }[],
    );
  };
  if (showSelectPanel) {
    return (
      <SelectModal
        onSelected={(selected: string) => {
          if (selected !== "" && editingIdx !== -1) {
            handleTypeChange(editingIdx, selected).then(() => {
              setEditingIdx(-1);
            });
          }
          setShowSelectPanel(false);
        }}
      />
    );
  }

  return (
    <div>
      <AppTitle id="0005" title="Data Generator" />
      <div className="w-full mt-6">
        <div className="pr-3">
          <div className="grid grid-cols-11 gap-2">
            <div className="col-span-5 mt-10">
              <div id="generator-config-panel">
                <table className="w-full text-md text-left">
                  <thead>
                    <tr>
                      <th>Field Name</th>
                      <th>Type</th>
                      <th>Options</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="p-2">
                    {dataList.map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          <input
                            type="text"
                            placeholder="Field Name"
                            value={item.name}
                            onChange={(e) =>
                              handleNameChange(idx, e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <div
                            className="px-1 mr-2 text-sm rounded-md bg-gray-300 cursor-pointer"
                            onClick={() => {
                              setEditingIdx(idx);
                              setShowSelectPanel(true);
                            }}
                          >
                            {item.type} <BsChevronExpand className="inline" />
                          </div>
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="Options"
                            className={jetbrainsMono.className}
                            value={item.option}
                            onChange={(e) =>
                              handleOptionChange(idx, e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <AiOutlineClose onClick={() => deleteField(idx)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-10 flex">
                <div className="mr-2 vert-center-text">Rows: </div>
                <input
                  className="w-12 mr-4"
                  type="number"
                  value={lines}
                  onChange={(e) => setLines(Number(e.target.value))}
                />
                <div className="mr-2 vert-center-text">Format: </div>
                <select
                  className="block w-28 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  value={generateType}
                  onChange={(e) => setGenerateType(e.target.value)}
                >
                  <option value="json">JSON</option>
                  <option value="csv">CSV</option>
                </select>
                <button
                  className="btn bg-blue-600 text-white rounded ml-8"
                  onClick={generateMockData}
                >
                  Generate
                </button>
              </div>
            </div>

            <div className="col-span-1 mt-10">
              <AiFillPlusSquare
                className="text-3xl text-blue-500 hover:text-blue-700 cursor-pointer"
                onClick={addField}
                onMouseOver={showTooltip}
                onMouseOut={hideTooltip}
              />
              <div
                id="add-field-tooltip"
                className="hidden bg-gray-800 text-white p-2 rounded-md text-md w-28"
              >
                <p className="fold-semibold">Add Field</p>
              </div>
            </div>

            <div id="out-panel" className="pr-3 mt-10 col-span-5">
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
                  onClick={() => downloadFile(output, generateType)}
                  className="text-xl hover:text-blue-600 cursor-pointer"
                />
              </div>
              <div id="info-prompt" className="z-10 bottom-8 right-10 fixed">
                <span className="text-md font-sans">{infoMsg}</span>
              </div>
              <textarea
                value={output}
                readOnly={true}
                id="out-textarea"
                className={`w-full block p-2 text-sm rounded-md border-2 border-gray-300 focus:border-blue-700 resize-none focus:outline-none ${jetbrainsMono.className}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataGenerator;
