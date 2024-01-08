import { NextResponse } from "next/server";
import { updatePinnedApps, getAppPinnedStatus } from "@/data/pinned";
import ErrorCode from "@/constants/errorCode";
import { ResponseType } from "../apps";

type AppPinnedType = {
  pinned: boolean;
};

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  const result = await getAppPinnedStatus(id);
  if (result === false) {
    return NextResponse.json({ code: ErrorCode.OK, msg: "notInDb" });
  }
  return NextResponse.json({ code: ErrorCode.OK, msg: "inDb" } as ResponseType);
}

// update a pinned app status
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const body = (await req.json()) as AppPinnedType;
  const id = params.id;
  console.log("pinned id is: ", id);
  // if pinned, unpin this, otherwise pin
  const result: boolean = await updatePinnedApps(id, body.pinned);
  if (!result) {
    console.log("update error");
    return NextResponse.json({
      code: ErrorCode.DATABASE_ERROR,
    } as ResponseType);
  }
  return NextResponse.json({ code: ErrorCode.OK } as ResponseType);
}
