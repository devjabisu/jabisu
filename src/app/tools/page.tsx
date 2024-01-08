"use client";

import { AiOutlineSearch } from "react-icons/ai";
import { useState, useEffect } from "react";
import Appcard from "@/components/app-card";
import { AppType } from "@/constants/appInfo";
import { getAllAppsList } from "@/data/allApps";

const all_cards = getAllAppsList();

const Tools = () => {
  const [filter, setFilter] = useState("");
  const [filtered_cards, setFilteredCards] = useState(all_cards);

  useEffect(() => {
    console.log(all_cards);
    if (filter == "") {
      setFilteredCards(all_cards);
      return;
    }
    const filtered = all_cards.filter((card) => {
      console.log("the card", card);
      const title = card.name.toLowerCase();
      const desc = card.desc.toLowerCase();
      return title.includes(filter) || desc.includes(filter);
    });
    console.log("key up, filtered");
    setFilteredCards(filtered);
  }, [filter]);

  return (
    <div id="all-tools" className="px-8 pb-10">
      <div
        className="flex items-center max-w-sm border-2 border-gray-300 rounded-md bg-light-white mt-5 p-1"
        id="search-app"
      >
        <AiOutlineSearch className="text-lg text-gray-800 block float-left cursor-pointer ml-2 mr-2" />
        <input
          id="filter"
          type="search"
          className="text-gray-800 text-lg w-full focus:outline-none"
          placeholder="Filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div
        id="apps-panel"
        className="px-4 grid grid-cols-3 gap-8 mt-10 overflow-y-auto"
      >
        {filtered_cards.map((card: AppType) => (
          <Appcard
            key={card.id}
            id={card.id}
            title={card.name}
            description={card.desc}
            short={card.short}
          />
        ))}
      </div>
    </div>
  );
};

export default Tools;
