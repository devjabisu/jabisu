import { NextResponse } from "next/server";
import formatContent from "@/lib/formatter";
import ErrorCode from "@/constants/errorCode";

export async function POST(req: Request) {
  const body = await req.json();
  const result = await formatContent(body.content, body.type);
  if (result === "") {
    return NextResponse.json({ code: ErrorCode.GENERAL_ERROR });
  }
  return NextResponse.json({ code: ErrorCode.OK, data: result });
}
