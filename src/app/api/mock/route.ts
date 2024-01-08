import { NextResponse } from "next/server";
import ErrorCode from "@/constants/errorCode";
import generateMockData from "@/lib/faker";
import formatContent from "@/lib/formatter";
import { jsonToCsv } from "@/lib/converter";

const TYPE_CSV = "csv";

export async function POST(req: Request) {
  const body = await req.json();
  const result = generateMockData(body.mock, body.lines);
  if (result.length === 0) {
    return NextResponse.json({ code: ErrorCode.GENERAL_ERROR });
  }
  let formattedRes = "";
  if (body.type === TYPE_CSV) {
    console.log(typeof result);
    formattedRes = jsonToCsv(result);
  } else {
    formattedRes = await formatContent(JSON.stringify(result), "json");
  }
  return NextResponse.json({ code: ErrorCode.OK, data: formattedRes });
}
