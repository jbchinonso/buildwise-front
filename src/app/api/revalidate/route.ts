import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
) {
  const { searchParams } = new URL(req.url);
  const tags = searchParams.get("tags")?.split(",");
  const path = searchParams.get("path");

  try {
    if (tags) {
      for (let tag of tags) {
        revalidateTag(tag);
      }
    }

    if (path) {
      revalidatePath(path);
    }

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      tags,
      path,
    });
  } catch (error: any) {
    console.log({ error });
    throw new Error(error);
  }
}

export async function POST(req: Request) {
  const body = { message: "Hello world" };
  try {
    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (error) {}
}