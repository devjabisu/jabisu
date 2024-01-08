import { NextResponse } from "next/server";
import { doConvert } from "@/lib/converter";
import ErrorCode from "@/constants/errorCode";

export async function POST(req: Request) {
  const json = await req.json()
  const inputText = json.inputText
  const inputType = json.inputType
  const outputType = json.outputType

  const result = doConvert(inputText, inputType, outputType)

  return NextResponse.json({ code: ErrorCode.OK, data: result })
}
