"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import fakerInfo from "@/constants/fakerInfo";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";

type ModalType = {
  onSelected: (selected: string) => void;
};

const getFakerObj = (filter: string) => {
  let fakerObj = {} as { [key: string]: string[] };
  fakerInfo.faker.map((item) => {
    if (filter !== "" && item.type.indexOf(filter) === -1) {
      return;
    }
    if (!(item.category in fakerObj)) {
      fakerObj[item.category] = [item.type];
    } else {
      fakerObj[item.category].push(item.type);
    }
  });
  if (Object.keys(fakerObj).length === 0) {
    console.log("empty now");
    fakerObj = { "No Result": [] };
  }
  return fakerObj;
};

const SelectModal = (props: ModalType) => {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const [filterText, setFilterText] = useState("");
  const [fakerObj, setFakerObj] = useState(getFakerObj(""));

  const [selectedCategory, setSelectedCategory] = useState(
    Object.keys(fakerObj)[0]
  );
  const [typeList, setTypeList] = useState(fakerObj[selectedCategory]);

  useEffect(() => {
    const selected = Object.keys(fakerObj)[0];
    setSelectedCategory(selected);
    setTypeList(fakerObj[selected]);
  }, [fakerObj]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => setOpen(true)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="flex justify-between">
                    <div ref={cancelButtonRef}>
                      <AiOutlineClose
                        className="text-sm cursor-pointer"
                        onClick={() => {
                          setOpen(false);
                          props.onSelected("");
                        }}
                      />
                    </div>
                    <div className="flex">
                      <AiOutlineSearch className="text-md text-gray-400" />
                      <input
                        value={filterText}
                        placeholder="Filter..."
                        className="px-2 border-b border-gray-400 focus:outline-none focus:border-blue-500 focus:border-b-2"
                        onChange={(e) => {
                          setFilterText(e.target.value);
                          setFakerObj(getFakerObj(e.target.value));
                        }}
                        type="text"
                      />
                    </div>
                  </div>
                  <div
                    id="generator-type-sel-panel"
                    className="grid place-items-center grid-cols-12"
                  >
                    <div
                      className="pr-2 col-span-3 overflow-y-auto"
                      id="category-sel-menu"
                    >
                      {Object.keys(fakerObj).map((category) => (
                        <div
                          key={category}
                          className="text-sm mb-2 text-slate-700 hover:text-blue-800 cursor-pointer font-semibold"
                          onClick={() => {
                            setSelectedCategory(category);
                            setTypeList(fakerObj[category]);
                          }}
                        >
                          {category}
                        </div>
                      ))}
                    </div>
                    <div
                      className="col-span-9 overflow-y-auto pl-2 w-full"
                      id="type-sel-panel"
                    >
                      {typeList.map((item) => (
                        <div
                          className="py-1 text-sm cursor-pointer"
                          key={item}
                          onClick={() => {
                            setOpen(false);
                            props.onSelected(selectedCategory + "/" + item);
                          }}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SelectModal;
