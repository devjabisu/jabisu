import { timestamp2Time } from "./tsConv";
import { describe, expect, test } from "@jest/globals";

describe("timestamp2Time", () => {
  test("simple timestamp to time", () => {
    expect(timestamp2Time(1610000000, 0)).toEqual({
      year: 2021,
      month: 1,
      day: 7,
      hour: 6,
      minute: 13,
      second: 20,
      timezone: 0,
    });
  });
});
