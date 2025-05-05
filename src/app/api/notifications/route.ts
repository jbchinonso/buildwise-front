import { customFetch, getError } from "@/lib/utils";
import { HttpStatusCode } from "axios";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  res: NextResponse,
  route: { params: { tag: string } }
) {
  const params = route;
  const { searchParams } = new URL(req.url as string);
  const tags = searchParams.get("old")?.split(",");
  //   const path = searchParams.get("path");

  console.log({ req, searchParams, tags });

  try {
    const response = await customFetch(
      "http://localhost:8088/api/v1/notifications"
    );

    const data = response?.data;

    console.log({ data });

    return NextResponse.json({
      status: HttpStatusCode.Ok,
      data,
    });
  } catch (error) {
    return NextResponse.json({
      status: HttpStatusCode.InternalServerError,
      error: getError(error) || "failed to fetch data",
    });
  }
}
