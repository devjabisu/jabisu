"use client";

import AppTitle from "@/components/app-title";
import { useEffect, useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { FaArrowsRotate } from "react-icons/fa6";

const changeSelectedButton = (selectedBtn: HTMLButtonElement) => {
  if (selectedBtn) {
    selectedBtn.classList.remove("btn");
    selectedBtn.classList.add("btn-selected");
  }
};

const resetSelectedButton = () => {
  const selectedBtns = document.getElementsByClassName("btn-selected");
  if (selectedBtns.length == 0) {
    return;
  }
  const selectedBtn: HTMLButtonElement = selectedBtns[0] as HTMLButtonElement;
  selectedBtn.classList.remove("btn-selected");
  selectedBtn.classList.add("btn");
};

const Base64Page = () => {
  const TYPE_ENCODE = "encode";
  const TYPE_DECODE = "decode";
  const [type, setType] = useState(TYPE_ENCODE);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [inputType, setInputType] = useState("text");
  const [inputFile, setInputFile] = useState(new File([], "dummy"));
  const [inputFileName, setInputFileName] = useState("");

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
      return;
    }
    setInputFileName(files[0].name);
    setInputFile(files[0]);
  };

  const doBase64Convert = () => {
    if (type === TYPE_ENCODE) {
      if (inputType === "text") setOutput(btoa(input));
      else fileToBase64(inputFile);
    } else {
      try {
        setOutput(atob(input));
      } catch (error) {
        setOutput("Not valid for decoding!");
      }
    }
  };

  const fileToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setOutput(reader.result as string);
    };
    reader.onerror = () => {
      setOutput("Encoding error");
    };
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
      <AppTitle id="0004" title="Base64 Converter" />
      <div className="w-full mt-6">
        <div className="pr-3">
          <div className="grid place-items-center">
            <div className="inline-flex rounded-d shadow-sm">
              <button
                id="btn-encode"
                className="btn rounded-l-lg"
                onClick={() => setType(TYPE_ENCODE)}
              >
                ENCODE
              </button>
              <button
                id="btn-decode"
                className="btn rounded-r-lg"
                onClick={() => setType(TYPE_DECODE)}
              >
                DECODE
              </button>
            </div>
          </div>
          <div className="mt-8 w-full grid place-items-center">
            <select
              className="mb-4"
              value={inputType}
              onChange={(e) => setInputType(e.target.value)}
            >
              <option value="text">TEXT</option>
              <option value="file">FILE</option>
            </select>
            {inputType === "text" ? (
              <textarea
                id="base64-in"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                className="block p-2 text-sm rounded-md border-2 border-gray-300 focus:border-blue-700 resize-none focus:outline-none"
              />
            ) : (
              <div
                id="upload-panel"
                className="border-gray-200 rounded-md bg-gray-300 place-items-center grid"
              >
                <div className="grid place-items-center">
                  <AiOutlineUpload
                    onClick={uploadFile}
                    className="text-3xl font-bold cursor-pointer"
                  />
                  <div>{inputFileName}</div>
                </div>
                <input
                  type="file"
                  id="upload-file"
                  className="hidden"
                  onChange={handleFileUploaded}
                />
              </div>
            )}
            <FaArrowsRotate
              onClick={doBase64Convert}
              className="my-4 text-2xl cursor-pointer hover:text-blue-600"
            />
            <textarea
              id="base64-out"
              onChange={(e) => setOutput(e.target.value)}
              value={output}
              className="block p-2 text-sm rounded-md border-2 border-gray-300 focus:border-blue-700 resize-none focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Base64Page;
