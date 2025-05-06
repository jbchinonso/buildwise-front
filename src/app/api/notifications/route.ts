import { customFetch, getError } from "@/lib/utils";
// import { customFetch } from "@/lib/utils/custom-fetch.utils";
// import { getError } fro m "@/lib/utils/error.utils";
import { HttpStatusCode } from "axios";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
) {
  const userAgent = req.headers.get("user-agent");
  const headers: Record<string, string> = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  };

  if (userAgent && userAgent.includes("Mobile")) {
    headers["X-Is-Mobile"] = "true";
  }

  try {
    const response = await customFetch(
      "http://localhost:8088/api/v1/notifications"
    );

    const data = response?.data;

    return new NextResponse(JSON.stringify(data), {
      status: HttpStatusCode.Ok,
      headers,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: getError(error) || "failed to fetch data",
      }),
      {
        headers,
        status: HttpStatusCode.InternalServerError,
      }
    );
  }
}

