// import { authOptions } from "@/lib/utils/auth.utils";
import { getServerSession } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  const { searchParams } = new URL(req.url);
  const tags = searchParams.get("tags")?.split(",");
  const path = searchParams.get("path");
  // const session = await getServerSession(authOptions);
  // const user = session?.user;

  try {
    // if (user?._id != id) {
    //   return NextResponse.json({
    //     status: 200,
    //     revalidated: true,
    //     data: { message: "skip revalidation", timestamp: Date.now() },
    //   });
    // }
    if (tags) {
      tags.forEach((tag) => {
        revalidateTag(tag);
      });
    }

    if (path) {
      revalidatePath(path);
    }

    return NextResponse.json({
      status: 200,
      revalidated: true,
      // user: { _id: user?._id, email: user?.email },
      data: {
        tags,
        path,
        message: "Revalidation successful",
        timestamp: Date.now(),
      },
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
