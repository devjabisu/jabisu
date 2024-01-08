"use client";

import { useEffect, useState } from "react";
import {
  TimeType,
  getCurrentTimestamp,
  timestamp2Time,
  time2Timestamp,
} from "@/lib/timestamp/tsConv";
import AppTitle from "@/components/app-title";
import dynamic from "next/dynamic";
import { AiFillCaretDown } from "react-icons/ai";

const initTime = getCurrentTimestamp();

const formatTime = (time: TimeType, timezoneText: string | null): string => {
  const { year, month, day, hour, minute, second } = time;
  let retValue = `${year}-${padZero(month)}-${padZero(day)} ${padZero(
    hour,
  )}:${padZero(minute)}:${padZero(second)}`;
  if (timezoneText != null) {
    retValue += timezoneText;
  }
  return retValue;
};

const convertTimestamp = () => {
  const timestamp = (
    document.getElementById("timestamp-input") as HTMLInputElement
  ).value;

  const timezoneEl = document.getElementById(
    "timezone-sel",
  ) as HTMLSelectElement;
  const timezone = timezoneEl.value;
  const result = timestamp2Time(parseInt(timestamp), parseFloat(timezone));

  const timezoneText = timezoneEl.options[timezoneEl.selectedIndex].text;

  (document.getElementById("time-res") as HTMLSpanElement).innerText =
    formatTime(result, timezoneText);
};

const getTimeFromFormatted = (timeStr: string, timezone: number): TimeType => {
  const timeArr = timeStr.split(" ");
  const date = timeArr[0].split("-");
  const time = timeArr[1].split(":");

  return {
    year: parseInt(date[0]),
    month: parseInt(date[1]) - 1,
    day: parseInt(date[2]),
    hour: parseInt(time[0]),
    minute: parseInt(time[1]),
    second: parseInt(time[2]),
    timezone: timezone,
  };
};

const convertTime = () => {
  const timeStr: string = (
    document.getElementById("time-input") as HTMLInputElement
  ).value;
  const timezone = (
    document.getElementById("timezone-sel") as HTMLSelectElement
  ).value;

  const result = time2Timestamp(
    getTimeFromFormatted(timeStr, parseFloat(timezone)),
  );

  (document.getElementById("timestamp-res") as HTMLSpanElement).innerText =
    result.toString();
};

const getUserTimezoneOffset = () => {
  return -(new Date().getTimezoneOffset() / 60);
};

const getTimezoneOptions = (): JSX.Element[] => {
  const options: JSX.Element[] = [];
  const timezones = [
    { value: "-12", label: "-12:00" },
    { value: "-11", label: "-11:00" },
    { value: "-10", label: "-10:00" },
    { value: "-9.5", label: "-09:30" },
    { value: "-9", label: "-09:00" },
    { value: "-8", label: "-08:00" },
    { value: "-7", label: "-07:00" },
    { value: "-6", label: "-06:00" },
    { value: "-5", label: "-05:00" },
    { value: "-4.5", label: "-04:30" },
    { value: "-4", label: "-04:00" },
    { value: "-3.5", label: "-03:30" },
    { value: "-3", label: "-03:00" },
    { value: "-2", label: "-02:00" },
    { value: "-1", label: "-01:00" },
    { value: "0", label: "+00:00" },
    { value: "1", label: "+01:00" },
    { value: "2", label: "+02:00" },
    { value: "3", label: "+03:00" },
    { value: "3.5", label: "+03:30" },
    { value: "4", label: "+04:00" },
    { value: "4.5", label: "+04:30" },
    { value: "5", label: "+05:00" },
    { value: "5.5", label: "+05:30" },
    { value: "5.75", label: "+05:45" },
    { value: "6", label: "+06:00" },
    { value: "6.5", label: "+06:30" },
    { value: "7", label: "+07:00" },
    { value: "8", label: "+08:00" },
    { value: "8.75", label: "+08:45" },
    { value: "9", label: "+09:00" },
    { value: "9.5", label: "+09:30" },
    { value: "10", label: "+10:00" },
    { value: "10.5", label: "+10:30" },
    { value: "11", label: "+11:00" },
    { value: "11.5", label: "+11:30" },
    { value: "12", label: "+12:00" },
    { value: "12.75", label: "+12:45" },
    { value: "13", label: "+13:00" },
    { value: "14", label: "+14:00" },
  ];

  for (let i = 0; i < timezones.length; i++) {
    const timezone = timezones[i];

    const text = `UTC${timezone.label}`;

    options.push(
      <option key={timezone.value} value={timezone.value}>
        {text}
      </option>,
    );
  }

  return options;
};
const padZero = (num: number): string => {
  return num.toString().padStart(2, "0");
};

const TimestampConv = () => {
  let time = initTime;
  const [timestamp, setTimestamp] = useState(time);

  useEffect(() => {
    const timestampInput = document.getElementById(
      "timestamp-input",
    ) as HTMLInputElement;
    const timeInput = document.getElementById("time-input") as HTMLInputElement;

    const userTimezone = getUserTimezoneOffset();
    const timezoneSel = document.getElementById(
      "timezone-sel",
    ) as HTMLSelectElement;
    timezoneSel.value = userTimezone.toString();

    timestampInput.value = initTime.toString();

    timeInput.value = formatTime(timestamp2Time(initTime, userTimezone), null);

    const interval = setInterval(() => {
      setTimestamp((currentTime) => {
        return ++currentTime;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* add a component for pinned and title */}
      <AppTitle id="0001" title="Timestamp Converter" />
      <div id="now-time" className="mt-4">
        <div className="text-lg">
          Current Unix epoch time:{" "}
          <span className="text-green-800 pl-4">{timestamp}</span>
        </div>
      </div>
      <div className="flex items-center mt-4">
        <span className="text-lg">TIMEZONE</span>
        <div className="ml-4 inline-block relative w-40">
          <select
            id="timezone-sel"
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            {getTimezoneOptions()}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <AiFillCaretDown />
          </div>
        </div>
      </div>

      <div id="stamp2time" className="flex mt-16">
        <div className="text-lg w-24 p-1">TIMESTAMP</div>
        <div className="ml-6 w-64 border-b border-teal-500">
          <input
            id="timestamp-input"
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Unix epoch timestamp"
          />
        </div>

        <button
          onClick={convertTimestamp}
          className="ml-4 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
        >
          Convert
        </button>
        <span
          id="time-res"
          className="ml-4 text-lg font-semibold items-center text-center p-2 text-gray-800"
        ></span>
      </div>

      <div id="time2stamp" className="flex mt-16">
        <div className="text-lg w-24 p-1">TIME</div>
        <div className="ml-6 w-64 border-b border-teal-500">
          <input
            id="time-input"
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Time, e.g. 2020-01-01 00:00:00"
          />
        </div>

        <button
          onClick={convertTime}
          className="ml-4 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
        >
          Convert
        </button>
        <span
          id="timestamp-res"
          className="ml-4 text-lg font-semibold  p-2 text-gray-800"
        ></span>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(TimestampConv), {
  ssr: false,
});
