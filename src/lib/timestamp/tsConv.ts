// methods for converting timestamp

type TimeType = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  timezone: number;
};

const HOUR_TO_SEC = 60 * 60;

const getCurrentTimestamp = (): number => {
  const time = Math.round(Date.now() / 1000);
  console.log("current timestamp when refreshing page: ", time);
  return time;
};

const timestamp2Time = (timestamp: number, timezone: number): TimeType => {
  const utcTimestamp = timestamp + timezone * HOUR_TO_SEC;
  const date = new Date(utcTimestamp * 1000);
  console.log(date);
  const time: TimeType = {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
    hour: date.getUTCHours(),
    minute: date.getUTCMinutes(),
    second: date.getUTCSeconds(),
    timezone: timezone,
  };
  return time;
};

const time2Timestamp = (time: TimeType): number => {
  const { year, month, day, hour, minute, second, timezone } = time;
  const utcTimestamp = Date.UTC(year, month, day, hour, minute, second) / 1000;
  const timestamp = utcTimestamp - timezone * HOUR_TO_SEC;
  console.log("timestamp: ", timestamp);
  return timestamp;
};

export type { TimeType };
export { getCurrentTimestamp, timestamp2Time, time2Timestamp };
